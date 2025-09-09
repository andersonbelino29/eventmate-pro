import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Calendar, Users, DollarSign, BarChart3 } from "lucide-react";
import { useTenant } from "@/hooks/useTenant";
import Navbar from "@/components/Navbar";

const Admin = () => {
  const { currentTenant } = useTenant();
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Casamento Elegante",
      date: "2024-12-15",
      status: "Ativo",
      capacity: 150,
      booked: 105,
      revenue: 15750
    },
    {
      id: "2",
      title: "Conferência Corporativa",
      date: "2024-12-20",
      status: "Ativo",
      capacity: 200,
      booked: 87,
      revenue: 13050
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Painel Administrativo
            {currentTenant && (
              <span className="text-primary ml-2">- {currentTenant.name}</span>
            )}
          </h1>
          <p className="text-muted-foreground">
            {currentTenant 
              ? `Gerencie eventos, mesas e agendamentos da ${currentTenant.name}`
              : 'Gerencie eventos, mesas e agendamentos'
            }
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Eventos Ativos</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Participantes</p>
                  <p className="text-2xl font-bold text-primary">1,247</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Receita do Mês</p>
                  <p className="text-2xl font-bold text-primary">R$ 28.8k</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                  <p className="text-2xl font-bold text-primary">87%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="tables">Mesas</TabsTrigger>
            <TabsTrigger value="bookings">Agendamentos</TabsTrigger>
          </TabsList>

          {/* Aba Eventos */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gerenciar Eventos</h2>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de Eventos */}
              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle>Eventos Cadastrados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedEvent === event.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedEvent(event.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge variant="outline">{event.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                        <div className="flex justify-between text-sm">
                          <span>{event.booked}/{event.capacity} participantes</span>
                          <span className="font-medium text-primary">R$ {event.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Formulário de Evento */}
              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle>Criar/Editar Evento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título do Evento</Label>
                    <Input id="title" placeholder="Nome do evento" />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descrição detalhada do evento" rows={3} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Horário</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Local</Label>
                    <Input id="location" placeholder="Endereço do evento" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Capacidade</Label>
                      <Input id="capacity" type="number" placeholder="150" />
                    </div>
                    <div>
                      <Label htmlFor="price">Preço por Pessoa</Label>
                      <Input id="price" type="number" placeholder="150.00" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casamento">Casamento</SelectItem>
                        <SelectItem value="corporativo">Corporativo</SelectItem>
                        <SelectItem value="aniversario">Aniversário</SelectItem>
                        <SelectItem value="formatura">Formatura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="gradient" className="w-full">
                    Salvar Evento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Mesas */}
          <TabsContent value="tables" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Configurar Mesas</h2>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Nova Mesa
              </Button>
            </div>

            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Tipos de Mesa Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Mesa VIP", capacity: 8, price: 200, color: "bg-yellow-500" },
                    { name: "Mesa Premium", capacity: 8, price: 180, color: "bg-purple-500" },
                    { name: "Mesa Standard", capacity: 8, price: 150, color: "bg-blue-500" },
                    { name: "Mesa Família", capacity: 10, price: 170, color: "bg-green-500" },
                  ].map((table, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-4 h-4 rounded-full ${table.color}`}></div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold mb-1">{table.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {table.capacity} pessoas • R$ {table.price}/pessoa
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Agendamentos */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Agendamentos Recentes</h2>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="confirmed">Confirmados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { id: "1", user: "Maria Silva", event: "Casamento Elegante", table: "Mesa VIP", amount: 1600, status: "Confirmado" },
                    { id: "2", user: "João Santos", event: "Conferência Corp.", table: "Mesa Premium", amount: 1440, status: "Pendente" },
                    { id: "3", user: "Ana Costa", event: "Casamento Elegante", table: "Mesa Standard", amount: 1200, status: "Confirmado" },
                  ].map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.user}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.event} • {booking.table}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {booking.amount}</p>
                        <Badge 
                          variant={booking.status === "Confirmado" ? "default" : "outline"}
                          className="text-xs"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;