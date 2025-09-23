import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Package, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTenant } from '@/contexts/TenantContext';

const ItemFormGeneral = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  
  const isEditing = Boolean(itemId);
  
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

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    location: '',
    type: '',
    price: '',
    eventId: '',
    isActive: true,
    hasTimeSlots: false,
    allowMultipleSelection: false,
    maxSelectionPerReservation: '1',
    minimumAdvanceBooking: '0',
    maximumAdvanceBooking: '720',
    cancellationDeadline: '24'
  });

  const [isLoading, setIsLoading] = useState(false);

  // Mock events
  const events = [
    { id: 1, name: "Casamento dos Sonhos" },
    { id: 2, name: "Evento Corporativo Tech" },
    { id: 3, name: "Festa de Aniversário" },
    { id: 4, name: "Workshop de Culinária" }
  ];

  const getItemTypes = (itemType: string) => {
    switch (itemType) {
      case 'mesa':
        return ["Mesa Premium", "Mesa Standard", "Mesa VIP", "Mesa Família"];
      case 'ingresso':
        return ["VIP", "Premium", "Standard", "Estudante"];
      case 'area':
        return ["Lounge Premium", "Área Família", "Camarote", "Área Geral"];
      case 'servico':
        return ["Premium", "Standard", "Básico", "Personalizado"];
      case 'produto':
        return ["Premium", "Standard", "Econômico"];
      default:
        return ["Premium", "Standard", "Básico"];
    }
  };

  const itemTypes = getItemTypes(itemConfig.type);
  const locations = ["Área Central", "Área VIP", "Área Jardim", "Área Lateral", "Área Geral"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro na validação",
        description: "Nome do item é obrigatório.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.eventId) {
      toast({
        title: "Erro na validação",
        description: "Selecione um evento para o item.",
        variant: "destructive"
      });
      return false;
    }

    if (itemConfig.requiresCapacity && (!formData.capacity || parseInt(formData.capacity) <= 0)) {
      toast({
        title: "Erro na validação",
        description: `Capacidade deve ser maior que zero.`,
        variant: "destructive"
      });
      return false;
    }

    if (!formData.price || parseFloat(formData.price) < 0) {
      toast({
        title: "Erro na validação",
        description: "Preço deve ser um valor válido.",
        variant: "destructive"
      });
      return false;
    }

    if (itemConfig.requiresLocation && !formData.location) {
      toast({
        title: "Erro na validação",
        description: "Localização é obrigatória.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.type) {
      toast({
        title: "Erro na validação",
        description: "Tipo do item é obrigatório.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const itemData = {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        price: parseFloat(formData.price),
        maxSelectionPerReservation: parseInt(formData.maxSelectionPerReservation),
        minimumAdvanceBooking: parseInt(formData.minimumAdvanceBooking),
        maximumAdvanceBooking: parseInt(formData.maximumAdvanceBooking),
        cancellationDeadline: parseInt(formData.cancellationDeadline)
      };

      console.log('Item data:', itemData);

      toast({
        title: isEditing ? "Item atualizado!" : "Item criado!",
        description: `${formData.name} foi ${isEditing ? 'atualizado' : 'criado'} com sucesso.`,
      });

      navigate('/admin/items');
    } catch (error) {
      toast({
        title: "Erro ao salvar item",
        description: "Ocorreu um erro ao salvar o item. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/items">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para {itemConfig.plural}
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? `Editar ${itemConfig.singular}` : `Criar Nova ${itemConfig.singular}`}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure as informações e preços do item
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Configure as informações principais do item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Item *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={`Ex: ${itemConfig.singular} Premium`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventId">Evento *</Label>
                  <Select value={formData.eventId} onValueChange={(value) => handleInputChange('eventId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id.toString()}>{event.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {itemConfig.requiresCapacity && (
                  <div className="space-y-2">
                    <Label htmlFor="capacity">
                      Capacidade ({itemConfig.capacityLabel}) *
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="8"
                      required={itemConfig.requiresCapacity}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva as características e benefícios do item..."
                  rows={3}
                />
              </div>

              {itemConfig.requiresLocation && (
                <div className="space-y-2">
                  <Label htmlFor="location">Localização *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a localização" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {location}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações de Preço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Configurações de Preço
              </CardTitle>
              <CardDescription>
                Defina o valor e condições de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Preço {itemConfig.priceLabel} (R$) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="200.00"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Este será o valor cobrado {itemConfig.priceLabel.toLowerCase()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Reserva */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Reserva</CardTitle>
              <CardDescription>
                Configure as regras de reserva para este item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Item Ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que o item apareça para reserva
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir Múltipla Seleção</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite selecionar mais de um deste item na mesma reserva
                  </p>
                </div>
                <Switch
                  checked={formData.allowMultipleSelection}
                  onCheckedChange={(checked) => handleInputChange('allowMultipleSelection', checked)}
                />
              </div>

              {formData.allowMultipleSelection && (
                <div className="space-y-2">
                  <Label htmlFor="maxSelection">Máximo por Reserva</Label>
                  <Input
                    id="maxSelection"
                    type="number"
                    min="1"
                    value={formData.maxSelectionPerReservation}
                    onChange={(e) => handleInputChange('maxSelectionPerReservation', e.target.value)}
                    placeholder="1"
                  />
                  <p className="text-sm text-muted-foreground">
                    Quantidade máxima deste item que pode ser selecionada em uma reserva
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAdvance">Antecedência Mínima (horas)</Label>
                  <Input
                    id="minAdvance"
                    type="number"
                    min="0"
                    value={formData.minimumAdvanceBooking}
                    onChange={(e) => handleInputChange('minimumAdvanceBooking', e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAdvance">Antecedência Máxima (horas)</Label>
                  <Input
                    id="maxAdvance"
                    type="number"
                    min="1"
                    value={formData.maximumAdvanceBooking}
                    onChange={(e) => handleInputChange('maximumAdvanceBooking', e.target.value)}
                    placeholder="720"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancellation">Prazo Cancelamento (horas)</Label>
                  <Input
                    id="cancellation"
                    type="number"
                    min="0"
                    value={formData.cancellationDeadline}
                    onChange={(e) => handleInputChange('cancellationDeadline', e.target.value)}
                    placeholder="24"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/items')}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar Item' : 'Criar Item')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormGeneral;