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

        // Loop melalui setiap paragraph untuk cek alignment
        paragraphs.forEach((p) => {
          const pRect = p.getBoundingClientRect();
          const pCenter = pRect.top + pRect.height / 2;
          
          // Hitung jarak antara header dan paragraph
          const distance = Math.abs(headerCenter - pCenter);
          const threshold = 100; // Toleransi 100px untuk alignment
          
          let opacity;
          if (distance <= threshold) {
            // Header sejajar dengan paragraph ini - opacity 100%
            opacity = 1;
          } else {
            // Header tidak sejajar - opacity turun
            opacity = 0.3;
          }
          
          // Update opacity dengan animasi smooth
          p.style.opacity = opacity.toString();
        });
      });
    };

    // Initial update
    updateOpacityBasedOnAlignment();

    // Update pada scroll
    window.addEventListener('scroll', updateOpacityBasedOnAlignment, { passive: true });
    
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
          <div className="w-full max-w-6xl mx-auto">
            <div className="space-y-12">
              {/* Social Media Marketing */}
              <div className="flex flex-col lg:flex-row gap-8 min-h-[25vh]">
                <div className="lg:w-1/3">
                  <h3 
                    ref={(el) => { headerRefs.current[0] = el; }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-inverse sticky top-1/2 transform -translate-y-1/2"
                  >
                    Social Media Marketing
                  </h3>
                </div>
                <div 
                  ref={(el) => { contentRefs.current[0] = el; }}
                  className="lg:w-2/3"
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
              <div className="flex flex-col lg:flex-row gap-8 min-h-[60vh]">
                <div className="lg:w-1/3">
                  <h3 
                    ref={(el) => { headerRefs.current[1] = el; }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-inverse sticky top-1/2 transform -translate-y-1/2"
                  >
                    Content Creation
                  </h3>
                </div>
                <div 
                  ref={(el) => { contentRefs.current[1] = el; }}
                  className="lg:w-2/3"
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
              <div className="flex flex-col lg:flex-row gap-8 min-h-[60vh]">
                <div className="lg:w-1/3">
                  <h3 
                    ref={(el) => { headerRefs.current[2] = el; }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-content-inverse sticky top-1/2 transform -translate-y-1/2"
                  >
                    Short-form Video Editing
                  </h3>
                </div>
                <div 
                  ref={(el) => { contentRefs.current[2] = el; }}
                  className="lg:w-2/3"
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