"use client";

export function AboutSection2() {
  return (
    <>
      {/* Viewport 9: Creating short-form edit - Big text, black bg, white text */}
      <section id="short-form" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-inverse leading-tight text-center max-w-6xl" style={{fontSize: '8.5rem'}}>
          Creating short-form edit that engage and convert
        </h2>
      </section>

      {/* Viewport 10: I specialize in creating short-form edit - Small text, black bg, white text */}
      <section id="specialize-video" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl leading-relaxed" style={{fontSize: '3.5rem'}}>
          I specialize in creating short-form edit that transformed brand stories into engaging short-form videos. Each project I work on is made with passion and precision, designed to capture attention and deliver results.
        </p>
      </section>
    </>
  );
} 