import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, MapPin, Users, DollarSign, CheckCircle, 
  CreditCard, User, Mail, Phone, ArrowLeft, ShoppingCart,
  Banknote, Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReservationPaymentOption = () => {
  const { eventId, itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  const [reservationData, setReservationData] = useState<any>(null);

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

  const handlePaymentOption = (withPayment: boolean) => {
    if (withPayment) {
      navigate(`/payment-checkout/${eventId}/${itemId}`);
    } else {
      handleReservationWithoutPayment();
    }
  };

  const handleReservationWithoutPayment = async () => {
    try {
      // Simulate saving reservation to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reserva confirmada!",
        description: `Sua reserva foi confirmada com sucesso.`,
      });
      
      // Redirect to success page
      navigate('/reservation-success', { 
        state: { 
          reservationData,
          paymentRequired: false
        } 
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua reserva. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (!reservationData) {
    return <div>Carregando...</div>;
  }

  const { customerData, selectedTable, event } = reservationData;
  const paymentConfig = currentTenant?.paymentConfig;
  const totalAmount = selectedTable.price * selectedTable.seats;
  const serviceFee = paymentConfig?.serviceFee || 0;
  const totalWithFee = totalAmount * (1 + serviceFee / 100);

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
            <h1 className="text-3xl font-bold">Opções de Reserva</h1>
            <p className="text-muted-foreground">Escolha como deseja finalizar sua reserva</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Summary */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Resumo da Reserva</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-muted-foreground">{selectedTable.name}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>{new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>{selectedTable.seats} pessoas</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-primary mr-2" />
                      <span>{customerData.name}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {totalAmount.toFixed(2)}</span>
                    </div>
                    {serviceFee > 0 && (
                      <div className="flex justify-between">
                        <span>Taxa de serviço ({serviceFee}%):</span>
                        <span>R$ {(totalAmount * serviceFee / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>R$ {totalWithFee.toFixed(2)}</span>
                    </div>
                  </div>

                  {paymentConfig?.cancellationPolicy && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        {paymentConfig.cancellationPolicy}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reservar com Pagamento</CardTitle>
                <CardDescription>
                  Garanta sua reserva com pagamento antecipado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Métodos de pagamento disponíveis:
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {paymentConfig?.stripeEnabled && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-800">Cartão</span>
                      </div>
                    )}
                    {paymentConfig?.pixEnabled && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">PIX</span>
                      </div>
                    )}
                    {paymentConfig?.boletoEnabled && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
                        <Banknote className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-800">Boleto</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium text-lg">R$ {totalWithFee.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      Pagamento seguro e protegido
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handlePaymentOption(true)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Pagar e Confirmar Reserva
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reservar sem Pagamento</CardTitle>
                <CardDescription>
                  Confirme sua reserva sem pagamento antecipado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Sua reserva será confirmada e você poderá pagar no evento ou conforme acordado.
                  </div>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Reserva gratuita - Pagamento no local ou conforme combinado
                    </AlertDescription>
                  </Alert>

                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => handlePaymentOption(false)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirmar Reserva sem Pagamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPaymentOption;