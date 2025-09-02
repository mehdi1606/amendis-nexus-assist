import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              Amendis
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">
              Qui sommes-nous ?
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">
              Nos activités
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">
              Médias
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">
              Carrières
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">
              Raison d'être
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">
              Contactez-nous
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <span>opéré par</span>
              <span className="ml-1 font-semibold text-primary">VEOLIA</span>
            </div>
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;