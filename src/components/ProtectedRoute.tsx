import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/hooks/useTenant';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'admin' | 'user' | 'super_admin';
  requireOrganization?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireRole,
  requireOrganization = true 
}) => {
  const { user, organization, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireOrganization && !organization) {
    return <Navigate to="/select-organization" replace />;
  }

  if (requireRole && user.role !== requireRole && user.role !== 'super_admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Tenant-specific protected route
interface TenantProtectedRouteProps {
  children: ReactNode;
}

export const TenantProtectedRoute: React.FC<TenantProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { currentTenant } = useTenant();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate 
        to={`/${currentTenant?.subdomain}/login`} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};