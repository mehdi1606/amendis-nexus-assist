import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecruitmentSection = () => {
  return (
    <section className="bg-recruitment-bg py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Illustration */}
          <div className="bg-cyan-light rounded-lg p-8 aspect-[4/3] flex items-center justify-center">
            <div className="text-center">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Simple illustration representation */}
                <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-foreground font-medium">Équipe Amendis</div>
            </div>
          </div>

          {/* Right Content */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold">
              Recrutement
            </h2>
            
            <p className="text-xl leading-relaxed">
              Chez Amendis, nous sommes constamment à la recherche de talents passionnés pour contribuer à notre succès.
            </p>

            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-recruitment-bg transition-all duration-300"
            >
              <span>Consultez nos offres d'emploi actuelles</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;