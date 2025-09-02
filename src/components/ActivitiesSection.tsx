import { CreditCard, FileText, Leaf, Droplets, Plug, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import paymentSolutions from '@/assets/payment-solutions.jpg';
import environmentRse from '@/assets/environment-rse.jpg';
import waterConnection from '@/assets/water-connection.jpg';
import digitalServices from '@/assets/digital-services.jpg';

const ActivitiesSection = () => {
  const activities = [
    {
      title: "Nos solutions de paiement",
      icon: CreditCard,
      bgColor: "bg-cyan",
      textColor: "text-white",
      image: paymentSolutions
    },
    {
      title: "Régler votre facture",
      icon: FileText,
      bgColor: "bg-white",
      textColor: "text-foreground",
      border: true,
      image: digitalServices
    },
    {
      title: "Nos engagements RSE",
      icon: Leaf,
      bgColor: "bg-blue-activity",
      textColor: "text-white",
      image: environmentRse
    },
    {
      title: "Traitement des eaux usées",
      icon: Droplets,
      bgColor: "bg-cyan-light",
      textColor: "text-foreground",
      image: waterConnection
    },
    {
      title: "Branchement et Abonnement",
      icon: Plug,
      bgColor: "bg-green",
      textColor: "text-white",
      image: waterConnection
    },
    {
      title: "Accès à d'autres services",
      icon: Globe,
      bgColor: "bg-green-light",
      textColor: "text-foreground",
      image: digitalServices
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Nos activités
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Card 
                key={index}
                className={`${activity.bgColor} ${activity.textColor} relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-strong ${activity.border ? 'border-2 border-gray-200' : 'border-none'}`}
              >
                {/* Background Image */}
                {activity.image && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundImage: `url(${activity.image})` }}
                  />
                )}
                
                <div className="relative z-10 p-8 flex flex-col items-start h-full">
                  <div className="mb-auto">
                    <IconComponent className="w-8 h-8 mb-4" />
                    <h3 className="text-xl font-semibold leading-tight">
                      {activity.title}
                    </h3>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;