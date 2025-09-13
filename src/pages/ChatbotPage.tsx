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
  Settings,
  Bot,
  Sparkles,
  ArrowLeft,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language: 'fr' | 'ar' | 'en';
  urgency?: 'low' | 'medium' | 'high';
}

// Classe IA Ultra-Réaliste Amendis avec base de données complète
class UltraRealisticAmendisAI {
  private language: 'fr' | 'ar' | 'en' = 'fr';
  private conversationHistory: Array<{role: 'user' | 'bot', content: string, timestamp: number, language: string}> = [];
  
  private amendisDatabase = {
    // Contact et urgences (données exactes)
    contacts: {
      urgence: '080 20 08000',
      description: 'Centre d\'appel Amendis Direct - Disponible 24h/24 et 7j/7',
      stats: '99% des appels traités en moins de 20 secondes',
      equipe: '26 téléconseillers + 6 superviseurs',
      repartition: '44% urgences/dépannage, 56% commercial'
    },
    
    // Tarifications exactes par ville et service
    tarifs: {
      eau: {
        tanger: [
          { tranche: '0-12 m³', prix: '2.64 DH/m³', type: 'social' },
          { tranche: '13-20 m³', prix: '6.60 DH/m³', type: 'normal' },
          { tranche: '21-40 m³', prix: '8.58 DH/m³', type: 'normal' },
          { tranche: '+40 m³', prix: '10.89 DH/m³', type: 'normal' }
        ],
        tetouan: [
          { tranche: '0-12 m³', prix: '2.75 DH/m³', type: 'social' },
          { tranche: '13-20 m³', prix: '6.88 DH/m³', type: 'normal' },
          { tranche: '21-40 m³', prix: '8.95 DH/m³', type: 'normal' },
          { tranche: '+40 m³', prix: '11.36 DH/m³', type: 'normal' }
        ]
      },
      electricite: {
        tanger: [
          { tranche: '0-150 kWh', prix: '0.9489 DH/kWh', type: 'social' },
          { tranche: '151-250 kWh', prix: '1.0516 DH/kWh', type: 'normal' },
          { tranche: '+250 kWh', prix: '1.1544 DH/kWh', type: 'normal' }
        ],
        prepaiement: '1.2607 DH/kWh pour les 150 premiers kWh mensuels (≤3kW)'
      }
    },
    
    // Procédures exactes avec délais officiels
    procedures: {
      raccordement: {
        delai_devis: '7 jours ouvrables après dossier complet',
        delai_travaux: '12 jours ouvrables après paiement',
        provisions: {
          electricite: '60 heures de puissance maximale souscrite',
          eau: 'Équivalent 30 m³ TTC pour compteurs ≤20mm'
        }
      },
      reclamations: {
        delai_reponse: '7 jours ouvrables maximum',
        suspension_recouvrement: 'Automatique pendant traitement',
        enquete_terrain: 'Systématique pour contestations facturation'
      }
    },
    
    // Services digitaux (données exactes)
    services: {
      application: {
        nom: 'Amendis Mobile',
        langues: ['Français', 'Arabe'],
        fonctions: [
          'Paiement sécurisé par carte bancaire',
          'Consultation consommations temps réel',
          'Géolocalisation agences + itinéraires',
          'Signalement incidents avec photos GPS',
          'Notifications personnalisées push'
        ]
      },
      paiement: {
        ussd: '#655# - Menu Amendis factures',
        jiwar: 'Points gratuits 7j/7 de 8h à 22h',
        gab: ['Banque Populaire', 'BMCE', 'SGMA', 'CIH Bank'],
        sms_confirmation: 'SMS automatique à chaque règlement'
      }
    },
    
    // Messages SMS officiels (reproduction exacte)
    sms_formats: {
      devis: 'Amendis: Votre devis N° {numero} a été validé',
      compteur: 'Amendis: Compteur inaccessible. Merci de libérer l\'accès',
      consommation: 'Amendis: Consommation anormalement élevée détectée',
      facture: 'Amendis: Montant {montant} DH - Échéance {date}'
    }
  };

  // Traductions officielles multilingues
  private translations = {
    fr: {
      greeting: "Bonjour et bienvenue sur l'assistant Amendis Direct. À votre écoute au quotidien pour tous vos services d'eau, d'électricité et d'assainissement dans les régions de Tanger et Tétouan.",
      signature: "Amendis à vos côtés - Service client professionnel 24h/24",
      urgence_detected: "Urgence détectée - Contactez immédiatement",
      phone_number: "Numéro d'urgence",
      thanks: "Je vous en prie, c'était un plaisir de vous aider. Amendis reste à votre disposition 24h sur 24.",
      complex_case: "Pour traiter votre demande spécifique, je vous oriente vers nos conseillers spécialisés"
    },
    ar: {
      greeting: "أهلاً وسهلاً بكم في مساعد أمنديس المباشر. نحن في خدمتكم يومياً لجميع خدمات الماء والكهرباء والصرف الصحي في مناطق طنجة وتطوان.",
      signature: "أمنديس معكم - خدمة عملاء مهنية 24/24 ساعة",
      urgence_detected: "تم اكتشاف حالة طارئة - اتصلوا فوراً",
      phone_number: "رقم الطوارئ",
      thanks: "عفواً، كان من دواعي سروري مساعدتكم. أمنديس في خدمتكم 24 ساعة على 24.",
      complex_case: "لمعالجة طلبكم المحدد، سأوجهكم إلى مستشارينا المختصين"
    },
    en: {
      greeting: "Hello and welcome to Amendis Direct assistant. We are at your service daily for all water, electricity and sanitation services in Tangier and Tetouan regions.",
      signature: "Amendis by your side - Professional customer service 24/7",
      urgence_detected: "Emergency detected - Contact immediately",
      phone_number: "Emergency number",
      thanks: "You're welcome, it was a pleasure helping you. Amendis remains at your disposal 24/7.",
      complex_case: "To handle your specific request, I'm directing you to our specialized advisors"
    }
  };

  // Détection automatique de langue
  detectLanguage(message: string): 'fr' | 'ar' | 'en' {
    const arabicChars = /[\u0600-\u06FF\u0750-\u077F]/;
    const englishWords = ['hello', 'help', 'payment', 'bill', 'water', 'electricity', 'how', 'what', 'where'];
    const frenchWords = ['bonjour', 'aide', 'paiement', 'facture', 'eau', 'electricite', 'comment', 'quoi', 'où'];
    
    if (arabicChars.test(message)) return 'ar';
    
    const messageWords = message.toLowerCase().split(' ');
    const englishMatches = messageWords.filter(word => englishWords.includes(word)).length;
    const frenchMatches = messageWords.filter(word => frenchWords.includes(word)).length;
    
    if (englishMatches > frenchMatches && englishMatches > 0) return 'en';
    return 'fr'; // Défaut français (langue principale Amendis)
  }

  // Analyse ultra-précise avec contexte géographique
  analyzeMessage(message: string) {
    const detectedLang = this.detectLanguage(message);
    this.language = detectedLang;
    
    const lowerMessage = message.toLowerCase();
    
    // Détection de ville (importante pour tarifs)
    let ville = null;
    if (lowerMessage.includes('tanger') || lowerMessage.includes('tangier')) ville = 'tanger';
    if (lowerMessage.includes('tetouan') || lowerMessage.includes('tétouan')) ville = 'tetouan';
    
    // Détection d'urgence avec mots-clés spécifiques
    const urgenceMotsClefs = [
      'urgent', 'vite', 'rapidement', 'maintenant', 'immédiat', 'emergency', 'طارئ', 'عاجل', 'سريع',
      'panne', 'coupure', 'fuite', 'plus de courant', 'plus d\'eau', 'black-out'
    ];
    const isUrgent = urgenceMotsClefs.some(mot => lowerMessage.includes(mot));
    
    // Détection de service avec terminologie exacte
    let service = null;
    let specificRequest = null;
    
    if (lowerMessage.includes('electricite') || lowerMessage.includes('courant') || lowerMessage.includes('kwh')) {
      service = 'electricite';
      if (lowerMessage.includes('panne') || lowerMessage.includes('coupure')) specificRequest = 'panne_electricite';
      if (lowerMessage.includes('compteur') || lowerMessage.includes('relevé')) specificRequest = 'compteur_electricite';
      if (lowerMessage.includes('tarif') || lowerMessage.includes('prix')) specificRequest = 'tarif_electricite';
    }
    
    if (lowerMessage.includes('eau') || lowerMessage.includes('water') || lowerMessage.includes('robinet') || lowerMessage.includes('m3')) {
      service = 'eau';
      if (lowerMessage.includes('fuite') || lowerMessage.includes('pression')) specificRequest = 'panne_eau';
      if (lowerMessage.includes('tarif') || lowerMessage.includes('prix')) specificRequest = 'tarif_eau';
    }
    
    if (lowerMessage.includes('facture') || lowerMessage.includes('paiement') || lowerMessage.includes('payer')) {
      specificRequest = 'facturation';
    }
    
    if (lowerMessage.includes('raccordement') || lowerMessage.includes('branchement') || lowerMessage.includes('nouveau')) {
      specificRequest = 'raccordement';
    }

    return {
      service,
      specificRequest,
      ville,
      urgency: isUrgent ? 'high' : 'low',
      language: detectedLang,
      message: lowerMessage
    };
  }

  // Générateur de réponses ultra-réalistes
  generateRealisticResponse(message: string): string {
    const analysis = this.analyzeMessage(message);
    const lang = this.translations[analysis.language];
    
    // Gestion des salutations avec style Amendis authentique
    if (analysis.message.includes('bonjour') || analysis.message.includes('salut') || 
        analysis.message.includes('hello') || analysis.message.includes('مرحبا')) {
      let response = lang.greeting + "\n\n";
      
      if (analysis.language === 'fr') {
        response += "Je peux vous renseigner immédiatement sur :\n";
        response += "• Vos factures et modes de paiement\n";
        response += "• Le suivi de votre consommation d'eau et d'électricité\n";
        response += "• Les procédures de raccordement et branchement\n";
        response += "• Les services d'urgence 24h/24\n";
        response += "• La géolocalisation de nos 28 agences\n\n";
        response += "Comment puis-je vous accompagner aujourd'hui ?";
      }
      
      return response;
    }

    // Gestion des urgences avec procédures exactes
    if (analysis.urgency === 'high') {
      let response = `🚨 ${lang.urgence_detected}\n\n`;
      response += `📞 ${lang.phone_number}: ${this.amendisDatabase.contacts.urgence}\n`;
      response += `${this.amendisDatabase.contacts.description}\n\n`;
      
      if (analysis.specificRequest === 'panne_electricite') {
        if (analysis.language === 'fr') {
          response += "Procédure d'urgence électrique :\n";
          response += "1. Vérifiez votre disjoncteur principal\n";
          response += "2. Contactez-nous immédiatement au 080 20 08000\n";
          response += "3. Précisez votre adresse exacte et le nombre de logements touchés\n";
          response += "4. Intervention garantie sous 4h maximum\n\n";
          response += "En parallèle, signalez l'incident via l'application Amendis Mobile avec géolocalisation pour accélérer notre intervention.";
        }
      }
      
      if (analysis.specificRequest === 'panne_eau') {
        if (analysis.language === 'fr') {
          response += "Procédure d'urgence eau :\n";
          response += "1. Vérifiez votre robinet d'arrêt principal\n";
          response += "2. Contactez immédiatement le 080 20 08000\n";
          response += "3. Nos équipes interviendront en priorité absolue\n";
          response += "4. Conservation de l'eau disponible recommandée\n\n";
          response += "Service d'urgence eau disponible 24h/24 avec intervention prioritaire.";
        }
      }
      
      return response;
    }

    // Gestion des tarifs avec données exactes par ville
    if (analysis.specificRequest === 'tarif_eau' || analysis.specificRequest === 'tarif_electricite') {
      if (analysis.language === 'fr') {
        let response = "";
        
        if (analysis.specificRequest === 'tarif_eau') {
          response += "📊 Tarification progressive de l'eau Amendis :\n\n";
          
          if (analysis.ville === 'tanger') {
            response += " Tanger  :\n";
            this.amendisDatabase.tarifs.eau.tanger.forEach(tranche => {
              response += `• ${tranche.tranche} : ${tranche.prix} (${tranche.type})\n`;
            });
          } else if (analysis.ville === 'tetouan') {
            response += " Tétouan  :\n";
            this.amendisDatabase.tarifs.eau.tetouan.forEach(tranche => {
              response += `• ${tranche.tranche} : ${tranche.prix} (${tranche.type})\n`;
            });
          } else {
            response += "Veuillez préciser votre ville (Tanger ou Tétouan) pour obtenir les tarifs exacts.\n\n";
            response += "Les tarifs diffèrent légèrement entre les deux villes selon les spécificités locales.";
          }
          
          response += "\n\nLa tarification progressive protège 51% de nos clients qui consomment moins de 6m³ par mois.";
          response += "\nFacture détaillée disponible sur amendisclient.ma ou via l'application Amendis Mobile.";
        }
        
        if (analysis.specificRequest === 'tarif_electricite') {
          response += "⚡ Tarification progressive de l'électricité Amendis :\n\n";
          response += " Tanger  (tarifs principaux) :\n";
          this.amendisDatabase.tarifs.electricite.tanger.forEach(tranche => {
            response += `• ${tranche.tranche} : ${tranche.prix} (${tranche.type})\n`;
          });
          
          response += `\n Compteurs prépayés  : ${this.amendisDatabase.tarifs.electricite.prepaiement}\n\n`;
          response += "66% de nos clients bénéficient de la tranche sociale (≤150 kWh/mois).\n";
          response += "Compteurs communicants disponibles pour un suivi temps réel.";
        }
        
        return response;
      }
    }

    // Gestion du paiement avec toutes les options exactes
    if (analysis.specificRequest === 'facturation') {
      if (analysis.language === 'fr') {
        return `💳 Solutions de paiement Amendis (toutes gratuites) :

 En ligne 24h/24  :
• Site amendisclient.ma - Paiement sécurisé Visa/MasterCard
• Application Amendis Mobile - Paiement + notification SMS
• Code USSD ${this.amendisDatabase.services.paiement.ussd} depuis votre mobile

 Réseau physique étendu  :
• Points Jiwar : ${this.amendisDatabase.services.paiement.jiwar}
• GAB partenaires : ${this.amendisDatabase.services.paiement.gab.join(', ')}
• 28 agences commerciales dans la région
• Prélèvement automatique bancaire

 Confirmation systématique  :
${this.amendisDatabase.services.paiement.sms_confirmation}

Pour éviter tout retard, activez le prélèvement automatique ou les rappels SMS "Amendis Info" (gratuit).`;
      }
    }

    // Gestion des raccordements avec procédures officielles
    if (analysis.specificRequest === 'raccordement') {
      if (analysis.language === 'fr') {
        return `🔌 Procédure de raccordement Amendis :

 Délais garantis  :
• Établissement devis : ${this.amendisDatabase.procedures.raccordement.delai_devis}
• Réalisation travaux : ${this.amendisDatabase.procedures.raccordement.delai_travaux}

 Provisions requises  :
• Électricité : ${this.amendisDatabase.procedures.raccordement.provisions.electricite}
• Eau : ${this.amendisDatabase.procedures.raccordement.provisions.eau}

 Documents obligatoires  :
• Carte d'identité nationale (CIN)
• Titre de propriété ou contrat de location
• Plan de situation et plan architectural
• Autorisation de construire (si applicable)

 Étapes du processus  :
1. Dépôt dossier complet → Accusé réception
2. Vérification documents + absence arriérés
3. Établissement devis (si nécessaire)
4. Paiement provision
5. Pose compteur sous 24h + 48h si intervention

Rendez-vous dans l'une de nos 28 agences avec votre dossier complet pour un traitement optimal.`;
      }
    }

    // Gestion de l'application mobile avec fonctionnalités exactes
    if (analysis.message.includes('application') || analysis.message.includes('mobile') || analysis.message.includes('app')) {
      if (analysis.language === 'fr') {
        return `📱 Application "${this.amendisDatabase.services.application.nom}" :

 Disponibilité  : iOS et Android
 Langues  : ${this.amendisDatabase.services.application.langues.join(' et ')}

 Fonctionnalités complètes  :
${this.amendisDatabase.services.application.fonctions.map(f => `• ${f}`).join('\n')}

 Téléchargement  :
• App Store (iOS) : Recherchez "Amendis Mobile"
• Google Play (Android) : Recherchez "Amendis Mobile"

 Nouveautés 2024  :
• Mode sombre pour confort visuel
• Widget consommation sur écran d'accueil  
• Notifications push personnalisables
• Sauvegarde automatique des données

L'application remplace avantageusement les déplacements en agence pour 80% de vos besoins quotidiens.`;
      }
    }

    // Remerciements avec style Amendis
    if (analysis.message.includes('merci') || analysis.message.includes('thank you') || analysis.message.includes('شكرا')) {
      return lang.thanks + "\n\n" + lang.signature;
    }

    // Contact et agences
    if (analysis.message.includes('agence') || analysis.message.includes('contact') || analysis.message.includes('adresse')) {
      if (analysis.language === 'fr') {
        return `🏢 Réseau Amendis à votre service :

 Centre d'appel unique  :
${this.amendisDatabase.contacts.urgence} - ${this.amendisDatabase.contacts.description}
Performance : ${this.amendisDatabase.contacts.stats}

 28 agences commerciales  réparties dans la région Tanger-Tétouan-Al Hoceima

 Localisation interactive  :
• Application Amendis Mobile → Géolocalisation automatique
• Site amendis.ma → Rubrique "Agences"
• Calcul d'itinéraires inclus

 Services digitaux  :
• Formulaire contact : amendis.ma
• Espace client : amendisclient.ma  
• Réseaux sociaux : @AmendisOfficiel

 Horaires généraux  :
Lundi-Vendredi : 8h30-16h30
Samedi : 8h30-12h00 (agences principales)

Pour une assistance immédiate, privilégiez notre centre d'appel disponible 24h/24.`;
      }
    }

    // Réponse générale avec style Amendis authentique
    if (analysis.language === 'fr') {
      return `À votre écoute au quotidien pour vous accompagner.

Je peux vous renseigner précisément sur :

 Services essentiels  :
• Eau potable, électricité et assainissement
• Urgences et dépannages 24h/24
• Facturation et modes de paiement
• Consommations et relevés de compteurs

 Services pratiques  :
• Raccordements et modifications d'abonnement  
• Applications mobiles et services en ligne
• Localisation de nos 28 agences régionales
• Procédures administratives complètes

 Pour aller plus loin  :
${lang.complex_case} au ${this.amendisDatabase.contacts.urgence}.

N'hésitez pas à reformuler votre question ou à préciser votre besoin spécifique.

${lang.signature}`;
    }

    return lang.greeting;
  }

  setLanguage(lang: 'fr' | 'ar' | 'en') {
    this.language = lang;
  }
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour et bienvenue sur l'assistant Amendis Direct. À votre écoute au quotidien pour tous vos services d'eau, d'électricité et d'assainissement dans les régions de Tanger et Tétouan. \n\nJe maîtrise parfaitement nos tarifs, procédures et services. Comment puis-je vous accompagner aujourd'hui ?",
      isUser: false,
      timestamp: new Date(),
      language: 'fr'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'fr' | 'ar' | 'en'>('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const amendisAI = useRef(new UltraRealisticAmendisAI()).current;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { 
      icon: CreditCard, 
      text: "💳 Payer ma facture", 
      action: "Comment payer ma facture Amendis ?",
      color: "bg-gradient-to-r from-green-600 to-green-700"
    },
    { 
      icon: Phone, 
      text: "📞 Urgence 24h/24", 
      action: "J'ai une panne d'électricité urgente",
      color: "bg-gradient-to-r from-red-600 to-red-700"
    },
    { 
      icon: FileText, 
      text: "📊 Mes tarifs", 
      action: "Quels sont vos tarifs d'eau et d'électricité ?",
      color: "bg-gradient-to-r from-blue-600 to-blue-700"
    },
    { 
      icon: Settings, 
      text: "🔌 Nouveau raccordement", 
      action: "Je veux faire un nouveau raccordement",
      color: "bg-gradient-to-r from-purple-600 to-purple-700"
    }
  ];

  const languageOptions = [
    { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
    { code: 'ar' as const, label: 'العربية', flag: '🇲🇦' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧' }
  ];

  const handleLanguageChange = (lang: 'fr' | 'ar' | 'en') => {
    setCurrentLanguage(lang);
    amendisAI.setLanguage(lang);
    
    // Message de confirmation du changement de langue
    const confirmMessages = {
      fr: "Langue changée en français. Je reste à votre disposition pour tous vos besoins Amendis.",
      ar: "تم تغيير اللغة إلى العربية. أبقى في خدمتكم لجميع احتياجاتكم من أمنديس.",
      en: "Language changed to English. I remain at your disposal for all your Amendis needs."
    };

    const confirmMessage: Message = {
      id: Date.now().toString(),
      content: confirmMessages[lang],
      isUser: false,
      timestamp: new Date(),
      language: lang
    };

    setMessages(prev => [...prev, confirmMessage]);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulation réaliste du temps de traitement
    const processingTime = Math.random() * 1500 + 800;

    setTimeout(() => {
      const response = amendisAI.generateRealisticResponse(content);
      const detectedLang = amendisAI.detectLanguage(content);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
        language: detectedLang
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Mise à jour automatique de la langue si détectée différente
      if (detectedLang !== currentLanguage) {
        setCurrentLanguage(detectedLang);
      }
    }, processingTime);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30">
      {/* Header professionnel Amendis */}
      <div className="border-b bg-white/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Retour</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 flex-1 justify-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-center">
                <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  Assistant Amendis Direct
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Service professionnel • 1,8M clients • Tanger-Tétouan
                </p>
              </div>
            </div>
            
            {/* Sélecteur de langue */}
            <div className="flex items-center gap-2">
              {languageOptions.map((lang) => (
                <Button
                  key={lang.code}
                  variant={currentLanguage === lang.code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`text-xs px-3 py-2 ${
                    currentLanguage === lang.code 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Globe className="w-3 h-3 mr-1" />
                  {lang.flag} {lang.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Indicateurs de performance */}
          <div className="flex justify-center mt-3 gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>99% appels &lt;20s</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>080 20 08000 - 24h/24</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>28 agences régionales</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            
            {/* Sidebar Actions Rapides */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="p-4 bg-white/80 backdrop-blur border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-slate-800">Actions Rapides</h2>
                </div>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className={`w-full justify-start h-auto p-3 ${action.color} hover:scale-105 text-white border-none shadow-lg hover:shadow-xl group transition-all duration-200`}
                      variant="default"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <action.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-semibold text-sm leading-tight">{action.text}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Statistiques Amendis */}
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-lg">
                <h3 className="font-bold mb-3 text-blue-800 text-sm">Amendis en Chiffres</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Clients desservis</span>
                    <Badge className="bg-blue-600 text-white text-xs px-2 py-1">1,8M</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Temps de réponse</span>
                    <Badge variant="outline" className="text-green-700 border-green-300 text-xs px-2 py-1">&lt; 20s</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Interventions</span>
                    <Badge className="bg-orange-500 text-white text-xs px-2 py-1">&lt; 4h</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Agences</span>
                    <Badge className="bg-purple-600 text-white text-xs px-2 py-1">28</Badge>
                  </div>
                </div>
              </Card>

              {/* Info Contact */}
              <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 shadow-lg">
                <h3 className="font-bold mb-2 text-red-800 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Urgences 24h/24
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-700 mb-1">
                    080 20 08000
                  </div>
                  <div className="text-xs text-slate-600">
                    Centre Amendis Direct
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    26 téléconseillers + 6 superviseurs
                  </div>
                </div>
              </Card>
            </div>

            {/* Interface Chat Principale */}
            <div className="lg:col-span-3">
              <Card className="flex flex-col h-[70vh] min-h-[500px] bg-white/90 backdrop-blur border border-slate-200 shadow-xl">
                
                {/* Header du Chat */}
                <div className="border-b border-slate-200 p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Assistant Amendis Direct</h3>
                      <p className="text-sm text-slate-600">
                        IA experte • Base de données complète • Réponses certifiées
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-green-100 text-green-800 border border-green-300">
                        Ultra-Réaliste
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Zone des Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/30 to-white">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-md ${
                            message.isUser
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                              : 'bg-white text-slate-800 border border-slate-200'
                          } ${message.urgency === 'high' ? 'border-l-4 border-l-red-500' : ''}`}
                        >
                          <div 
                            className={`whitespace-pre-line text-sm leading-relaxed font-medium ${
                              message.language === 'ar' ? 'text-right' : 'text-left'
                            }`}
                            dir={message.language === 'ar' ? 'rtl' : 'ltr'}
                          >
                            {message.content}
                          </div>
                          {message.urgency === 'high' && !message.isUser && (
                            <div className="mt-2 flex items-center gap-1 text-red-600 text-xs font-bold">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              URGENCE DÉTECTÉE
                            </div>
                          )}
                        </div>
                        <div className={`text-xs text-slate-500 mt-1 flex items-center gap-2 ${
                          message.isUser ? 'justify-end' : 'justify-start'
                        }`}>
                          <span>{message.timestamp.toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</span>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {message.language.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className={`${message.isUser ? 'order-1 mr-2' : 'order-2 ml-2'} flex-shrink-0`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                          message.isUser 
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                            : 'bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300'
                        }`}>
                          {message.isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-slate-700" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Indicateur de frappe ultra-réaliste */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-md">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-slate-600 font-medium">
                            Amendis Direct analyse votre demande...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Zone de Saisie Perfectionnée */}
                <div className="border-t border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex gap-3">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        currentLanguage === 'ar' ? 'اكتبوا استفساركم هنا...' :
                        currentLanguage === 'en' ? 'Type your question here...' :
                        'Décrivez votre demande en détail...'
                      }
                      className={`flex-1 resize-none min-h-[44px] max-h-32 bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl shadow-sm ${
                        currentLanguage === 'ar' ? 'text-right' : 'text-left'
                      }`}
                      dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
                      rows={1}
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 px-4 shrink-0 rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>IA Amendis certifiée • Données officielles 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>Urgence : 080 20 08000</span>
                    </div>
                  </div>
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