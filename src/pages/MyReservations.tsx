import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, MapPin, Users, Clock, Mail, Phone, 
  User, CreditCard, CheckCircle, AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ConfirmDialog from "@/components/ConfirmDialog";

const MyReservations = () => {
  const { toast } = useToast();
  
  // Mock data - será substituído por dados reais do usuário logado
  const [reservations, setReservations] = useState([
    {
      id: "1",
      eventName: "Casamento dos Sonhos",
      eventDate: "15 de Dezembro, 2024",
      eventTime: "18:00",
      eventLocation: "Salão Principal",
      tableName: "Mesa VIP - Frente do Palco",
      seats: 8,
      totalValue: 1200.00,
      status: "Confirmada",
      paymentStatus: "Pago",
      reservationDate: "2024-01-15",
      customerName: "João Silva",
      customerEmail: "joao@email.com",
      customerPhone: "(11) 99999-9999",
      observations: "Pedido especial para decoração azul"
    },
    {
      id: "2", 
      eventName: "Festa Corporativa Tech Summit",
      eventDate: "19 de Março, 2024",
      eventTime: "19:00",
      eventLocation: "Auditório Premium",
      tableName: "Mesa Standard - Salão Principal",
      seats: 6,
      totalValue: 480.00,
      status: "Pendente",
      paymentStatus: "Aguardando",
      reservationDate: "2024-01-20",
      customerName: "Maria Santos",
      customerEmail: "maria@empresa.com",
      customerPhone: "(11) 88888-8888",
      observations: ""
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Confirmada</Badge>;
      case 'Pendente':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'Cancelada':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'Pago':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Pago</Badge>;
      case 'Aguardando':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Aguardando</Badge>;
      case 'Cancelado':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{paymentStatus}</Badge>;
    }
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === reservationId 
          ? { ...reservation, status: 'Cancelada', paymentStatus: 'Cancelado' }
          : reservation
      )
    );
    
    toast({
      title: "Reserva cancelada",
      description: "Sua reserva foi cancelada com sucesso. O reembolso será processado em até 5 dias úteis.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Minhas Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie suas reservas de eventos
          </p>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Você ainda não fez nenhuma reserva de evento.
              </p>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Explorar Eventos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {reservation.eventName}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {reservation.eventDate} às {reservation.eventTime}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {reservation.eventLocation}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(reservation.status)}
                      <div className="mt-1">
                        {getPaymentBadge(reservation.paymentStatus)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informações da Reserva */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Detalhes da Mesa
                      </h4>
                      <div className="pl-6 space-y-2">
                        <p><strong>Mesa:</strong> {reservation.tableName}</p>
                        <p><strong>Lugares:</strong> {reservation.seats} pessoas</p>
                        <p><strong>Valor Total:</strong> R$ {reservation.totalValue.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Informações do Cliente */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Dados da Reserva
                      </h4>
                      <div className="pl-6 space-y-2">
                        <p className="flex items-center">
                          <User className="h-3 w-3 mr-2" />
                          {reservation.customerName}
                        </p>
                        <p className="flex items-center">
                          <Mail className="h-3 w-3 mr-2" />
                          {reservation.customerEmail}
                        </p>
                        <p className="flex items-center">
                          <Phone className="h-3 w-3 mr-2" />
                          {reservation.customerPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {reservation.observations && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Observações</h4>
                        <p className="text-muted-foreground">{reservation.observations}</p>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Reserva feita em {new Date(reservation.reservationDate).toLocaleDateString('pt-BR')}
                    </div>
                    
                    <div className="flex space-x-2">
                      {reservation.paymentStatus === 'Aguardando' && (
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pagar Agora
                        </Button>
                      )}
                      
                      {(reservation.status === 'Confirmada' || reservation.status === 'Pendente') && (
                        <ConfirmDialog
                          title="Cancelar Reserva"
                          description={`Tem certeza que deseja cancelar sua reserva para "${reservation.eventName}"? Se o pagamento já foi realizado, o reembolso será processado conforme nossa política de cancelamento.`}
                          onConfirm={() => handleCancelReservation(reservation.id)}
                        >
                          <Button variant="destructive" size="sm">
                            Cancelar Reserva
                          </Button>
                        </ConfirmDialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;