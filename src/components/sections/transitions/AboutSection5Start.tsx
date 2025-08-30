"use client";

export function AboutSection5Start() {
  return (
    <div className="relative bg-surface-background rounded-tr-2xl rounded-tl-2xl z-20">
      {/* Viewport 25: Oh - Big text, white bg, black text */}
      <section id="oh" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-primary leading-none" style={{fontSize: '8.5rem'}}>
          Oh
        </h2>
      </section>

      {/* Viewport 26: since you've made it this far - Small text, white bg, black text */}
      <section id="made-it-far" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          since you&apos;ve made it this far
        </p>
      </section>
    </div>
  );
} 