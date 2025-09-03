import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X, User, CreditCard, Phone } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Bonjour ! Je suis l'assistant virtuel AMENDIS. Comment puis-je vous aider aujourd'hui ? 🔧⚡💧",
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
    { icon: User, text: "Mon compte", action: "Comment créer un compte client ?" },
    { icon: CreditCard, text: "Paiement", action: "Comment payer ma facture ?" },
    { icon: Phone, text: "Consommation", action: "Comment suivre ma consommation ?" },
    { icon: MessageCircle, text: "Services", action: "Quels sont vos services ?" }
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate API call
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // 🔑 Compte client
    if (message.includes('créer un compte') || message.includes('inscription') || message.includes('amendisclient')) {
      return "🔑 **Comment créer un compte sur Amendis Client ?**\n\nRendez-vous sur www.amendisclient.ma. Cliquez sur 'Créer un compte', puis remplissez vos informations :\n• Numéro de contrat\n• Email\n• CIN\n\nVous pourrez ensuite accéder à vos factures et services en ligne.";
    }
    
    if (message.includes('mot de passe oublié') || message.includes('réinitialiser') || message.includes('password')) {
      return "🔐 **Mot de passe oublié ?**\n\nSur la page de connexion, cliquez sur 'Mot de passe oublié'. Saisissez votre email et suivez les instructions envoyées pour réinitialiser votre mot de passe.";
    }
    
    if (message.includes('site ne fonctionne pas') || message.includes('maintenance') || message.includes('indisponible')) {
      return "🔧 **Site indisponible ?**\n\nParfois le site est indisponible pour maintenance. Dans ce cas :\n• Réessayez plus tard\n• Utilisez d'autres canaux : paiement GAB, USSD #655#, Fatourati";
    }
    
    // 💳 Paiement et factures
    if (message.includes('payer en ligne') || message.includes('paiement en ligne') || (message.includes('payer') && message.includes('facture'))) {
      return "💳 **Comment payer ma facture en ligne ?**\n\nConnectez-vous à www.amendisclient.ma, allez à la section 'Mes factures' et choisissez 'Payer'. Le paiement est sécurisé via CMI (Visa/MasterCard).";
    }
    
    if (message.includes('fatourati')) {
      return "📱 **Paiement via Fatourati**\n\nAccédez à l'application ou au site Fatourati :\n• Recherchez 'Amendis'\n• Saisissez votre numéro de contrat\n• Réglez par carte bancaire ou via vos canaux bancaires habituels";
    }
    
    if (message.includes('gab') || message.includes('distributeur automatique')) {
      return "🏧 **Paiement via GAB**\n\nOui ! Vous pouvez régler vos factures via les GAB des banques partenaires :\n• Banque Populaire\n• BMCE/BOA\n• SGMA\n• CIH\n\nService disponible 24h/24 et 7j/7.";
    }
    
    if (message.includes('#655#') || message.includes('ussd')) {
      return "📞 **Paiement avec le code USSD #655#**\n\nTapez #655# depuis votre téléphone :\n1. Choisissez 'Factures Amendis'\n2. Saisissez votre numéro de contrat\n3. Sélectionnez la facture\n4. Choisissez le mode de paiement";
    }
    
    if (message.includes('prélèvement automatique') || message.includes('prelevement')) {
      return "🔄 **Prélèvement automatique**\n\nOui ! Remplissez un formulaire de prélèvement automatique auprès de votre agence bancaire. À chaque règlement, vous recevrez un SMS de confirmation.";
    }
    
    // 📊 Consommation et compteur
    if (message.includes('numéro de contrat') || message.includes('numero contrat')) {
      return "📋 **Où trouver mon numéro de contrat ?**\n\nLe numéro de contrat figure en haut à gauche de votre facture. Il est nécessaire pour :\n• Les paiements en ligne\n• Fatourati\n• USSD #655#";
    }
    
    if (message.includes('suivre ma consommation') || message.includes('consommation')) {
      return "📊 **Comment suivre ma consommation ?**\n\nDepuis votre espace client sur amendisclient.ma, rubrique 'Consommation' :\n• Consultez l'historique de vos relevés\n• Comparez vos consommations mensuelles";
    }
    
    if (message.includes('consommation élevée') || message.includes('consommation trop élevée')) {
      return "⚠️ **Consommation trop élevée ?**\n\n1. Vérifiez d'abord vos appareils électriques/eau\n2. Si l'anomalie persiste, contactez le service client au 08020 08000 pour demander une vérification de votre compteur";
    }
    
    if (message.includes('auto-relève') || message.includes('déclarer index') || message.includes('index')) {
      return "📝 **Comment déclarer mon index (auto-relève) ?**\n\nVous pouvez déclarer vous-même la relève :\n• Via l'espace client en ligne\n• Par SMS si vous êtes inscrit au service Amendis Info";
    }
    
    if (message.includes('déplacement compteur') || message.includes('déplacer compteur')) {
      return "🔧 **Demander le déplacement de mon compteur**\n\nDéposez une demande manuscrite à votre agence Amendis avec :\n• Copie de votre CIN\n• La localisation souhaitée\n\nUn devis vous sera fourni, frais à votre charge.";
    }
    
    // 🛠 Services administratifs
    if (message.includes('attestation') || message.includes('quitus')) {
      return "📄 **Comment obtenir une attestation (quitus) ?**\n\nPrésentez-vous à votre agence Amendis avec :\n• Votre CIN\n• Votre numéro de contrat\n\nLe document est délivré une fois toutes les factures réglées.";
    }
    
    if (message.includes('résilier') || message.includes('résiliation')) {
      return "📋 **Comment résilier mon contrat ?**\n\nDéposez une demande de résiliation :\n• En agence\n• Par courrier\n\nLa résiliation est effective sous 2 jours ouvrables maximum.";
    }
    
    if (message.includes('vidange') || message.includes('fosse septique')) {
      return "🚛 **Demander la vidange de ma fosse septique**\n\nSi votre logement n'est pas raccordé au réseau collectif :\n• Vidange gratuite une fois par an\n• Sinon, un devis sera établi";
    }
    
    // 📞 Contact et support
    if (message.includes('service client') || message.includes('numéro') || message.includes('08020')) {
      return "📞 **Service client Amendis**\n\nCentre d'appel Amendis Direct :\n**08020 08000**\n\nService disponible 24h/24 et 7j/7 !";
    }
    
    if (message.includes('agence') || message.includes('agences')) {
      return "🏢 **Trouver l'agence la plus proche**\n\nConsultez la rubrique 'Agences' sur www.amendis.ma pour :\n• Localiser l'agence la plus proche\n• Vérifier les horaires d'ouverture";
    }
    
    if (message.includes('contact internet') || message.includes('formulaire contact')) {
      return "💻 **Contacter Amendis par internet**\n\nOui ! Vous pouvez nous contacter :\n• Via l'espace client en ligne\n• Formulaire de contact sur le site officiel www.amendis.ma";
    }
    
    // ❓ Divers
    if (message.includes('application mobile') || message.includes('app mobile')) {
      return "📱 **Application mobile Amendis**\n\nOui ! L'application Amendis Mobile est disponible :\n• Android et iOS\n• Consulter vos factures\n• Effectuer des paiements\n• Suivre vos consommations";
    }
    
    if (message.includes('factures par sms') || message.includes('amendis info')) {
      return "📱 **Recevoir mes factures par SMS**\n\nActivez le service :\n• **Amendis Info** (gratuit)\n• **Amendis Info Plus** (payant)\n\nInscription : à votre agence ou via l'espace client";
    }
    
    if (message.includes('facture payée') || message.includes('vérifier paiement')) {
      return "✅ **Vérifier si j'ai payé une facture**\n\nConnectez-vous à votre espace client :\n• Section 'Mes factures'\n• Le statut (payée / non payée) est affiché\n• Ou contactez le service client pour confirmation";
    }
    
    // Réponses générales
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return "👋 Bonjour ! Je suis l'assistant virtuel AMENDIS. Comment puis-je vous aider aujourd'hui ?\n\n🔹 Compte client\n🔹 Paiement et factures\n🔹 Consommation\n🔹 Services administratifs\n🔹 Contact";
    }
    
    if (message.includes('aide') || message.includes('help')) {
      return "🆘 **Comment puis-je vous aider ?**\n\n**Sujets principaux :**\n🔑 Compte client et connexion\n💳 Paiement et factures\n📊 Consommation et compteur\n🛠 Services administratifs\n📞 Contact et support\n\n**Ou appelez directement :** 08020 08000 (24h/24)";
    }
    
    return "Merci pour votre message ! 😊 \n\nPour une réponse précise, vous pouvez :\n• Reformuler votre question\n• Appeler le 08020 08000 (gratuit, 24h/24)\n• Visiter www.amendis.ma\n• Utiliser les boutons d'action rapide\n\nComment puis-je mieux vous aider ?";
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-scale-in">
      <Card className="w-96 h-[600px] flex flex-col shadow-2xl glass-card">
        {/* Header */}
        <div className="bg-gradient-primary p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Assistant AMENDIS</h3>
              <p className="text-xs text-white/80">En ligne</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="p-2 h-auto flex-col space-y-1 hover-scale-sm"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{action.text}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex space-x-2">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tapez votre message... (FR, AR, EN)"
              className="min-h-[40px] max-h-[120px] resize-none"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="bg-primary hover:bg-primary-dark hover-scale-sm self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;