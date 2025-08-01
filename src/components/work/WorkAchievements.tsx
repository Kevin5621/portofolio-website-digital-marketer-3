"use client";

interface WorkAchievementsProps {
  achievements: {
    title: string;
    subtitle: string;
    metrics: {
      platform: string;
      contentCreated: string;
      metrics: {
        label: string;
        value: string;
        percentage: string;
      }[];
    }[];
  };
}

export const WorkAchievements = ({ achievements }: WorkAchievementsProps) => {
  return (
    <section className="py-24 bg-surface-background">
      <div className="max-w-[95vw] mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary mb-8 text-center">
          {achievements.title}
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg text-content-secondary text-center mb-16">
          {achievements.subtitle}
        </p>
        
        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {achievements.metrics.map((platform) => (
            <div key={platform.platform} className="bg-surface-card p-8 rounded-xl border border-border-primary">
              {/* Platform Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    platform.platform === "Instagram" 
                      ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                      : platform.platform === "TikTok"
                      ? "bg-black"
                      : platform.platform === "YouTube"
                      ? "bg-red-600"
                      : "bg-blue-600"
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {platform.platform === "Instagram" && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      )}
                      {platform.platform === "TikTok" && (
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      )}
                      {platform.platform === "YouTube" && (
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      )}
                      {(platform.platform === "Educational Materials" || platform.platform === "Digital Platforms") && (
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      )}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-content-primary">
                    {platform.platform}
                  </h3>
                </div>
                
                {/* Content Created Text */}
                <p className="text-content-secondary text-lg">
                  {platform.contentCreated}
                </p>
              </div>
              
              {/* Divider */}
              <hr className="border-border-primary mb-6" />
              
              {/* Metrics */}
              <div className="space-y-6">
                {platform.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-lg text-green-600 mb-2">
                      ^ {metric.percentage}
                    </div>
                    <div className="text-content-secondary font-medium">
                      {metric.label}
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
