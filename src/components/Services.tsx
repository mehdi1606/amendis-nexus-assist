import { Card } from '@/components/ui/card';
import { CheckCircle, Droplets, Zap, Wrench } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Électricité",
      description: "Distribution d'électricité fiable et continue",
      benefits: [
        "Réseau haute qualité",
        "Maintenance préventive",
        "Support technique 24/7",
        "Facturation transparente"
      ],
      color: "text-primary"
    },
    {
      icon: Droplets,
      title: "Eau potable",
      description: "Approvisionnement en eau potable de qualité",
      benefits: [
        "Eau contrôlée quotidiennement",
        "Réseau sécurisé",
        "Service continu",
        "Tarification équitable"
      ],
      color: "text-blue-500"
    },
    {
      icon: Wrench,
      title: "Assainissement",
      description: "Services d'assainissement et traitement des eaux",
      benefits: [
        "Collecte efficace",
        "Traitement écologique",
        "Infrastructure moderne",
        "Respect environnemental"
      ],
      color: "text-green-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nos <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AMENDIS vous accompagne au quotidien avec des services essentiels 
            de qualité pour votre confort et votre sécurité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="glass-card p-8 space-y-6 hover-scale transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-primary/10 ${service.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-lg">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;