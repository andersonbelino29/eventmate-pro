import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTable, setSelectedTable] = useState<any>(null);

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
                        item.status === 'Reservada' ? 'opacity-50' : 
                        selectedTable?.id === item.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                      }`}
                      onClick={() => item.status === 'Disponível' && setSelectedTable(item)}
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
                
                {selectedTable && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-semibold mb-2">Item Selecionado:</h3>
                    <p>{selectedTable.name} - {selectedTable.seats} pessoas</p>
                    <p className="font-bold">Total: R$ {(selectedTable.price * selectedTable.seats).toFixed(2)}</p>
                    
                    <Button 
                      className="w-full mt-4"
                      onClick={() => navigate(`/reserva-detalhes/${eventId}/${selectedTable.id}`)}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Continuar para Reserva
                    </Button>
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