import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, Search, Filter, Eye, Check, Trash2, 
  Calendar, User, Phone, MessageSquare, ArrowLeft 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import { usePagination } from "@/hooks/usePagination";
import { CustomPagination } from "@/components/ui/custom-pagination";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(savedMessages);
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const messagesPagination = usePagination({
    data: filteredMessages,
    itemsPerPage: 8
  });

  const updateMessageStatus = (messageId: number, newStatus: ContactMessage['status']) => {
    const updatedMessages = messages.map(message =>
      message.id === messageId ? { ...message, status: newStatus } : message
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    toast({
      title: "Status atualizado",
      description: `Mensagem marcada como ${newStatus === 'read' ? 'lida' : newStatus === 'replied' ? 'respondida' : 'nova'}.`
    });
  };

  const deleteMessage = (messageId: number) => {
    const updatedMessages = messages.filter(message => message.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    toast({
      title: "Mensagem excluída",
      description: "A mensagem foi excluída com sucesso."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">Nova</Badge>;
      case 'read':
        return <Badge variant="default">Lida</Badge>;
      case 'replied':
        return <Badge variant="secondary">Respondida</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const newMessagesCount = messages.filter(m => m.status === 'new').length;

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
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Mail className="h-6 w-6" />
                  Solicitações de Contato
                  {newMessagesCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {newMessagesCount} nova(s)
                    </Badge>
                  )}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gerencie as mensagens recebidas pelo formulário de contato
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novas</CardTitle>
              <Badge variant="destructive" className="text-xs">Novo</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.filter(m => m.status === 'new').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lidas</CardTitle>
              <Badge variant="default" className="text-xs">Lida</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.filter(m => m.status === 'read').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
              <Badge variant="secondary" className="text-xs">Respondida</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.filter(m => m.status === 'replied').length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, email ou mensagem..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="new">Novas</SelectItem>
                    <SelectItem value="read">Lidas</SelectItem>
                    <SelectItem value="replied">Respondidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mensagens</CardTitle>
                <CardDescription>
                  {filteredMessages.length} mensagem(s) encontrada(s)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma mensagem encontrada</h3>
                <p className="text-muted-foreground">
                  {messages.length === 0 
                    ? "Ainda não há mensagens de contato." 
                    : "Nenhuma mensagem corresponde aos filtros aplicados."
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {messagesPagination.paginatedData.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{message.name}</h3>
                          {getStatusBadge(message.status)}
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {message.email}
                          </div>
                          {message.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {message.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(message.createdAt).toLocaleString('pt-BR')}
                          </div>
                        </div>
                        
                        {message.subject && (
                          <div className="font-medium text-sm">
                            Assunto: {message.subject}
                          </div>
                        )}
                        
                        <p className="text-sm line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedMessage(message);
                                if (message.status === 'new') {
                                  updateMessageStatus(message.id, 'read');
                                }
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Mensagem de Contato</DialogTitle>
                            </DialogHeader>
                            {selectedMessage && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Nome</label>
                                    <p className="font-semibold">{selectedMessage.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="font-semibold">{selectedMessage.email}</p>
                                  </div>
                                </div>
                                
                                {(selectedMessage.phone || selectedMessage.subject) && (
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedMessage.phone && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                                        <p className="font-semibold">{selectedMessage.phone}</p>
                                      </div>
                                    )}
                                    {selectedMessage.subject && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Assunto</label>
                                        <p className="font-semibold">{selectedMessage.subject}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Data</label>
                                  <p className="font-semibold">{new Date(selectedMessage.createdAt).toLocaleString('pt-BR')}</p>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Mensagem</label>
                                  <div className="mt-2 p-3 bg-muted rounded-md">
                                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                                    disabled={selectedMessage.status === 'replied'}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Marcar como Respondida
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {message.status === 'new' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateMessageStatus(message.id, 'read')}
                            title="Marcar como lida"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <ConfirmDialog
                          title="Excluir Mensagem"
                          description="Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita."
                          onConfirm={() => deleteMessage(message.id)}
                        >
                          <Button variant="ghost" size="sm" title="Excluir mensagem">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                
                <CustomPagination
                  currentPage={messagesPagination.currentPage}
                  totalPages={messagesPagination.totalPages}
                  onPageChange={messagesPagination.goToPage}
                  canGoPrevious={messagesPagination.canGoPrevious}
                  canGoNext={messagesPagination.canGoNext}
                  startIndex={messagesPagination.startIndex}
                  endIndex={messagesPagination.endIndex}
                  totalItems={messagesPagination.totalItems}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactMessages;