"use client";

import DraggableCardDemo from "@/components/ui/draggable-card-demo-2";

export function AboutSection3End() {
  return (
    <>
      {/* Viewport 17: Here's a sneak peek - Small text, white bg, black text */}
      <section id="sneak-peek" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          Here&apos;s a sneak peek of what that looks like
        </p>
      </section>

      {/* Design showcase placeholder section - sticky for overlay effect */}
      <section id="design-showcase" className="sticky top-0 min-h-screen bg-surface-background flex items-center justify-center px-6 overflow-visible z-10">
        <DraggableCardDemo />
      </section>
    </>
  );
} 