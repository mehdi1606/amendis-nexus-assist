const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AMENDIS
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Votre partenaire énergétique de confiance au Maroc. 
              Nous distribuons l'électricité et l'eau avec excellence depuis des décennies.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-accent transition-colors">Distribution électricité</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Approvisionnement eau</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Services d'assainissement</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Maintenance réseau</a></li>
            </ul>
          </div>

          {/* Client Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support Client</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-accent transition-colors">Espace Client</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Paiement en ligne</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Signaler une panne</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-2 text-slate-300">
              <p className="font-semibold text-accent">08020 08000</p>
              <p>Service client gratuit</p>
              <p>24h/24 - 7j/7</p>
              <p>www.amendis.ma</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400">
              © 2024 AMENDIS. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-accent transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;