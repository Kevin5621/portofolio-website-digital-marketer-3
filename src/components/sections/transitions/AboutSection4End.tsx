"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

export function AboutSection4End() {
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const contents = contentRefs.current;

    // Cleanup previous ScrollTriggers
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];

    // Kumpulkan semua paragraph dari semua section
    const allParagraphs: HTMLElement[] = [];
    contents.forEach((content) => {
      if (!content) return;
      const paragraphs = content.querySelectorAll('p');
      paragraphs.forEach((p) => {
        allParagraphs.push(p as HTMLElement);
        // Set initial state (0% - tidak aktif)
        gsap.set(p, {
          opacity: 0.2,
          filter: 'blur(10px)',
          x: '0%',
        });
      });
    });

    if (allParagraphs.length === 0) return;

    // Helper function untuk menghitung progress berdasarkan jarak dari tengah viewport
    const calculateProgress = (element: HTMLElement): number => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      
      // Hitung jarak dari tengah viewport
      const distance = Math.abs(elementCenter - viewportCenter);
      
      // Jarak maksimum untuk transisi (semakin besar, semakin smooth)
      const maxDistance = 400;
      
      // Hitung progress: 1 saat di tengah, 0 saat jauh
      // Gunakan inverse relationship: semakin dekat, semakin besar progress
      let progress = 1 - Math.min(distance / maxDistance, 1);
      
      // Clamp progress antara 0 dan 1
      progress = Math.max(0, Math.min(1, progress));
      
      return progress;
    };

    // Helper function untuk interpolasi nilai berdasarkan progress
    const interpolateValues = (progress: number) => {
      // 0%: blur(10px), translate(0px), opacity: 0.2
      // 50%: blur(3.8327px), translate(3.0837%, 0%), opacity: 0.6934
      // 100%: blur(0.0125px), translate(4.9937%, 0%), opacity: 0.999
      
      // Linear interpolation untuk blur
      let blur: number;
      if (progress <= 0.5) {
        // 0% to 50%
        const t = progress / 0.5;
        blur = 10 + (3.8327 - 10) * t;
      } else {
        // 50% to 100%
        const t = (progress - 0.5) / 0.5;
        blur = 3.8327 + (0.0125 - 3.8327) * t;
      }
      
      // Linear interpolation untuk translateX (dalam persentase)
      let translateX: number;
      if (progress <= 0.5) {
        // 0% to 50%
        const t = progress / 0.5;
        translateX = 0 + (3.0837 - 0) * t;
      } else {
        // 50% to 100%
        const t = (progress - 0.5) / 0.5;
        translateX = 3.0837 + (4.9937 - 3.0837) * t;
      }
      
      // Linear interpolation untuk opacity
      let opacity: number;
      if (progress <= 0.5) {
        // 0% to 50%
        const t = progress / 0.5;
        opacity = 0.2 + (0.6934 - 0.2) * t;
      } else {
        // 50% to 100%
        const t = (progress - 0.5) / 0.5;
        opacity = 0.6934 + (0.999 - 0.6934) * t;
      }
      
      return { blur, translateX, opacity };
    };

    // Function untuk update semua paragraph berdasarkan posisi mereka
    const updateAllParagraphs = () => {
      allParagraphs.forEach((paragraph) => {
        const progress = calculateProgress(paragraph);
        const { blur, translateX, opacity } = interpolateValues(progress);
        
        // Apply values dengan transform string untuk persentase
        paragraph.style.opacity = opacity.toString();
        paragraph.style.filter = `blur(${blur}px)`;
        paragraph.style.transform = `translate(${translateX}%, 0%) translate3d(0px, 0px, 0px)`;
      });
    };

    // Create ScrollTrigger untuk section services yang akan update semua paragraph
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const trigger = ScrollTrigger.create({
        trigger: servicesSection,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: updateAllParagraphs,
        onEnter: updateAllParagraphs,
        onLeave: updateAllParagraphs,
        onEnterBack: updateAllParagraphs,
        onLeaveBack: updateAllParagraphs,
      });

      scrollTriggersRef.current.push(trigger);
    }

    // Initial update
    updateAllParagraphs();

    // Update on scroll dengan throttling untuk performa
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateAllParagraphs();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', updateAllParagraphs, { passive: true });

    return () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', updateAllParagraphs);
    };
  }, []);

  return (
    <>
      {/* Viewport 23: Here's a breakdown - Small text, black bg, white text */}
      <section id="breakdown" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-content-inverse text-center max-w-7xl">
          Here&apos;s a breakdown of what that includes
        </p>
      </section>

      {/* Viewport 24: Services breakdown - Split section, black bg, white text */}
      <section id="services" className="relative bg-surface-inverse px-6 z-10">
        {/* Container dengan height yang cukup untuk sticky effect */}
        <div className="min-h-[180vh] py-16">
          <div className="mx-auto px-8">
            <div className="space-y-16">
              {/* Social Media Marketing */}
              <div className="flex flex-col lg:flex-row gap-16 min-h-[25vh]">
                <div className="lg:w-1/4">
                  <h3 
                    ref={(el) => { headerRefs.current[0] = el; }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-inverse sticky top-1/2 transform -translate-y-1/2"
                  >
                    Social Media Marketing
                  </h3>
                </div>
                <div 
                  ref={(el) => { contentRefs.current[0] = el; }}
                  className="lg:w-3/4"
                >
                  <div>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Social Media Strategy
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Analytics & Insights
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Campaign Management
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Creation */}
              <div className="flex flex-col lg:flex-row gap-16 min-h-[60vh]">
                <div className="lg:w-1/4">
                  <h3 
                    ref={(el) => { headerRefs.current[1] = el; }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-inverse sticky top-1/2 transform -translate-y-1/2"
                  >
                    Content Creation
                  </h3>
                </div>
                <div 
                  ref={(el) => { contentRefs.current[1] = el; }}
                  className="lg:w-3/4"
                >
                  <div>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Graphic Design
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Copywriting
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Storytelling
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Photography
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Videography
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Branding
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Visual Identity
                    </p>
                  </div>
                </div>
              </div>

              {/* Short-form Video Editing */}
              <div className="flex flex-col lg:flex-row gap-16 min-h-[60vh]">
                <div className="lg:w-1/4">
                  <h3 
                    ref={(el) => { headerRefs.current[2] = el; }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-inverse sticky top-1/2 transform -translate-y-1/2"
                  >
                    Short-form Video Editing
                  </h3>
                </div>
                <div 
                  ref={(el) => { contentRefs.current[2] = el; }}
                  className="lg:w-3/4"
                >
                  <div>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Editing
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Post-production
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Motion Graphics
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Color Grading
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Sound Design
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse font-bold">
                      Video Optimization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 