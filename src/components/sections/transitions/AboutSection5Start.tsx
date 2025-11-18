"use client";

export function AboutSection5Start() {
  return (
    <div className="relative bg-surface-background rounded-tr-2xl rounded-tl-2xl z-20">
      {/* Viewport 25: Oh - Big text, white bg, black text */}
      <section id="oh" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h2 className="text-[7.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[16rem] font-bold text-content-primary leading-none">
          Oh
        </h2>
      </section>

      {/* Viewport 26: since you've made it this far - Small text, white bg, black text */}
      <section id="made-it-far" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl">
          since you&apos;ve made it this far
        </p>
      </section>
    </div>
  );
} 