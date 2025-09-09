import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import eventWedding from "@/assets/event-wedding.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";
import eventBirthday from "@/assets/event-birthday.jpg";

const Index = () => {
  // Mock data - será substituído por dados do Supabase
  const events = [
    {
      id: "1",
      title: "Casamento Elegante - Salon Premium",
      description: "Um evento de casamento dos sonhos com decoração luxuosa, cardápio gourmet e ambientação única para celebrar o amor.",
      date: "15 de Dezembro, 2024",
      time: "18:00 - 23:00",
      location: "Espaço Villa Eventos - São Paulo",
      capacity: 150,
      availableSpots: 45,
      price: 150.00,
      image: eventWedding,
      category: "Casamento"
    },
    {
      id: "2", 
      title: "Conferência Tech Innovation 2024",
      description: "Evento corporativo com palestras inspiradoras, networking de qualidade e as últimas tendências em tecnologia e inovação.",
      date: "20 de Dezembro, 2024",
      time: "09:00 - 17:00",
      location: "Centro de Convenções - São Paulo",
      capacity: 200,
      availableSpots: 67,
      price: 89.00,
      image: eventCorporate,
      category: "Corporativo"
    },
    {
      id: "3",
      title: "Festa de Aniversário Temática",
      description: "Celebração especial com decoração personalizada, entretenimento para todas as idades e buffet completo.",
      date: "28 de Dezembro, 2024", 
      time: "15:00 - 22:00",
      location: "Buffet Alegria - São Paulo",
      capacity: 100,
      availableSpots: 23,
      price: 75.00,
      image: eventBirthday,
      category: "Aniversário"
    }
  ];

  const categories = ["Todos", "Casamento", "Corporativo", "Aniversário", "Formatura"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Seção de Filtros e Busca */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Encontre o Evento Perfeito</h2>
              <p className="text-muted-foreground">Descubra experiências únicas e inesquecíveis</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-elegant border-0">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar eventos..." 
                    className="pl-10 border-border"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Localização" 
                    className="pl-10 w-full md:w-48 border-border"
                  />
                </div>
                <Button variant="gradient">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </div>
              
              <div className="flex gap-2 mt-4 flex-wrap">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Eventos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Eventos em Destaque</h2>
            <Button variant="outline">Ver Todos</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Features */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-glow/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que escolher nossa plataforma?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos a melhor experiência para organização e participação em eventos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Localização Premium</h3>
              <p className="text-muted-foreground">
                Eventos em locais cuidadosamente selecionados para garantir a melhor experiência
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
              <p className="text-muted-foreground">
                Encontre exatamente o que procura com nosso sistema de busca avançado
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagamento Seguro</h3>
              <p className="text-muted-foreground">
                Transações protegidas com criptografia e integração com PagarMe
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
