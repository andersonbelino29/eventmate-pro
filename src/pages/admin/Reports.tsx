import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  BarChart3, ArrowLeft, Download, Calendar, DollarSign, 
  Users, TrendingUp, Filter, FileText, Mail, Printer,
  Eye, CheckCircle, AlertCircle, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 15000, events: 12, participants: 450 },
    { month: 'Fev', revenue: 18000, events: 15, participants: 580 },
    { month: 'Mar', revenue: 22000, events: 18, participants: 720 },
    { month: 'Abr', revenue: 19000, events: 16, participants: 650 },
    { month: 'Mai', revenue: 25000, events: 20, participants: 820 },
    { month: 'Jun', revenue: 28000, events: 22, participants: 950 }
  ];

  const eventsByCategory = [
    { name: 'Casamentos', value: 35, count: 14, color: '#8884d8' },
    { name: 'Corporativo', value: 25, count: 10, color: '#82ca9d' },
    { name: 'Aniversários', value: 20, count: 8, color: '#ffc658' },
    { name: 'Formaturas', value: 12, count: 5, color: '#ff7300' },
    { name: 'Outros', value: 8, count: 3, color: '#00ff00' }
  ];

  const recentTransactions = [
    {
      id: 1,
      eventName: "Casamento dos Sonhos",
      customerName: "Maria Silva",
      amount: 1200,
      status: "Pago",
      date: "2024-02-15",
      paymentMethod: "Cartão de Crédito"
    },
    {
      id: 2,
      eventName: "Tech Summit 2024",
      customerName: "João Santos",
      amount: 900,
      status: "Pendente",
      date: "2024-02-14",
      paymentMethod: "PIX"
    },
    {
      id: 3,
      eventName: "Aniversário 50 Anos",
      customerName: "Ana Costa",
      amount: 600,
      status: "Pago",
      date: "2024-02-13",
      paymentMethod: "Boleto"
    },
    {
      id: 4,
      eventName: "Workshop Culinária",
      customerName: "Pedro Lima",
      amount: 350,
      status: "Cancelado",
      date: "2024-02-12",
      paymentMethod: "Cartão de Débito"
    }
  ];

  const topEvents = [
    {
      id: 1,
      name: "Casamento dos Sonhos",
      revenue: 15000,
      participants: 200,
      occupancy: 100,
      date: "2024-03-15"
    },
    {
      id: 2,
      name: "Tech Summit 2024",
      revenue: 12000,
      participants: 150,
      occupancy: 95,
      date: "2024-03-20"
    },
    {
      id: 3,
      name: "Formatura Medicina",
      revenue: 8500,
      participants: 120,
      occupancy: 90,
      date: "2024-03-25"
    }
  ];

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Pago':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Pago</Badge>;
      case 'Pendente':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'Cancelado':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalEvents = monthlyRevenue.reduce((sum, month) => sum + month.events, 0);
  const totalParticipants = monthlyRevenue.reduce((sum, month) => sum + month.participants, 0);
  const averagePerEvent = totalRevenue / totalEvents;

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
                <BarChart3 className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Relatórios e Analytics</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Enviar por Email
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros do Relatório</CardTitle>
            <CardDescription>
              Configure o período e tipo de relatório desejado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Período</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                    <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                    <SelectItem value="last3months">Últimos 3 meses</SelectItem>
                    <SelectItem value="last6months">Últimos 6 meses</SelectItem>
                    <SelectItem value="lastyear">Último ano</SelectItem>
                    <SelectItem value="custom">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedPeriod === 'custom' && (
                <>
                  <div className="space-y-2">
                    <Label>Data Inicial</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Data Final</Label>
                    <Input type="date" />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% vs período anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total de Eventos</p>
                  <p className="text-2xl font-bold">{totalEvents}</p>
                  <p className="text-xs text-blue-600">+8% vs período anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Participantes</p>
                  <p className="text-2xl font-bold">{totalParticipants.toLocaleString()}</p>
                  <p className="text-xs text-purple-600">+15% vs período anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
                  <p className="text-2xl font-bold">R$ {Math.round(averagePerEvent).toLocaleString()}</p>
                  <p className="text-xs text-orange-600">+5% vs período anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>
                    Evolução da receita nos últimos 6 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`R$ ${value.toLocaleString()}`, 'Receita']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Events by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Eventos por Categoria</CardTitle>
                  <CardDescription>
                    Distribuição dos tipos de eventos realizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={eventsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {eventsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Events */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos de Maior Sucesso</CardTitle>
                <CardDescription>
                  Os eventos com melhor performance no período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Evento</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Receita</TableHead>
                        <TableHead>Participantes</TableHead>
                        <TableHead>Ocupação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topEvents.map((event, index) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-primary">#{index + 1}</span>
                              </div>
                              <span className="font-medium">{event.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">R$ {event.revenue.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              {event.participants}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={event.occupancy === 100 ? "default" : "secondary"}>
                              {event.occupancy}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Events Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita vs Número de Eventos</CardTitle>
                  <CardDescription>
                    Comparação entre receita e quantidade de eventos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Receita (R$)" />
                      <Bar yAxisId="right" dataKey="events" fill="#82ca9d" name="Eventos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pagamento</CardTitle>
                  <CardDescription>
                    Distribuição dos métodos de pagamento utilizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                        <span>Cartão de Crédito</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">45%</div>
                        <div className="text-sm text-muted-foreground">R$ 67.500</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                        <span>PIX</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">30%</div>
                        <div className="text-sm text-muted-foreground">R$ 45.000</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                        <span>Boleto</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">20%</div>
                        <div className="text-sm text-muted-foreground">R$ 30.000</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                        <span>Cartão de Débito</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">5%</div>
                        <div className="text-sm text-muted-foreground">R$ 7.500</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>
                  Últimas movimentações financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Evento</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="font-medium">{transaction.eventName}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{transaction.customerName}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">R$ {transaction.amount}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.paymentMethod}</Badge>
                          </TableCell>
                          <TableCell>
                            {getPaymentStatusBadge(transaction.status)}
                          </TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Events Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance dos Eventos</CardTitle>
                  <CardDescription>
                    Número de eventos e participantes por mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="events" 
                        stroke="#8884d8" 
                        name="Eventos"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="participants" 
                        stroke="#82ca9d" 
                        name="Participantes"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Event Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Eventos</CardTitle>
                  <CardDescription>
                    Distribuição atual dos eventos por status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span>Confirmados</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">32</div>
                        <div className="text-sm text-muted-foreground">80%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                        <span>Pendentes</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">5</div>
                        <div className="text-sm text-muted-foreground">12.5%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-600 mr-3" />
                        <span>Rascunhos</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">3</div>
                        <div className="text-sm text-muted-foreground">7.5%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Acquisition */}
              <Card>
                <CardHeader>
                  <CardTitle>Aquisição de Clientes</CardTitle>
                  <CardDescription>
                    Novos clientes por mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="participants" fill="#8884d8" name="Novos Clientes" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Customer Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>Retenção de Clientes</CardTitle>
                  <CardDescription>
                    Taxa de clientes que retornaram
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">68%</div>
                    <div className="text-muted-foreground mb-4">Taxa de Retenção</div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 border rounded">
                        <div className="text-2xl font-bold">245</div>
                        <div className="text-sm text-muted-foreground">Clientes Recorrentes</div>
                      </div>
                      <div className="text-center p-4 border rounded">
                        <div className="text-2xl font-bold">115</div>
                        <div className="text-sm text-muted-foreground">Novos Clientes</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;