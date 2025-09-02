import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, CreditCard, Wrench } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Votre partenaire{' '}
              <span className="text-accent">énergétique</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              Distributeur d'électricité et d'eau au Maroc, nous vous accompagnons 
              avec des services de qualité et une assistance 24/7.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">1.2M+</div>
                <div className="text-white/80">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-white/80">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">99%</div>
                <div className="text-white/80">Satisfaction</div>
              </div>
            </div>

            <Button size="lg" variant="secondary" className="hover-scale bg-white text-primary hover:bg-white/90">
              Découvrir nos services
            </Button>
          </div>

          {/* Right Content - Quick Access Card */}
          <div className="animate-slide-up">
            <Card className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-primary">Accès rapide</h3>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 h-12 hover-scale-sm"
                >
                  <User className="w-5 h-5 text-primary" />
                  <span>Espace Client</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 h-12 hover-scale-sm"
                >
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>Payer ma facture</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 h-12 hover-scale-sm"
                >
                  <Wrench className="w-5 h-5 text-primary" />
                  <span>Signaler une panne</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;