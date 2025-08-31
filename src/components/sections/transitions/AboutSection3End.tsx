"use client";

import CircularGallery from "@/components/ui/CircularGallery";

export function AboutSection3End() {
  // Portfolio items for the gallery showcase
  const portfolioItems = [
    {
      image: "/about/photo/1.png",
      text: "Aerospace"
    },
    {
      image: "/about/photo/2.png", 
      text: "Aerospace"
    },
    {
      image: "/about/photo/3.png",
      text: "Aerospace"
    },
    {
      image: "/about/photo/4.png",
      text: "Ortist Spesialist"
    },
    {
      image: "/about/photo/5.png",
      text: "Ortist Spesialist"
    },
    {
      image: "/about/photo/6.png",
      text: "Ortist Spesialist"
    },
    {
      image: "/about/photo/7.png",
      text: "RBA"
    },
    {
      image: "/about/photo/8.png",
      text: "RBA"
    },
    {
      image: "/about/photo/9.png",
      text: "RBA"
    },
    {
      image: "/about/photo/foto1.png",
      text: "Binjasiimen Samapta"
    },
    {
      image: "/about/photo/foto2.png",
      text: "Binjasiimen Samapta"
    },
    {
      image: "/about/photo/foto3.png",
      text: "Binjasiimen Samapta"
    },
    {
      image: "/about/photo/foto4.png",
      text: "Toyota Runners Club"
    },
    {
      image: "/about/photo/foto5.png",
      text: "Aerospace"
    },
    {
      image: "/about/photo/foto6.png",
      text: "Aerospace"
    }
  ];

  return (
    <>
      {/* Viewport 17: Here's a sneak peek - Small text, white bg, black text */}
      <section id="sneak-peek" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          Here&apos;s a sneak peek of what that looks like
        </p>
      </section>

      {/* Design showcase with CircularGallery - sticky for overlay effect */}
      <section id="design-showcase" className="sticky top-0 min-h-screen bg-surface-background flex items-center justify-center px-6 overflow-visible z-10">
        <div style={{ height: '70vh', width: '100%', position: 'relative' }}>
          <CircularGallery 
            items={portfolioItems}
            bend={3} 
            textColor="#1f2937" 
            borderRadius={0.05} 
            scrollEase={0.02}
            waveIntensity={0.1}
            scrollSpeed={2}
            font="bold 24px Inter"
          />
        </div>
      </section>
    </>
  );
} 