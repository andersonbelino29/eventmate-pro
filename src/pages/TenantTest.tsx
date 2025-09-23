import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TenantTest = () => {
  const { currentTenant } = useTenant();

  if (!currentTenant) {
    return <div>Nenhum tenant selecionado</div>;
  }

  const itemConfig = currentTenant.itemConfig;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Configuração do Tenant</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{currentTenant.name}</CardTitle>
            <Badge variant="outline">{currentTenant.subdomain}</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Tipo de Item:</strong> {itemConfig?.type}
              </div>
              <div>
                <strong>Singular:</strong> {itemConfig?.singular}
              </div>
              <div>
                <strong>Plural:</strong> {itemConfig?.plural}
              </div>
              <div>
                <strong>Requer Localização:</strong> {itemConfig?.requiresLocation ? 'Sim' : 'Não'}
              </div>
              <div>
                <strong>Requer Capacidade:</strong> {itemConfig?.requiresCapacity ? 'Sim' : 'Não'}
              </div>
              <div>
                <strong>Label Capacidade:</strong> {itemConfig?.capacityLabel}
              </div>
              <div>
                <strong>Label Preço:</strong> {itemConfig?.priceLabel}
              </div>
              <div>
                <strong>Pagamento Habilitado:</strong> {currentTenant.paymentConfig?.enabled ? 'Sim' : 'Não'}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Links de Teste - Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/admin/events/new">
                <Button variant="outline" className="w-full">
                  Criar Evento ({itemConfig?.type})
                </Button>
              </Link>
              <Link to="/admin/items">
                <Button variant="outline" className="w-full">
                  Gerenciar {itemConfig?.plural}
                </Button>
              </Link>
              <Link to="/admin/reservations">
                <Button variant="outline" className="w-full">
                  Reservas
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links Outros Tenants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/villa/test">
                <Button variant="outline" className="w-full">
                  Villa (Mesas)
                </Button>
              </Link>
              <Link to="/arena/test">
                <Button variant="outline" className="w-full">
                  Arena (Ingressos)
                </Button>
              </Link>
              <Link to="/spaces/test">
                <Button variant="outline" className="w-full">
                  Spaces (Áreas)
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TenantTest;