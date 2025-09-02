import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-cyan-light py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Bénéficiez en<br />
              quelque clics de tous<br />
              nos services.
            </h1>
            
            <div className="flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
              <span className="text-lg">Agence en ligne</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </div>

          {/* Right Content - Video/Image Placeholder */}
          <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
              </div>
              <p className="text-sm opacity-80">Vidéo de présentation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;