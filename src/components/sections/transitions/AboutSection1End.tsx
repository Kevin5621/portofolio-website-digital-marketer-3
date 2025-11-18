"use client";

import { BrandLogosMarquee } from "@/components/sections/BrandLogosMarquee";

export function AboutSection1End() {
  return (
    <>
      {/* Viewport 5: Some of the brands - white bg, black text */}
      <section id="brands" className="sticky top-0 min-h-screen bg-surface-background flex items-center justify-center px-6 z-10">
        <div className="text-center max-w-4xl">
          <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl leading-[1]">
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