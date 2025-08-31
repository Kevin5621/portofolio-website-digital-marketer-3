"use client";

import { useEffect, useRef } from "react";

export function AboutSection4End() {
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const headers = headerRefs.current;
    const contents = contentRefs.current;

    // Function untuk update opacity berdasarkan alignment
    const updateOpacityBasedOnAlignment = () => {
      headers.forEach((header, headerIndex) => {
        if (!header) return;
        
        const content = contents[headerIndex];
        if (!content) return;

        // Dapatkan semua elemen p dalam content
        const paragraphs = content.querySelectorAll('p');
        if (paragraphs.length === 0) return;

        // Hitung posisi header
        const headerRect = header.getBoundingClientRect();
        const headerCenter = headerRect.top + headerRect.height / 2;
        
        // Cari header mana yang paling aktif (paling dekat dengan tengah viewport)
        let mostActiveHeader = -1;
        let minDistance = Infinity;
        
        headers.forEach((h, hIndex) => {
          if (h) {
            const hRect = h.getBoundingClientRect();
            const hCenter = hRect.top + hRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = Math.abs(hCenter - viewportCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              mostActiveHeader = hIndex;
            }
          }
        });
        
        console.log(`Most active header: ${mostActiveHeader}, Current header: ${headerIndex}`);
        
        // Update opacity: hanya header yang paling aktif yang dapat spotlight
        paragraphs.forEach((p, index) => {
          let opacity;
          if (headerIndex === mostActiveHeader) {
            // Header ini yang paling aktif - cari paragraph yang sejajar
            const pRect = p.getBoundingClientRect();
            const pCenter = pRect.top + pRect.height / 2;
            const distance = Math.abs(headerCenter - pCenter);
            
            if (distance <= 80) {
              // Paragraph sejajar dengan header aktif = spotlight on
              opacity = 1;
              console.log(`Header ${headerIndex} active - Paragraph ${index} SPOTLIGHT ON`);
            } else {
              // Paragraph tidak sejajar = spotlight off
              opacity = 0.2;
              console.log(`Header ${headerIndex} active - Paragraph ${index} spotlight off`);
            }
          } else {
            // Header tidak aktif = semua paragraph redup
            opacity = 0.2;
            console.log(`Header ${headerIndex} inactive - Paragraph ${index} redup`);
          }
          
          p.style.opacity = opacity.toString();
        });
      });
    };

    // Initial update
    updateOpacityBasedOnAlignment();

    // Throttled scroll handler untuk performa lebih baik
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOpacityBasedOnAlignment();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Update pada scroll dengan throttling
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Update pada resize
    window.addEventListener('resize', updateOpacityBasedOnAlignment, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateOpacityBasedOnAlignment);
      window.removeEventListener('resize', updateOpacityBasedOnAlignment);
    };
  }, []);

  return (
    <>
      {/* Viewport 23: Here's a breakdown - Small text, black bg, white text */}
      <section id="breakdown" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-6xl md:text-7xl lg:text-8xl text-content-inverse text-center max-w-4xl">
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
                  <div className="space-y-8">
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Social Media Strategy
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Analytics & Insights
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
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
                  <div className="space-y-8">
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Graphic Design
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Copywriting
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Storytelling
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Photography
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Videography
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Branding
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
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
                  <div className="space-y-8">
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Editing
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Post-production
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Motion Graphics
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Color Grading
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
                      Sound Design
                    </p>
                    <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-content-inverse opacity-30 transition-opacity duration-300 font-bold">
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