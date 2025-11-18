"use client";

export function AboutSection5() {
  return (
    <>
      {/* Viewport 27: Are you interested in collaborating - Big text, white bg, black text */}
      <section id="collaborating" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <h2 className="text-[6.5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[12rem] font-extrabold text-content-primary leading-[0.85] tracking-[-0.02em] text-center max-w-8xl">
          Are you interested in collaborating or starting a project together?
        </h2>
      </section>

      {/* Viewport 28: Feel free to contact me - Small text, white bg, black text */}
      <section id="contact-me" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl">
          Feel free to contact me!
        </p>
      </section>
    </>
  );
} 