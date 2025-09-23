import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, Users, Star, Calendar, Award, 
  MapPin, Phone, Mail, Globe 
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const About = () => {
  const { currentTenant } = useTenant();
  
  // Usar configurações do tenant ou valores padrão
  const aboutConfig = currentTenant?.aboutPage || {
    visible: true,
    title: "Sobre Nós",
    subtitle: "Nossa História e Missão",
    description: `Somos uma empresa especializada em criar experiências únicas e memoráveis através de eventos excepcionais. 
    Com anos de experiência no mercado, nossa equipe dedicada trabalha incansavelmente para transformar seus sonhos em realidade.`,
    mission: "Criar momentos inesquecíveis que conectam pessoas e celebram a vida.",
    vision: "Ser reconhecida como a principal referência em eventos exclusivos e personalizados.",
    values: [
      "Excelência em cada detalhe",
      "Compromisso com a qualidade",
      "Inovação constante",
      "Atendimento personalizado"
    ],
    stats: [
      { label: "Anos de Experiência", value: "10+" },
      { label: "Eventos Realizados", value: "500+" },
      { label: "Clientes Satisfeitos", value: "2000+" },
      { label: "Avaliação Média", value: "4.9" }
    ],
    team: [
      {
        name: "Ana Silva",
        role: "Diretora Geral",
        description: "Especialista em eventos corporativos com mais de 15 anos de experiência."
      },
      {
        name: "Carlos Santos",
        role: "Coordenador de Eventos",
        description: "Expert em logística e organização de grandes celebrações."
      },
      {
        name: "Marina Costa",
        role: "Designer de Experiências",
        description: "Responsável pela criação de ambientações únicas e memoráveis."
      }
    ]
  };

  // Se a página não está visível, redirecionar ou mostrar erro 404
  if (!aboutConfig.visible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-muted-foreground mb-8">Esta página não está disponível.</p>
          <Link to="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Sobre Nós</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {aboutConfig.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {aboutConfig.subtitle}
          </p>
        </div>

        {/* Descrição Principal */}
        <div className="mb-16">
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-8 text-center">
              <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
                {aboutConfig.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {aboutConfig.stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {aboutConfig.mission}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {aboutConfig.vision}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Nossos Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aboutConfig.values.map((value, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Equipe */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-xl text-muted-foreground">
              Profissionais dedicados e experientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutConfig.team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Pronto para Criar Algo Especial?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Entre em contato e vamos planejar juntos o evento dos seus sonhos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contato">
                  <Button variant="secondary" size="lg">
                    <Phone className="h-5 w-5 mr-2" />
                    Falar Conosco
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    <Calendar className="h-5 w-5 mr-2" />
                    Ver Eventos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;