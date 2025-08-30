"use client";

export function AboutSection4Start() {
  return (
    <div className="relative bg-surface-inverse rounded-tr-2xl rounded-tl-2xl z-20">
      {/* Viewport 19: Finally - Big text, black bg, white text */}
      <section id="finally" className="min-h-screen bg-surface-inverse flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-inverse leading-none" style={{fontSize: '8.5rem'}}>
          Finally
        </h2>
      </section>

      {/* Viewport 20: Small text, black bg, white text */}
      <section id="flexible-approach" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl leading-relaxed" style={{fontSize: '3.5rem'}}>
          I take a flexible approach in
        </p>
      </section>
    </div>
  );
} 