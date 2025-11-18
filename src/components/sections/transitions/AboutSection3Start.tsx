"use client";

export function AboutSection3Start() {
  return (
    <div className="relative bg-surface-background rounded-tr-2xl rounded-tl-2xl z-20">
      {/* Viewport 13: Oh, also - Big text, white bg, black text */}
      <section id="oh-also" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h2 className="text-[7.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[16rem] font-bold text-content-primary leading-none">
          Oh, also
        </h2>
      </section>

      {/* Viewport 14: I'm a graphic designer specializing in - Small text, white bg, black text */}
      <section id="graphic-designer" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl">
          I&apos;m a graphic designer specializing in
        </p>
      </section>
    </div>
  );
} 