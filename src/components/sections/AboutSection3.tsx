"use client";

import DraggableCardDemo from "@/components/ui/draggable-card-demo-2";

export function AboutSection3() {
  return (
    <>
      {/* Viewport 13: Oh, also - Big text, white bg, black text */}
      <section id="oh-also" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-primary leading-none">
          Oh, also
        </h2>
      </section>

      {/* Viewport 14: I'm a graphic designer specializing in - Small text, white bg, black text */}
      <section id="graphic-designer" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl">
          I&apos;m a graphic designer specializing in
        </p>
      </section>

      {/* Viewport 15: Creating flyers - Big text, white bg, black text */}
      <section id="flyers" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-tight text-center max-w-6xl">
          Creating flyers that grab attention and communicate messages clearly
        </h2>
      </section>

      {/* Viewport 16: I specialize in creating eye-catching flyers - Small text, white bg, black text */}
      <section id="specialize-flyers" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-secondary text-center max-w-4xl leading-relaxed">
          I specialize in creating eye-catching flyers that bring brand stories to life. Each design I create is carefully crafted with attention to detail, aimed at grabbing attention and delivering a clear message.
        </p>
      </section>

      {/* Viewport 17: Here's a sneak peek - Small text, white bg, black text */}
      <section id="sneak-peek" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl">
          Here&apos;s a sneak peek of what that looks like
        </p>
      </section>

      {/* Design showcase placeholder section */}
      <section id="design-showcase" className="min-h-screen bg-surface-background flex items-center justify-center px-6 overflow-visible">
        <DraggableCardDemo />
      </section>
    </>
  );
} 