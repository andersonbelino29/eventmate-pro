import { Button } from "@/components/ui/button";
import { Calendar, User, Settings, Building2, ArrowLeft } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTenant } from "@/hooks/useTenant";

const Navbar = () => {
  const { currentTenant } = useTenant();
  const { tenantSlug } = useParams();
  const location = useLocation();
  
  const basePath = tenantSlug ? `/${tenantSlug}` : "";
  const isPublicPage = !location.pathname.includes('/admin');
  
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
          
          {/* Navegação pública */}
          {isPublicPage && currentTenant && (
            <div className="hidden md:flex items-center space-x-6">
              <Link to={basePath} className="text-foreground hover:text-primary transition-colors">
                Eventos
              </Link>
              
              {currentTenant.aboutPage?.visible && (
                <Link to={`${basePath}/sobre`} className="text-foreground hover:text-primary transition-colors">
                  Sobre
                </Link>
              )}
              
              {currentTenant.contactPage?.visible && (
                <Link to={`${basePath}/contato`} className="text-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            {isPublicPage ? (
              <>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button variant="gradient" size="sm">
                  Cadastrar
                </Button>
                <Link to={`${basePath}/admin`}>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
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
      </div>
    </nav>
  );
};

export default Navbar;