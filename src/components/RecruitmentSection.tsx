import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import recruitmentTeam from '@/assets/recruitment-team.jpg';

const RecruitmentSection = () => {
  return (
    <section className="bg-recruitment-bg py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-blue-activity/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Enhanced with real image */}
          <div className="relative animate-scale-in">
            <div className="rounded-2xl shadow-strong overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <img 
                src={recruitmentTeam} 
                alt="Équipe Amendis - Professionnels engagés"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-cyan rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-green rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-foreground font-semibold">Équipe Amendis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="text-white space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl font-bold">
              Recrutement
            </h2>
            
            <p className="text-xl leading-relaxed opacity-90">
              Chez Amendis, nous sommes constamment à la recherche de talents passionnés 
              pour contribuer à notre succès et développer l'avenir des services publics au Maroc.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Rejoignez notre équipe :</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Opportunités de carrière évolutives</li>
                <li>• Formation continue et développement</li>
                <li>• Environnement de travail dynamique</li>
                <li>• Impact positif sur la communauté</li>
              </ul>
            </div>

            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-recruitment-bg transition-all duration-300 group shadow-medium"
            >
              <span>Consultez nos offres d'emploi actuelles</span>
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;