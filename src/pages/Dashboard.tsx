import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Users, TrendingUp, DollarSign, BarChart3, 
  Plus, Settings, Eye, Edit, Trash2, Building2
} from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDialog";

const Dashboard = () => {
  const { user, organization } = useAuth();

  // Mock data
  const stats = [
    {
      title: "Eventos Ativos",
      value: "12",
      change: "+2 este mês",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Total de Participantes",
      value: "1,247",
      change: "+15% vs mês anterior",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Receita do Mês",
      value: "R$ 24.580",
      change: "+8% vs mês anterior",
      icon: DollarSign,
      color: "text-yellow-600"
    },
    {
      title: "Taxa de Conversão",
      value: "68%",
      change: "+5% vs mês anterior",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const recentEvents = [
    {
      id: 1,
      name: "Casamento dos Sonhos",
      date: "2024-02-15",
      participants: 150,
      status: "Confirmado",
      revenue: "R$ 8.500"
    },
    {
      id: 2,
      name: "Evento Corporativo Tech",
      date: "2024-02-20",
      participants: 80,
      status: "Pendente",
      revenue: "R$ 3.200"
    },
    {
      id: 3,
      name: "Festa de Aniversário",
      date: "2024-02-25",
      participants: 50,
      status: "Confirmado",
      revenue: "R$ 1.800"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <Badge variant="default">Confirmado</Badge>;
      case 'Pendente':
        return <Badge variant="secondary">Pendente</Badge>;
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
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">{organization?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo, {user?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to={`/${organization?.subdomain}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Site Público
                </Button>
              </Link>
              <Link to="/admin/events/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Evento
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral dos seus eventos e performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Eventos Recentes</CardTitle>
                    <CardDescription>
                      Seus eventos mais recentes e suas estatísticas
                    </CardDescription>
                  </div>
                  <Link to="/admin/events">
                    <Button variant="outline" size="sm">
                      Ver Todos
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('pt-BR')} • {event.participants} participantes
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">{event.revenue}</div>
                          {getStatusBadge(event.status)}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Link to={`/admin/events/${event.id}`}>
                            <Button variant="ghost" size="sm" title="Ver evento">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/events/${event.id}/edit`}>
                            <Button variant="ghost" size="sm" title="Editar evento">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <ConfirmDialog
                            title="Excluir Evento"
                            description={`Tem certeza que deseja excluir o evento "${event.name}"? Todas as reservas associadas também serão canceladas e os clientes serão notificados.`}
                            onConfirm={() => {
                              console.log('Excluindo evento:', event.id);
                              // TODO: Implementar exclusão real
                            }}
                          >
                            <Button variant="ghost" size="sm" title="Excluir evento">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </ConfirmDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesso rápido às principais funcionalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/admin/events/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Novo Evento
                  </Button>
                </Link>
                
                <Link to="/admin/events" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Gerenciar Eventos
                  </Button>
                </Link>
                
                <Link to="/admin/reservations" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Gerenciar Reservas
                  </Button>
                </Link>
                
                <Link to="/admin/reports" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Ver Relatórios
                  </Button>
                </Link>
                
                <Link to={`/${organization?.subdomain}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Site Público
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Sua Organização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-semibold">{organization?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subdomínio</p>
                    <p className="font-semibold">{organization?.subdomain}.eventbook.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plano</p>
                    <Badge variant={organization?.plan === 'free' ? 'secondary' : 'default'}>
                      {organization?.plan === 'free' ? 'Gratuito' : 
                       organization?.plan === 'pro' ? 'Profissional' : 'Enterprise'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={organization?.status === 'active' ? 'default' : 'secondary'}>
                      {organization?.status === 'active' ? 'Ativo' : 
                       organization?.status === 'trial' ? 'Teste' : 'Suspenso'}
                    </Badge>
                  </div>
                </div>
                
                <Link to="/admin/settings" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;