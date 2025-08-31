"use client";

export function AboutSection3() {
  return (
    <>
      {/* Viewport 15: Creating flyers - Big text, white bg, black text */}
      <section id="flyers" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <h2 className="text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-content-primary leading-tight text-center max-w-6xl">
          Creating flyers that grab attention and communicate messages clearly
        </h2>
      </section>

      {/* Viewport 16: I specialize in creating eye-catching flyers - Small text, white bg, black text */}
      <section id="specialize-flyers" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-6xl md:text-xl lg:text-2xl xl:text-3xl text-content-secondary text-center max-w-4xl leading-relaxed">
          I specialize in creating eye-catching flyers that bring brand stories to life. Each design I create is carefully crafted with attention to detail, aimed at grabbing attention and delivering a clear message.
        </p>
      </section>
    </>
  );
} 