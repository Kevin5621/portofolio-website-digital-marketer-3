"use client";

import { ContactSection } from "@/components/sections/ContactSection";

export function AboutSection5End() {
  return (
    <>
      {/* Viewport 27: Are you interested in collaborating - Big text, white bg, black text */}
      <section id="collaborating" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-tight text-center max-w-6xl">
          Are you interested in collaborating or starting a project together?
        </h2>
      </section>

      {/* Viewport 28: Feel free to contact me - Small text, white bg, black text */}
      <section id="contact-me" className="relative min-h-screen bg-surface-background flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl">
          Feel free to contact me!
        </p>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
} 