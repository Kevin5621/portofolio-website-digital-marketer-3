"use client";

export function AboutSection1() {
  return (
    <>
      {/* Viewport 1: Hello - Big text, white bg, black text */}
      <section id="hello" className="relative min-h-screen bg-surface-background flex items-center justify-center z-30">
        <h1 className="text-[5rem] sm:text-[7.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[16rem] font-bold text-content-primary leading-none">
          Hello
        </h1>
      </section>

      {/* Viewport 2: I'm Eka and i've been - Small text, white bg, black text */}
      <section id="intro" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-4xl">
          I&apos;m Eka and i&apos;ve been
        </p>
      </section>

      {/* Viewport 3: Creating impactful social media content - Big text, white bg, black text */}
      <section id="impact" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <h2 className="text-4xl sm:text-[5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[12rem] font-extrabold text-content-primary leading-[0.85] tracking-[-0.02em] text-center max-w-8xl">
          Creating impactful social media content and driving conversions since 2023
        </h2>
      </section>

      {/* Viewport 4: Experience description - Small text, white bg, black text */}
      <section id="experience" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center max-w-7xl leading-[1]">
          With 2 years of experience in social media marketing, content creation, and short-form video editing, I&apos;ve helped brands stand out in the social media. My journey has included working with SME&apos;s and big companies.
        </p>
      </section>
    </>
  );
} 