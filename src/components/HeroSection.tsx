import { ChevronRight } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  return (
    <section className="bg-cyan-light py-16 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-light/90 to-cyan-light/70" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Bénéficiez en<br />
              quelque clics de tous<br />
              nos services.
            </h1>
            
            <div className="flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer group">
              <span className="text-lg">Agence en ligne</span>
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Right Content - Enhanced Video Placeholder */}
          <div className="relative animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-gray-800 aspect-video rounded-xl shadow-strong overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBackground})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer group">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1 group-hover:scale-110 transition-transform"></div>
                  </div>
                  <p className="text-sm opacity-80">Vidéo de présentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;