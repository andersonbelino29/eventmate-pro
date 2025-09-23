import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Users, Shield, Zap, ArrowRight, Building2, 
  CheckCircle, Star, Trophy, TrendingUp, Globe, Smartphone,
  HeadphonesIcon, CreditCard, BarChart3, Settings
} from "lucide-react";
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
              <Link to="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="gradient">
                  Começar Gratuitamente
                </Button>
              </Link>
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
              <Link to="/pricing">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  <Zap className="h-5 w-5 mr-2" />
                  Começar Gratuitamente
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/select-tenant">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  Ver Demonstração
                </Button>
              </Link>
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
            <Badge variant="secondary" className="mb-4">Recursos Completos</Badge>
            <h2 className="text-4xl font-bold mb-4">Tudo que Você Precisa para Crescer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma completa com todas as ferramentas necessárias para gerenciar eventos de forma profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 text-center p-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Tenant</h3>
              <p className="text-muted-foreground">
                Cada cliente possui sua própria instância isolada com marca personalizada
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center p-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestão Completa</h3>
              <p className="text-muted-foreground">
                Criação, edição e gerenciamento completo de eventos e participantes
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center p-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pagamentos Seguros</h3>
              <p className="text-muted-foreground">
                Integração com PagarMe para transações seguras e confiáveis
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center p-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Design Responsivo</h3>
              <p className="text-muted-foreground">
                Interface otimizada para todos os dispositivos e tamanhos de tela
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center p-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Avançado</h3>
              <p className="text-muted-foreground">
                Relatórios detalhados e métricas em tempo real para suas decisões
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-0 text-center p-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Suporte Premium</h3>
              <p className="text-muted-foreground">
                Atendimento personalizado e suporte técnico especializado
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Planos Flexíveis</Badge>
            <h2 className="text-4xl font-bold mb-4">Escolha o Plano Ideal</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece gratuitamente e escale conforme seu negócio cresce
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
                  <div className="text-4xl font-bold mb-2">R$ 0</div>
                  <p className="text-muted-foreground">Por mês</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Até 50 eventos por mês</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Gestão básica de participantes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Subdomínio personalizado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Suporte por email</span>
                  </li>
                </ul>
                
                <Link to="/pricing" className="block">
                  <Button variant="outline" className="w-full">
                    Começar Gratuitamente
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-primary bg-primary/5">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  Mais Popular
                </Badge>
              </div>
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Profissional</h3>
                  <div className="text-4xl font-bold mb-2">R$ 97</div>
                  <p className="text-muted-foreground">Por mês</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Eventos ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Gestão avançada de participantes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Domínio personalizado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Relatórios e analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Integração com pagamentos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                
                <Link to="/pricing" className="block">
                  <Button className="w-full">
                    Começar Teste Gratuito
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative border-2 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold mb-2">R$ 297</div>
                  <p className="text-muted-foreground">Por mês</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Tudo do Profissional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Marca branca completa</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>API personalizada</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Integração personalizada</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Suporte dedicado</span>
                  </li>
                </ul>
                
                <Link to="/pricing" className="block">
                  <Button variant="outline" className="w-full">
                    Falar com Vendas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Depoimentos</Badge>
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "A plataforma revolucionou nossa forma de gerenciar eventos. Aumentamos nossa eficiência em 300%!"
                </p>
                <div className="font-semibold">Maria Silva</div>
                <div className="text-sm text-muted-foreground">Villa Eventos</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Interface intuitiva e suporte excepcional. Nossos clientes adoraram a nova experiência!"
                </p>
                <div className="font-semibold">João Santos</div>
                <div className="text-sm text-muted-foreground">Buffet Alegria</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "ROI incrível! Pagou-se em menos de 2 meses com o aumento de vendas online."
                </p>
                <div className="font-semibold">Ana Costa</div>
                <div className="text-sm text-muted-foreground">Centro Premium</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Revolucionar seus Eventos?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já transformaram sua gestão de eventos. 
            Comece gratuitamente hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                <Trophy className="h-5 w-5 mr-2" />
                Começar Gratuitamente
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Demonstração
            </Button>
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