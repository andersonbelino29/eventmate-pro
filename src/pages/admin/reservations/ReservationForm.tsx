import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Users, ArrowLeft, Save, Calendar, DollarSign, 
  User, Mail, Phone, CreditCard, AlertCircle, CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  const isEditing = !!id;

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

  // Form states
  const [formData, setFormData] = useState({
    customerName: isEditing ? 'Maria Silva' : '',
    customerEmail: isEditing ? 'maria@email.com' : '',
    customerPhone: isEditing ? '(11) 99999-9999' : '',
    eventId: isEditing ? '1' : '',
    itemId: isEditing ? '5' : '',
    quantity: isEditing ? '8' : '',
    totalValue: isEditing ? '1200' : '',
    status: isEditing ? 'Confirmado' : 'Pendente',
    paymentStatus: isEditing ? 'Pago' : 'Pendente',
    paymentMethod: isEditing ? 'Cartão de Crédito' : '',
    observations: isEditing ? `${itemConfig.singular} próxima ao palco` : ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data
  const events = [
    { id: '1', name: 'Casamento dos Sonhos', date: '2024-03-15', price: 150 },
    { id: '2', name: 'Tech Summit 2024', date: '2024-03-20', price: 80 },
    { id: '3', name: 'Aniversário 50 Anos', date: '2024-03-25', price: 120 }
  ];

  // Dynamic items based on tenant config
  const items = (() => {
    switch (itemConfig.type) {
      case 'mesa':
        return [
          { id: '1', name: 'Mesa VIP', capacity: 8, price: 1200, status: 'Reservada' },
          { id: '2', name: 'Mesa Premium', capacity: 6, price: 900, status: 'Disponível' },
          { id: '3', name: 'Mesa Standard', capacity: 10, price: 1500, status: 'Disponível' },
          { id: '4', name: 'Mesa Família', capacity: 4, price: 600, status: 'Disponível' },
          { id: '5', name: 'Mesa Executiva', capacity: 8, price: 1200, status: 'Reservada' }
        ];
      case 'ingresso':
        return [
          { id: '1', name: 'Ingresso VIP', capacity: 1, price: 250, status: 'Disponível' },
          { id: '2', name: 'Ingresso Premium', capacity: 1, price: 180, status: 'Disponível' },
          { id: '3', name: 'Ingresso Standard', capacity: 1, price: 120, status: 'Disponível' },
          { id: '4', name: 'Ingresso Estudante', capacity: 1, price: 80, status: 'Disponível' }
        ];
      case 'area':
        return [
          { id: '1', name: 'Lounge VIP Premium', capacity: 20, price: 200, status: 'Disponível' },
          { id: '2', name: 'Área Família', capacity: 15, price: 120, status: 'Disponível' },
          { id: '3', name: 'Camarote Executivo', capacity: 8, price: 350, status: 'Disponível' }
        ];
      default:
        return [
          { id: '1', name: `${itemConfig.singular} Premium`, capacity: 8, price: 200, status: 'Disponível' },
          { id: '2', name: `${itemConfig.singular} Standard`, capacity: 6, price: 150, status: 'Disponível' }
        ];
    }
  })();

  const statuses = ['Pendente', 'Confirmado', 'Cancelado'];
  const paymentStatuses = ['Pendente', 'Pago', 'Estornado', 'Cancelado'];
  const paymentMethods = ['Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Boleto', 'Dinheiro'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Auto-calculate total value when event or item changes
    if (field === 'eventId' || field === 'itemId') {
      const selectedEvent = events.find(e => e.id === (field === 'eventId' ? value : formData.eventId));
      const selectedItem = items.find(t => t.id === (field === 'itemId' ? value : formData.itemId));
      
      if (selectedEvent && selectedItem) {
        let total = 0;
        if (itemConfig.type === 'ingresso') {
          // Para ingressos, o preço é individual
          total = selectedItem.price;
        } else {
          // Para mesas/áreas, calcula por capacidade
          total = selectedEvent.price * selectedItem.capacity;
        }
        setFormData(prev => ({ ...prev, totalValue: total.toString(), quantity: selectedItem.capacity.toString() }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) newErrors.customerName = 'Nome do cliente é obrigatório';
    if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email é obrigatório';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Telefone é obrigatório';
    if (!formData.eventId) newErrors.eventId = 'Selecione um evento';
    if (!formData.itemId) newErrors.itemId = `Selecione ${itemConfig.singular.toLowerCase()}`;
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Método de pagamento é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: isEditing ? "Reserva atualizada!" : "Reserva criada!",
        description: `Reserva para ${formData.customerName} foi ${isEditing ? 'atualizada' : 'criada'} com sucesso.`,
      });

      navigate('/admin/reservations');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a reserva. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedEvent = events.find(e => e.id === formData.eventId);
  const selectedItem = items.find(t => t.id === formData.itemId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Confirmado</Badge>;
      case 'Pendente':
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'Cancelado':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/reservations">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar às Reservas
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'Editar Reserva' : 'Nova Reserva Manual'}
                </h1>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              form="reservation-form"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar Reserva')}
            </Button>
          </div>
        </div>
      </header>

      <form id="reservation-form" onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cliente</CardTitle>
                  <CardDescription>
                    Informações de contato do cliente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Nome Completo *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        placeholder="Nome do cliente"
                        className={`pl-10 ${errors.customerName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-sm text-red-500">{errors.customerName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="customerEmail"
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                          placeholder="email@exemplo.com"
                          className={`pl-10 ${errors.customerEmail ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.customerEmail && (
                        <p className="text-sm text-red-500">{errors.customerEmail}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerPhone">Telefone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="customerPhone"
                          value={formData.customerPhone}
                          onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className={`pl-10 ${errors.customerPhone ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.customerPhone && (
                        <p className="text-sm text-red-500">{errors.customerPhone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event and Item Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Seleção de Evento e {itemConfig.singular}</CardTitle>
                  <CardDescription>
                    Escolha o evento e {itemConfig.singular.toLowerCase()} para a reserva
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventId">Evento *</Label>
                    <Select 
                      value={formData.eventId} 
                      onValueChange={(value) => handleInputChange('eventId', value)}
                    >
                      <SelectTrigger className={errors.eventId ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecione o evento" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.id} value={event.id}>
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{event.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString('pt-BR')} - R$ {event.price}/pessoa
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.eventId && (
                      <p className="text-sm text-red-500">{errors.eventId}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemId">{itemConfig.singular} *</Label>
                    <Select 
                      value={formData.itemId} 
                      onValueChange={(value) => handleInputChange('itemId', value)}
                      disabled={!formData.eventId}
                    >
                      <SelectTrigger className={errors.itemId ? 'border-red-500' : ''}>
                        <SelectValue placeholder={`Selecione ${itemConfig.singular.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map((item) => (
                          <SelectItem 
                            key={item.id} 
                            value={item.id}
                            disabled={item.status === 'Reservada' && item.id !== formData.itemId}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  ({item.capacity} {itemConfig.capacityLabel} - R$ {item.price})
                                </span>
                              </div>
                              <Badge 
                                variant={item.status === 'Disponível' ? 'default' : 'secondary'}
                                className="ml-2"
                              >
                                {item.status}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.itemId && (
                      <p className="text-sm text-red-500">{errors.itemId}</p>
                    )}
                  </div>

                  {selectedEvent && selectedItem && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Total calculado:</strong> {
                          itemConfig.type === 'ingresso' 
                            ? `1 ${itemConfig.singular.toLowerCase()} × R$ ${selectedItem.price} = R$ ${selectedItem.price.toLocaleString()}`
                            : `${selectedItem.capacity} ${itemConfig.capacityLabel} × R$ ${selectedEvent.price} = R$ ${(selectedEvent.price * selectedItem.capacity).toLocaleString()}`
                        }
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Pagamento</CardTitle>
                  <CardDescription>
                    Configure os detalhes do pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Método de Pagamento *</Label>
                      <Select 
                        value={formData.paymentMethod} 
                        onValueChange={(value) => handleInputChange('paymentMethod', value)}
                      >
                        <SelectTrigger className={errors.paymentMethod ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione o método" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method} value={method}>
                              <div className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-2" />
                                {method}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.paymentMethod && (
                        <p className="text-sm text-red-500">{errors.paymentMethod}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="totalValue">Valor Total (R$)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="totalValue"
                          type="number"
                          step="0.01"
                          value={formData.totalValue}
                          onChange={(e) => handleInputChange('totalValue', e.target.value)}
                          placeholder="0.00"
                          className="pl-10"
                          readOnly={!!selectedEvent && !!selectedItem}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations">Observações</Label>
                    <Textarea
                      id="observations"
                      value={formData.observations}
                      onChange={(e) => handleInputChange('observations', e.target.value)}
                      placeholder="Comentários adicionais sobre a reserva..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status da Reserva</CardTitle>
                  <CardDescription>
                    Configure o status atual da reserva
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Status Atual</Label>
                    <div className="flex items-center justify-center p-3 border rounded-lg">
                      {getStatusBadge(formData.status)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Alterar Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus">Status do Pagamento</Label>
                    <Select 
                      value={formData.paymentStatus} 
                      onValueChange={(value) => handleInputChange('paymentStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status do pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentStatuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              {selectedEvent && selectedItem && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo da Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Evento</p>
                      <p className="font-medium">{selectedEvent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedEvent.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">{itemConfig.singular}</p>
                      <p className="font-medium">{selectedItem.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedItem.capacity} {itemConfig.capacityLabel}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">
                        R$ {formData.totalValue ? parseFloat(formData.totalValue).toLocaleString() : '0'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Help */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Dica:</strong> O valor total é calculado automaticamente baseado no preço por pessoa do evento e quantidade de lugares da mesa.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;