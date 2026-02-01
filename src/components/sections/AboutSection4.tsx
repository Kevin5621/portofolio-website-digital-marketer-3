"use client";

export function AboutSection4() {
  return (
    <>
      {/* Viewport 21: Creating content - Big text, black bg, white text */}
      <section id="creating-content" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <h2 className="text-4xl sm:text-[5rem] md:text-[7.5rem] lg:text-[7.5rem] xl:text-[12rem] font-extrabold text-content-inverse leading-[0.85] tracking-[-0.02em] text-center max-w-8xl">
          Creating content, starting from from ideas to execution
        </h2>
      </section>

      {/* Viewport 22: I focus on social media marketing - Small text, black bg, white text */}
      <section id="focus" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-inverse text-center max-w-7xl">
          I focus on social media marketing, content creation, and short-form video editing, making sure each piece connects with people and gets results.
        </p>
      </section>
    </>
  );
} 