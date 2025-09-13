import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X, User, CreditCard, Phone, Zap, Droplet } from 'lucide-react';

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

// Classe IA Amendis avec réponses professionnelles
class ProfessionalAmendisAI {
  private conversationHistory: Array<{role: 'user' | 'bot', content: string, timestamp: number}> = [];
  
  private knowledgeBase = {
    services: {
      'électricité': {
        keywords: ['électricité', 'courant', 'panne', 'coupure', 'électrique', 'kwh', 'disjoncteur', 'branchement'],
        urgentKeywords: ['panne', 'coupure', 'plus de courant', 'black-out']
      },
      'eau': {
        keywords: ['eau', 'robinet', 'fuite', 'assainissement', 'm3', 'potable', 'canalisation', 'pression'],
        urgentKeywords: ['fuite', 'plus d\'eau', 'coupure eau', 'pression']
      },
      'facture': {
        keywords: ['facture', 'paiement', 'payer', 'montant', 'retard', 'impayé', 'échéance', 'somme'],
        urgentKeywords: ['retard', 'impayé', 'coupure', 'menace']
      }
    },
    locations: ['tanger', 'tétouan', 'larache', 'ksar el kebir', 'asilah', 'chefchaouen', 'martil', 'fnideq'],
    urgencyIndicators: ['urgent', 'vite', 'rapidement', 'maintenant', 'immédiat', 'emergency', 'aide']
  };

  analyzeMessage(message: string) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Détection d'urgence
    const hasUrgentWords = this.knowledgeBase.urgencyIndicators.some(word => lowerMessage.includes(word));
    let urgency = 'low';
    
    // Détection du service
    let service = null;
    let hasServiceUrgency = false;
    
    for (const [serviceName, serviceData] of Object.entries(this.knowledgeBase.services)) {
      const keywordMatches = serviceData.keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      const urgentMatches = serviceData.urgentKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
      
      if (keywordMatches > 0 || urgentMatches > 0) {
        if (urgentMatches > 0) {
          hasServiceUrgency = true;
          urgency = 'high';
        }
        service = serviceName;
        break;
      }
    }
    
    if (hasUrgentWords && !hasServiceUrgency) {
      urgency = 'medium';
    }

    // Détection de localisation
    const location = this.knowledgeBase.locations.find(loc => lowerMessage.includes(loc));

    return { service, urgency, location, message: lowerMessage };
  }

  generateResponse(message: string): string {
    const analysis = this.analyzeMessage(message);
    
    // Salutations
    if (analysis.message.includes('bonjour') || analysis.message.includes('salut') || analysis.message.includes('hello')) {
      return "Bonjour et bienvenue sur l'assistant Amendis. Je suis à votre disposition pour répondre à toutes vos questions concernant vos services d'eau, d'électricité et vos factures. Comment puis-je vous aider aujourd'hui ?";
    }

    // Remerciements
    if (analysis.message.includes('merci') || analysis.message.includes('thank you')) {
      return "Je vous en prie, c'était un plaisir de vous aider. Si vous avez d'autres questions concernant nos services, n'hésitez pas à me contacter. Pour une assistance immédiate, vous pouvez également joindre notre centre d'appel au 08020 08000, disponible 24h sur 24.";
    }

    // Électricité
    if (analysis.service === 'électricité') {
      if (analysis.message.includes('panne') || analysis.message.includes('coupure')) {
        if (analysis.urgency === 'high') {
          let response = "Je comprends votre situation d'urgence concernant la panne d'électricité. Voici la procédure à suivre immédiatement :\n\n";
          response += "Contactez sans délai notre centre d'appel au 08020 08000, disponible 24h sur 24. Nos équipes techniques interviendront dans les 4 heures maximum.\n\n";
          response += "En attendant l'intervention, vérifiez que votre disjoncteur principal n'a pas disjoncté et débranchez vos appareils électriques sensibles pour éviter tout dommage lors du rétablissement.";
          
          if (analysis.location) {
            response += `\n\nNos équipes techniques du secteur de ${analysis.location} sont alertées de votre demande.`;
          }
          return response;
        }
        return "Pour signaler une panne d'électricité, je vous invite à contacter notre service technique au 08020 08000. Avant de nous appeler, vérifiez que votre disjoncteur principal n'a pas disjoncté et renseignez-vous auprès de vos voisins pour savoir si la panne est généralisée. Nos équipes interviennent généralement dans un délai de 4 heures maximum.";
      }
      
      if (analysis.message.includes('facture') || analysis.message.includes('consommation')) {
        return "Pour consulter votre consommation électrique et gérer vos factures, connectez-vous à votre espace client sur amendisclient.ma. Vous y trouverez l'historique de vos consommations sur 12 mois, vos factures et la possibilité de les régler en ligne de manière sécurisée.";
      }
      
      return "Concernant nos services d'électricité, Amendis assure la distribution et la maintenance du réseau électrique dans votre région. Nous proposons différents tarifs selon votre profil de consommation. Pour toute information spécifique, contactez-nous au 08020 08000 ou consultez amendisclient.ma.";
    }

    // Eau
    if (analysis.service === 'eau') {
      if (analysis.message.includes('fuite') || analysis.message.includes('panne') || analysis.message.includes('pression')) {
        return "Les problèmes liés à l'eau nécessitent une intervention rapide. Contactez immédiatement notre service client au 08020 08000. Nos équipes techniques sont formées pour traiter en priorité les urgences concernant l'approvisionnement en eau. En attendant, vérifiez si votre robinet d'arrêt principal fonctionne correctement.";
      }
      
      if (analysis.message.includes('facture') || analysis.message.includes('consommation')) {
        return "Votre consommation d'eau est facturée selon une tarification progressive. Vous pouvez suivre votre consommation mensuelle dans votre espace client sur amendisclient.ma. Cette plateforme vous permet également de comparer vos consommations et de détecter d'éventuelles anomalies.";
      }
      
      return "Amendis vous garantit une eau potable de qualité, contrôlée en permanence selon les normes en vigueur. Nous gérons également l'assainissement et le traitement des eaux usées dans le respect de l'environnement. Pour toute question, contactez-nous au 08020 08000.";
    }

    // Factures et paiement
    if (analysis.service === 'facture') {
      if (analysis.message.includes('retard') || analysis.message.includes('impayé')) {
        return "Si votre facture présente un retard de paiement, contactez rapidement notre service client au 08020 08000. Nous pourrons étudier avec vous les solutions disponibles, notamment la possibilité d'un échelonnement de paiement pour éviter une interruption de service. Plusieurs moyens de paiement sont à votre disposition : paiement en ligne sur amendisclient.ma, distributeurs automatiques bancaires disponibles 24h sur 24, ou application Fatourati.";
      }
      
      if (analysis.message.includes('comment payer') || analysis.message.includes('paiement')) {
        return "Plusieurs moyens de paiement s'offrent à vous :\n\nEn ligne : Connectez-vous à amendisclient.ma, section \"Mes factures\", puis cliquez sur \"Payer\". Le paiement est sécurisé et accepte les cartes Visa et MasterCard.\n\nFatourati : Utilisez l'application ou le site Fatourati. Recherchez Amendis et saisissez votre numéro de contrat.\n\nDistributeurs automatiques : Disponibles 24h sur 24 dans toutes les banques partenaires.\n\nCode USSD : Tapez #655# depuis votre téléphone mobile et suivez les instructions pour les factures Amendis.\n\nPrélèvement automatique : Demandez le formulaire dans votre agence bancaire pour ne plus vous soucier des échéances.";
      }
      
      return "Pour toute question concernant vos factures, vous pouvez consulter votre espace client sur amendisclient.ma où vous trouverez l'historique complet de vos factures, les échéances à venir et les moyens de paiement disponibles. Le paiement en ligne est sécurisé et disponible 24h sur 24.";
    }

    // Compte client
    if (analysis.message.includes('compte') || analysis.message.includes('connexion') || analysis.message.includes('inscription')) {
      return "Pour créer votre compte client Amendis, rendez-vous sur amendisclient.ma et cliquez sur \"Créer un compte\". Vous devrez fournir votre numéro de contrat (visible en haut de votre facture), votre adresse email et votre numéro de carte d'identité. Une fois votre compte créé, vous aurez accès à tous vos services en ligne 24h sur 24 : consultation et paiement des factures, suivi de consommation, et gestion de vos contrats.";
    }

    // Contact et agences
    if (analysis.message.includes('agence') || analysis.message.includes('contact') || analysis.message.includes('téléphone')) {
      return "Pour nous contacter, plusieurs options s'offrent à vous :\n\nCentre d'appel : 08020 08000, disponible 24h sur 24 et 7 jours sur 7 pour toutes vos urgences et demandes d'information.\n\nAgences : Consultez la rubrique \"Agences\" sur notre site amendis.ma pour localiser l'agence la plus proche de chez vous avec les horaires d'ouverture.\n\nApplication mobile : Téléchargez gratuitement l'application Amendis Mobile qui vous permet de localiser les agences avec itinéraires et de gérer vos services à distance.\n\nEn ligne : Utilisez le formulaire de contact sur amendis.ma pour vos demandes non urgentes.";
    }

    // Consommation
    if (analysis.message.includes('consommation') || analysis.message.includes('compteur') || analysis.message.includes('relevé')) {
      return "Pour suivre votre consommation d'eau et d'électricité, connectez-vous à votre espace client sur amendisclient.ma. Dans la rubrique \"Consommation\", vous trouverez l'historique détaillé de vos relevés sur 12 mois, des graphiques de comparaison mensuelle et la possibilité de déclarer vous-même votre relevé de compteur. Si vous constatez une consommation anormalement élevée, contactez notre service client au 08020 08000 pour demander une vérification de votre compteur.";
    }

    // Application mobile
    if (analysis.message.includes('app') || analysis.message.includes('application') || analysis.message.includes('mobile')) {
      return "L'application Amendis Mobile est disponible gratuitement sur Google Play Store et App Store. Elle vous permet de gérer intégralement vos contrats depuis votre smartphone : consultation et paiement des factures, suivi de la consommation, localisation des agences avec itinéraires, signalement d'incidents avec géolocalisation, et notifications personnalisées. L'application est disponible en français et en arabe.";
    }

    // Réponse par défaut
    return "Je suis votre assistant virtuel Amendis et je peux vous renseigner sur tous nos services : électricité, eau potable, assainissement, facturation et gestion de votre compte client. Pour obtenir une réponse précise, n'hésitez pas à reformuler votre question ou à utiliser les boutons d'actions rapides. Pour une assistance immédiate avec un conseiller, appelez le 08020 08000, disponible 24h sur 24.";
  }
}

const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour et bienvenue sur l'assistant virtuel Amendis. Je suis à votre disposition pour répondre à toutes vos questions concernant vos services d'eau, d'électricité, vos factures et votre compte client. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const amendisAI = useRef(new ProfessionalAmendisAI()).current;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { 
      icon: Zap, 
      text: "Panne électrique", 
      action: "J'ai une panne d'électricité"
    },
    { 
      icon: Droplet, 
      text: "Problème d'eau", 
      action: "J'ai un problème d'eau"
    },
    { 
      icon: CreditCard, 
      text: "Payer ma facture", 
      action: "Comment payer ma facture"
    },
    { 
      icon: Phone, 
      text: "Nous contacter", 
      action: "Comment vous contacter"
    }
  ];

  // Réponses professionnelles pour les FAQ
  const professionalFAQResponses: { [key: string]: string } = {
    "J'ai une panne d'électricité": "Je comprends votre situation concernant la panne d'électricité. Voici la procédure à suivre :\n\nContactez immédiatement notre centre d'appel au 08020 08000, disponible 24h sur 24. Nos équipes techniques interviendront dans les 4 heures maximum.\n\nAvant de nous contacter, vérifiez que votre disjoncteur principal n'a pas disjoncté et renseignez-vous auprès de vos voisins pour savoir si la panne est généralisée.\n\nEn cas d'urgence, précisez votre localisation exacte pour une intervention plus rapide.",
    
    "J'ai un problème d'eau": "Les problèmes liés à l'eau nécessitent une intervention rapide. Contactez immédiatement notre service client au 08020 08000, disponible 24h sur 24.\n\nNos équipes techniques sont formées pour traiter en priorité les urgences concernant l'approvisionnement en eau.\n\nEn attendant l'intervention, vérifiez si votre robinet d'arrêt principal fonctionne correctement et si le problème concerne uniquement votre logement ou l'ensemble du quartier.",
    
    "Comment payer ma facture": "Amendis met à votre disposition plusieurs moyens de paiement pour votre confort :\n\nPaiement en ligne : Connectez-vous à amendisclient.ma, consultez vos factures dans la section \"Mes factures\" et réglez-les de manière sécurisée avec votre carte Visa ou MasterCard.\n\nApplication Fatourati : Recherchez Amendis dans l'application, saisissez votre numéro de contrat et choisissez votre mode de paiement préféré.\n\nDistributeurs automatiques : Disponibles 24h sur 24 dans toutes les banques partenaires pour un paiement rapide et sécurisé.\n\nCode USSD : Composez #655# depuis votre téléphone mobile et suivez le menu pour accéder aux factures Amendis.\n\nPrélèvement automatique : Contactez votre agence bancaire pour mettre en place ce service qui vous évite tout oubli d'échéance.",
    
    "Comment vous contacter": "Pour nous contacter, plusieurs options s'offrent à vous selon la nature de votre demande :\n\nCentre d'appel : 08020 08000, disponible 24h sur 24 et 7 jours sur 7 pour toutes vos urgences et demandes d'information. Nos conseillers spécialisés vous guideront selon vos besoins.\n\nAgences : Consultez la rubrique \"Agences\" sur notre site amendis.ma pour localiser l'agence la plus proche de chez vous avec les horaires d'ouverture et les services disponibles.\n\nApplication mobile : Téléchargez gratuitement l'application Amendis Mobile qui utilise la géolocalisation pour vous indiquer l'agence la plus proche et calculer l'itinéraire.\n\nServices en ligne : Utilisez le formulaire de contact sur amendis.ma ou votre espace client pour vos demandes non urgentes."
  };

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

    // Simulation d'une réflexion intelligente
    const thinkingTime = Math.random() * 1500 + 1000;

    setTimeout(() => {
      // Vérifier d'abord les réponses FAQ, sinon utiliser l'IA
      const response = professionalFAQResponses[content] || amendisAI.generateResponse(content);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, thinkingTime);
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
      <Card className="w-96 h-[600px] flex flex-col shadow-2xl glass-card border-2 border-primary/20">
        {/* Header professionnel */}
        <div className="bg-gradient-primary p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
              <MessageCircle className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Assistant AMENDIS
              </h3>
              <p className="text-xs text-white/90 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Service client professionnel
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages avec style professionnel */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  message.isUser
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                } ${!message.isUser ? 'border-l-4 border-l-primary/30' : ''}`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed font-medium">
                  {message.content}
                </p>
                <p className={`text-xs mt-2 ${
                  message.isUser ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Indicateur de frappe professionnel */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm border-l-4 border-l-primary/30">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Assistant en cours de rédaction...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Actions rapides professionnelles */}
        <div className="p-4 border-t bg-white">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="text-xs p-3 h-auto hover:bg-primary hover:text-white transition-colors border-primary/30"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs leading-tight font-medium">{action.text}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Zone de saisie professionnelle */}
        <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
          <div className="flex space-x-2">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Décrivez votre demande..."
              className="flex-1 resize-none min-h-[40px] max-h-[100px] border-2 border-primary/20 focus:border-primary rounded-xl"
              rows={1}
            />
            <Button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 rounded-xl px-4 py-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center font-medium">
            Service professionnel 24h/24 • Centre d'appel : 08020 08000
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;