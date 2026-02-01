"use client";

export function AboutSection2() {
  return (
    <>
      {/* Viewport 9: Creating short-form edit - Big text, black bg, white text */}
      <section id="short-form" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <h2 className="text-4xl sm:text-[5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[12rem] font-extrabold text-content-inverse leading-[0.85] tracking-[-0.02em] text-center max-w-8xl">
          Creating short-form edit that engage and convert
        </h2>
      </section>

      {/* Viewport 10: I specialize in creating short-form edit - Small text, black bg, white text */}
      <section id="specialize-video" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-inverse text-center max-w-7xl">
          I specialize in creating short-form edit that transformed brand stories into engaging short-form videos. Each project I work on is made with passion and precision, designed to capture attention and deliver results.
        </p>
      </section>
    </>
  );
} 