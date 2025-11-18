"use client";

export function AboutSection3() {
  return (
    <>
      {/* Viewport 15: Creating flyers - Big text, white bg, black text */}
      <section id="flyers" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <h2 className="text-[6.5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[12rem] font-extrabold text-content-primary leading-[0.85] tracking-[-0.02em] text-center max-w-8xl">
          Creating flyers that grab attention and communicate messages clearly
        </h2>
      </section>

      {/* Viewport 16: I specialize in creating eye-catching flyers - Small text, white bg, black text */}
      <section id="specialize-flyers" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl leading-[1]">
          I specialize in creating eye-catching flyers that bring brand stories to life. Each design I create is carefully crafted with attention to detail, aimed at grabbing attention and delivering a clear message.
        </p>
      </section>
    </>
  );
} 