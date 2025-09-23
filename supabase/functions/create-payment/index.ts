import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { eventId, itemId, customerData, selectedTable, event } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Create or find price for this reservation
    const priceAmount = Math.round(selectedTable.price * selectedTable.seats * 1.1 * 100); // Convert to cents
    
    // Create a price for this reservation
    const price = await stripe.prices.create({
      currency: 'brl',
      unit_amount: priceAmount,
      product_data: {
        name: `${event.name} - ${selectedTable.name}`,
        description: `Reserva para ${selectedTable.seats} pessoas em ${selectedTable.location}`,
        metadata: {
          eventId: eventId,
          itemId: itemId,
          eventName: event.name,
          itemName: selectedTable.name,
          customerName: customerData.name,
          customerEmail: customerData.email,
          customerPhone: customerData.phone,
          observations: customerData.observations || ''
        }
      },
    });

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ email: customerData.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        metadata: {
          eventId: eventId,
          itemId: itemId
        }
      });
      customerId = customer.id;
    }

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/evento/${eventId}/reservar`,
      metadata: {
        eventId: eventId,
        itemId: itemId,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        observations: customerData.observations || ''
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});