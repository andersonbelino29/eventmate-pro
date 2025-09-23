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
  itemConfig?: {
    type: 'mesa' | 'ingresso' | 'area' | 'servico' | 'produto';
    singular: string; // Ex: "Mesa", "Ingresso", "Área"
    plural: string; // Ex: "Mesas", "Ingressos", "Áreas"
    requiresLocation: boolean;
    requiresCapacity: boolean;
    capacityLabel: string; // Ex: "Lugares", "Pessoas", "Vagas"
    priceLabel: string; // Ex: "por pessoa", "por ingresso", "por área"
  };
  paymentConfig?: {
    enabled: boolean;
    requirePayment: boolean;
    stripeEnabled: boolean;
    pixEnabled: boolean;
    boletoEnabled: boolean;
    serviceFee: number; // Percentage
    cancellationPolicy: string;
    paymentMethods: string[];
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
      },
      itemConfig: {
        type: 'mesa',
        singular: 'Mesa',
        plural: 'Mesas',
        requiresLocation: true,
        requiresCapacity: true,
        capacityLabel: 'pessoas',
        priceLabel: 'por pessoa'
      },
      paymentConfig: {
        enabled: true,
        requirePayment: true,
        stripeEnabled: true,
        pixEnabled: false,
        boletoEnabled: false,
        serviceFee: 10,
        cancellationPolicy: "Cancelamento gratuito até 24h antes do evento",
        paymentMethods: ["credit_card", "debit_card"]
      }
    },
    {
      id: 'arena-tickets',
      name: 'Arena Music Tickets',
      subdomain: 'arena',
      logo: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=200&h=200&fit=crop&crop=center',
      primaryColor: '340 70% 50%',
      secondaryColor: '10 70% 60%',
      heroConfig: {
        title: "Arena Music Tickets",
        subtitle: "Os melhores shows e festivais estão aqui",
        description: "Plataforma oficial de venda de ingressos para os maiores eventos musicais do país. Shows, festivais e experiências únicas.",
        buttonText: "Comprar Ingressos",
        featuredEvents: ["1", "2"]
      },
      aboutPage: {
        visible: true,
        title: "Sobre a Arena Music",
        subtitle: "Conectando você aos melhores shows",
        description: "A Arena Music é a plataforma líder em venda de ingressos para eventos musicais no Brasil. Trabalhamos com os melhores artistas e produtores.",
        mission: "Conectar fãs aos seus artistas favoritos através de experiências musicais inesquecíveis.",
        vision: "Ser a principal plataforma de eventos musicais da América Latina.",
        values: [
          "Transparência na venda",
          "Experiência do usuário",
          "Segurança nas transações",
          "Suporte 24/7"
        ],
        stats: [
          { label: "Shows Realizados", value: "500+" },
          { label: "Ingressos Vendidos", value: "1M+" },
          { label: "Artistas Parceiros", value: "200+" },
          { label: "Cidades Atendidas", value: "50+" }
        ],
        team: [
          {
            name: "Carlos Rock",
            role: "CEO & Fundador",
            description: "Produtor musical com 15 anos de experiência no mercado de entretenimento."
          },
          {
            name: "Marina Beat",
            role: "Diretora de Eventos",
            description: "Especialista em produção de festivais e shows de grande porte."
          }
        ]
      },
      contactPage: {
        visible: true,
        title: "Atendimento Arena",
        subtitle: "Suporte 24h para seus ingressos",
        description: "Precisa de ajuda com seus ingressos? Nossa equipe está sempre disponível para te atender.",
        address: "Av. das Nações, 2000 - Centro, São Paulo - SP",
        phone: "(11) 4000-1234",
        email: "suporte@arenamusic.com.br",
        whatsapp: "(11) 99000-1234",
        website: "www.arenamusic.com.br",
        businessHours: [
          { day: "Segunda à Domingo", time: "24 horas" }
        ],
        socialMedia: {
          instagram: "@arenamusic",
          facebook: "arena.music.oficial",
          linkedin: "arena-music"
        }
      },
      itemConfig: {
        type: 'ingresso',
        singular: 'Ingresso',
        plural: 'Ingressos',
        requiresLocation: false,
        requiresCapacity: false,
        capacityLabel: 'unidades',
        priceLabel: 'por ingresso'
      },
      paymentConfig: {
        enabled: true,
        requirePayment: true,
        stripeEnabled: true,
        pixEnabled: true,
        boletoEnabled: true,
        serviceFee: 15,
        cancellationPolicy: "Política de cancelamento conforme evento",
        paymentMethods: ["credit_card", "pix", "boleto"]
      }
    },
    {
      id: 'spaces-premium',
      name: 'Premium Event Spaces',
      subdomain: 'spaces',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop&crop=center',
      primaryColor: '45 70% 50%',
      secondaryColor: '65 70% 60%',
      heroConfig: {
        title: "Premium Event Spaces",
        subtitle: "Espaços exclusivos para eventos corporativos",
        description: "Aluguel de áreas premium para conferências, workshops, treinamentos e eventos corporativos de alto padrão.",
        buttonText: "Reservar Espaço",
        featuredEvents: ["1"]
      },
      aboutPage: {
        visible: true,
        title: "Sobre Premium Spaces",
        subtitle: "Espaços que inspiram grandes ideias",
        description: "Oferecemos os mais modernos espaços para eventos corporativos, equipados com tecnologia de ponta e design contemporâneo.",
        mission: "Fornecer ambientes inspiradores que potencializam o sucesso de eventos corporativos.",
        vision: "Ser referência em espaços corporativos premium no Brasil.",
        values: [
          "Tecnologia de ponta",
          "Design inovador",
          "Sustentabilidade",
          "Excelência operacional"
        ],
        stats: [
          { label: "Espaços Disponíveis", value: "25+" },
          { label: "Eventos Realizados", value: "2000+" },
          { label: "Empresas Atendidas", value: "500+" },
          { label: "Capacidade Total", value: "5000" }
        ],
        team: [
          {
            name: "Ana Corporate",
            role: "Diretora Executiva",
            description: "MBA em Gestão de Eventos com especialização em mercado corporativo."
          },
          {
            name: "João Premium",
            role: "Gerente de Operações",
            description: "Especialista em logística e produção de eventos empresariais."
          }
        ]
      },
      contactPage: {
        visible: true,
        title: "Contato Comercial",
        subtitle: "Vamos planejar seu próximo evento corporativo",
        description: "Entre em contato com nossa equipe comercial e descubra o espaço perfeito para seu evento empresarial.",
        address: "Torre Premium, Av. Faria Lima, 3000 - Itaim Bibi, São Paulo - SP",
        phone: "(11) 3000-5000",
        email: "comercial@premiumspaces.com.br",
        whatsapp: "(11) 97000-5000",
        website: "www.premiumspaces.com.br",
        businessHours: [
          { day: "Segunda à Sexta", time: "08:00 - 20:00" },
          { day: "Sábados", time: "09:00 - 14:00" },
          { day: "Domingos", time: "Fechado" }
        ],
        socialMedia: {
          instagram: "@premiumspaces",
          facebook: "premium.spaces",
          linkedin: "premium-event-spaces"
        }
      },
      itemConfig: {
        type: 'area',
        singular: 'Área',
        plural: 'Áreas',
        requiresLocation: true,
        requiresCapacity: true,
        capacityLabel: 'pessoas',
        priceLabel: 'por pessoa'
      },
      paymentConfig: {
        enabled: true,
        requirePayment: false,
        stripeEnabled: true,
        pixEnabled: true,
        boletoEnabled: true,
        serviceFee: 8,
        cancellationPolicy: "Cancelamento até 48h antes sem cobrança",
        paymentMethods: ["credit_card", "pix", "boleto"]
      }
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
      
      if (tenantId) {
        const tenant = tenants.find(t => t.id === tenantId);
        console.log('🔍 Tenant detectado:', { 
          url: window.location.href,
          tenantId, 
          tenant: tenant?.name, 
          subdomain: tenant?.subdomain,
          itemType: tenant?.itemConfig?.type,
          itemSingular: tenant?.itemConfig?.singular
        });
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