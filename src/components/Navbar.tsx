import { Button } from "@/components/ui/button";
import { Calendar, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EventBook
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Eventos
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contato
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
            <Button variant="gradient" size="sm">
              Cadastrar
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;