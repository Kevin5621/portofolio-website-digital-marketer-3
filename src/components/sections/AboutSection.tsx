'use client'

import Image from 'next/image'

export const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="min-h-[200vh] bg-background relative overflow-hidden"
      data-theme="light"
    >
      {/* Container for both viewports */}
      <div className="relative h-[200vh]">
        
        {/* Photo Container - Spans 2 viewports on desktop, full width on mobile */}
        <div className="absolute left-0 top-0 w-full md:w-1/3 h-full z-10">
          <div className="relative w-full h-full">
            <Image 
              src="/landing/about-man.png" 
              alt="About - Digital Designer"
              width={1920}
              height={2160}
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* VIEWPORT 1 - Desktop: Right side content, Mobile: Below photo */}
        <div className="absolute top-0 left-0 md:left-1/3 w-full md:w-2/3 h-screen flex items-start justify-start z-20">
          <div className="px-8 md:px-12 lg:px-16 pt-16 md:pt-20 mt-96 md:mt-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-content-primary leading-tight">
              Helping business<br />
              owners create<br />
              engaging content.<br />
              Together, we will make<br />
              content that converts.
            </h2>
          </div>
        </div>

        {/* ABOUT ME - Center text between viewports */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl px-12 py-6 shadow-lg">
            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-content-primary text-center">
              about me
            </h3>
          </div>
        </div>

        {/* VIEWPORT 2 - Desktop: Right side content, Mobile: Below viewport 1 */}
        <div className="absolute left-0 md:left-1/3 w-full md:w-2/3 h-screen flex items-end justify-start z-20" style={{top: '100vh'}}>
          <div className="px-8 md:px-12 lg:px-16 pb-16 md:pb-20">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-content-primary font-black">
                  Specialising in:
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-content-primary font-black">
                  Market Analysis
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-content-primary font-black">
                  Content Strategy
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-content-primary font-black">
                  Content Production
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-content-primary font-black">
                  Cross-Platform Management
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: About Me section - visible only on mobile */}
        <div className="md:hidden absolute top-full left-0 w-full h-auto z-30 bg-background py-12">
          <div className="px-8">
            <h3 className="text-3xl font-medium text-content-primary text-center mb-8">
              about me
            </h3>
          </div>
        </div>

      </div>
    </section>
  )
}