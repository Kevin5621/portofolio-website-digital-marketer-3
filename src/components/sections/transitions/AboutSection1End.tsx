"use client";

import { BrandLogosMarquee } from "@/components/sections/BrandLogosMarquee";

export function AboutSection1End() {
  return (
    <>
      {/* Viewport 5: Some of the brands - white bg, black text */}
      <section id="brands" className="sticky top-0 min-h-screen bg-surface-background flex items-center justify-center px-6 z-10">
        <div className="text-center max-w-4xl">
          <p className="text-lg md:text-xl lg:text-2xl text-content-primary mb-16">
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