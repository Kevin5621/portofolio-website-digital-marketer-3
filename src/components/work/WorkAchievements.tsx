"use client";

interface WorkAchievementsProps {
  achievements: {
    title: string;
    metrics: {
      platform: string;
      before: string;
      after: string;
      growth: string;
    }[];
  };
}

export const WorkAchievements = ({ achievements }: WorkAchievementsProps) => {
  return (
    <section className="py-24 px-6 bg-surface-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
          {achievements.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.metrics.map((metric) => (
            <div key={metric.platform} className="bg-surface-card p-8 rounded-xl border border-border-primary">
              {/* Platform Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {metric.platform.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-content-primary">
                  {metric.platform}
                </h3>
              </div>
              
              {/* Metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-content-tertiary">Before:</span>
                  <span className="text-lg font-medium text-content-secondary">
                    {metric.before}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-content-tertiary">After:</span>
                  <span className="text-lg font-medium text-content-secondary">
                    {metric.after}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border-secondary">
                  <span className="text-content-tertiary">Growth:</span>
                  <span className="text-xl font-bold text-success-600">
                    {metric.growth}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
