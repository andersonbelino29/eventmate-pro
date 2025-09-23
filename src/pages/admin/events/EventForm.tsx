import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Calendar, ArrowLeft, Save, Eye, Upload, MapPin, 
  Users, DollarSign, Clock, Tag, Image as ImageIcon,
  CheckCircle, AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  // Form states
  const [formData, setFormData] = useState({
    name: isEditing ? 'Casamento dos Sonhos' : '',
    description: isEditing ? 'Um evento mágico para celebrar o amor eterno de dois corações que se encontraram.' : '',
    date: isEditing ? '2024-03-15' : '',
    time: isEditing ? '18:00' : '',
    endTime: isEditing ? '23:00' : '',
    location: isEditing ? 'Salão Principal' : '',
    address: isEditing ? 'Rua das Flores, 123 - Centro' : '',
    category: isEditing ? 'Casamento' : '',
    capacity: isEditing ? '200' : '',
    pricingType: isEditing ? 'per_person' : 'per_person', // 'per_person', 'per_item', ou 'per_table'
    pricePerPerson: isEditing ? '150' : '',
    pricePerItem: isEditing ? '200' : '',
    status: isEditing ? 'Confirmado' : 'Rascunho',
    image: isEditing ? 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop' : '',
    tables: isEditing ? [
      { id: '1', name: 'Mesa VIP', seats: 8, price: 200, available: 5 },
      { id: '2', name: 'Mesa Premium', seats: 8, price: 180, available: 10 },
      { id: '3', name: 'Mesa Standard', seats: 8, price: 150, available: 15 }
    ] : [],
    items: isEditing ? [
      { id: '1', name: 'Ingresso VIP', capacity: 1, price: 250, location: 'Área VIP', type: 'VIP' },
      { id: '2', name: 'Ingresso Premium', capacity: 1, price: 180, location: 'Área Premium', type: 'Premium' },
      { id: '3', name: 'Ingresso Standard', capacity: 1, price: 120, location: 'Pista', type: 'Standard' }
    ] : []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Casamento', 'Aniversário', 'Corporativo', 'Formatura', 
    'Workshop', 'Conferência', 'Show', 'Festival', 'Outro'
  ];

  const statuses = [
    { value: 'Rascunho', label: 'Rascunho', description: 'Evento em preparação' },
    { value: 'Pendente', label: 'Pendente', description: 'Aguardando aprovação' },
    { value: 'Confirmado', label: 'Confirmado', description: 'Evento confirmado e publicado' },
    { value: 'Cancelado', label: 'Cancelado', description: 'Evento cancelado' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome do evento é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Horário de início é obrigatório';
    if (!formData.location.trim()) newErrors.location = 'Local é obrigatório';
    if (!formData.category) newErrors.category = 'Categoria é obrigatória';
    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacidade deve ser maior que zero';
    }
    if (formData.pricingType === 'per_person') {
      if (!formData.pricePerPerson || parseFloat(formData.pricePerPerson) < 0) {
        newErrors.pricePerPerson = 'Preço por pessoa deve ser maior ou igual a zero';
      }
    } else if (formData.pricingType === 'per_item') {
      if (!formData.pricePerItem || parseFloat(formData.pricePerItem) < 0) {
        newErrors.pricePerItem = 'Preço por item deve ser maior ou igual a zero';
      }
    } else if (formData.pricingType === 'per_table') {
      if (formData.tables.length === 0) {
        newErrors.tables = 'Adicione pelo menos uma mesa';
      }
    }

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
        title: isEditing ? "Evento atualizado!" : "Evento criado!",
        description: `${formData.name} foi ${isEditing ? 'atualizado' : 'criado'} com sucesso.`,
      });

      navigate('/admin/events');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o evento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Confirmado</Badge>;
      case 'Pendente':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'Rascunho':
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Rascunho</Badge>;
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
              <Link to="/admin/events">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Eventos
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'Editar Evento' : 'Novo Evento'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing && (
                <Link to={`/admin/events/${id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </Link>
              )}
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading}
                form="event-form"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar Evento')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <form id="event-form" onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>
                    Configure as informações principais do evento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Evento *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Digite o nome do evento"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Descreva o evento detalhadamente"
                      rows={4}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              <div className="flex items-center">
                                <Tag className="h-4 w-4 mr-2" />
                                {category}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidade (pessoas) *</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => handleInputChange('capacity', e.target.value)}
                          placeholder="200"
                          className={`pl-10 ${errors.capacity ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.capacity && (
                        <p className="text-sm text-red-500">{errors.capacity}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Data e Horário</CardTitle>
                  <CardDescription>
                    Configure quando o evento acontecerá
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data do Evento *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          className={`pl-10 ${errors.date ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.date && (
                        <p className="text-sm text-red-500">{errors.date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Horário de Início *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleInputChange('time', e.target.value)}
                          className={`pl-10 ${errors.time ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.time && (
                        <p className="text-sm text-red-500">{errors.time}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">Horário de Término</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => handleInputChange('endTime', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Localização</CardTitle>
                  <CardDescription>
                    Onde o evento acontecerá
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Local do Evento *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Salão Principal, Auditório, etc."
                        className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Imagem do Evento</CardTitle>
                  <CardDescription>
                    Adicione uma imagem atrativa para seu evento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {formData.image && (
                      <div className="relative">
                        <img 
                          src={formData.image} 
                          alt="Preview do evento"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Recomendado: 800x600px, JPG ou PNG, máximo 5MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Status e Preço</CardTitle>
                  <CardDescription>
                    Configure o status e valor do evento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Status Atual</Label>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
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
                          <SelectItem key={status.value} value={status.value}>
                            <div>
                              <div className="font-medium">{status.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {status.description}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Tipo de Cobrança *</Label>
                    <Select 
                      value={formData.pricingType} 
                      onValueChange={(value) => handleInputChange('pricingType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de cobrança" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per_person">
                          <div>
                            <div className="font-medium">Por Pessoa</div>
                            <div className="text-xs text-muted-foreground">
                              Preço fixo por pessoa
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="per_table">
                          <div>
                            <div className="font-medium">Por Mesa</div>
                            <div className="text-xs text-muted-foreground">
                              Preços diferenciados por mesa
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.pricingType === 'per_person' && (
                    <div className="space-y-2">
                      <Label htmlFor="pricePerPerson">Preço por Pessoa (R$) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="pricePerPerson"
                          type="number"
                          step="0.01"
                          value={formData.pricePerPerson}
                          onChange={(e) => handleInputChange('pricePerPerson', e.target.value)}
                          placeholder="150.00"
                          className={`pl-10 ${errors.pricePerPerson ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.pricePerPerson && (
                        <p className="text-sm text-red-500">{errors.pricePerPerson}</p>
                      )}
                    </div>
                  )}

                  {formData.pricingType === 'per_table' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Configuração de Mesas</Label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const newTable = {
                              id: Date.now().toString(),
                              name: `Mesa ${formData.tables.length + 1}`,
                              seats: 8,
                              price: 150,
                              available: 1
                            };
                            setFormData(prev => ({
                              ...prev,
                              tables: [...prev.tables, newTable]
                            }));
                          }}
                        >
                          Adicionar Mesa
                        </Button>
                      </div>
                      
                      {formData.tables.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                          <p>Nenhuma mesa configurada</p>
                          <p className="text-sm">Adicione mesas para definir preços diferenciados</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {formData.tables.map((table, index) => (
                            <div key={table.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <Label className="text-xs">Nome</Label>
                                  <Input
                                    value={table.name}
                                    onChange={(e) => {
                                      const newTables = [...formData.tables];
                                      newTables[index].name = e.target.value;
                                      setFormData(prev => ({ ...prev, tables: newTables }));
                                    }}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Lugares</Label>
                                  <Input
                                    type="number"
                                    value={table.seats}
                                    onChange={(e) => {
                                      const newTables = [...formData.tables];
                                      newTables[index].seats = parseInt(e.target.value) || 0;
                                      setFormData(prev => ({ ...prev, tables: newTables }));
                                    }}
                                    className="h-8"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Preço (R$)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={table.price}
                                    onChange={(e) => {
                                      const newTables = [...formData.tables];
                                      newTables[index].price = parseFloat(e.target.value) || 0;
                                      setFormData(prev => ({ ...prev, tables: newTables }));
                                    }}
                                    className="h-8"
                                  />
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newTables = formData.tables.filter((_, i) => i !== index);
                                  setFormData(prev => ({ ...prev, tables: newTables }));
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {errors.tables && (
                        <p className="text-sm text-red-500">{errors.tables}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              {isEditing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to={`/admin/events/${id}/tables`} className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Gerenciar Mesas
                      </Button>
                    </Link>
                    
                    <Link to={`/${formData.name.toLowerCase().replace(/\s+/g, '-')}/evento/${id}`} className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Página Pública
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Help */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Dica:</strong> Eventos com status "Confirmado" aparecerão na página pública e estarão disponíveis para reservas.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventForm;