"use client";

export function AboutSection4() {
  return (
    <>
      {/* Viewport 21: Creating content - Big text, black bg, white text */}
      <section id="creating-content" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-inverse leading-tight text-center max-w-6xl" style={{fontSize: '8.5rem'}}>
          Creating content, starting from from ideas to execution
        </h2>
      </section>

      {/* Viewport 22: I focus on social media marketing - Small text, black bg, white text */}
      <section id="focus" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl leading-relaxed" style={{fontSize: '3.5rem'}}>
          I focus on social media marketing, content creation, and short-form video editing, making sure each piece connects with people and gets results.
        </p>
      </section>
    </>
  );
} 