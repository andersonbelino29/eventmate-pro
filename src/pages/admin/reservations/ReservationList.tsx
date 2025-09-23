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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, ArrowLeft, Plus, MoreHorizontal, Eye, Edit, 
  Trash2, Search, Filter, Calendar, DollarSign,
  CheckCircle, Clock, AlertCircle, Mail, Phone, CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ConfirmDialog from "@/components/ConfirmDialog";
import { usePagination } from "@/hooks/usePagination";
import { CustomPagination } from "@/components/ui/custom-pagination";

const ReservationList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');

  // Mock reservations data
  const reservations = [
    {
      id: 1,
      customerName: "Maria Silva",
      customerEmail: "maria@email.com",
      customerPhone: "(11) 99999-9999",
      eventName: "Casamento dos Sonhos",
      eventDate: "2024-03-15",
      tableNumber: 5,
      seats: 8,
      totalValue: 1200,
      status: "Confirmado",
      paymentStatus: "Pago",
      paymentMethod: "Cartão de Crédito",
      reservedAt: "2024-02-01T10:30:00",
      observations: "Mesa próxima ao palco"
    },
    {
      id: 2,
      customerName: "João Santos",
      customerEmail: "joao@email.com", 
      customerPhone: "(11) 88888-8888",
      eventName: "Tech Summit 2024",
      eventDate: "2024-03-20",
      tableNumber: 12,
      seats: 6,
      totalValue: 900,
      status: "Confirmado",
      paymentStatus: "Pendente",
      paymentMethod: "PIX",
      reservedAt: "2024-02-03T14:15:00",
      observations: ""
    },
    {
      id: 3,
      customerName: "Ana Costa",
      customerEmail: "ana@email.com",
      customerPhone: "(11) 77777-7777",
      eventName: "Aniversário 50 Anos",
      eventDate: "2024-03-25",
      tableNumber: 8,
      seats: 4,
      totalValue: 600,
      status: "Pendente",
      paymentStatus: "Pendente",
      paymentMethod: "Boleto",
      reservedAt: "2024-02-05T16:45:00",
      observations: "Cliente vegetariano"
    },
    {
      id: 4,
      customerName: "Pedro Lima",
      customerEmail: "pedro@email.com",
      customerPhone: "(11) 66666-6666",
      eventName: "Workshop Culinária",
      eventDate: "2024-04-01",
      tableNumber: 3,
      seats: 2,
      totalValue: 350,
      status: "Cancelado",
      paymentStatus: "Estornado",
      paymentMethod: "Cartão de Débito",
      reservedAt: "2024-02-07T09:20:00",
      observations: "Cancelamento solicitado pelo cliente"
    }
  ];

  const events = ["Casamento dos Sonhos", "Tech Summit 2024", "Aniversário 50 Anos", "Workshop Culinária"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Confirmado</Badge>;
      case 'Pendente':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'Cancelado':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'Pago':
        return <Badge variant="default">Pago</Badge>;
      case 'Pendente':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'Estornado':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Estornado</Badge>;
      case 'Cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDeleteReservation = (reservationId: number) => {
    toast({
      title: "Reserva excluída!",
      description: "A reserva foi removida com sucesso.",
    });
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.tableNumber.toString().includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || reservation.eventName === eventFilter;
    
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const reservationsPagination = usePagination({
    data: filteredReservations,
    itemsPerPage: 10
  });

  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'Confirmado').length,
    pending: reservations.filter(r => r.status === 'Pendente').length,
    cancelled: reservations.filter(r => r.status === 'Cancelado').length,
    totalRevenue: reservations
      .filter(r => r.paymentStatus === 'Pago')
      .reduce((sum, r) => sum + r.totalValue, 0)
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
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Gerenciar Reservas</h1>
              </div>
            </div>
            
            <Link to="/admin/reservations/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Reserva Manual
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Confirmadas</p>
                  <p className="text-2xl font-bold">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Canceladas</p>
                  <p className="text-2xl font-bold">{stats.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Receita</p>
                  <p className="text-2xl font-bold">R$ {stats.totalRevenue.toLocaleString()}</p>
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
              Encontre reservas específicas usando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente, evento ou mesa..."
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
                  <SelectItem value="Confirmado">Confirmado</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Eventos</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event} value={event}>{event}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <CustomPagination
              currentPage={reservationsPagination.currentPage}
              totalPages={reservationsPagination.totalPages}
              onPageChange={reservationsPagination.goToPage}
              canGoPrevious={reservationsPagination.canGoPrevious}
              canGoNext={reservationsPagination.canGoNext}
              startIndex={reservationsPagination.startIndex}
              endIndex={reservationsPagination.endIndex}
              totalItems={reservationsPagination.totalItems}
            />
          </CardContent>
        </Card>

        {/* Reservations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Reservas ({filteredReservations.length})</CardTitle>
            <CardDescription>
              Gerencie todas as reservas dos seus eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Data Reserva</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservationsPagination.paginatedData.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reservation.customerName}</div>
                          <div className="text-sm text-muted-foreground">
                            <Mail className="h-3 w-3 inline mr-1" />
                            {reservation.customerEmail}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 inline mr-1" />
                            {reservation.customerPhone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reservation.eventName}</div>
                          <div className="text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {new Date(reservation.eventDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline">Mesa {reservation.tableNumber}</Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            <Users className="h-3 w-3 inline mr-1" />
                            {reservation.seats} lugares
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">R$ {reservation.totalValue}</div>
                          <div className="text-sm text-muted-foreground">
                            <CreditCard className="h-3 w-3 inline mr-1" />
                            {reservation.paymentMethod}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(reservation.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentBadge(reservation.paymentStatus)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(reservation.reservedAt).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link to={`/admin/reservations/${reservation.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                            </Link>
                            <Link to={`/admin/reservations/${reservation.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <ConfirmDialog
                              title="Excluir Reserva"
                              description={`Tem certeza que deseja excluir a reserva de "${reservation.customerName}" para o evento "${reservation.eventName}"? O cliente será notificado sobre o cancelamento e o reembolso será processado automaticamente.`}
                              onConfirm={() => handleDeleteReservation(reservation.id)}
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

            {filteredReservations.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all' || eventFilter !== 'all'
                    ? 'Tente ajustar os filtros para encontrar reservas'
                    : 'Não há reservas cadastradas ainda'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && eventFilter === 'all' && (
                  <Link to="/admin/reservations/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeira Reserva
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

export default ReservationList;