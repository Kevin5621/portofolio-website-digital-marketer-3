"use client";

export function AboutSection4End() {
  return (
    <>
      {/* Viewport 23: Here's a breakdown - Small text, black bg, white text */}
      <section id="breakdown" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          Here&apos;s a breakdown of what that includes
        </p>
      </section>

      {/* Viewport 24: Services breakdown - Split section, black bg, white text - sticky for overlay effect */}
      <section id="services" className="sticky top-0 min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-10">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
            {/* Social Media Marketing */}
            <div className="flex flex-col lg:flex-row lg:col-span-3 gap-8 mb-12">
              <div className="lg:w-1/3">
                <h3 className="text-2xl md:text-3xl font-bold text-content-inverse" style={{fontSize: '3.5rem'}}>Social Media Marketing</h3>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg md:text-xl text-content-inverse space-y-2" style={{fontSize: '3.5rem'}}>
                  <p>Social Media Strategy</p>
                  <p>Analytics & Insights</p>
                  <p>Campaign Management</p>
                </div>
              </div>
            </div>

            {/* Content Creation */}
            <div className="flex flex-col lg:flex-row lg:col-span-3 gap-8 mb-12">
              <div className="lg:w-1/3">
                <h3 className="text-2xl md:text-3xl font-bold text-content-inverse" style={{fontSize: '3.5rem'}}>Content Creation</h3>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg md:text-xl text-content-inverse space-y-2" style={{fontSize: '3.5rem'}}>
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
                <h3 className="text-2xl md:text-3xl font-bold text-content-inverse" style={{fontSize: '3.5rem'}}>Short-form Video Editing</h3>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg md:text-xl text-content-inverse space-y-2" style={{fontSize: '3.5rem'}}>
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