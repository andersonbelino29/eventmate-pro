import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, Clock, Star, Share2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import eventWedding from "@/assets/event-wedding.jpg";

const EventDetails = () => {
  const { eventId } = useParams();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Mock data - será substituído por dados do Supabase
  const event = {
    id: "1",
    title: "Casamento Elegante - Salon Premium",
    description: "Um evento de casamento dos sonhos com decoração luxuosa, cardápio gourmet e ambientação única. Celebre o amor em grande estilo com nossa equipe especializada.",
    date: "15 de Dezembro, 2024",
    time: "18:00 - 23:00",
    location: "Espaço Villa Eventos - São Paulo",
    price: 150.00,
    image: eventWedding,
    category: "Casamento",
    capacity: 150,
    availableSpots: 45,
    rating: 4.9,
    reviews: 127,
    organizer: "Villa Eventos",
    features: [
      "Decoração completa incluída",
      "Cardápio gourmet com 4 pratos",
      "Open bar premium",
      "DJ profissional",
      "Fotógrafo oficial",
      "Estacionamento gratuito"
    ]
  };

  const tables = [
    { id: "1", name: "Mesa VIP - Frente do Palco", capacity: 8, price: 200, available: 2 },
    { id: "2", name: "Mesa Premium - Vista Jardim", capacity: 8, price: 180, available: 5 },
    { id: "3", name: "Mesa Standard - Salão Principal", capacity: 8, price: 150, available: 12 },
    { id: "4", name: "Mesa Família - Área Infantil", capacity: 10, price: 170, available: 3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2">
            {/* Imagem Principal */}
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                  {event.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Informações do Evento */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{event.rating}</span>
                    <span className="ml-1">({event.reviews} avaliações)</span>
                  </div>
                  <span>•</span>
                  <span>Por {event.organizer}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{event.date}</div>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{event.time}</div>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{event.location}</div>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{event.availableSpots} vagas</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Sobre o Evento</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">O que está incluído</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar de Agendamento */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-center">Selecione sua Mesa</CardTitle>
                <div className="text-center text-sm text-muted-foreground">
                  Preços diferenciados por mesa
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Opções de Mesa</h3>
                  <div className="space-y-2">
                    {tables.map((table) => (
                      <div
                        key={table.id}
                        onClick={() => setSelectedTable(table.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedTable === table.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{table.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {table.capacity} pessoas • R$ {table.price * table.capacity} total
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {table.available} disponíveis
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={`/evento/${eventId}/reservar`} className="w-full">
                  <Button 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    disabled={!selectedTable}
                  >
                    Continuar para Reserva
                  </Button>
                </Link>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Pagamento seguro via PagarMe</p>
                  <p>Cancelamento gratuito até 24h antes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;