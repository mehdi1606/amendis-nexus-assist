import { ChevronRight } from 'lucide-react';

const NewsSection = () => {
  const newsItems = [
    {
      category: "Projets/Activités",
      title: "Semaine Internationale de la Santé et Sécurité au Travail",
      date: "29.04.2024"
    },
    {
      category: "Projets/Activités",
      title: "Amendis renforce sa stratégie de détection des fuites par l'adoption de la technique des chiens renifleurs",
      date: "31.05.2024"
    },
    {
      category: "Projets/Activités", 
      title: "Amendis récompense les vainqueurs de son premier hackathon Innov'Ressources",
      date: "31.03.2024"
    },
    {
      category: "Projets/Activités",
      title: "Amendis lance la 2ème promotion de la formation en alternance au profit des jeunes bacheliers",
      date: "17.06.2024",
      hasImage: true
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-foreground">News</h2>
          <div className="flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
            <span>Toutes nos actualités</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="group cursor-pointer">
              <div className={`flex ${item.hasImage ? 'gap-4' : 'flex-col'}`}>
                {item.hasImage && (
                  <div className="w-32 h-24 bg-cyan-light rounded flex-shrink-0"></div>
                )}
                <div className={item.hasImage ? 'flex-1' : ''}>
                  <div className="text-xs text-primary font-medium mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {item.date}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;