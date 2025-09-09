import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Shield, Zap, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EventBook Platform
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/select-tenant">
                <Button variant="outline">
                  Acessar Plataforma
                </Button>
              </Link>
              <Button variant="gradient">
                Começar Agora
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Plataforma Completa de
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Eventos Multi-Tenant
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ofereça uma experiência única de agendamento de eventos para seus clientes. 
              Uma plataforma, múltiplas empresas, infinitas possibilidades.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/select-tenant">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  Explorar Plataformas
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Ver Demonstração
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-primary">50+</div>
                <div className="text-muted-foreground">Empresas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-primary">10k+</div>
                <div className="text-muted-foreground">Eventos Organizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-primary">100k+</div>
                <div className="text-muted-foreground">Participantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-primary">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recursos da Plataforma</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para oferecer a melhor experiência de eventos aos seus clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-card border-0 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Tenant</h3>
                <p className="text-muted-foreground">
                  Cada cliente possui sua própria instância isolada com marca personalizada
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Gestão Completa</h3>
                <p className="text-muted-foreground">
                  Criação, edição e gerenciamento completo de eventos e participantes
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pagamentos Seguros</h3>
                <p className="text-muted-foreground">
                  Integração com PagarMe para transações seguras e confiáveis
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Alta Performance</h3>
                <p className="text-muted-foreground">
                  Plataforma otimizada para suportar milhares de usuários simultâneos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como a EventBook Platform pode 
            transformar o negócio de eventos da sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              Agendar Demonstração
            </Button>
            <Link to="/select-tenant">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                Explorar Plataformas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">EventBook Platform</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 EventBook Platform. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;