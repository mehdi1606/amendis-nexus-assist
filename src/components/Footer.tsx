const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">        
        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 text-sm">
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Conditions générales de paiement des factures par Internet</a>
            <a href="#" className="hover:text-white transition-colors">Gérer mes cookies</a>
          </div>
          
          <div className="flex items-center text-gray-400">
            <span>© 2024 Veolia Amendis</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;