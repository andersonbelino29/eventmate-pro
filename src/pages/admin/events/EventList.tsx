import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, Search, Plus, MoreHorizontal, Eye, Edit, 
  Trash2, Users, MapPin, DollarSign, ArrowLeft, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDialog";

const EventList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const events = [
    {
      id: 1,
      name: "Casamento dos Sonhos",
      date: "2024-03-15",
      time: "18:00",
      location: "Salão Principal",
      capacity: 200,
      reservedTables: 15,
      totalTables: 20,
      price: 150,
      status: "Confirmado",
      category: "Casamento",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Evento Corporativo Tech Summit",
      date: "2024-03-20",
      time: "19:00",
      location: "Auditório Premium",
      capacity: 150,
      reservedTables: 8,
      totalTables: 15,
      price: 80,
      status: "Pendente",
      category: "Corporativo",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Aniversário de 50 Anos",
      date: "2024-03-25",
      time: "16:00",
      location: "Jardim Encantado",
      capacity: 80,
      reservedTables: 10,
      totalTables: 10,
      price: 120,
      status: "Lotado",
      category: "Aniversário",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Workshop de Culinária",
      date: "2024-04-01",
      time: "14:00",
      location: "Espaço Gourmet",
      capacity: 30,
      reservedTables: 2,
      totalTables: 6,
      price: 90,
      status: "Rascunho",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <Badge variant="default">Confirmado</Badge>;
      case 'Pendente':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'Lotado':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Lotado</Badge>;
      case 'Rascunho':
        return <Badge variant="outline">Rascunho</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Gerenciar Eventos</h1>
              </div>
            </div>
            
            <Link to="/admin/events/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Encontre eventos específicos usando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar eventos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {statusFilter === 'all' ? 'Todos' : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Confirmado')}>
                    Confirmado
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Pendente')}>
                    Pendente
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Lotado')}>
                    Lotado
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Rascunho')}>
                    Rascunho
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Eventos ({filteredEvents.length})</CardTitle>
            <CardDescription>
              Gerencie todos os seus eventos em um só lugar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Data & Hora</TableHead>
                    <TableHead>Local</TableHead>
                    <TableHead>Mesas</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={event.image} 
                            alt={event.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{event.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {event.category}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div>{new Date(event.date).toLocaleDateString('pt-BR')}</div>
                            <div className="text-muted-foreground">{event.time}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div>{event.location}</div>
                            <div className="text-muted-foreground">
                              <Users className="h-3 w-3 inline mr-1" />
                              {event.capacity} pessoas
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {event.reservedTables}/{event.totalTables}
                          </div>
                          <div className="text-muted-foreground">
                            {Math.round((event.reservedTables / event.totalTables) * 100)}% ocupado
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          R$ {event.price}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(event.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link to={`/admin/events/${event.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                            </Link>
                            <Link to={`/admin/events/${event.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                            </Link>
                            <Link to={`/admin/events/${event.id}/tables`}>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Gerenciar Mesas
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <ConfirmDialog
                              title="Excluir Evento"
                              description={`Tem certeza que deseja excluir o evento "${event.name}"? Todas as reservas associadas também serão canceladas e os clientes serão notificados automaticamente.`}
                              onConfirm={() => {
                                console.log('Excluindo evento:', event.id);
                                // TODO: Implementar exclusão real
                              }}
                            >
                              <DropdownMenuItem 
                                className="text-red-600"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </ConfirmDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Tente ajustar os filtros para encontrar eventos'
                    : 'Comece criando seu primeiro evento'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Link to="/admin/events/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Evento
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventList;