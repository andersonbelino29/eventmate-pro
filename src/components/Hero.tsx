import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, ArrowRight } from "lucide-react";
import heroEvents from "@/assets/hero-events.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroEvents} 
          alt="Eventos elegantes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-primary-glow/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-primary-glow mr-3 animate-pulse" />
            <span className="text-primary-glow font-medium tracking-wide">
              Plataforma de Agendamento de Eventos
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Organize Seus
            <span className="block bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
              Eventos Perfeitos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Descubra, agende e pague por eventos incríveis. Gestão completa de mesas, 
            participantes e pagamentos em uma única plataforma.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="group text-lg px-8 py-6 animate-pulse-glow"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Explorar Eventos
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
            >
              Área Administrativa
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80">Eventos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10k+</div>
              <div className="text-white/80">Participantes Felizes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-white/80">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;