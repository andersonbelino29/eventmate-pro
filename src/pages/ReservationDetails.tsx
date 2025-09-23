import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, MapPin, Users, DollarSign, CheckCircle, 
  CreditCard, User, Mail, Phone, ArrowLeft, ShoppingCart 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReservationDetails = () => {
  const { eventId, itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Mock data - In real app, fetch from API
  const event = {
    id: eventId,
    name: "Casamento Elegante - Salon Premium",
    description: "Um evento de casamento dos sonhos com decoração luxuosa, cardápio gourmet e ambientação única.",
    date: "2024-12-15",
    time: "18:00",
    location: "Espaço Villa Eventos - São Paulo",
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    price: 200,
    image: "/src/assets/event-wedding.jpg",
    itemType: "mesas" // Could be "mesas", "ingressos", "areas", etc.
  };

  const selectedItem = {
    id: itemId,
    name: "Mesa VIP - Frente do Palco",
    description: "Mesa premium com vista privilegiada para o palco principal",
    capacity: 8,
    price: 200,
    location: "Área VIP",
    features: ["Vista premium", "Cardápio completo", "Bebidas inclusas", "Serviço personalizado"]
  };

  const reservationData = {
    customerName: "João Silva",
    customerEmail: "joao@email.com",
    customerPhone: "(11) 99999-9999",
    totalGuests: selectedItem.capacity,
    totalAmount: selectedItem.price * selectedItem.capacity,
    observations: "Aniversário de casamento"
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Pagamento processado!",
        description: "Sua reserva foi confirmada com sucesso.",
      });
      
      navigate('/payment-success', { 
        state: { 
          eventId, 
          itemId, 
          reservationData,
          event,
          selectedItem
        } 
      });
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

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
            <h1 className="text-3xl font-bold">Confirmar Reserva</h1>
            <p className="text-muted-foreground">Revise os detalhes e finalize sua reserva</p>
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
                    <h3 className="text-lg font-semibold mb-2">{selectedItem.name}</h3>
                    <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span>{selectedItem.capacity} pessoas</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span>{selectedItem.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                        <span>R$ {selectedItem.price} por pessoa</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Incluído:</h4>
                    <ul className="space-y-1">
                      {selectedItem.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
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
                    <span>{reservationData.customerName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-2" />
                    <span>{reservationData.customerEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-2" />
                    <span>{reservationData.customerPhone}</span>
                  </div>
                  {reservationData.observations && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Observações:</p>
                      <p className="text-sm text-muted-foreground">{reservationData.observations}</p>
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
                    <span className="text-sm font-medium">{selectedItem.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Capacidade:</span>
                    <span className="text-sm">{selectedItem.capacity} pessoas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Valor por pessoa:</span>
                    <span className="text-sm">R$ {selectedItem.price}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">R$ {reservationData.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxa de serviço (10%):</span>
                    <span className="text-sm">R$ {(reservationData.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {(reservationData.totalAmount * 1.1).toFixed(2)}</span>
                </div>

                <Alert>
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription>
                    Pagamento seguro via PagarMe. Cancelamento gratuito até 24h antes.
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
                      Finalizar Pagamento
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

export default ReservationDetails;