"use client";

interface WorkContentStrategiesProps {
  strategies: {
    title: string;
    description: string;
    images: string[];
  }[];
}

export const WorkContentStrategies = ({ strategies }: WorkContentStrategiesProps) => {
  return (
    <section className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
          Organic Strategies & Result Details
        </h2>
        
        <div className="space-y-20">
          {strategies.map((strategy) => (
            <div key={strategy.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-content-primary mb-6">
                  {strategy.title}
                </h3>
                <p className="text-lg text-content-secondary leading-relaxed">
                  {strategy.description}
                </p>
              </div>
              
              {/* Images Grid */}
              <div className="grid grid-cols-3 gap-4">
                {strategy.images.map((image) => (
                  <div key={image} className="aspect-square bg-neutral-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                      <span className="text-brand-600 text-sm font-medium">
                        Content Image
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
