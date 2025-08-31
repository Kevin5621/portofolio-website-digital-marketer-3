"use client";

export function AboutSection5() {
  return (
    <>
      {/* Viewport 27: Are you interested in collaborating - Big text, white bg, black text */}
      <section id="collaborating" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <h2 className="text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-content-primary leading-tight text-center max-w-6xl">
          Are you interested in collaborating or starting a project together?
        </h2>
      </section>

      {/* Viewport 28: Feel free to contact me - Small text, white bg, black text */}
      <section id="contact-me" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-6xl md:text-xl lg:text-2xl xl:text-3xl text-content-primary text-center max-w-4xl">
          Feel free to contact me!
        </p>
      </section>
    </>
  );
} 