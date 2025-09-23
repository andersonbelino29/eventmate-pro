import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, DollarSign, CheckCircle, CreditCard, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventReservation = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    observations: ''
  });

  const handleReservationWithoutPayment = async () => {
    try {
      // Simulate saving reservation to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reserva confirmada!",
        description: `Sua reserva para ${selectedTable.name} foi confirmada com sucesso.`,
      });
      
      // Redirect to success page
      navigate('/reservation-success', { 
        state: { 
          reservationData: {
            customerData,
            selectedTable,
            event
          },
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

  // Mock event data
  const event = {
    id: eventId,
    name: "Casamento Elegante - Salon Premium",
    description: "Um evento de casamento dos sonhos com decoração luxuosa, cardápio gourmet e ambientação única.",
    date: "2024-12-15",
    time: "18:00",
    location: "Espaço Villa Eventos - São Paulo",
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    price: 200,
    image: "/src/assets/event-wedding.jpg"
  };

  // Mock items
  const tables = [
    { id: 1, name: "Mesa VIP - Frente do Palco", seats: 8, location: "Área VIP", price: 200, status: "Disponível" },
    { id: 2, name: "Mesa Premium - Vista Jardim", seats: 6, location: "Área Premium", price: 180, status: "Reservada" },
    { id: 3, name: "Mesa Standard - Salão Principal", seats: 10, location: "Área Central", price: 150, status: "Disponível" },
    { id: 4, name: "Mesa Família - Área Infantil", seats: 4, location: "Área Família", price: 170, status: "Disponível" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Event Details */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
                <p className="text-muted-foreground mb-6">{event.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span>{new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>{event.location} - {event.address}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-3" />
                    <span>R$ {event.price} por pessoa</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Selecione sua Opção</h2>
                <div className="grid grid-cols-1 gap-4">
                  {tables.map((item) => (
                    <Card 
                      key={item.id}
                      className={`cursor-pointer transition-all ${
                        item.status === 'Reservada' ? 'opacity-50' : 'hover:shadow-lg'
                      }`}
                      onClick={() => {
                        if (item.status === 'Disponível') {
                          setSelectedTable(item);
                          setIsReservationModalOpen(true);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                            <div className="flex items-center mt-2">
                              <Users className="h-4 w-4 mr-1" />
                              <span className="text-sm">{item.seats} pessoas</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">R$ {item.price}/pessoa</div>
                            <Badge variant={item.status === 'Disponível' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Modal */}
        <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Finalizar Reserva</DialogTitle>
              <DialogDescription>
                Preencha seus dados para confirmar a reserva
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">Dados do Cliente</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    value={customerData.observations}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, observations: e.target.value }))}
                    placeholder="Comentários adicionais..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Reservation Summary */}
              <div className="space-y-4">
                <h3 className="font-semibold">Resumo da Reserva</h3>
                
                {selectedTable && (
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div>
                      <h4 className="font-medium">{selectedTable.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedTable.location}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Capacidade:</span>
                        <span>{selectedTable.seats} pessoas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valor por pessoa:</span>
                        <span>R$ {selectedTable.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>R$ {(selectedTable.price * selectedTable.seats).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de serviço (10%):</span>
                        <span>R$ {(selectedTable.price * selectedTable.seats * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>R$ {(selectedTable.price * selectedTable.seats * 1.1).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Evento: {event.name}<br />
                      Data: {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReservationModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  if (!customerData.name || !customerData.email || !customerData.phone) {
                    toast({
                      title: "Dados incompletos",
                      description: "Por favor, preencha todos os campos obrigatórios.",
                      variant: "destructive"
                    });
                    return;
                  }
                  
                  // Store data in sessionStorage for payment flow
                  sessionStorage.setItem('reservationData', JSON.stringify({
                    customerData,
                    selectedTable,
                    event
                  }));
                  
                  // Check if payment is required
                  const paymentConfig = currentTenant?.paymentConfig;
                  
                  if (paymentConfig?.enabled && paymentConfig?.requirePayment) {
                    // Redirect to payment
                    navigate(`/payment-checkout/${eventId}/${selectedTable.id}`);
                  } else if (paymentConfig?.enabled && !paymentConfig?.requirePayment) {
                    // Show payment option modal
                    navigate(`/reserva-opcao-pagamento/${eventId}/${selectedTable.id}`);
                  } else {
                    // No payment required, save reservation directly
                    handleReservationWithoutPayment();
                  }
                }}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {currentTenant?.paymentConfig?.enabled && currentTenant?.paymentConfig?.requirePayment 
                  ? 'Finalizar Pagamento'
                  : 'Confirmar Reserva'
                }
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventReservation;