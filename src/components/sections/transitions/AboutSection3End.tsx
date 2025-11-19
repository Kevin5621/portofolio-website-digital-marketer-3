"use client";

import ParallaxGallery from "@/components/ui/ParallaxGallery";

export function AboutSection3End() {
  // Portfolio items for the gallery showcase
  const portfolioItems = [
    {
      image: "/about/photo/1.webp",
      text: "Aerospace"
    },
    {
      image: "/about/photo/2.webp", 
      text: "Aerospace"
    },
    {
      image: "/about/photo/3.webp",
      text: "Aerospace"
    },
    {
      image: "/about/photo/4-1.webp",
      text: "Ortist Spesialist"
    },
    {
      image: "/about/photo/5.webp",
      text: "Ortist Spesialist"
    },
    {
      image: "/about/photo/6.webp",
      text: "Ortist Spesialist"
    },
    {
      image: "/about/photo/7.webp",
      text: "RBA"
    },
    {
      image: "/about/photo/8.webp",
      text: "RBA"
    },
    {
      image: "/about/photo/9.webp",
      text: "RBA"
    },
    {
      image: "/about/photo/10.webp",
      text: "Binjasiimen Samapta"
    },
    {
      image: "/about/photo/11.webp",
      text: "Binjasiimen Samapta"
    },
    {
      image: "/about/photo/12.webp",
      text: "Binjasiimen Samapta"
    },
    {
      image: "/about/photo/13.webp",
      text: "Toyota Runners Club"
    },
    {
      image: "/about/photo/14.webp",
      text: "Aerospace"
    },
    {
      image: "/about/photo/15.webp",
      text: "Aerospace"
    }
  ];

  // Extract image paths for ParallaxGallery
  const imagePaths = portfolioItems.map(item => item.image);

  return (
    <>
      {/* Viewport 17: Here's a sneak peek - Small text, white bg, black text */}
      <section id="sneak-peek" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl leading-none">
          Here&apos;s a sneak peek of what that looks like
        </p>
      </section>

      {/* Design showcase with ParallaxGallery - normal section for continuous scroll */}
      <section id="design-showcase" className="relative bg-surface-background flex items-center justify-center overflow-visible z-10">
        <ParallaxGallery images={imagePaths} />
        {/* Fade-out gradient at the bottom for smooth transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[400px] z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(22, 26, 29, 0.3) 40%, rgba(22, 26, 29, 0.7) 80%, rgba(22, 26, 29, 0.95) 100%)',
          }}
        />
      </section>
    </>
  );
} 