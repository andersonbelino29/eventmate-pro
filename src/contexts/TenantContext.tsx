import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customDomain?: string;
  heroConfig?: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    featuredEvents: string[]; // Array of event IDs
  };
  aboutPage?: {
    visible: boolean;
    title: string;
    subtitle: string;
    description: string;
    mission: string;
    vision: string;
    values: string[];
    stats: Array<{ label: string; value: string }>;
    team: Array<{ name: string; role: string; description: string }>;
  };
  contactPage?: {
    visible: boolean;
    title: string;
    subtitle: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    website: string;
    businessHours: Array<{ day: string; time: string }>;
    socialMedia: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
    };
  };
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
      logo: 'https://images.unsplash.com/photo-1519167758481-83f29c8ae8a4?w=200&h=200&fit=crop&crop=center',
      primaryColor: '263 70% 50%',
      secondaryColor: '280 70% 60%',
      heroConfig: {
        title: "Villa Eventos",
        subtitle: "Eventos inesquecíveis para momentos especiais",
        description: "Criamos experiências únicas e memoráveis para seus eventos mais importantes. Com mais de 10 anos de experiência no mercado.",
        buttonText: "Ver Eventos Disponíveis",
        featuredEvents: ["1", "2", "3"]
      },
      aboutPage: {
        visible: true,
        title: "Sobre a Villa Eventos",
        subtitle: "Criando momentos únicos desde 2010",
        description: "A Villa Eventos nasceu da paixão por criar experiências inesquecíveis. Especializados em casamentos, eventos corporativos e celebrações especiais.",
        mission: "Transformar sonhos em realidade através de eventos únicos e memoráveis.",
        vision: "Ser a referência em eventos personalizados e exclusivos no Brasil.",
        values: [
          "Excelência em cada detalhe",
          "Compromisso com a qualidade",
          "Inovação e criatividade",
          "Atendimento personalizado"
        ],
        stats: [
          { label: "Anos de Experiência", value: "13+" },
          { label: "Eventos Realizados", value: "800+" },
          { label: "Clientes Satisfeitos", value: "3000+" },
          { label: "Avaliação Média", value: "4.9" }
        ],
        team: [
          {
            name: "Isabella Villa",
            role: "Founder & CEO",
            description: "Especialista em eventos de luxo com mais de 15 anos de experiência internacional."
          },
          {
            name: "Roberto Santos",
            role: "Diretor Criativo",
            description: "Expert em design de experiências e ambientações únicas para cada ocasião."
          },
          {
            name: "Fernanda Lima",
            role: "Gerente de Eventos",
            description: "Coordenação impecável e atenção aos detalhes em cada projeto realizado."
          }
        ]
      },
      contactPage: {
        visible: true,
        title: "Entre em Contato",
        subtitle: "Vamos planejar algo incrível juntos",
        description: "Estamos prontos para transformar sua visão em um evento extraordinário. Entre em contato e descubra como podemos criar algo especial para você.",
        address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
        phone: "(11) 3456-7890",
        email: "contato@villaeventos.com",
        whatsapp: "(11) 99876-5432",
        website: "www.villaeventos.com",
        businessHours: [
          { day: "Segunda à Sexta", time: "09:00 - 19:00" },
          { day: "Sábados", time: "09:00 - 15:00" },
          { day: "Domingos", time: "Sob agendamento" }
        ],
        socialMedia: {
          instagram: "@villaeventos",
          facebook: "villa.eventos.oficial",
          linkedin: "villa-eventos"
        }
      }
    },
    {
      id: 'buffet-alegria',
      name: 'Buffet Alegria',
      subdomain: 'alegria',
      logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&crop=center',
      primaryColor: '120 70% 50%',
      secondaryColor: '140 70% 60%',
      heroConfig: {
        title: "Buffet Alegria",
        subtitle: "Tradição e sabor em cada evento",
        description: "Com mais de 20 anos no mercado, oferecemos qualidade gastronômica e atendimento excepcional.",
        buttonText: "Conheça Nossos Serviços",
        featuredEvents: ["1"]
      },
      aboutPage: {
        visible: true,
        title: "Sobre o Buffet Alegria",
        subtitle: "Tradição e sabor em cada evento",
        description: "Com mais de 20 anos no mercado, o Buffet Alegria é sinônimo de qualidade gastronômica e atendimento excepcional em eventos.",
        mission: "Proporcionar experiências gastronômicas memoráveis com excelência em cada detalhe.",
        vision: "Ser reconhecido como o melhor buffet da região em qualidade e inovação culinária.",
        values: [
          "Qualidade dos ingredientes",
          "Tradição familiar",
          "Inovação gastronômica",
          "Sustentabilidade"
        ],
        stats: [
          { label: "Anos de Tradição", value: "20+" },
          { label: "Eventos Atendidos", value: "1500+" },
          { label: "Pratos no Cardápio", value: "200+" },
          { label: "Satisfação Cliente", value: "98%" }
        ],
        team: [
          {
            name: "Chef Marco Alegria",
            role: "Chef Executivo",
            description: "Especialista em culinária brasileira e internacional, formado na Le Cordon Bleu."
          },
          {
            name: "Sofia Oliveira",
            role: "Gerente de Eventos",
            description: "Mais de 10 anos coordenando eventos de todos os tamanhos e estilos."
          },
          {
            name: "André Costa",
            role: "Sommelier",
            description: "Especialista em harmonização e seleção de vinhos para cada ocasião."
          }
        ]
      },
      contactPage: {
        visible: true,
        title: "Fale Conosco",
        subtitle: "Sabor e qualidade ao seu alcance",
        description: "Entre em contato conosco e descubra como podemos tornar seu evento ainda mais saboroso e especial.",
        address: "Rua das Palmeiras, 456 - Vila Madalena, São Paulo - SP",
        phone: "(11) 2345-6789",
        email: "contato@buffetalegria.com.br",
        whatsapp: "(11) 98765-4321",
        website: "www.buffetalegria.com.br",
        businessHours: [
          { day: "Terça à Sexta", time: "10:00 - 18:00" },
          { day: "Sábados", time: "08:00 - 16:00" },
          { day: "Domingos e Segundas", time: "Fechado" }
        ],
        socialMedia: {
          instagram: "@buffetalegria",
          facebook: "buffet.alegria.oficial"
        }
      }
    },
    {
      id: 'centro-convencoes',
      name: 'Centro de Convenções Premium',
      subdomain: 'premium',
      logo: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=200&h=200&fit=crop&crop=center',
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
      
      // Aplicar cores no gradiente também
      if (tenant.primaryColor && tenant.secondaryColor) {
        root.style.setProperty('--gradient-primary', 
          `linear-gradient(135deg, hsl(${tenant.primaryColor}), hsl(${tenant.secondaryColor}))`);
      }
    } else {
      localStorage.removeItem('currentTenantId');
      // Reset to default theme
      const root = document.documentElement;
      root.style.setProperty('--primary', '263 70% 50%');
      root.style.setProperty('--primary-glow', '280 70% 60%');
      root.style.setProperty('--gradient-primary', 
        'linear-gradient(135deg, hsl(263 70% 50%), hsl(280 70% 60%))');
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