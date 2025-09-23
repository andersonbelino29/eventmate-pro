import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, DollarSign, CheckCircle, CreditCard, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventReservation = () => {
  const { eventId } = useParams();
  const { toast } = useToast();
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    observations: ''
  });

  // Mock event data
  const event = {
    id: eventId,
    name: "Casamento dos Sonhos",
    description: "Um evento mágico para celebrar o amor eterno.",
    date: "2024-03-15",
    time: "18:00",
    location: "Salão Principal",
    address: "Rua das Flores, 123 - Centro",
    price: 150,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop"
  };

  // Mock tables
  const tables = [
    { id: 1, number: 1, seats: 8, location: "Área Central", price: 1200, status: "Disponível" },
    { id: 2, number: 2, seats: 6, location: "Área Central", price: 900, status: "Reservada" },
    { id: 3, number: 3, seats: 10, location: "Área VIP", price: 1500, status: "Disponível" },
    { id: 4, number: 4, seats: 4, location: "Área Jardim", price: 600, status: "Disponível" }
  ];

  const handleReservation = async () => {
    if (!selectedTable || !customerData.name || !customerData.email || !customerData.phone) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Reserva realizada!",
      description: `Mesa ${selectedTable.number} reservada com sucesso para ${customerData.name}.`,
    });

    setIsReservationModalOpen(false);
    setSelectedTable(null);
  };

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
                <h2 className="text-2xl font-bold mb-6">Selecione sua Mesa</h2>
                <div className="grid grid-cols-1 gap-4">
                  {tables.map((table) => (
                    <Card 
                      key={table.id}
                      className={`cursor-pointer transition-all ${
                        table.status === 'Reservada' ? 'opacity-50' : 
                        selectedTable?.id === table.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                      }`}
                      onClick={() => table.status === 'Disponível' && setSelectedTable(table)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Mesa {table.number}</h3>
                            <p className="text-sm text-muted-foreground">{table.location}</p>
                            <div className="flex items-center mt-2">
                              <Users className="h-4 w-4 mr-1" />
                              <span className="text-sm">{table.seats} lugares</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">R$ {table.price}</div>
                            <Badge variant={table.status === 'Disponível' ? 'default' : 'secondary'}>
                              {table.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {selectedTable && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-semibold mb-2">Mesa Selecionada:</h3>
                    <p>Mesa {selectedTable.number} - {selectedTable.seats} lugares</p>
                    <p className="font-bold">Total: R$ {selectedTable.price}</p>
                    
                    <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Fazer Reserva
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Finalizar Reserva</DialogTitle>
                          <DialogDescription>
                            Preencha seus dados para confirmar a reserva
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
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

                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold mb-2">Resumo da Reserva:</h3>
                            <p>Mesa {selectedTable.number} - {selectedTable.seats} lugares</p>
                            <p>Evento: {event.name}</p>
                            <p>Data: {new Date(event.date).toLocaleDateString('pt-BR')}</p>
                            <p className="font-bold text-lg mt-2">Total: R$ {selectedTable.price}</p>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsReservationModalOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleReservation}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirmar Reserva
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventReservation;