import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, Building2, Star, Trophy, Zap, Shield, 
  TrendingUp, Users, Calendar, CreditCard, BarChart3, 
  HeadphonesIcon, Globe, Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "Por mês",
      description: "Perfeito para começar",
      features: [
        "Até 50 eventos por mês",
        "Gestão básica de participantes",
        "Subdomínio personalizado",
        "Suporte por email",
        "Templates básicos",
        "Relatórios simples"
      ],
      popular: false,
      cta: "Começar Gratuitamente",
      variant: "outline" as const
    },
    {
      name: "Profissional",
      price: "R$ 97",
      period: "Por mês",
      description: "Para empresas em crescimento",
      features: [
        "Eventos ilimitados",
        "Gestão avançada de participantes",
        "Domínio personalizado",
        "Relatórios e analytics completos",
        "Integração com pagamentos",
        "Templates premium",
        "Suporte prioritário",
        "Marca personalizada",
        "API básica"
      ],
      popular: true,
      cta: "Começar Teste Gratuito",
      variant: "default" as const
    },
    {
      name: "Enterprise",
      price: "R$ 297",
      period: "Por mês",
      description: "Para grandes organizações",
      features: [
        "Tudo do Profissional",
        "Marca branca completa",
        "API personalizada",
        "Integração personalizada",
        "Suporte dedicado",
        "SLA garantido",
        "Consultoria especializada",
        "Treinamento da equipe",
        "Recursos customizados"
      ],
      popular: false,
      cta: "Falar com Vendas",
      variant: "outline" as const
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Gestão Completa de Eventos",
      description: "Crie, edite e gerencie eventos com facilidade total"
    },
    {
      icon: Users,
      title: "Controle de Participantes",
      description: "Gerencie inscrições, confirmações e check-ins"
    },
    {
      icon: CreditCard,
      title: "Pagamentos Integrados",
      description: "Receba pagamentos de forma segura e automatizada"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Relatórios detalhados e insights em tempo real"
    },
    {
      icon: Globe,
      title: "Multi-tenant",
      description: "Múltiplas organizações em uma única plataforma"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Dados protegidos com criptografia de ponta"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EventBook Platform
              </span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            <Star className="h-4 w-4 mr-2" />
            Planos Transparentes
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Escolha o Plano
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Perfeito para Você
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Comece gratuitamente e escale conforme seu negócio cresce. 
            Sem taxas ocultas, sem pegadinhas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">14 dias</div>
              <div className="text-sm text-muted-foreground">Teste grátis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative ${
                  plan.popular 
                    ? 'border-2 border-primary bg-primary/5 scale-105' 
                    : 'border-2 border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Trophy className="h-4 w-4 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold mb-2">{plan.price}</div>
                  <p className="text-muted-foreground mb-4">{plan.period}</p>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/login" className="block">
                    <Button variant={plan.variant} className="w-full" size="lg">
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Recursos Inclusos</Badge>
            <h2 className="text-4xl font-bold mb-4">Tudo que Você Precisa</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos poderosos para gerenciar eventos de forma profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 text-center p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Dúvidas Frequentes</Badge>
            <h2 className="text-4xl font-bold mb-4">Perguntas & Respostas</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso mudar de plano a qualquer momento?</h3>
                <p className="text-muted-foreground">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As mudanças são aplicadas imediatamente.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como funciona o teste gratuito?</h3>
                <p className="text-muted-foreground">
                  O teste gratuito de 14 dias inclui todos os recursos do plano Profissional, 
                  sem limitações. Não é necessário cartão de crédito.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-muted-foreground">
                  Absolutamente! Não há contratos de fidelidade. Você pode cancelar sua 
                  assinatura a qualquer momento através do painel administrativo.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Há limite de eventos no plano gratuito?</h3>
                <p className="text-muted-foreground">
                  O plano gratuito permite até 50 eventos por mês. Para eventos ilimitados, 
                  considere o plano Profissional.
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
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já revolucionaram seus eventos. 
            Comece seu teste gratuito hoje!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                <Zap className="h-5 w-5 mr-2" />
                Começar Teste Gratuito
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              <HeadphonesIcon className="h-5 w-5 mr-2" />
              Falar com Vendas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">EventBook Platform</span>
            </Link>
            <p className="text-muted-foreground">
              © 2024 EventBook Platform. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;