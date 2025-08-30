"use client";

import { WorkDetail } from "@/data/work-details";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

interface WorkDetailHeroProps {
  workDetail: WorkDetail;
}

export const WorkDetailHero = ({ workDetail }: WorkDetailHeroProps) => {
  // Parallax untuk foto
  const photoParallaxRef = useParallax<HTMLDivElement>({
    speed: 0.2,
    direction: 'up',
    offset: 0
  });

  // Parallax untuk logo dengan kecepatan lebih tinggi
  const logoParallaxRef = useParallax<HTMLDivElement>({
    speed: 0.3,
    direction: 'down',
    offset: 0
  });

  return (
    <section className="relative bg-surface-background min-h-screen">
      <div className="max-w-[95vw] mx-auto px-6 py-24">
        {/* Single Line Title - Centered, Smaller */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-none">
            {workDetail.client}
          </h1>
        </div>

        {/* Three Column Layout */}
        <div className={`grid gap-12 lg:gap-16 mb-16 ${workDetail.credits.length > 0 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Column 1: Role/Services */}
          <div>
            <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4 border-b border-border-primary pb-2">
              ROLE / SERVICES
            </h3>
            <p className="text-lg text-content-secondary font-medium">
              {workDetail.role}
            </p>
          </div>

          {/* Column 2: Credits - Only show if credits exist */}
          {workDetail.credits.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4 border-b border-border-primary pb-2">
                CREDITS
              </h3>
              <div className="space-y-2">
                {workDetail.credits.map((credit) => (
                  <p key={credit} className="text-lg text-content-secondary">
                    {credit}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Column 3: Location & Year */}
          <div>
            <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4 border-b border-border-primary pb-2">
              LOCATION & YEAR
            </h3>
            <p className="text-lg text-content-secondary font-medium">
              {workDetail.location.split(',')[0]}, {workDetail.year}
            </p>
          </div>
        </div>

        {/* Hero Image Section - Almost full viewport width */}
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          {/* Background Image dengan parallax effect */}
          <div 
            ref={photoParallaxRef}
            className="absolute inset-0 will-change-transform"
            style={{
              height: '155%',
              top: '-15.5%'
            }}
          >
            <Image
              src={`/work/${workDetail.id}/hero.webp`}
              alt={`${workDetail.client} hero image`}
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay untuk memastikan text putih terlihat jelas */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Title Overlay - White text in center */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none text-center">
              {workDetail.client}
            </h2>
          </div>
        </div>

        {/* Logo - Separate layer with custom positioning */}
        <div className="relative">
          <div 
            ref={logoParallaxRef}
            className="absolute w-32 h-32 md:w-40 md:h-40 bg-surface-background rounded-full p-2 shadow-lg will-change-transform"
            style={{
              top: '-950px',
              right: '50px',
              zIndex: 20
            }}
          >
            <Image
              src={`/work/${workDetail.id}/logo.webp`}
              alt={`${workDetail.client} logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>


      </div>
    </section>
  );
};
