"use client";

import { BrandLogosMarquee } from "@/components/sections/BrandLogosMarquee";

export function AboutSection1End() {
  return (
    <>
      {/* Viewport 5: Some of the brands - white bg, black text */}
      <section id="brands" className="sticky top-0 min-h-screen bg-surface-background flex items-center justify-center px-6 z-10 w-full overflow-hidden">
        <div className="text-center w-full max-w-4xl mx-auto">
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-content-primary text-center max-w-full leading-tight break-words px-2">
            Some of the brands I&apos;ve had the pleasure of working with
          </p>
          
          {/* Brand logos marquee section */}
          <div className="py-16">
            <BrandLogosMarquee />
          </div>
        </div>
      </section>
    </>
  );
} 