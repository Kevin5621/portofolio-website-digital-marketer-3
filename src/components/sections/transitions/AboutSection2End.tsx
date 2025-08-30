"use client";

import ThreeDMarqueeDemo from "@/components/ui/3d-marquee-demo";

export function AboutSection2End() {
  return (
    <>
      {/* Viewport 11: Here's a glimpse - Small text, black bg, white text */}
      <section id="glimpse" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          Here&apos;s a glimpse of what that looks like
        </p>
      </section>

      {/* Video content placeholder section - sticky for overlay effect */}
      <section id="video-content" className="sticky top-0 min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-10">
        <ThreeDMarqueeDemo />
      </section>
    </>
  );
} 