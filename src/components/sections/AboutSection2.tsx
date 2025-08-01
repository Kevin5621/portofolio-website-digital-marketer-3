"use client";

import ThreeDMarqueeDemo from "@/components/ui/3d-marquee-demo";

export function AboutSection2() {
  return (
    <>
      {/* Viewport 7: Also - Big text, black bg, white text */}
      <section id="also" className="min-h-screen bg-surface-inverse flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-inverse leading-none">
          also
        </h2>
      </section>

      {/* Viewport 8: I'm a content creator specializing in - Small text, black bg, white text */}
      <section id="content-creator" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl">
          I&apos;m a content creator specializing in
        </p>
      </section>

      {/* Viewport 9: Creating short-form edit - Big text, black bg, white text */}
      <section id="short-form" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-inverse leading-tight text-center max-w-6xl">
          Creating short-form edit that engage and convert
        </h2>
      </section>

      {/* Viewport 10: I specialize in creating short-form edit - Small text, black bg, white text */}
      <section id="specialize-video" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl leading-relaxed">
          I specialize in creating short-form edit that transformed brand stories into engaging short-form videos. Each project I work on is made with passion and precision, designed to capture attention and deliver results.
        </p>
      </section>

      {/* Viewport 11: Here's a glimpse - Small text, black bg, white text */}
      <section id="glimpse" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl">
          Here&apos;s a glimpse of what that looks like
        </p>
      </section>

      {/* Video content placeholder section */}
      <section id="video-content" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <ThreeDMarqueeDemo />
      </section>
    </>
  );
} 