import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Calendar, User, Settings, Building2, ArrowLeft, Menu, X, LogOut } from "lucide-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useTenant } from "@/hooks/useTenant";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTenant } = useTenant();
  const { user, logout } = useAuth();
  const { tenantSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const basePath = tenantSlug ? `/${tenantSlug}` : "";
  const isPublicPage = !location.pathname.includes('/admin');

  const handleLogout = () => {
    logout();
    navigate(basePath || '/');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };
  
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={basePath || "/"} className="flex items-center space-x-2">
            {currentTenant ? (
              <>
                {currentTenant.logo ? (
                  <img 
                    src={currentTenant.logo} 
                    alt={currentTenant.name} 
                    className="h-8 w-8 rounded object-cover"
                  />
                ) : (
                  <Building2 className="h-8 w-8 text-primary" />
                )}
                <span 
                  className="text-2xl font-bold"
                  style={{
                    background: currentTenant.primaryColor && currentTenant.secondaryColor 
                      ? `linear-gradient(135deg, hsl(${currentTenant.primaryColor}), hsl(${currentTenant.secondaryColor}))`
                      : 'linear-gradient(135deg, hsl(263 70% 50%), hsl(280 70% 60%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {currentTenant.name}
                </span>
              </>
            ) : (
              <>
                <Calendar className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  EventBook
                </span>
              </>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          {isPublicPage && currentTenant && (
            <div className="hidden md:flex items-center space-x-6">
              <Link to={basePath} className="text-foreground hover:text-primary transition-colors">
                Eventos
              </Link>
              
              {currentTenant.aboutPage?.visible && (
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Sobre
                </button>
              )}
              
              {currentTenant.contactPage?.visible && (
                <button
                  onClick={() => scrollToSection('contato')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Contato
                </button>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            {isPublicPage ? (
              <>
                {user ? (
                  <div className="hidden md:flex items-center space-x-4">
                    <Link to={`${basePath}/minhas-reservas`}>
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Minhas Reservas
                      </Button>
                    </Link>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="relative">
                          <User className="h-4 w-4 mr-2" />
                          {user.name}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`${basePath}/minhas-reservas`}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Minhas Reservas
                          </Link>
                        </DropdownMenuItem>
                        {user.role === 'admin' && (
                          <DropdownMenuItem asChild>
                            <Link to="/admin">
                              <Settings className="h-4 w-4 mr-2" />
                              Administração
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sair
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <Link to={`${basePath}/login`}>
                      <Button variant="ghost" size="sm">
                        Entrar
                      </Button>
                    </Link>
                    <Link to={`${basePath}/login`}>
                      <Button size="sm">
                        Cadastrar
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-foreground hover:text-primary focus:outline-none"
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
                
                {!currentTenant && (
                  <Link to="/select-tenant">
                    <Button variant="outline" size="sm">
                      <Building2 className="h-4 w-4 mr-2" />
                      Trocar Empresa
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to={basePath}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Site Público
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && isPublicPage && currentTenant && (
          <div className="md:hidden mt-4 pb-4">
            <div className="space-y-2">
              <Link
                to={basePath}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Eventos
              </Link>
              
              {currentTenant.aboutPage?.visible && (
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors"
                >
                  Sobre
                </button>
              )}
              
              {currentTenant.contactPage?.visible && (
                <button
                  onClick={() => scrollToSection('contato')}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors"
                >
                  Contato
                </button>
              )}

              {user ? (
                <>
                  <Link
                    to={`${basePath}/minhas-reservas`}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Minhas Reservas
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Administração
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link 
                    to={`${basePath}/login`}
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Entrar
                    </Button>
                  </Link>
                  <Link 
                    to={`${basePath}/login`}
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button size="sm" className="w-full">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;