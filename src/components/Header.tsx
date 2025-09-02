import { Search, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AMENDIS
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-foreground hover:text-primary transition-colors duration-300">
              Accueil
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors duration-300">
              Services
            </a>
            <a href="#factures" className="text-foreground hover:text-primary transition-colors duration-300">
              Factures
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-300">
              Contact
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-primary">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">08020 08000</span>
            </div>
            <Button variant="ghost" size="sm" className="hover-scale">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;