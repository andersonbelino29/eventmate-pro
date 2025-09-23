import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Grid3X3, MapPin, CheckCircle, AlertCircle, Clock,
  Search, Filter, MoreHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TableManagement = () => {
  const { eventId } = useParams();
  const { toast } = useToast();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form states
  const [formData, setFormData] = useState({
    number: '',
    seats: '',
    location: '',
    type: '',
    price: '',
    status: 'Disponível'
  });

  // Mock event data
  const event = {
    id: eventId,
    name: "Casamento dos Sonhos",
    date: "2024-03-15",
    location: "Salão Principal"
  };

  // Mock tables data
  const [tables, setTables] = useState([
    {
      id: 1,
      number: 1,
      seats: 8,
      location: "Área Central",
      type: "Redonda",
      price: 1200,
      status: "Reservada",
      customerName: "Maria Silva",
      customerEmail: "maria@email.com",
      reservedAt: "2024-02-01"
    },
    {
      id: 2,
      number: 2,
      seats: 6,
      location: "Área Central",
      type: "Retangular",
      price: 900,
      status: "Disponível",
      customerName: null,
      customerEmail: null,
      reservedAt: null
    },
    {
      id: 3,
      number: 3,
      seats: 10,
      location: "Área VIP",
      type: "Redonda",
      price: 1500,
      status: "Reservada",
      customerName: "João Santos",
      customerEmail: "joao@email.com", 
      reservedAt: "2024-02-03"
    },
    {
      id: 4,
      number: 4,
      seats: 4,
      location: "Área Jardim",
      type: "Quadrada",
      price: 600,
      status: "Manutenção",
      customerName: null,
      customerEmail: null,
      reservedAt: null
    },
    {
      id: 5,
      number: 5,
      seats: 8,
      location: "Área Central",
      type: "Redonda",
      price: 1200,
      status: "Disponível",
      customerName: null,
      customerEmail: null,
      reservedAt: null
    }
  ]);

  const tableTypes = ["Redonda", "Retangular", "Quadrada", "Oval"];
  const locations = ["Área Central", "Área VIP", "Área Jardim", "Área Lateral", "Área Fundos"];
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
      number: '',
      seats: '',
      location: '',
      type: '',
      price: '',
      status: 'Disponível'
    });
  };

  const handleCreateTable = async () => {
    if (!formData.number || !formData.seats || !formData.location || !formData.type || !formData.price) {
      toast({
        title: "Erro na validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newTable = {
      id: tables.length + 1,
      number: parseInt(formData.number),
      seats: parseInt(formData.seats),
      location: formData.location,
      type: formData.type,
      price: parseFloat(formData.price),
      status: formData.status,
      customerName: null,
      customerEmail: null,
      reservedAt: null
    };

    setTables(prev => [...prev, newTable]);
    setIsCreateModalOpen(false);
    resetForm();

    toast({
      title: "Mesa criada!",
      description: `Mesa ${formData.number} foi criada com sucesso.`,
    });
  };

  const handleEditTable = async () => {
    if (!selectedTable) return;

    const updatedTables = tables.map(table => 
      table.id === selectedTable.id 
        ? { 
            ...table, 
            number: parseInt(formData.number),
            seats: parseInt(formData.seats),
            location: formData.location,
            type: formData.type,
            price: parseFloat(formData.price),
            status: formData.status
          }
        : table
    );

    setTables(updatedTables);
    setIsEditModalOpen(false);
    setSelectedTable(null);
    resetForm();

    toast({
      title: "Mesa atualizada!",
      description: `Mesa ${formData.number} foi atualizada com sucesso.`,
    });
  };

  const handleDeleteTable = (tableId: number) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
    toast({
      title: "Mesa excluída!",
      description: "A mesa foi removida com sucesso.",
    });
  };

  const openEditModal = (table: any) => {
    setSelectedTable(table);
    setFormData({
      number: table.number.toString(),
      seats: table.seats.toString(),
      location: table.location,
      type: table.type,
      price: table.price.toString(),
      status: table.status
    });
    setIsEditModalOpen(true);
  };

  const filteredTables = tables.filter(table => {
    const matchesSearch = 
      table.number.toString().includes(searchQuery) ||
      table.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (table.customerName && table.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || table.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === 'Disponível').length,
    reserved: tables.filter(t => t.status === 'Reservada').length,
    maintenance: tables.filter(t => t.status === 'Manutenção').length
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
                <Grid3X3 className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Gerenciar Mesas</h1>
                  <p className="text-sm text-muted-foreground">{event.name}</p>
                </div>
              </div>
            </div>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Mesa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Mesa</DialogTitle>
                  <DialogDescription>
                    Configure uma nova mesa para o evento
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Número da Mesa *</Label>
                      <Input
                        id="number"
                        type="number"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        placeholder="1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seats">Quantidade de Lugares *</Label>
                      <Input
                        id="seats"
                        type="number"
                        value={formData.seats}
                        onChange={(e) => handleInputChange('seats', e.target.value)}
                        placeholder="8"
                      />
                    </div>
                  </div>

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

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo da Mesa *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        {tableTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Preço da Mesa (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="1200.00"
                    />
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
                  <Button onClick={handleCreateTable}>
                    Criar Mesa
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
                <Grid3X3 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total de Mesas</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Reservadas</p>
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
              Encontre mesas específicas usando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar mesas..."
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

        {/* Tables List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Mesas ({filteredTables.length})</CardTitle>
            <CardDescription>
              Gerencie todas as mesas do evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Lugares</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Grid3X3 className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Mesa {table.number}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          {table.seats}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {table.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{table.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">R$ {table.price}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(table.status)}
                      </TableCell>
                      <TableCell>
                        {table.customerName ? (
                          <div>
                            <div className="font-medium">{table.customerName}</div>
                            <div className="text-sm text-muted-foreground">{table.customerEmail}</div>
                            <div className="text-xs text-muted-foreground">
                              Reservado em {new Date(table.reservedAt!).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditModal(table)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteTable(table.id)}
                            className="text-red-600 hover:text-red-700"
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

            {filteredTables.length === 0 && (
              <div className="text-center py-12">
                <Grid3X3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma mesa encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Tente ajustar os filtros para encontrar mesas'
                    : 'Comece criando a primeira mesa para este evento'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Mesa
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Mesa</DialogTitle>
            <DialogDescription>
              Atualize as informações da mesa
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-number">Número da Mesa *</Label>
                <Input
                  id="edit-number"
                  type="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  placeholder="1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-seats">Quantidade de Lugares *</Label>
                <Input
                  id="edit-seats"
                  type="number"
                  value={formData.seats}
                  onChange={(e) => handleInputChange('seats', e.target.value)}
                  placeholder="8"
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
              <Label htmlFor="edit-type">Tipo da Mesa *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  {tableTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Preço da Mesa (R$) *</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="1200.00"
              />
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
            <Button onClick={handleEditTable}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableManagement;