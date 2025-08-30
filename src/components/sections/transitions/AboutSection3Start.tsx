"use client";

export function AboutSection3Start() {
  return (
    <div className="relative bg-surface-background rounded-tr-2xl rounded-tl-2xl z-20">
      {/* Viewport 13: Oh, also - Big text, white bg, black text */}
      <section id="oh-also" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-primary leading-none" style={{fontSize: '8.5rem'}}>
          Oh, also
        </h2>
      </section>

      {/* Viewport 14: I'm a graphic designer specializing in - Small text, white bg, black text */}
      <section id="graphic-designer" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          I&apos;m a graphic designer specializing in
        </p>
      </section>
    </div>
  );
} 