import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowRight, Check } from "lucide-react";
import { useTenant } from "@/hooks/useTenant";
import { useNavigate } from "react-router-dom";

const TenantSelector = () => {
  const { tenants, currentTenant, setCurrentTenant } = useTenant();
  const navigate = useNavigate();

  const handleSelectTenant = (tenant: any) => {
    setCurrentTenant(tenant);
    // Redirecionar para a home do tenant
    navigate(`/${tenant.subdomain}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-primary mr-3" />
            <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EventBook
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Selecione sua Plataforma</h1>
          <p className="text-muted-foreground text-lg">
            Escolha a empresa de eventos que você deseja acessar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <Card 
              key={tenant.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-elegant border-2 ${
                currentTenant?.id === tenant.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectTenant(tenant)}
            >
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center"
                       style={{
                         background: `linear-gradient(135deg, hsl(${tenant.primaryColor || '263 70% 50%'}), hsl(${tenant.secondaryColor || '280 70% 60%'}))`
                       }}>
                    {tenant.logo ? (
                      <img src={tenant.logo} alt={tenant.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <Building2 className="w-8 h-8 text-white" />
                    )}
                  </div>
                  {currentTenant?.id === tenant.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {tenant.name}
                </CardTitle>
                <Badge variant="outline" className="mx-auto">
                  {tenant.subdomain}.eventbook.com
                </Badge>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 text-sm">
                  Acesse a plataforma de eventos da {tenant.name} e descubra experiências únicas
                </p>
                
                <Button 
                  variant={currentTenant?.id === tenant.id ? "default" : "outline"}
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {currentTenant?.id === tenant.id ? 'Acessar' : 'Selecionar'}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou sua empresa? Entre em contato conosco.
          </p>
          <Button variant="outline">
            Solicitar Nova Plataforma
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantSelector;