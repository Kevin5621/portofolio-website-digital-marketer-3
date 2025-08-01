"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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

  return (
    <section className="py-24 px-6 bg-surface-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-content-primary mb-8">
          Next case
        </h2>
        
        <Link 
          href={`/work/${nextProject.id}`}
          className="group inline-block"
          onClick={handleNextProjectClick}
        >
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-content-primary leading-tight group-hover:text-brand-600 transition-colors duration-300">
            {nextProject.title}
          </h3>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-brand-600 group-hover:gap-4 transition-all duration-300">
            <span className="text-lg font-medium">View case</span>
            <svg 
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};
