import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Plus, Package, Users, MapPin, 
  DollarSign, Search, CheckCircle2, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EventItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTenant } = useTenant();

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

  // Mock event data
  const eventData = {
    id: '1',
    name: 'Casamento dos Sonhos',
    date: '2024-03-15',
    status: 'Confirmado'
  };

  // Mock available items from organization
  const [availableItems] = useState(() => {
    switch (itemConfig.type) {
      case 'mesa':
        return [
          { id: '1', name: 'Mesa VIP - Frente do Palco', capacity: 8, location: 'Área VIP', type: 'Mesa Premium', price: 250, quantity: 1, reserved: 0, active: true },
          { id: '2', name: 'Mesa Premium - Vista Jardim', capacity: 6, location: 'Área Premium', type: 'Mesa Premium', price: 200, quantity: 1, reserved: 0, active: true },
          { id: '3', name: 'Mesa Standard - Área Central', capacity: 10, location: 'Área Central', type: 'Mesa Standard', price: 150, quantity: 1, reserved: 0, active: true },
          { id: '4', name: 'Mesa Família - Área Infantil', capacity: 4, location: 'Área Família', type: 'Mesa Família', price: 180, quantity: 1, reserved: 0, active: true },
          { id: '5', name: 'Mesa Executiva - Sala Privada', capacity: 12, location: 'Sala Privada', type: 'Mesa Premium', price: 300, quantity: 1, reserved: 1, active: false }
        ];
      case 'ingresso':
        return [
          { id: '1', name: 'Ingresso VIP', capacity: 1, location: 'Área VIP', type: 'VIP', price: 250, quantity: 50, reserved: 12, active: true },
          { id: '2', name: 'Ingresso Premium', capacity: 1, location: 'Área Premium', type: 'Premium', price: 180, quantity: 200, reserved: 45, active: true },
          { id: '3', name: 'Ingresso Standard', capacity: 1, location: 'Pista', type: 'Standard', price: 120, quantity: 500, reserved: 89, active: true },
          { id: '4', name: 'Ingresso Estudante', capacity: 1, location: 'Pista', type: 'Estudante', price: 80, quantity: 100, reserved: 23, active: false }
        ];
      case 'area':
        return [
          { id: '1', name: 'Lounge VIP Premium', capacity: 20, location: 'Andar Superior', type: 'Lounge Premium', price: 200, quantity: 3, reserved: 1, active: true },
          { id: '2', name: 'Área Família', capacity: 15, location: 'Jardim', type: 'Área Família', price: 120, quantity: 5, reserved: 2, active: true },
          { id: '3', name: 'Camarote Executivo', capacity: 8, location: 'Área Central', type: 'Camarote', price: 350, quantity: 2, reserved: 2, active: true }
        ];
      default:
        return [
          { id: '1', name: `${itemConfig.singular} Premium`, capacity: 8, location: 'Local Principal', type: 'Premium', price: 200, quantity: 5, reserved: 1, active: true },
          { id: '2', name: `${itemConfig.singular} Standard`, capacity: 6, location: 'Local Secundário', type: 'Standard', price: 150, quantity: 10, reserved: 3, active: true }
        ];
    }
  });

  const [selectedItems, setSelectedItems] = useState<string[]>(['1', '2']); // Mock selected items
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Itens atualizados!",
        description: `${selectedItems.length} ${itemConfig.plural.toLowerCase()} selecionados para o evento.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar os itens. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'VIP': 'bg-purple-100 text-purple-800',
      'Premium': 'bg-blue-100 text-blue-800',
      'Standard': 'bg-green-100 text-green-800',
      'Estudante': 'bg-yellow-100 text-yellow-800',
      'Família': 'bg-pink-100 text-pink-800',
      'Executiva': 'bg-indigo-100 text-indigo-800',
      'Lounge Premium': 'bg-purple-100 text-purple-800',
      'Camarote': 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/events">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Eventos
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Gerenciar {itemConfig.plural}</h1>
                  <p className="text-sm text-muted-foreground">{eventData.name}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/admin/items/new">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo {itemConfig.singular}
                </Button>
              </Link>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {isLoading ? 'Salvando...' : 'Salvar Seleção'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Event Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Informações do Evento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{eventData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(eventData.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge variant="default">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {eventData.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {itemConfig.plural} Disponíveis
                  <Badge variant="secondary" className="ml-2">
                    {filteredItems.length} encontrados
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Selecione os {itemConfig.plural.toLowerCase()} que estarão disponíveis neste evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Buscar ${itemConfig.plural.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedItems.includes(item.id) 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => handleItemToggle(item.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemToggle(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{item.name}</h4>
                              <Badge 
                                className={getTypeColor(item.type)}
                                variant="outline"
                              >
                                {item.type}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1 text-sm text-muted-foreground">
                              {itemConfig.requiresCapacity && (
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{item.capacity} {itemConfig.capacityLabel}</span>
                                </div>
                              )}
                              
                              {itemConfig.requiresLocation && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{item.location}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>R$ {item.price.toFixed(2)} {itemConfig.priceLabel}</span>
                              </div>

                              <div className="flex items-center space-x-1">
                                <Package className="h-3 w-3" />
                                <span>
                                  {itemConfig.type === 'mesa' 
                                    ? `${item.quantity} mesa${item.quantity > 1 ? 's' : ''} • ${item.reserved} reservada${item.reserved !== 1 ? 's' : ''}`
                                    : `${item.quantity - item.reserved}/${item.quantity} disponíveis`
                                  }
                                </span>
                              </div>
                            </div>

                            {!item.active && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                Inativo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum {itemConfig.singular.toLowerCase()} encontrado</p>
                    <p className="text-sm">Tente ajustar sua busca ou criar um novo {itemConfig.singular.toLowerCase()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Selected Items Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Seleção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {selectedItems.length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {itemConfig.plural} selecionados
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Itens Selecionados:</h4>
                    {selectedItems.length > 0 ? (
                      <div className="space-y-1">
                        {selectedItems.map(itemId => {
                          const item = availableItems.find(i => i.id === itemId);
                          return item ? (
                            <div key={itemId} className="text-xs p-2 bg-muted rounded">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-muted-foreground">
                                R$ {item.price.toFixed(2)}
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Nenhum {itemConfig.singular.toLowerCase()} selecionado
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Estatísticas:</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Total de {itemConfig.plural.toLowerCase()}:</span>
                        <span>{selectedItems.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {itemConfig.type === 'mesa' ? 'Mesas disponíveis:' : 'Unidades disponíveis:'}
                        </span>
                        <span>
                          {selectedItems.reduce((total, itemId) => {
                            const item = availableItems.find(i => i.id === itemId);
                            return total + (item ? (item.quantity - item.reserved) : 0);
                          }, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacidade total:</span>
                        <span>
                          {selectedItems.reduce((total, itemId) => {
                            const item = availableItems.find(i => i.id === itemId);
                            return total + (item ? (item.capacity * (item.quantity - item.reserved)) : 0);
                          }, 0)} {itemConfig.capacityLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/admin/items/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Novo {itemConfig.singular}
                  </Button>
                </Link>
                <Button 
                  onClick={handleSave}
                  className="w-full justify-start"
                  disabled={isLoading}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {isLoading ? 'Salvando...' : 'Salvar Seleção'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItems;