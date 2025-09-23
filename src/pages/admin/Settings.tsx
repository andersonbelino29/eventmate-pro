import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Building2, Upload, Palette, Save, Eye, ArrowLeft, 
  CheckCircle, Settings as SettingsIcon, CreditCard, 
  Users, Globe, Shield, Info, Phone, Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { user, organization, updateOrganization } = useAuth();
  
  // Form states
  const [orgName, setOrgName] = useState(organization?.name || '');
  const [subdomain, setSubdomain] = useState(organization?.subdomain || '');
  const [primaryColor, setPrimaryColor] = useState(organization?.primaryColor || '263 70% 50%');
  const [secondaryColor, setSecondaryColor] = useState(organization?.secondaryColor || '280 70% 60%');
  const [logo, setLogo] = useState(organization?.logo || '');
  const [customDomain, setCustomDomain] = useState(organization?.customDomain || '');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Predefined color schemes
  const colorSchemes = [
    { name: 'Azul Real', primary: '221 70% 50%', secondary: '240 70% 60%' },
    { name: 'Verde Esmeralda', primary: '142 70% 50%', secondary: '160 70% 60%' },
    { name: 'Roxo Majestoso', primary: '263 70% 50%', secondary: '280 70% 60%' },
    { name: 'Rosa Elegante', primary: '330 70% 50%', secondary: '350 70% 60%' },
    { name: 'Laranja Vibrante', primary: '25 70% 50%', secondary: '45 70% 60%' },
    { name: 'Turquesa', primary: '175 70% 50%', secondary: '195 70% 60%' },
    { name: 'Dourado', primary: '45 70% 50%', secondary: '60 70% 60%' },
    { name: 'Vermelho Coral', primary: '5 70% 50%', secondary: '15 70% 60%' }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateOrganization({
        name: orgName,
        subdomain,
        primaryColor,
        secondaryColor,
        logo,
        customDomain
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, upload to cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyColorScheme = (scheme: typeof colorSchemes[0]) => {
    setPrimaryColor(scheme.primary);
    setSecondaryColor(scheme.secondary);
  };

  const previewColors = (primary: string, secondary: string) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-glow', secondary);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <SettingsIcon className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Configurações</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to={`/${organization?.subdomain}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Site
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Configurações salvas com sucesso!
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="brand">Marca & Visual</TabsTrigger>
            <TabsTrigger value="domain">Domínio</TabsTrigger>
            <TabsTrigger value="plan">Plano</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
          </TabsList>

          {/* Brand & Visual Tab */}
          <TabsContent value="brand" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Organization Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Informações da Organização
                  </CardTitle>
                  <CardDescription>
                    Configure as informações básicas da sua organização
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Nome da Organização</Label>
                    <Input
                      id="org-name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomínio</Label>
                    <div className="flex">
                      <Input
                        id="subdomain"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                        placeholder="minha-empresa"
                        className="rounded-r-none"
                      />
                      <div className="flex items-center px-3 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .eventbook.com
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Seu site ficará disponível em: {subdomain || 'minha-empresa'}.eventbook.com
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo da Organização</Label>
                    <div className="flex items-center space-x-4">
                      {logo ? (
                        <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg object-cover border" />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border">
                          <Building2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="mb-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Recomendado: 200x200px, PNG ou JPG
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Customization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Personalização de Cores
                  </CardTitle>
                  <CardDescription>
                    Escolha as cores que representam sua marca
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cor Primária</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: `hsl(${primaryColor})` }}
                        ></div>
                        <Input
                          value={primaryColor}
                          onChange={(e) => {
                            setPrimaryColor(e.target.value);
                            previewColors(e.target.value, secondaryColor);
                          }}
                          placeholder="263 70% 50%"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Cor Secundária</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: `hsl(${secondaryColor})` }}
                        ></div>
                        <Input
                          value={secondaryColor}
                          onChange={(e) => {
                            setSecondaryColor(e.target.value);
                            previewColors(primaryColor, e.target.value);
                          }}
                          placeholder="280 70% 60%"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Esquemas de Cores Predefinidos
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {colorSchemes.map((scheme, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            applyColorScheme(scheme);
                            previewColors(scheme.primary, scheme.secondary);
                          }}
                          className="justify-start h-auto p-3"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div 
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: `hsl(${scheme.primary})` }}
                              ></div>
                              <div 
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: `hsl(${scheme.secondary})` }}
                              ></div>
                            </div>
                            <span className="text-xs">{scheme.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Alert>
                    <Palette className="h-4 w-4" />
                    <AlertDescription>
                      Use o formato HSL: "matiz saturação% luminosidade%" (ex: 263 70% 50%)
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Páginas Tab */}
          <TabsContent value="pages" className="space-y-6">
            {/* Página Sobre */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Página Sobre
                </CardTitle>
                <CardDescription>
                  Configure o conteúdo da página "Sobre" da sua organização
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch checked={true} />
                  <Label>Exibir página "Sobre"</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Título</Label>
                    <Input placeholder="Sobre Nós" defaultValue="Sobre Nós" />
                  </div>
                  <div>
                    <Label>Subtítulo</Label>
                    <Input placeholder="Nossa História e Missão" defaultValue="Nossa História e Missão" />
                  </div>
                </div>
                
                <div>
                  <Label>Descrição Principal</Label>
                  <Textarea 
                    rows={3} 
                    placeholder="Conte a história da sua empresa..."
                    defaultValue="Somos uma empresa especializada em criar experiências únicas e memoráveis através de eventos excepcionais."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nossa Missão</Label>
                    <Textarea 
                      rows={2} 
                      placeholder="Qual é a missão da empresa?"
                      defaultValue="Criar momentos inesquecíveis que conectam pessoas e celebram a vida."
                    />
                  </div>
                  <div>
                    <Label>Nossa Visão</Label>
                    <Textarea 
                      rows={2} 
                      placeholder="Qual é a visão da empresa?"
                      defaultValue="Ser reconhecida como a principal referência em eventos exclusivos e personalizados."
                    />
                  </div>
                </div>

                <div>
                  <Label>Nossos Valores (um por linha)</Label>
                  <Textarea 
                    rows={3}
                    placeholder="Excelência em cada detalhe&#10;Compromisso com a qualidade&#10;Inovação constante"
                    defaultValue="Excelência em cada detalhe&#10;Compromisso com a qualidade&#10;Inovação constante&#10;Atendimento personalizado"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Página Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Página Contato
                </CardTitle>
                <CardDescription>
                  Configure as informações de contato da sua organização
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch checked={true} />
                  <Label>Exibir página "Contato"</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Título da Página</Label>
                    <Input placeholder="Entre em Contato" defaultValue="Entre em Contato" />
                  </div>
                  <div>
                    <Label>Subtítulo</Label>
                    <Input placeholder="Estamos aqui para ajudar" defaultValue="Estamos aqui para ajudar você" />
                  </div>
                </div>

                <div>
                  <Label>Descrição da Página</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Mensagem de boas-vindas da página de contato"
                    defaultValue="Tem uma ideia para um evento especial? Entre em contato conosco e vamos transformar sua visão em realidade."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Telefone Principal</Label>
                    <Input placeholder="(11) 9999-9999" defaultValue="(11) 9999-9999" />
                  </div>
                  <div>
                    <Label>WhatsApp</Label>
                    <Input placeholder="(11) 99999-9999" defaultValue="(11) 99999-9999" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email Principal</Label>
                    <Input type="email" placeholder="contato@empresa.com" defaultValue="contato@empresa.com" />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input placeholder="www.empresa.com" defaultValue="www.empresa.com" />
                  </div>
                </div>
                
                <div>
                  <Label>Endereço Completo</Label>
                  <Input 
                    placeholder="Rua das Flores, 123 - Centro, São Paulo - SP"
                    defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP"
                  />
                </div>

                <div>
                  <Label>Horário de Funcionamento</Label>
                  <Textarea 
                    rows={3}
                    placeholder="Segunda à Sexta: 09:00 - 18:00&#10;Sábados: 09:00 - 14:00&#10;Domingos: Fechado"
                    defaultValue="Segunda à Sexta: 09:00 - 18:00&#10;Sábados: 09:00 - 14:00&#10;Domingos: Fechado"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domain Tab */}
          <TabsContent value="domain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Configuração de Domínio
                </CardTitle>
                <CardDescription>
                  Configure seu domínio personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-domain">Domínio Personalizado</Label>
                  <Input
                    id="custom-domain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="meusite.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Disponível apenas nos planos Profissional e Enterprise
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">URLs Atuais:</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Subdomínio:</strong> {subdomain || 'minha-empresa'}.eventbook.com</p>
                    {customDomain && (
                      <p><strong>Domínio personalizado:</strong> {customDomain}</p>
                    )}
                  </div>
                </div>

                {organization?.plan === 'free' && (
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Faça upgrade para o plano Profissional para usar domínio personalizado.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Seu Plano Atual
                </CardTitle>
                <CardDescription>
                  Gerencie sua assinatura e billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold capitalize">
                      Plano {organization?.plan === 'free' ? 'Gratuito' : 
                             organization?.plan === 'pro' ? 'Profissional' : 'Enterprise'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {organization?.status === 'trial' ? 'Período de teste' : 
                       organization?.status === 'active' ? 'Ativo' : 'Status: ' + organization?.status}
                    </p>
                  </div>
                  <Badge variant={organization?.plan === 'free' ? 'secondary' : 'default'}>
                    {organization?.plan?.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Recursos do seu plano:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {organization?.plan === 'free' ? (
                      <>
                        <li>✓ Até 50 eventos por mês</li>
                        <li>✓ Gestão básica de participantes</li>
                        <li>✓ Subdomínio personalizado</li>
                        <li>✗ Domínio personalizado</li>
                        <li>✗ Relatórios avançados</li>
                      </>
                    ) : (
                      <>
                        <li>✓ Eventos ilimitados</li>
                        <li>✓ Gestão avançada de participantes</li>
                        <li>✓ Domínio personalizado</li>
                        <li>✓ Relatórios e analytics</li>
                        <li>✓ Suporte prioritário</li>
                      </>
                    )}
                  </ul>
                </div>

                <Link to="/pricing">
                  <Button className="w-full">
                    {organization?.plan === 'free' ? 'Fazer Upgrade' : 'Gerenciar Plano'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Equipe
                </CardTitle>
                <CardDescription>
                  Gerencie os membros da sua organização
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Badge>Administrador</Badge>
                  </div>

                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      Gerenciamento de equipe completo disponível nos planos pagos.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;