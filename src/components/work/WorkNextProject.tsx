"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PillButton } from "@/components/ui/pill-button";

interface WorkNextProjectProps {
  nextProject: {
    id: string;
    title: string;
  };
}

export const WorkNextProject = ({ nextProject }: WorkNextProjectProps) => {
  const router = useRouter();

  const handleNextProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Aggressive instant scroll to top function
    const forceInstantScrollToTop = () => {
      // Disable Lenis temporarily if it exists
      if (typeof window !== 'undefined') {
        const windowWithLenis = window as Window & {
          lenis?: {
            stop: () => void;
            start: () => void;
            scrollTo: (target: number, options?: { immediate?: boolean }) => void;
          };
        };
        
        if (windowWithLenis.lenis) {
          windowWithLenis.lenis.stop();
          windowWithLenis.lenis.scrollTo(0, { immediate: true });
        }
      }
      
      // Multiple instant scroll methods
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    
    // Force scroll multiple times before navigation
    forceInstantScrollToTop();
    setTimeout(forceInstantScrollToTop, 1);
    setTimeout(forceInstantScrollToTop, 10);
    
    // Navigate to next project
    router.push(`/work/${nextProject.id}`);
    
    // Continue forcing scroll after navigation
    setTimeout(forceInstantScrollToTop, 1);
    setTimeout(forceInstantScrollToTop, 10);
    setTimeout(forceInstantScrollToTop, 50);
    setTimeout(forceInstantScrollToTop, 100);
    setTimeout(forceInstantScrollToTop, 200);
    setTimeout(forceInstantScrollToTop, 300);
    setTimeout(forceInstantScrollToTop, 500);
    setTimeout(forceInstantScrollToTop, 1000);
  };

  // Get hero image path based on project ID
  const getHeroImagePath = (projectId: string) => {
    if (projectId === "ortist-specialist") {
      return "/work/ortist/hero.png";
    }
    return `/work/${projectId}/hero.png`;
  };

  return (
    <section className="py-24 bg-content-primary relative overflow-hidden">
      <div className="max-w-[95vw] mx-auto px-6">
        <div className="text-center relative">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-8">
            Next case
          </h2>
          
          <Link 
            href={`/work/${nextProject.id}`}
            className="group inline-block relative"
            onClick={handleNextProjectClick}
          >
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight group-hover:opacity-80 transition-opacity duration-300 mb-12 relative z-30">
              {nextProject.title}
            </h3>
            
            {/* Hero Image */}
            <div className="relative w-full max-w-md mx-auto mb-12 z-20">
              <div className="aspect-video bg-surface-secondary rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={getHeroImagePath(nextProject.id)}
                  alt={`${nextProject.title} hero image`}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
                {/* Overlay untuk memotong foto */}
                <div className="absolute inset-0 bg-content-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="flex items-center justify-center relative z-30 mb-8">
              <PillButton 
                variant="dark-to-light"
                className="px-8 py-3 text-base"
                onClick={() => {}}
              >
                All work
              </PillButton>
            </div>
          </Link>

          {/* Horizontal line yang memotong foto - tebal dan sebagian */}
          <div className="absolute left-1/2 top-1/2 w-[80%] h-[3px] bg-white transform -translate-x-1/2 -translate-y-1/4 z-30 pointer-events-none rounded-full"></div>
          
          {/* Overlay background untuk menutupi setengah bagian foto dari tengah ke bawah */}
          <div className="absolute left-0 top-1/2 w-full h-[50%] bg-content-primary z-25 pointer-events-none"></div>

          {/* Bottom Section with VERSION and SOCIALS - consistent with container width */}
          <div className="flex items-center justify-between text-white text-sm mt-16 relative z-30">
            <div className="text-left">
              <div className="text-white/60 mb-1">VERSION</div>
              <div>2025 © Edition</div>
            </div>
            
            <div className="text-right">
              <div className="text-white/60 mb-1">SOCIALS</div>
              <div className="flex gap-4">
                <span>Instagram</span>
                <span>Linkedin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
