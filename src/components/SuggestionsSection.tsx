import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SuggestionsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Suggestions Card */}
          <Card className="bg-yellow p-8 border-none">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                VOS SUGGESTIONS
              </h3>
              <p className="text-foreground/80">
                À votre écoute au quotidien
              </p>
              <div className="flex items-center text-foreground hover:text-foreground/80 transition-colors cursor-pointer pt-4">
                <span className="font-medium">Suggestions</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Card>

          {/* Social Media Card */}
          <Card className="bg-pink p-8 border-none">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Suivez-Nous
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">amendisoffi-</div>
                    <div className="text-sm text-foreground/70">ciel</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">@</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">@ficialamen-</div>
                    <div className="text-sm text-foreground/70">dis</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">f</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Amendis</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuggestionsSection;