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
    { icon: User, text: "Mon compte", action: "Je veux accéder à mon compte client" },
    { icon: CreditCard, text: "Paiement", action: "Je veux payer ma facture" },
    { icon: Phone, text: "Contact", action: "Comment vous contacter ?" }
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
    
    if (message.includes('compte') || message.includes('connection')) {
      return "🔐 Pour accéder à votre espace client, rendez-vous sur www.amendis.ma et cliquez sur 'Espace Client'. Vous aurez besoin de votre numéro de contrat et de votre mot de passe.";
    }
    
    if (message.includes('facture') || message.includes('paiement') || message.includes('payer')) {
      return "💳 Vous pouvez payer votre facture de plusieurs façons :\n• En ligne sur votre espace client\n• Par carte bancaire sur notre site\n• Dans nos agences commerciales\n• Chez nos partenaires agréés\n\nAvez-vous besoin d'aide pour l'un de ces moyens ?";
    }
    
    if (message.includes('panne') || message.includes('problème') || message.includes('coupure')) {
      return "⚡ Pour signaler une panne :\n• Appelez le 08020 08000 (gratuit)\n• Utilisez notre application mobile\n• Connectez-vous à votre espace client\n\nPrécisez votre adresse exacte pour un traitement rapide de votre demande.";
    }
    
    if (message.includes('contact') || message.includes('téléphone') || message.includes('joindre')) {
      return "📞 Nos contacts :\n• Service client : 08020 08000 (gratuit, 24h/24)\n• Site web : www.amendis.ma\n• Agences commerciales dans toutes les grandes villes\n\nNotre équipe est à votre disposition 24h/24 et 7j/7 !";
    }
    
    return "Merci pour votre message ! 😊 Pour vous aider au mieux, vous pouvez :\n• Appeler notre service client au 08020 08000\n• Visiter www.amendis.ma\n• Utiliser les boutons d'action rapide ci-dessus\n\nEst-ce que cela répond à votre question ?";
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
          <div className="grid grid-cols-3 gap-2 mb-4">
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