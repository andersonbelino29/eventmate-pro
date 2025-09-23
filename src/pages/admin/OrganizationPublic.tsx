import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, MapPin, Users, Star, Clock, 
  ArrowRight, Building2, Phone, Mail, Globe, Search, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import eventWedding from "@/assets/event-wedding.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";
import eventBirthday from "@/assets/event-birthday.jpg";

// Página pública customizada de cada organização
const OrganizationPublic = () => {
  const { organization } = useAuth();
  const { currentTenant } = useTenant();
  
  // Usar os dados da organização ou tenant - priorizar currentTenant
  const orgData = currentTenant || organization;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  // Mock events data - com sistema de preços flexível
  const events = [
    {
      id: "1",
      title: "Casamento dos Sonhos",
      description: "Um evento de casamento dos sonhos com decoração luxuosa e cardápio gourmet",
      date: "15 de Dezembro, 2024",
      rawDate: "2024-12-15",
      time: "18:00",
      location: "Salão Principal",
      capacity: 200,
      availableSpots: 45,
      pricingType: "per_person" as const, // ou "per_table"
      price: 150, // preço por pessoa
      image: eventWedding,
      category: "Casamento"
    },
    {
      id: "2",
      title: "Festa Corporativa Tech Summit",
      description: "Evento corporativo com networking e apresentações tecnológicas",
      date: "20 de Março, 2024",
      rawDate: "2024-03-20",
      time: "19:00",
      location: "Auditório Premium",
      capacity: 150,
      availableSpots: 23,
      pricingType: "per_table" as const,
      tables: [
        { id: "1", name: "Mesa VIP", seats: 8, price: 120, available: 3 },
        { id: "2", name: "Mesa Standard", seats: 8, price: 80, available: 10 }
      ],
      image: eventCorporate,
      category: "Corporativo"
    },
    {
      id: "3",
      title: "Aniversário de 50 Anos",
      description: "Celebração especial com música ao vivo e gastronomia exclusiva",
      date: "25 de Março, 2024",
      rawDate: "2024-03-25",
      time: "16:00",
      location: "Jardim Encantado",
      capacity: 80,
      availableSpots: 12,
      pricingType: "per_person" as const,
      price: 120,
      image: eventBirthday,
      category: "Aniversário"
    }
  ];

  // Get unique categories
  const categories = [...new Set(events.map(event => event.category))];

  // Filter events based on search term, category, and date
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = searchTerm === "" || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      
      const matchesDate = selectedDate === "" || event.rawDate === selectedDate;
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [events, searchTerm, selectedCategory, selectedDate]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Custom styled header with organization branding */}
      <header 
        className="relative py-20 overflow-hidden"
        style={{
          background: currentTenant?.primaryColor && currentTenant?.secondaryColor 
            ? `linear-gradient(135deg, hsl(${currentTenant.primaryColor}), hsl(${currentTenant.secondaryColor}))`
            : 'linear-gradient(135deg, hsl(263 70% 50%), hsl(280 70% 60%))'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center mb-6">
            {currentTenant?.logo ? (
              <img 
                src={currentTenant.logo} 
                alt={currentTenant.name} 
                className="h-20 w-20 rounded-full object-cover border-4 border-white/20 mr-4"
              />
            ) : (
              <Building2 className="h-16 w-16 mr-4" />
            )}
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-2">
                {currentTenant?.name || 'Sua Organização'}
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
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => scrollToSection('eventos')}
              >
                <Calendar className="h-5 w-5 mr-2" />
                {currentTenant?.heroConfig?.buttonText || 'Ver Eventos Disponíveis'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => scrollToSection('contato')}
              >
                <Phone className="h-5 w-5 mr-2" />
                Falar Conosco
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Events Section */}
      <section id="eventos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Eventos Disponíveis</Badge>
            <h2 className="text-4xl font-bold mb-4">Nossos Próximos Eventos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra experiências únicas e reserve seu lugar em eventos especiais
            </p>
          </div>

          {/* Event Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Filtrar Eventos</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buscar por nome</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Nome do evento..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
              
              {(searchTerm || selectedCategory !== "all" || selectedDate) && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredEvents.length} evento(s) encontrado(s)
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedDate("");
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  capacity={event.capacity}
                  availableSpots={event.availableSpots}
                  price={event.price}
                  pricingType={event.pricingType}
                  tables={event.tables}
                  image={event.image}
                  category={event.category}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros para encontrar eventos
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedDate("");
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      {currentTenant?.aboutPage?.visible && (
        <section id="sobre" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Sobre Nós</Badge>
                <h2 className="text-4xl font-bold mb-6">
                  {currentTenant.aboutPage.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {currentTenant.aboutPage.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {currentTenant.aboutPage.stats?.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <Button size="lg" onClick={() => scrollToSection('contato')}>
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
      )}

      {/* Contact Section */}
      {currentTenant?.contactPage?.visible && (
        <section id="contato" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Contato</Badge>
              <h2 className="text-4xl font-bold mb-4">
                {currentTenant.contactPage.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {currentTenant.contactPage.description}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                  <p className="text-muted-foreground">{currentTenant.contactPage.phone}</p>
                </div>
                <div className="text-center">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">{currentTenant.contactPage.email}</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Endereço</h3>
                  <p className="text-muted-foreground">{currentTenant.contactPage.address}</p>
                </div>
              </div>
              
              {currentTenant.contactPage.businessHours && currentTenant.contactPage.businessHours.length > 0 && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Horário de Funcionamento</h3>
                  <div className="space-y-2">
                    {currentTenant.contactPage.businessHours.map((hour, index) => (
                      <div key={index} className="flex justify-center items-center space-x-2">
                        <span className="font-medium">{hour.day}:</span>
                        <span className="text-muted-foreground">{hour.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        className="py-20 text-white relative overflow-hidden"
        style={{
          background: currentTenant?.primaryColor && currentTenant?.secondaryColor 
            ? `linear-gradient(135deg, hsl(${currentTenant.primaryColor}), hsl(${currentTenant.secondaryColor}))`
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
              <button
                onClick={() => scrollToSection('contato')}
                className="inline-flex items-center"
              >
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Telefone
                </Button>
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="inline-flex items-center"
              >
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </button>
              {currentTenant?.aboutPage?.visible && (
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="inline-flex items-center"
                >
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Sobre Nós
                  </Button>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrganizationPublic;