import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, ArrowLeft, Plus, Edit, Trash2, Eye, 
  Package, MapPin, CheckCircle, AlertCircle, DollarSign,
  Search, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { usePagination } from "@/hooks/usePagination";
import { CustomPagination } from "@/components/ui/custom-pagination";

const ItemManagement = () => {
  const { eventId } = useParams();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  
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

  // Mock event data
  const event = {
    id: eventId,
    name: "Evento Especial",
    date: "2024-03-15",
    location: "Local Principal",
    itemType: itemConfig.type
  };

  // Mock items data with different prices
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
            price: 250,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 2,
            name: "Mesa Premium - Vista Jardim",
            capacity: 6,
            location: "Área Premium", 
            type: "Mesa Premium",
            price: 200,
            status: "Reservada",
            customerName: "Maria Silva",
            customerEmail: "maria@email.com",
            reservedAt: "2024-02-01"
          },
          {
            id: 3,
            name: "Mesa Standard - Área Central",
            capacity: 10,
            location: "Área Central",
            type: "Mesa Standard",
            price: 150,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 4,
            name: "Mesa Família - Área Infantil",
            capacity: 4,
            location: "Área Família",
            type: "Mesa Família",
            price: 180,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 5,
            name: "Mesa Executiva - Sala Privada",
            capacity: 12,
            location: "Sala Privada",
            type: "Mesa Premium",
            price: 300,
            status: "Manutenção",
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
            name: "Ingresso Premium",
            capacity: 1,
            location: "Área Premium",
            type: "Premium",
            price: 180,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 3,
            name: "Ingresso Pista",
            capacity: 1,
            location: "Pista",
            type: "Standard",
            price: 120,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 4,
            name: "Ingresso Estudante",
            capacity: 1,
            location: "Pista",
            type: "Estudante",
            price: 80,
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
            name: "Lounge VIP Premium",
            capacity: 20,
            location: "Andar Superior",
            type: "Lounge Premium",
            price: 200,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 2,
            name: "Área Família",
            capacity: 15,
            location: "Jardim",
            type: "Área Família",
            price: 120,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          },
          {
            id: 3,
            name: "Camarote Executivo",
            capacity: 8,
            location: "Área Central",
            type: "Camarote",
            price: 350,
            status: "Reservada",
            customerName: "João Santos",
            customerEmail: "joao@email.com",
            reservedAt: "2024-02-05"
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
          },
          {
            id: 2,
            name: `${itemConfig.singular} Standard`,
            capacity: 6,
            location: "Local Secundário",
            type: "Standard",
            price: 150,
            status: "Disponível",
            customerName: null,
            customerEmail: null,
            reservedAt: null
          }
        ];
    }
  });

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

  const handleDeleteItem = (itemId: number) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item excluído!",
      description: "O item foi removido com sucesso.",
    });
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
            
            <Link to={`/admin/events/${eventId}/items/new`}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova {itemConfig.singular}
              </Button>
            </Link>
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

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
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
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Status</SelectItem>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Reservada">Reservada</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Bloqueada">Bloqueada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de {itemConfig.plural}</CardTitle>
                <CardDescription>
                  Gerencie os {itemConfig.plural.toLowerCase()} disponíveis para este evento
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/events/${eventId}/items/new`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova {itemConfig.singular}
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredItems.length > 0 ? (
              <div className="space-y-4">
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        {itemConfig.requiresLocation && <TableHead>Localização</TableHead>}
                        {itemConfig.requiresCapacity && <TableHead>Capacidade</TableHead>}
                        <TableHead>Tipo</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itemsPagination.paginatedData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.customerName && (
                                <div className="text-sm text-muted-foreground">
                                  Reservado por: {item.customerName}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          {itemConfig.requiresLocation && (
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                                {item.location}
                              </div>
                            </TableCell>
                          )}
                          {itemConfig.requiresCapacity && (
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                {item.capacity} {itemConfig.capacityLabel}
                              </div>
                            </TableCell>
                          )}
                          <TableCell>
                            <Badge variant="outline">{item.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-green-600">
                              R$ {item.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {itemConfig.priceLabel}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(item.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => console.log('Ver item:', item.id)}
                                title="Ver detalhes"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Link to={`/admin/events/${eventId}/items/${item.id}/edit`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Editar item"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                                title="Excluir item"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {itemsPagination.paginatedData.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.type}</p>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {itemConfig.requiresLocation && (
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {item.location}
                            </div>
                          )}
                          {itemConfig.requiresCapacity && (
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              {item.capacity} {itemConfig.capacityLabel}
                            </div>
                          )}
                          <div className="flex items-center text-sm font-semibold text-green-600">
                            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                            R$ {item.price.toFixed(2)} {itemConfig.priceLabel}
                          </div>
                          {item.customerName && (
                            <div className="text-sm text-muted-foreground">
                              Reservado por: {item.customerName}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => console.log('Ver item:', item.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Link to={`/admin/events/${eventId}/items/${item.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <CustomPagination
                  currentPage={itemsPagination.currentPage}
                  totalPages={itemsPagination.totalPages}
                  onPageChange={itemsPagination.goToPage}
                  canGoPrevious={itemsPagination.canGoPrevious}
                  canGoNext={itemsPagination.canGoNext}
                  startIndex={itemsPagination.startIndex}
                  endIndex={itemsPagination.endIndex}
                  totalItems={itemsPagination.totalItems}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhuma {itemConfig.singular.toLowerCase()} encontrada
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== 'all' 
                    ? `Não há ${itemConfig.plural.toLowerCase()} que correspondam aos filtros aplicados.`
                    : `Comece criando sua primeira ${itemConfig.singular.toLowerCase()} para este evento.`
                  }
                </p>
                <Link to={`/admin/events/${eventId}/items/new`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira {itemConfig.singular}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        {filteredItems.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo de Preços</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {Math.min(...items.map(item => item.price)).toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Menor preço</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {(items.reduce((sum, item) => sum + item.price, 0) / items.length).toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Preço médio</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    R$ {Math.max(...items.map(item => item.price)).toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Maior preço</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ItemManagement;