"use client";

interface WorkBestContentProps {
  bestContent: {
    title: string;
    description: string;
    stats: {
      views: string;
      engagement: string;
      reach: string;
    };
    image: string;
  };
}

export const WorkBestContent = ({ bestContent }: WorkBestContentProps) => {
  return (
    <section className="py-24 px-6 bg-surface-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
          {bestContent.title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-square bg-neutral-200 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                <span className="text-accent-600 text-lg font-medium">
                  Best Content Image
                </span>
              </div>
            </div>
          </div>
          
          {/* Content Details */}
          <div className="order-1 lg:order-2">
            <p className="text-lg text-content-secondary leading-relaxed mb-8">
              {bestContent.description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-surface-card rounded-lg border border-border-primary">
                <div className="text-2xl md:text-3xl font-bold text-brand-600 mb-2">
                  {bestContent.stats.views}
                </div>
                <div className="text-sm text-content-tertiary uppercase tracking-wide">
                  Views
                </div>
              </div>
              
              <div className="text-center p-6 bg-surface-card rounded-lg border border-border-primary">
                <div className="text-2xl md:text-3xl font-bold text-success-600 mb-2">
                  {bestContent.stats.engagement}
                </div>
                <div className="text-sm text-content-tertiary uppercase tracking-wide">
                  Engagement
                </div>
              </div>
              
              <div className="text-center p-6 bg-surface-card rounded-lg border border-border-primary">
                <div className="text-2xl md:text-3xl font-bold text-accent-600 mb-2">
                  {bestContent.stats.reach}
                </div>
                <div className="text-sm text-content-tertiary uppercase tracking-wide">
                  Reach
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
