"use client";

export function AboutSection2Start() {
  return (
    <div className="relative bg-surface-inverse rounded-tr-2xl rounded-tl-2xl z-20">
      {/* Viewport 7: Also - Big text, black bg, white text */}
      <section id="also" className="min-h-screen bg-surface-inverse flex items-center justify-center">
        <h2 className="text-[5rem] sm:text-[7.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[16rem] font-bold text-content-inverse leading-none">
          Also
        </h2>
      </section>

      {/* Viewport 8: I'm a content creator specializing in - Small text, black bg, white text */}
      <section id="content-creator" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-inverse text-center max-w-7xl leading-[1]">
          I&apos;m a content creator specializing in
        </p>
      </section>
    </div>
  );
} 