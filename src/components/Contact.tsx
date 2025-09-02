import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Globe, User, MessageCircle } from 'lucide-react';

interface ContactProps {
  onChatOpen: () => void;
}

const Contact = ({ onChatOpen }: ContactProps) => {
  return (
    <section id="contact" className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Notre équipe est disponible 24/7 pour répondre à vos questions 
            et vous accompagner dans vos démarches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Phone Contact */}
          <Card className="glass p-8 text-center space-y-4 hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Service Client
            </h3>
            <p className="text-white/80">
              Appelez-nous gratuitement
            </p>
            <div className="text-3xl font-bold text-accent">
              08020 08000
            </div>
          </Card>

          {/* Website */}
          <Card className="glass p-8 text-center space-y-4 hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Site Web
            </h3>
            <p className="text-white/80">
              Toutes nos informations
            </p>
            <div className="text-xl font-semibold text-accent">
              www.amendis.ma
            </div>
          </Card>

          {/* Client Space */}
          <Card className="glass p-8 text-center space-y-4 hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Espace Client
            </h3>
            <p className="text-white/80">
              Gérez vos factures en ligne
            </p>
            <Button 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90 hover-scale-sm"
            >
              Se connecter
            </Button>
          </Card>
        </div>

        {/* Chatbot CTA */}
        <div className="text-center animate-scale-in">
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-primary">
                Assistant Virtuel AMENDIS
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Besoin d'aide immédiate ? Notre assistant virtuel est disponible 24/7 
              pour répondre à vos questions en français, arabe ou anglais.
            </p>
            <Button 
              size="lg" 
              onClick={onChatOpen}
              className="bg-gradient-primary hover:shadow-blue hover-scale"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Démarrer une conversation
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;