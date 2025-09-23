import { useEffect } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { useTenant } from "@/hooks/useTenant";
import OrganizationPublic from "@/pages/admin/OrganizationPublic";
import EventDetails from "@/pages/EventDetails";
import EventReservation from "@/pages/EventReservation";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import Navbar from "./Navbar";

const TenantApp = () => {
  const { tenantSlug } = useParams();
  const { tenants, setCurrentTenant, currentTenant, isLoading } = useTenant();

  useEffect(() => {
    if (tenantSlug && tenants.length > 0) {
      const tenant = tenants.find(t => t.subdomain === tenantSlug);
      if (tenant && (!currentTenant || currentTenant.id !== tenant.id)) {
        setCurrentTenant(tenant);
      }
    }
  }, [tenantSlug, tenants, currentTenant, setCurrentTenant]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando plataforma...</p>
        </div>
      </div>
    );
  }

  // Se o tenant não foi encontrado, redirecionar para seleção
  if (!currentTenant || currentTenant.subdomain !== tenantSlug) {
    return <Navigate to="/select-tenant" replace />;
  }

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<OrganizationPublic />} />
            <Route path="/evento/:eventId" element={<EventDetails />} />
            <Route path="/evento/:eventId/reservar" element={<EventReservation />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
  );
};

export default TenantApp;