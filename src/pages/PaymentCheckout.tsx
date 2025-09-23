import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, MapPin, Users, DollarSign, CheckCircle, 
  CreditCard, User, Mail, Phone, ArrowLeft, ShoppingCart 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from '@supabase/supabase-js';

const PaymentCheckout = () => {
  const { eventId, itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    // Get reservation data from sessionStorage
    const data = sessionStorage.getItem('reservationData');
    if (data) {
      setReservationData(JSON.parse(data));
    } else {
      // If no data, redirect back
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!reservationData) return;
    
    setIsProcessingPayment(true);
    
    try {
      // Call edge function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          eventId,
          itemId,
          customerData: reservationData.customerData,
          selectedTable: reservationData.selectedTable,
          event: reservationData.event
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (!reservationData) {
    return <div>Carregando...</div>;
  }

  const { customerData, selectedTable, event } = reservationData;
  const totalAmount = selectedTable.price * selectedTable.seats * 1.1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/evento/${eventId}/reservar`)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Finalizar Pagamento</h1>
            <p className="text-muted-foreground">Confirme seus dados e finalize a reserva</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="w-full h-48 object-cover rounded-lg" 
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                        <span>R$ {event.price} por pessoa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle>Item Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{selectedTable.name}</h3>
                    <p className="text-muted-foreground mb-4">Uma experiência premium para seu evento especial</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span>{selectedTable.seats} pessoas</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span>{selectedTable.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                        <span>R$ {selectedTable.price} por pessoa</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Incluído:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Vista premium</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Cardápio completo</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Bebidas inclusas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Serviço personalizado</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-primary mr-2" />
                    <span>{customerData.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-2" />
                    <span>{customerData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-2" />
                    <span>{customerData.phone}</span>
                  </div>
                  {customerData.observations && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Observações:</p>
                      <p className="text-sm text-muted-foreground">{customerData.observations}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo da Reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Item:</span>
                    <span className="text-sm font-medium">{selectedTable.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Capacidade:</span>
                    <span className="text-sm">{selectedTable.seats} pessoas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Valor por pessoa:</span>
                    <span className="text-sm">R$ {selectedTable.price}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">R$ {(selectedTable.price * selectedTable.seats).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxa de serviço (10%):</span>
                    <span className="text-sm">R$ {(selectedTable.price * selectedTable.seats * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {totalAmount.toFixed(2)}</span>
                </div>

                <Alert>
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription>
                    Pagamento seguro via Stripe. Cancelamento gratuito até 24h antes.
                  </AlertDescription>
                </Alert>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Pagar com Stripe
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao continuar, você concorda com nossos termos de serviço
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;