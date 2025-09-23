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
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, DollarSign, CheckCircle, CreditCard, User, Mail, Phone, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventReservation = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
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
        description: `Sua reserva para ${selectedItem.name} foi confirmada com sucesso.`,
      });
      
      // Redirect to success page
      navigate('/reservation-success', { 
        state: { 
          reservationData: {
            customerData,
            selectedItem,
            selectedQuantity,
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

  // Get item configuration from tenant
  const itemConfig = currentTenant?.itemConfig || {
    type: 'mesa',
    singular: 'Mesa',
    plural: 'Mesas',
    requiresLocation: true,
    requiresCapacity: true,
    capacityLabel: 'pessoas',
    priceLabel: 'por pessoa'
  };

  // Mock event data based on configuration
  const event = (() => {
    switch (itemConfig.type) {
      case 'mesa':
        return {
          id: eventId,
          name: "Casamento Elegante - Salon Premium",
          description: "Um evento de casamento dos sonhos com decoração luxuosa, cardápio gourmet e ambientação única. Celebre o amor eterno com estilo em nosso salão premium.",
          date: "2024-12-15",
          time: "18:00",
          endTime: "23:00",
          location: "Espaço Villa Eventos",
          address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
          capacity: 200,
          pricingType: 'per_item',
          image: "/src/assets/event-wedding.jpg",
          includes: [
            "Decoração completa incluída",
            "Cardápio gourmet com 4 pratos",
            "Serviço de mesa completo",
            "Som e iluminação profissional"
          ]
        };
      case 'ingresso':
        return {
          id: eventId,
          name: "Festival de Música - Arena Premium",
          description: "O maior festival de música do ano com artistas internacionais e nacionais. Uma experiência única que você não pode perder!",
          date: "2024-12-20",
          time: "20:00",
          endTime: "02:00",
          location: "Arena Premium",
          address: "Av. Paulista, 1000 - São Paulo - SP",
          capacity: 5000,
          pricingType: 'per_item',
          image: "/src/assets/event-wedding.jpg",
          includes: [
            "Acesso a todos os shows",
            "Área de alimentação",
            "Estacionamento incluso",
            "Kit de brindes exclusivo"
          ]
        };
      case 'area':
        return {
          id: eventId,
          name: "Conferência Tech 2024 - Centro de Convenções",
          description: "A maior conferência de tecnologia do Brasil com palestrantes renomados e networking de alto nível.",
          date: "2024-12-10",
          time: "09:00",
          endTime: "18:00",
          location: "Centro de Convenções Premium",
          address: "Rua da Tecnologia, 500 - São Paulo - SP",
          capacity: 1000,
          pricingType: 'per_item',
          image: "/src/assets/event-wedding.jpg",
          includes: [
            "Acesso a todas as palestras",
            "Material de apoio",
            "Coffee break incluso",
            "Certificado de participação"
          ]
        };
      default:
        return {
          id: eventId,
          name: "Evento Premium",
          description: "Um evento especial com toda a qualidade que você merece.",
          date: "2024-12-15",
          time: "18:00",
          endTime: "23:00",
          location: "Local Premium",
          address: "Endereço do evento",
          capacity: 100,
          pricingType: 'per_item',
          image: "/src/assets/event-wedding.jpg",
          includes: ["Serviço completo incluso"]
        };
    }
  })();

  // Mock items based on configuration and event setup
  const items = (() => {
    switch (itemConfig.type) {
      case 'mesa':
        return [
          { 
            id: 1, 
            name: "Mesa VIP - Frente do Palco", 
            capacity: 8, 
            location: "Área VIP", 
            price: 200, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "VIP",
            quantity: 1,
            reserved: 0,
            description: "Localização privilegiada com vista completa do palco"
          },
          { 
            id: 2, 
            name: "Mesa Premium - Vista Jardim", 
            capacity: 6, 
            location: "Área Premium", 
            price: 180, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Premium",
            quantity: 1,
            reserved: 0,
            description: "Vista exclusiva para o jardim com decoração especial"
          },
          { 
            id: 3, 
            name: "Mesa Standard - Salão Principal", 
            capacity: 10, 
            location: "Área Central", 
            price: 150, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Standard",
            quantity: 1,
            reserved: 0,
            description: "Localização central com excelente vista geral"
          },
          { 
            id: 4, 
            name: "Mesa Família - Área Infantil", 
            capacity: 4, 
            location: "Área Família", 
            price: 170, 
            pricePerPerson: false,
            status: "Reservada", 
            type: "Família",
            quantity: 1,
            reserved: 1,
            description: "Próxima à área infantil, ideal para famílias"
          }
        ];
      case 'ingresso':
        return [
          { 
            id: 1, 
            name: "Ingresso VIP", 
            capacity: 1, 
            location: "Área VIP", 
            price: 250, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "VIP",
            quantity: 50,
            reserved: 12,
            description: "Acesso VIP com camarote exclusivo e open bar premium"
          },
          { 
            id: 2, 
            name: "Ingresso Premium", 
            capacity: 1, 
            location: "Área Premium", 
            price: 180, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Premium",
            quantity: 200,
            reserved: 45,
            description: "Área premium com vista privilegiada e bar exclusivo"
          },
          { 
            id: 3, 
            name: "Ingresso Standard", 
            capacity: 1, 
            location: "Pista", 
            price: 120, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Standard",
            quantity: 500,
            reserved: 89,
            description: "Acesso à pista principal com toda a energia do evento"
          },
          { 
            id: 4, 
            name: "Ingresso Estudante", 
            capacity: 1, 
            location: "Pista", 
            price: 80, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Estudante",
            quantity: 100,
            reserved: 23,
            description: "Desconto especial para estudantes (necessário comprovante)"
          }
        ];
      case 'area':
        return [
          { 
            id: 1, 
            name: "Lounge VIP Premium", 
            capacity: 20, 
            location: "Andar Superior", 
            price: 200, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Lounge Premium",
            quantity: 3,
            reserved: 1,
            description: "Área exclusiva com serviço personalizado e networking premium"
          },
          { 
            id: 2, 
            name: "Área Família", 
            capacity: 15, 
            location: "Jardim", 
            price: 120, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Área Família",
            quantity: 5,
            reserved: 2,
            description: "Espaço familiar com atividades para crianças"
          },
          { 
            id: 3, 
            name: "Camarote Executivo", 
            capacity: 8, 
            location: "Área Central", 
            price: 350, 
            pricePerPerson: false,
            status: "Reservada", 
            type: "Camarote",
            quantity: 2,
            reserved: 2,
            description: "Camarote com vista privilegiada e serviço executivo"
          }
        ];
      default:
        return [
          { 
            id: 1, 
            name: `${itemConfig.singular} Premium`, 
            capacity: 8, 
            location: "Local Principal", 
            price: 200, 
            pricePerPerson: false,
            status: "Disponível", 
            type: "Premium",
            quantity: 5,
            reserved: 1,
            description: "Opção premium com todos os benefícios inclusos"
          }
        ];
    }
  })();

  const calculatePrice = (item: any, quantity: number = selectedQuantity) => {
    // Always calculate based on item price and quantity for the new system
    return item.price * quantity;
  };

  const formatPrice = (item: any) => {
    return `R$ ${item.price.toFixed(2)}`;
  };

  const getAvailabilityText = (item: any) => {
    const available = item.quantity - item.reserved;
    if (available === 0) {
      return "Esgotado";
    } else if (itemConfig.type === 'mesa') {
      return item.status === 'Reservada' ? "Reservada" : "Disponível";
    } else if (available === 1) {
      return `${available} disponível`;
    } else {
      return `${available} disponíveis`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Event Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{event.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event.date).toLocaleDateString('pt-BR')} • {event.time} - {event.endTime}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {event.capacity} vagas
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{event.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-sm text-muted-foreground">{event.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.time} - {event.endTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Capacidade total</div>
                      <div className="text-sm text-muted-foreground">{event.capacity} pessoas</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>O que está incluído</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.includes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Items List for Mobile */}
            <div className="lg:hidden">
              <Card>
                <CardHeader>
                  <CardTitle>Selecione {itemConfig.type === 'ingresso' ? 'seu' : 'sua'} {itemConfig.singular}</CardTitle>
                  <CardDescription>
                    {itemConfig.type === 'ingresso' 
                      ? `Opções de ${itemConfig.plural} com preços diferenciados`
                      : itemConfig.type === 'mesa'
                      ? `Opções de ${itemConfig.plural} com preços conforme capacidade`
                      : `Opções de ${itemConfig.plural} com preços diferenciados`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <Card 
                      key={item.id}
                      className={`cursor-pointer transition-all border-2 ${
                        item.status === 'Reservada' || (item.quantity - item.reserved) === 0
                          ? 'opacity-50 border-muted cursor-not-allowed' 
                          : 'hover:border-primary hover:shadow-md'
                      }`}
                      onClick={() => {
                        if (item.status === 'Disponível' && (item.quantity - item.reserved) > 0) {
                          setSelectedItem(item);
                          setSelectedQuantity(1);
                          setIsReservationModalOpen(true);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {item.location}
                              </span>
                              {itemConfig.requiresCapacity && (
                                <span className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {item.capacity} {itemConfig.capacityLabel}
                                </span>
                              )}
                              <Badge variant="outline">{item.type}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {formatPrice(item)}
                            </div>
                            {item.pricePerPerson && (
                              <div className="text-sm text-muted-foreground">
                                Total: R$ {calculatePrice(item).toFixed(2)}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={item.status === 'Disponível' && (item.quantity - item.reserved) > 0 ? 'default' : 'secondary'}
                            >
                              {item.status === 'Disponível' && (item.quantity - item.reserved) > 0 
                                ? getAvailabilityText(item)
                                : item.status
                              }
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Selecione {itemConfig.type === 'ingresso' ? 'seu' : 'sua'} {itemConfig.singular}
                    <DollarSign className="h-5 w-5 text-primary" />
                  </CardTitle>
                  <CardDescription>
                    {itemConfig.type === 'ingresso' 
                      ? `Escolha seu ${itemConfig.singular.toLowerCase()} com preços diferenciados`
                      : itemConfig.type === 'mesa'
                      ? `Escolha sua ${itemConfig.singular.toLowerCase()} conforme capacidade`
                      : `Escolha a opção com preços diferenciados`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <Card 
                      key={item.id}
                      className={`cursor-pointer transition-all border-2 ${
                        item.status === 'Reservada' || (item.quantity - item.reserved) === 0
                          ? 'opacity-50 border-muted cursor-not-allowed' 
                          : 'hover:border-primary hover:shadow-md'
                      }`}
                      onClick={() => {
                        if (item.status === 'Disponível' && (item.quantity - item.reserved) > 0) {
                          setSelectedItem(item);
                          setSelectedQuantity(1);
                          setIsReservationModalOpen(true);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {item.location}
                            </div>
                            {itemConfig.requiresCapacity && (
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {item.capacity} {itemConfig.capacityLabel}
                              </div>
                            )}
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-primary">
                                {formatPrice(item)}
                              </div>
                              {item.pricePerPerson && (
                                <div className="text-xs text-muted-foreground">
                                  Total: R$ {calculatePrice(item).toFixed(2)}
                                </div>
                              )}
                            </div>
                            <Badge 
                              variant={item.status === 'Disponível' && (item.quantity - item.reserved) > 0 ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {item.status === 'Disponível' && (item.quantity - item.reserved) > 0 
                                ? getAvailabilityText(item)
                                : item.status
                              }
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                      Pagamento seguro via PagarMe
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                      Cancelamento gratuito até 24h antes
                    </div>
                    {itemConfig.type === 'ingresso' && (
                      <div className="flex items-center">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                        Ingresso digital disponível imediatamente
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Reservation Modal */}
        <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                
                {selectedItem && (
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div>
                      <h4 className="font-medium">{selectedItem.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">{selectedItem.type}</Badge>
                        <span className="text-xs text-muted-foreground">{selectedItem.location}</span>
                      </div>
                    </div>
                    
                    <Separator />

                    {/* Quantity Selection for non-mesa items */}
                    {selectedItem && itemConfig.type !== 'mesa' && (
                      <div className="space-y-2">
                        <Label htmlFor="quantity">
                          Quantidade de {itemConfig.plural}
                        </Label>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                            disabled={selectedQuantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            max={selectedItem.quantity - selectedItem.reserved}
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(Math.min(selectedItem.quantity - selectedItem.reserved, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="w-20 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedQuantity(Math.min(selectedItem.quantity - selectedItem.reserved, selectedQuantity + 1))}
                            disabled={selectedQuantity >= (selectedItem.quantity - selectedItem.reserved)}
                          >
                            +
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            máx: {selectedItem.quantity - selectedItem.reserved}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2 text-sm">
                      {itemConfig.requiresCapacity && (
                        <div className="flex justify-between">
                          <span>Capacidade:</span>
                          <span>{selectedItem.capacity} {itemConfig.capacityLabel}</span>
                        </div>
                      )}
                      
                      {itemConfig.type !== 'mesa' && (
                        <div className="flex justify-between">
                          <span>Quantidade:</span>
                          <span>{selectedQuantity} {selectedQuantity === 1 ? itemConfig.singular.toLowerCase() : itemConfig.plural.toLowerCase()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Valor {selectedItem.pricePerPerson ? itemConfig.priceLabel : 'unitário'}:</span>
                        <span>R$ {selectedItem.price.toFixed(2)}</span>
                      </div>
                      {selectedItem.pricePerPerson && (
                        <>
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>R$ {calculatePrice(selectedItem).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxa de serviço (10%):</span>
                            <span>R$ {(calculatePrice(selectedItem) * 0.1).toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-base">
                            <span>Total:</span>
                            <span className="text-primary">R$ {(calculatePrice(selectedItem) * 1.1).toFixed(2)}</span>
                          </div>
                        </>
                      )}
                      {!selectedItem.pricePerPerson && (
                        <>
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>R$ {calculatePrice(selectedItem).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxa de serviço (10%):</span>
                            <span>R$ {(calculatePrice(selectedItem) * 0.1).toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-base">
                            <span>Total:</span>
                            <span className="text-primary">R$ {(calculatePrice(selectedItem) * 1.1).toFixed(2)}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div className="font-medium">{event.name}</div>
                      <div>{new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}</div>
                      <div>{event.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => setIsReservationModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                className="flex-1"
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
                    selectedItem,
                    selectedQuantity,
                    event
                  }));
                  
                  // Check if payment is required
                  const paymentConfig = currentTenant?.paymentConfig;
                  
                  if (paymentConfig?.enabled && paymentConfig?.requirePayment) {
                    // Redirect to payment
                    navigate(`/payment-checkout/${eventId}/${selectedItem.id}`);
                  } else if (paymentConfig?.enabled && !paymentConfig?.requirePayment) {
                    // Show payment option modal
                    navigate(`/reserva-opcao-pagamento/${eventId}/${selectedItem.id}`);
                  } else {
                    // No payment required, save reservation directly
                    handleReservationWithoutPayment();
                  }
                }}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {currentTenant?.paymentConfig?.enabled && currentTenant?.paymentConfig?.requirePayment 
                  ? 'Continuar para Pagamento'
                  : itemConfig.type === 'ingresso' 
                    ? 'Continuar para Compra'
                    : 'Continuar para Reserva'
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