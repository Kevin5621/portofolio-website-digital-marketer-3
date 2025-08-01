"use client";

export function AboutSection4() {
  return (
    <>
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
    </>
  );
} 