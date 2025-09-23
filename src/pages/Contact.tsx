import { useState } from "react";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, Mail, MapPin, Clock, Send, 
  Building2, Globe, MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const { currentTenant } = useTenant();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // Usar configurações do tenant ou valores padrão
  const contactConfig = currentTenant?.contactPage || {
    visible: true,
    title: "Entre em Contato",
    subtitle: "Estamos aqui para ajudar você",
    description: "Tem uma ideia para um evento especial? Entre em contato conosco e vamos transformar sua visão em realidade.",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    phone: "(11) 9999-9999",
    email: "contato@empresa.com",
    whatsapp: "(11) 99999-9999",
    website: "www.empresa.com",
    businessHours: [
      { day: "Segunda à Sexta", time: "09:00 - 18:00" },
      { day: "Sábados", time: "09:00 - 14:00" },
      { day: "Domingos", time: "Fechado" }
    ],
    socialMedia: {
      instagram: "@empresa",
      facebook: "empresa.oficial",
      linkedin: "empresa"
    }
  };

  // Se a página não está visível, redirecionar ou mostrar erro 404
  if (!contactConfig.visible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-muted-foreground mb-8">Esta página não está disponível.</p>
          <Link to="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve. Obrigado pelo interesse!",
    });

    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Contato</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {contactConfig.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {contactConfig.subtitle}
          </p>
        </div>

        {/* Descrição */}
        <div className="text-center mb-16">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {contactConfig.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Informações de Contato */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-primary" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      {contactConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">
                      {contactConfig.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {contactConfig.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      {contactConfig.whatsapp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">
                      {contactConfig.website}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactConfig.businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Assunto da sua mensagem"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-nos sobre o evento que você gostaria de realizar..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="text-center">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Precisa de uma Resposta Rápida?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Entre em contato diretamente pelos nossos canais de comunicação
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open(`tel:${contactConfig.phone}`, '_self')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Ligar Agora
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => window.open(`https://wa.me/${contactConfig.whatsapp.replace(/\D/g, '')}`, '_blank')}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;