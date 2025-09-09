import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  User, 
  CreditCard, 
  Phone, 
  FileText,
  Home,
  Settings,
  Bot,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Bonjour ! Bienvenue sur l'Assistant Virtuel AMENDIS. Je suis ici pour répondre à toutes vos questions sur vos services d'eau, d'électricité et d'assainissement. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { 
      icon: User, 
      text: "Mon Compte Client", 
      action: "Comment créer un compte client ?",
      color: "bg-gradient-to-r from-primary to-primary/80",
      description: "Créer & gérer votre compte"
    },
    { 
      icon: CreditCard, 
      text: "Paiement Factures", 
      action: "Comment payer ma facture ?",
      color: "bg-gradient-to-r from-green to-green/80",
      description: "Payer vos factures en ligne"
    },
    { 
      icon: Phone, 
      text: "Ma Consommation", 
      action: "Comment suivre ma consommation ?",
      color: "bg-gradient-to-r from-cyan to-cyan/80",
      description: "Suivre votre consommation"
    },
    { 
      icon: FileText, 
      text: "Services Admin", 
      action: "Comment obtenir une attestation ?",
      color: "bg-gradient-to-r from-orange to-orange/80",
      description: "Documents & attestations"
    },
    { 
      icon: Settings, 
      text: "Support Technique", 
      action: "J'ai un problème technique",
      color: "bg-gradient-to-r from-purple to-purple/80",
      description: "Assistance technique"
    },
    { 
      icon: MessageCircle, 
      text: "Contact & Agences", 
      action: "Où trouver l'agence la plus proche ?",
      color: "bg-gradient-to-r from-blue-activity to-blue-activity/80",
      description: "Nous contacter"
    }
  ];

  const faqResponses = {
    "Comment créer un compte client ?": "📱 Pour créer votre compte client :\n\n1️⃣ Rendez-vous sur www.amendisclient.ma\n2️⃣ Cliquez sur 'Créer un compte'\n3️⃣ Remplissez vos informations (numéro de contrat, email, CIN)\n4️⃣ Vous pourrez ensuite accéder à vos factures et services en ligne 24h/24 !\n\n💡 Votre numéro de contrat se trouve en haut à gauche de votre facture.",
    
    "Comment payer ma facture ?": "💳 Plusieurs moyens de paiement s'offrent à vous :\n\n🌐 **En ligne** : Connectez-vous à amendisclient.ma → Mes factures → Payer (Visa/MasterCard)\n\n📱 **Fatourati** : Application ou site → Recherchez Amendis → Saisissez votre n° de contrat\n\n🏧 **GAB** : Distributeurs automatiques des banques partenaires (24h/24, 7j/7)\n\n📞 **USSD** : Tapez #655# → Factures Amendis → Suivez les instructions\n\n🏦 **Prélèvement automatique** : Formulaire disponible dans votre agence bancaire",
    
    "Comment suivre ma consommation ?": "📊 Pour suivre votre consommation :\n\n🖥️ **Espace client** : amendisclient.ma → Rubrique 'Consommation'\n📈 Consultez l'historique de vos relevés\n📋 Comparez vos consommations mensuelles\n📱 Déclarez votre auto-relève si nécessaire\n\n⚠️ **Consommation élevée ?**\n✓ Vérifiez vos appareils électriques/eau\n✓ Contactez le 08020 08000 pour une vérification compteur",
    
    "Comment obtenir une attestation ?": "📄 Pour obtenir une attestation (quitus) :\n\n🏢 **En agence** : Présentez-vous avec votre CIN et numéro de contrat\n📋 **Condition** : Toutes vos factures doivent être réglées\n⚡ **Délai** : Délivrance immédiate\n\n📝 **Autres services administratifs :**\n• Résiliation de contrat (2 jours ouvrables)\n• Déplacement de compteur (sur devis)\n• Vidange fosse septique (gratuite 1 fois/an)",
    
    "J'ai un problème technique ?": "🔧 Support technique disponible :\n\n📞 **Centre d'appel** : 08020 08000 (24h/24, 7j/7)\n🌐 **Site indisponible ?** Réessayez plus tard ou utilisez :\n   • Paiement GAB\n   • Code USSD #655#\n   • Application Fatourati\n\n📱 **Application mobile** : Amendis Mobile (Android & iOS)\n💡 **Mot de passe oublié ?** Cliquez sur 'Mot de passe oublié' sur la page de connexion",
    
    "Où trouver l'agence la plus proche ?": "📍 Pour localiser votre agence :\n\n🌐 **Site web** : www.amendis.ma → Rubrique 'Agences'\n📱 **Application** : Amendis Mobile → Géolocalisation\n📞 **Par téléphone** : 08020 08000\n\n📧 **Contact digital** :\n• Formulaire de contact sur amendis.ma\n• Espace client en ligne\n\n📨 **Notifications** :\n• Amendis Info (gratuit)\n• Amendis Info Plus (payant)\n• Facturation par SMS disponible"
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = faqResponses[content as keyof typeof faqResponses] || 
        "🤔 Je n'ai pas trouvé d'information spécifique pour votre question. Voici comment me joindre :\n\n📞 Centre d'appel : 08020 08000 (24h/24)\n🌐 Site web : www.amendis.ma\n🏢 Rendez-vous en agence\n\nOu posez-moi une question plus précise !";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Assistant Virtuel AMENDIS
                  </h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Disponible 24h/24, 7j/7
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              En ligne
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="p-4 bg-card border shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold">Actions Rapides</h2>
                </div>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className={`w-full justify-start h-auto p-3 ${action.color} hover-scale text-white border-none shadow-medium hover:shadow-glow group`}
                      variant="default"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <action.icon className="w-4 h-4" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium text-xs truncate">{action.text}</div>
                          <div className="text-[10px] opacity-90 truncate">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Stats Card */}
              <Card className="p-4 bg-gradient-to-r from-primary/5 to-cyan/5 border-primary/20 shadow-soft">
                <h3 className="font-semibold mb-3 text-primary text-sm">Statistiques</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Questions résolues</span>
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0">+10k</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Temps de réponse</span>
                    <Badge variant="outline" className="text-green border-green text-xs px-2 py-0">&lt; 2s</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Satisfaction</span>
                    <Badge className="bg-green text-white text-xs px-2 py-0">98%</Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="flex flex-col h-[70vh] min-h-[500px] bg-card backdrop-blur-sm border shadow-medium">
                {/* Chat Header */}
                <div className="border-b p-4 bg-gradient-to-r from-primary/5 to-cyan/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Chat en direct</h3>
                      <p className="text-sm text-muted-foreground">Posez-moi vos questions sur AMENDIS</p>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.isUser
                              ? 'bg-gradient-primary text-white'
                              : 'bg-muted/50 text-foreground border border-border/50'
                          }`}
                        >
                          <div className="whitespace-pre-line text-sm leading-relaxed">
                            {message.content}
                          </div>
                        </div>
                        <div className={`text-xs text-muted-foreground mt-1 ${
                          message.isUser ? 'text-right' : 'text-left'
                        }`}>
                          {message.timestamp.toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                      <div className={`${message.isUser ? 'order-1 mr-2' : 'order-2 ml-2'} flex-shrink-0`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isUser ? 'bg-gradient-primary' : 'bg-muted'
                        }`}>
                          {message.isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 rounded-2xl px-4 py-3 border border-border/50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-muted/30">
                  <div className="flex gap-3">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre question ici... (Entrée pour envoyer)"
                      className="flex-1 resize-none min-h-[44px] max-h-32 bg-background border-input"
                      rows={1}
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-200 px-4 shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Appuyez sur Entrée pour envoyer • Maj+Entrée pour une nouvelle ligne
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;