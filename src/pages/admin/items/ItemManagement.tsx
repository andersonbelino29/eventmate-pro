import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Users, ArrowLeft, Plus, Edit, Trash2, Eye, 
  Package, MapPin, CheckCircle, AlertCircle, Clock,
  Search, Filter, MoreHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { usePagination } from "@/hooks/usePagination";
import { CustomPagination } from "@/components/ui/custom-pagination";

const ItemManagement = () => {
  const { eventId } = useParams();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
    name: '',
    capacity: '',
    location: '',
    type: '',
    price: '',
    status: 'Disponível'
  });

  // Mock event data
  const event = {
    id: eventId,
    name: "Evento Especial",
    date: "2024-03-15",
    location: "Local Principal",
    itemType: itemConfig.type
  };

  // Mock items data based on item type
  const [items, setItems] = useState(() => {
    switch (itemConfig.type) {
      case 'mesa':
        return [
          {
            id: 1,
            name: "Mesa VIP - Frente do Palco",
            capacity: 8,
            location: "Área VIP",
            type: "Mesa Premium",
            price: 200,
            status: "Reservada",
            customerName: "Maria Silva",
            customerEmail: "maria@email.com",
            reservedAt: "2024-02-01"
          },
          {
            id: 2,
            name: "Mesa Standard - Área Central",
            capacity: 6,
            location: "Área Central",
            type: "Mesa Standard",
            price: 150,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          }
        ];
      case 'ingresso':
        return [
          {
            id: 1,
            name: "Ingresso VIP",
            capacity: 1,
            location: "Área VIP",
            type: "VIP",
            price: 250,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 2,
            name: "Ingresso Pista",
            capacity: 1,
            location: "Pista",
            type: "Standard",
            price: 120,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          }
        ];
      case 'area':
        return [
          {
            id: 1,
            name: "Área VIP Lounge",
            capacity: 20,
            location: "Andar Superior",
            type: "Lounge Premium",
            price: 150,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          }
        ];
      default:
        return [
          {
            id: 1,
            name: `${itemConfig.singular} Premium`,
            capacity: 8,
            location: "Local Principal",
            type: "Premium",
            price: 200,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          }
        ];
    }
  });

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
  const statuses = ["Disponível", "Reservada", "Manutenção", "Bloqueada"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponível':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Disponível</Badge>;
      case 'Reservada':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200"><Users className="h-3 w-3 mr-1" />Reservada</Badge>;
      case 'Manutenção':
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Manutenção</Badge>;
      case 'Bloqueada':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Bloqueada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      capacity: '',
      location: '',
      type: '',
      price: '',
      status: 'Disponível'
    });
  };

  const handleCreateItem = async () => {
    if (!formData.name || !formData.capacity || !formData.location || !formData.type || !formData.price) {
      toast({
        title: "Erro na validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newItem = {
      id: items.length + 1,
      name: formData.name,
      capacity: parseInt(formData.capacity),
      location: formData.location,
      type: formData.type,
      price: parseFloat(formData.price),
      status: formData.status,
      customerName: null,
      customerEmail: null,
      reservedAt: null
    };

    setItems(prev => [...prev, newItem]);
    setIsCreateModalOpen(false);
    resetForm();

    toast({
      title: "Item criado!",
      description: `${formData.name} foi criado com sucesso.`,
    });
  };

  const handleEditItem = async () => {
    if (!selectedItem) return;

    const updatedItems = items.map(item => 
      item.id === selectedItem.id 
        ? { 
            ...item, 
            name: formData.name,
            capacity: parseInt(formData.capacity),
            location: formData.location,
            type: formData.type,
            price: parseFloat(formData.price),
            status: formData.status
          }
        : item
    );

    setItems(updatedItems);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    resetForm();

    toast({
      title: "Item atualizado!",
      description: `${formData.name} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteItem = (itemId: number) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item excluído!",
      description: "O item foi removido com sucesso.",
    });
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      capacity: item.capacity.toString(),
      location: item.location,
      type: item.type,
      price: item.price.toString(),
      status: item.status
    });
    setIsEditModalOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.customerName && item.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const itemsPagination = usePagination({
    data: filteredItems,
    itemsPerPage: 10
  });

  const stats = {
    total: items.length,
    available: items.filter(t => t.status === 'Disponível').length,
    reserved: items.filter(t => t.status === 'Reservada').length,
    maintenance: items.filter(t => t.status === 'Manutenção').length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Gerenciar {itemConfig.plural}</h1>
                  <p className="text-sm text-muted-foreground">{event.name}</p>
                </div>
              </div>
            </div>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova {itemConfig.singular}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova {itemConfig.singular}</DialogTitle>
                  <DialogDescription>
                    Configure uma nova {itemConfig.singular.toLowerCase()} para o evento
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da {itemConfig.singular} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={`Ex: ${itemConfig.singular} Premium`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {itemConfig.requiresCapacity && (
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacidade ({itemConfig.capacityLabel}) *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => handleInputChange('capacity', e.target.value)}
                          placeholder="8"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço {itemConfig.priceLabel} (R$) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="200.00"
                      />
                    </div>
                  </div>

                  {itemConfig.requiresLocation && (
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização *</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a área" />
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

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo da {itemConfig.singular} *</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateItem}>
                    Criar {itemConfig.singular}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total de {itemConfig.plural}</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                  <p className="text-2xl font-bold">{stats.available}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Reservados</p>
                  <p className="text-2xl font-bold">{stats.reserved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Manutenção</p>
                  <p className="text-2xl font-bold">{stats.maintenance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Encontre {itemConfig.plural.toLowerCase()} específicas usando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Buscar ${itemConfig.plural.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de {itemConfig.plural} ({filteredItems.length})</CardTitle>
            <CardDescription>
              Gerencie todos os itens do evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsPagination.paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Package className="h-12 w-12 mb-4" />
                          <p className="text-lg font-medium">Nenhum item encontrado</p>
                          <p className="text-sm">Tente ajustar os filtros ou criar um novo item</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    itemsPagination.paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            {item.capacity}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            {item.location}
                          </div>
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>R$ {item.price}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          {item.customerName ? (
                            <div>
                              <div className="font-medium">{item.customerName}</div>
                              <div className="text-sm text-muted-foreground">{item.customerEmail}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditModal(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {filteredItems.length > 0 && (
              <div className="mt-4">
                <CustomPagination
                  currentPage={itemsPagination.currentPage}
                  totalPages={itemsPagination.totalPages}
                  canGoPrevious={itemsPagination.currentPage > 1}
                  canGoNext={itemsPagination.currentPage < itemsPagination.totalPages}
                  startIndex={itemsPagination.startIndex}
                  endIndex={itemsPagination.endIndex}
                  totalItems={filteredItems.length}
                  onPageChange={itemsPagination.goToPage}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
            <DialogDescription>
              Atualize as informações do item
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do Item *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Mesa VIP - Frente do Palco"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Capacidade *</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="8"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-price">Preço por Pessoa (R$) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="200.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">Localização *</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
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

            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipo do Item *</Label>
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

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditItem}>
              Atualizar Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemManagement;