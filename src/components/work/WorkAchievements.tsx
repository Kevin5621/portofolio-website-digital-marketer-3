"use client";

import Image from "next/image";

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
  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case "Instagram":
        return "/logo/instagram.webp";
      case "TikTok":
        return "/logo/tiktok.webp";
      default:
        return "/logo/instagram.webp"; // fallback
    }
  };

  return (
    <section className="py-24 bg-surface-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-4">
            {achievements.title}
          </h2>
          <p className="text-base md:text-lg text-content-secondary max-w-4xl mx-auto">
            {achievements.subtitle}
          </p>
        </div>
        
        {/* Two Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.metrics.map((platform) => (
            <div 
              key={platform.platform} 
              className="rounded-2xl border border-border-primary px-6 py-8"
            >
              {/* Platform Header with Custom Icon and Name - Centered */}
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={getPlatformIcon(platform.platform)}
                    alt={`${platform.platform} icon`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-content-primary text-center">
                  {platform.platform}
                </h3>
              </div>
              
              {/* Divider Line */}
              <hr className="border-border-primary mb-6" />
              
              {/* Content Description */}
              <p className="text-content-secondary mb-8 text-center">
                {platform.contentCreated}
              </p>
              
              {/* Metrics Grid */}
              <div className="space-y-6">
                {platform.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    {/* Plus + Value + Percentage in same line */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">+</span>
                      <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-primary">
                        {metric.value.replace('+ ', '')}
                      </span>
                      <span className="text-lg font-medium text-green-600 ml-2">
                        <span>^</span>{metric.percentage}
                      </span>
                    </div>
                    
                    {/* Label below */}
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
