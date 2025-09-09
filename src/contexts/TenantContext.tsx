import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customDomain?: string;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  isLoading: boolean;
  tenants: Tenant[];
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - será substituído por dados do Supabase
  const [tenants] = useState<Tenant[]>([
    {
      id: 'villa-eventos',
      name: 'Villa Eventos',
      subdomain: 'villa',
      logo: '',
      primaryColor: '263 70% 50%',
      secondaryColor: '280 70% 60%'
    },
    {
      id: 'buffet-alegria',
      name: 'Buffet Alegria',
      subdomain: 'alegria',
      logo: '',
      primaryColor: '120 70% 50%',
      secondaryColor: '140 70% 60%'
    },
    {
      id: 'centro-convencoes',
      name: 'Centro de Convenções Premium',
      subdomain: 'premium',
      logo: '',
      primaryColor: '210 70% 50%',
      secondaryColor: '230 70% 60%'
    }
  ]);

  useEffect(() => {
    // Detectar tenant baseado no subdomínio ou path
    const detectTenant = () => {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;
      
      let tenantId: string | null = null;
      
      // Verificar se é um subdomínio (ex: villa.eventbook.com)
      if (hostname.includes('.') && !hostname.includes('localhost')) {
        const subdomain = hostname.split('.')[0];
        const tenant = tenants.find(t => t.subdomain === subdomain);
        if (tenant) {
          tenantId = tenant.id;
        }
      }
      
      // Verificar se é um path (ex: /villa/eventos)
      if (!tenantId && pathname.startsWith('/')) {
        const pathParts = pathname.split('/');
        if (pathParts.length > 1) {
          const subdomain = pathParts[1];
          const tenant = tenants.find(t => t.subdomain === subdomain);
          if (tenant) {
            tenantId = tenant.id;
          }
        }
      }
      
      // Buscar tenant nos dados mockados ou no localStorage
      if (tenantId) {
        const tenant = tenants.find(t => t.id === tenantId);
        setCurrentTenant(tenant || null);
      } else {
        // Verificar localStorage para desenvolvimento
        const savedTenantId = localStorage.getItem('currentTenantId');
        if (savedTenantId) {
          const tenant = tenants.find(t => t.id === savedTenantId);
          setCurrentTenant(tenant || null);
        }
      }
      
      setIsLoading(false);
    };

    detectTenant();
  }, [tenants]);

  const handleSetCurrentTenant = (tenant: Tenant | null) => {
    setCurrentTenant(tenant);
    if (tenant) {
      localStorage.setItem('currentTenantId', tenant.id);
      
      // Aplicar tema personalizado do tenant
      const root = document.documentElement;
      if (tenant.primaryColor) {
        root.style.setProperty('--primary', tenant.primaryColor);
      }
      if (tenant.secondaryColor) {
        root.style.setProperty('--primary-glow', tenant.secondaryColor);
      }
    } else {
      localStorage.removeItem('currentTenantId');
    }
  };

  const value: TenantContextType = {
    currentTenant,
    setCurrentTenant: handleSetCurrentTenant,
    isLoading,
    tenants
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};