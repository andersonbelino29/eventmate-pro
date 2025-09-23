import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, MapPin, Users, Star, Clock, 
  ArrowRight, Building2, Phone, Mail, Globe
} from "lucide-react";
import { Link } from "react-router-dom";

// Página pública customizada de cada organização
const OrganizationPublic = () => {
  const { organization } = useAuth();
  const { currentTenant } = useTenant();
  
  // Usar os dados da organização ou tenant
  const orgData = organization || currentTenant;

  // Mock events data
  const events = [
    {
      id: 1,
      name: "Casamento dos Sonhos",
      date: "2024-03-15",
      time: "18:00",
      location: "Salão Principal",
      price: "R$ 150",
      category: "Casamento",
      capacity: 200,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Festa Corporativa Tech Summit",
      date: "2024-03-20",
      time: "19:00",
      location: "Auditório Premium",
      price: "R$ 80",
      category: "Corporativo",
      capacity: 150,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Aniversário de 50 Anos",
      date: "2024-03-25",
      time: "16:00",
      location: "Jardim Encantado",
      price: "R$ 120",
      category: "Aniversário", 
      capacity: 80,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Custom styled header with organization branding */}
      <header 
        className="relative py-20 overflow-hidden"
        style={{
          background: orgData?.primaryColor && orgData?.secondaryColor 
            ? `linear-gradient(135deg, hsl(${orgData.primaryColor}), hsl(${orgData.secondaryColor}))`
            : 'linear-gradient(135deg, hsl(263 70% 50%), hsl(280 70% 60%))'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center mb-6">
            {orgData?.logo ? (
              <img 
                src={orgData.logo} 
                alt={orgData.name} 
                className="h-20 w-20 rounded-full object-cover border-4 border-white/20 mr-4"
              />
            ) : (
              <Building2 className="h-16 w-16 mr-4" />
            )}
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-2">
                {orgData?.name || 'Sua Organização'}
              </h1>
              <p className="text-xl opacity-90">
                Eventos inesquecíveis para momentos especiais
              </p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg opacity-90 mb-8">
              Criamos experiências únicas e memoráveis para seus eventos mais importantes. 
              Com mais de 10 anos de experiência no mercado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                <Calendar className="h-5 w-5 mr-2" />
                Ver Eventos Disponíveis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                <Phone className="h-5 w-5 mr-2" />
                Falar Conosco
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Eventos Disponíveis</Badge>
            <h2 className="text-4xl font-bold mb-4">Nossos Próximos Eventos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra experiências únicas e reserve seu lugar em eventos especiais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="group cursor-pointer hover:shadow-elegant transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge>{event.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="font-bold text-primary">{event.price}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {event.name}
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Até {event.capacity} pessoas
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Ver Detalhes & Reservar
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Sobre Nós</Badge>
              <h2 className="text-4xl font-bold mb-6">
                {orgData?.name}: Tradição em Eventos
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Com mais de uma década de experiência, somos especialistas em criar 
                momentos únicos e inesquecíveis. Nossa equipe dedicada trabalha para 
                transformar seus sonhos em realidade.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Eventos Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10k+</div>
                  <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.9</div>
                  <div className="text-sm text-muted-foreground">Avaliação Média</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
              
              <Button size="lg">
                <Mail className="h-5 w-5 mr-2" />
                Entre em Contato
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=400&fit=crop" 
                alt="Eventos"
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=300&h=200&fit=crop" 
                alt="Celebrações"
                className="rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f29c8ae8a4?w=300&h=200&fit=crop" 
                alt="Casamentos"
                className="rounded-lg shadow-lg -mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1540479859555-17af45c78602?w=300&h=400&fit=crop" 
                alt="Corporativo"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 text-white relative overflow-hidden"
        style={{
          background: orgData?.primaryColor && orgData?.secondaryColor 
            ? `linear-gradient(135deg, hsl(${orgData.primaryColor}), hsl(${orgData.secondaryColor}))`
            : 'linear-gradient(135deg, hsl(263 70% 50%), hsl(280 70% 60%))'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Criar Memórias Especiais?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Entre em contato conosco e vamos planejar juntos o evento dos seus sonhos. 
            Estamos aqui para tornar cada momento único e inesquecível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Phone className="h-5 w-5 mr-2" />
              (11) 9999-9999
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              <Mail className="h-5 w-5 mr-2" />
              contato@{orgData?.subdomain}.com
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {orgData?.logo ? (
                <img 
                  src={orgData.logo} 
                  alt={orgData.name} 
                  className="h-8 w-8 rounded mr-2"
                />
              ) : (
                <Building2 className="h-8 w-8 text-primary mr-2" />
              )}
              <span className="text-xl font-bold">{orgData?.name}</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 {orgData?.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Telefone
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrganizationPublic;