import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, Calendar, MapPin, Users, DollarSign, 
  Download, Share, Home, Mail, Printer
} from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reservationData, setReservationData] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Get reservation data from sessionStorage or from URL state
    const data = sessionStorage.getItem('reservationData') || location.state;
    if (data && typeof data === 'string') {
      setReservationData(JSON.parse(data));
    } else if (data) {
      setReservationData(data);
    } else {
      // If no data available, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!reservationData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  const { customerData, selectedTable, event } = reservationData;

  const reservationId = `RES-${Date.now()}`;
  const confirmationCode = `CONF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log('Downloading reservation PDF...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Reserva Confirmada',
          text: `Reserva confirmada para ${event.name} em ${new Date(event.date).toLocaleDateString('pt-BR')}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleSendEmail = () => {
    // Simulate sending confirmation email
    console.log('Sending confirmation email...');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Pagamento Confirmado!</h1>
          <p className="text-lg text-muted-foreground">
            Sua reserva foi processada com sucesso
          </p>
          <Badge variant="outline" className="mt-2">
            Código: {confirmationCode}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reservation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Reserva</CardTitle>
                <CardDescription>
                  ID da Reserva: {reservationId}
                </CardDescription>
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
                    <div>
                      <h3 className="text-xl font-semibold">{event.name}</h3>
                      <p className="text-muted-foreground">{selectedTable.name}</p>
                    </div>
                    
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
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span>{selectedTable.capacity || selectedTable.seats} pessoas</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                    <span>R$ {(customerData.totalAmount || (selectedTable.price * selectedTable.seats * 1.1)).toFixed(2)}</span>
                      </div>
                    </div>

                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Confirmado
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nome</p>
                    <p className="font-medium">{reservationData.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{reservationData.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                    <p className="font-medium">{reservationData.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Código de Confirmação</p>
                    <p className="font-medium">{confirmationCode}</p>
                  </div>
                </div>
                
                {reservationData.observations && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Observações</p>
                    <p className="font-medium">{reservationData.observations}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({selectedTable.seats || selectedTable.capacity} pessoas):</span>
                    <span>R$ {(selectedTable.price * selectedTable.seats).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de serviço (10%):</span>
                    <span>R$ {(selectedTable.price * selectedTable.seats * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Pago:</span>
                    <span>R$ {(selectedTable.price * selectedTable.seats * 1.1).toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pago via Cartão de Crédito em {new Date().toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Comprovante
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleSendEmail}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar por Email
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.print()}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/minhas-reservas')}
                  >
                    Ver Minhas Reservas
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/')}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Importante!</h4>
                  <p className="text-sm text-blue-700">
                    Guarde seu código de confirmação: <strong>{confirmationCode}</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Você precisará dele para acessar o evento.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Confirmação</h4>
                  <p className="text-sm text-blue-700">
                    Um email de confirmação foi enviado para {customerData.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;