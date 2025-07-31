"use client";

import { ContactSection } from "@/components/sections/ContactSection";

export default function AboutPage() {
  return (
    <>
      {/* Viewport 1: Hello - Big text, white bg, black text */}
      <section id="hello" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-primary leading-none">
          Hello
        </h1>
      </section>

      {/* Viewport 2: I'm Eka and i've been - Small text, white bg, black text */}
      <section id="intro" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl">
          I&apos;m Eka and i&apos;ve been
        </p>
      </section>

      {/* Viewport 3: Creating impactful social media content - Big text, white bg, black text */}
      <section id="impact" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-tight text-center max-w-6xl">
          Creating impactful social media content and driving conversions since 2023
        </h2>
      </section>

      {/* Viewport 4: Experience description - Small text, white bg, black text */}
      <section id="experience" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-secondary text-center max-w-4xl leading-relaxed">
          With 2 years of experience in social media marketing, content creation, and short-form video editing, I&apos;ve helped brands stand out in the social media. My journey has included working with SME&apos;s and big companies.
        </p>
      </section>

      {/* Viewport 5: Some of the brands - white bg, black text */}
      <section id="brands" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <p className="text-lg md:text-xl lg:text-2xl text-content-primary mb-16">
            Some of the brands I&apos;ve had the pleasure of working with
          </p>
          
          {/* Brand logos placeholder section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-16">
            {/* Brand logo placeholders */}
            {Array.from({ length: 8 }, (_, index) => `logo-placeholder-${index + 1}`).map((id) => (
              <div key={id} className="aspect-square bg-surface-secondary rounded-lg flex items-center justify-center">
                <span className="text-content-tertiary text-sm">{id.replace('logo-placeholder-', 'Logo ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        <div className="w-full max-w-4xl aspect-video bg-neutral-800 rounded-lg flex items-center justify-center">
          {/* Video content placeholder */}
          <span className="text-content-inverse text-lg">Video Content Coming Soon</span>
        </div>
      </section>

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
      <section id="design-showcase" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Design showcase placeholders */}
          {Array.from({ length: 6 }, (_, index) => `design-placeholder-${index + 1}`).map((id) => (
            <div key={id} className="aspect-[4/5] bg-surface-secondary rounded-lg flex items-center justify-center">
              <span className="text-content-tertiary">{id.replace('design-placeholder-', 'Design ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Viewport 19: Finally - Big text, black bg, white text */}
      <section id="finally" className="min-h-screen bg-surface-inverse flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-inverse leading-none">
          Finally
        </h2>
      </section>

      {/* Viewport 20: Small text, black bg, white text */}
      <section id="flexible-approach" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl leading-relaxed">
          I take a flexible approach in
        </p>
      </section>

      {/* Viewport 21: Creating content - Big text, black bg, white text */}
      <section id="creating-content" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-inverse leading-tight text-center max-w-6xl">
          Creating content, starting from from ideas to execution
        </h2>
      </section>

      {/* Viewport 22: I focus on social media marketing - Small text, black bg, white text */}
      <section id="focus" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl leading-relaxed">
          I focus on social media marketing, content creation, and short-form video editing, making sure each piece connects with people and gets results.
        </p>
      </section>

      {/* Viewport 23: Here's a breakdown - Small text, black bg, white text */}
      <section id="breakdown" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl">
          Here&apos;s a breakdown of what that includes
        </p>
      </section>

      {/* Viewport 24: Services breakdown - Split section, black bg, white text */}
      <section id="services" className="min-h-screen bg-surface-inverse flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
            {/* Social Media Marketing */}
            <div className="flex flex-col lg:flex-row lg:col-span-3 gap-8 mb-12">
              <div className="lg:w-1/3">
                <h3 className="text-2xl md:text-3xl font-bold text-content-inverse">Social Media Marketing</h3>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg md:text-xl text-content-inverse space-y-2">
                  <p>Social Media Strategy</p>
                  <p>Analytics & Insights</p>
                  <p>Campaign Management</p>
                </div>
              </div>
            </div>

            {/* Content Creation */}
            <div className="flex flex-col lg:flex-row lg:col-span-3 gap-8 mb-12">
              <div className="lg:w-1/3">
                <h3 className="text-2xl md:text-3xl font-bold text-content-inverse">Content Creation</h3>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg md:text-xl text-content-inverse space-y-2">
                  <p>Graphic Design</p>
                  <p>Copywriting</p>
                  <p>Storytelling</p>
                  <p>Photography</p>
                  <p>Videography</p>
                  <p>Branding</p>
                  <p>Visual Identity</p>
                </div>
              </div>
            </div>

            {/* Short-form Video Editing */}
            <div className="flex flex-col lg:flex-row lg:col-span-3 gap-8">
              <div className="lg:w-1/3">
                <h3 className="text-2xl md:text-3xl font-bold text-content-inverse">Short-form Video Editing</h3>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg md:text-xl text-content-inverse space-y-2">
                  <p>Editing</p>
                  <p>Post-production</p>
                  <p>Motion Graphics</p>
                  <p>Color Grading</p>
                  <p>Sound Design</p>
                  <p>Video Optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Viewport 25: Oh - Big text, white bg, black text */}
      <section id="oh" className="min-h-screen bg-surface-background flex items-center justify-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-content-primary leading-none">
          Oh
        </h2>
      </section>

      {/* Viewport 26: since you've made it this far - Small text, white bg, black text */}
      <section id="made-it-far" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl">
          since you&apos;ve made it this far
        </p>
      </section>

      {/* Viewport 27: Are you interested in collaborating - Big text, white bg, black text */}
      <section id="collaborating" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-tight text-center max-w-6xl">
          Are you interested in collaborating or starting a project together?
        </h2>
      </section>

      {/* Viewport 28: Feel free to contact me - Small text, white bg, black text */}
      <section id="contact-me" className="min-h-screen bg-surface-background flex items-center justify-center px-6">
        <p className="text-lg md:text-xl lg:text-2xl text-content-primary text-center max-w-4xl">
          Feel free to contact me!
        </p>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
