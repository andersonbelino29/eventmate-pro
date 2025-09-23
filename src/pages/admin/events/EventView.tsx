import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Calendar, ArrowLeft, Edit, Users, MapPin, DollarSign, 
  Clock, Tag, Eye, Share2, CheckCircle, AlertCircle,
  User, Phone, Mail, CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";

const EventView = () => {
  const { id } = useParams();

  // Mock data
  const event = {
    id: 1,
    name: "Casamento dos Sonhos",
    description: "Um evento mágico para celebrar o amor eterno de dois corações que se encontraram. Uma cerimônia única com todos os detalhes pensados para criar memórias inesquecíveis.",
    date: "2024-03-15",
    time: "18:00",
    endTime: "23:00",
    location: "Salão Principal",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    capacity: 200,
    reservedSeats: 150,
    price: 150,
    status: "Confirmado",
    category: "Casamento",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-10"
  };

  // Mock reservations
  const reservations = [
    {
      id: 1,
      customerName: "Maria Silva",
      customerEmail: "maria@email.com",
      customerPhone: "(11) 99999-9999",
      tableNumber: 5,
      seats: 8,
      totalValue: 1200,
      status: "Confirmado",
      paymentStatus: "Pago",
      reservedAt: "2024-02-01T10:30:00"
    },
    {
      id: 2,
      customerName: "João Santos",
      customerEmail: "joao@email.com", 
      customerPhone: "(11) 88888-8888",
      tableNumber: 12,
      seats: 6,
      totalValue: 900,
      status: "Confirmado",
      paymentStatus: "Pendente",
      reservedAt: "2024-02-03T14:15:00"
    },
    {
      id: 3,
      customerName: "Ana Costa",
      customerEmail: "ana@email.com",
      customerPhone: "(11) 77777-7777", 
      tableNumber: 8,
      seats: 4,
      totalValue: 600,
      status: "Pendente",
      paymentStatus: "Pendente",
      reservedAt: "2024-02-05T16:45:00"
    }
  ];

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
      case 'Cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const occupancyPercentage = Math.round((event.reservedSeats / event.capacity) * 100);

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
                <h1 className="text-2xl font-bold">Detalhes do Evento</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Página Pública
              </Button>
              <Link to={`/admin/events/${id}/edit`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Evento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{event.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {event.description}
                    </CardDescription>
                  </div>
                  {getStatusBadge(event.status)}
                </div>
              </CardHeader>
              <CardContent>
                {event.image && (
                  <div className="mb-6">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {new Date(event.date).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.time} {event.endTime && `- ${event.endTime}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{event.location}</div>
                        <div className="text-sm text-muted-foreground">{event.address}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Categoria</div>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Preço por Pessoa</div>
                        <div className="text-lg font-bold text-primary">R$ {event.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reservations */}
            <Card>
              <CardHeader>
                <CardTitle>Reservas ({reservations.length})</CardTitle>
                <CardDescription>
                  Lista de todas as reservas feitas para este evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Mesa</TableHead>
                        <TableHead>Pessoas</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((reservation) => (
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
                            <Badge variant="outline">Mesa {reservation.tableNumber}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              {reservation.seats}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">R$ {reservation.totalValue}</div>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {reservations.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma reserva ainda</h3>
                    <p className="text-muted-foreground">
                      As reservas aparecerão aqui quando os clientes começarem a reservar mesas
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>
                  Resumo do desempenho do evento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {occupancyPercentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">Ocupação</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{event.reservedSeats}</div>
                    <div className="text-xs text-muted-foreground">Reservados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{event.capacity - event.reservedSeats}</div>
                    <div className="text-xs text-muted-foreground">Disponíveis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{reservations.length}</div>
                    <div className="text-xs text-muted-foreground">Reservas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                      R$ {reservations.reduce((sum, r) => sum + r.totalValue, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Receita</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
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
                
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Relatório Financeiro
                </Button>
                
                <Link to={`/admin/events/${id}/edit`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Evento
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Event Meta */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="text-muted-foreground">ID do Evento</div>
                  <div className="font-mono">{event.id}</div>
                </div>
                
                <div className="text-sm">
                  <div className="text-muted-foreground">Criado em</div>
                  <div>{new Date(event.createdAt).toLocaleDateString('pt-BR')}</div>
                </div>
                
                <div className="text-sm">
                  <div className="text-muted-foreground">Última atualização</div>
                  <div>{new Date(event.updatedAt).toLocaleDateString('pt-BR')}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;