'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PillButton } from '@/components/ui/pill-button'

export const AboutSection = () => {
  return (
    <section 
      id="about-section" 
      className="min-h-[200vh] bg-background relative overflow-hidden"
      data-theme="light"
    >
      {/* Container for both viewports */}
      <div className="relative h-[200vh]">
        
        {/* Photo Container - Spans 2 viewports on desktop, full width on mobile */}
        <div className="absolute left-0 top-0 w-full md:w-1/3 h-full z-10">
          <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center">
            <div className="w-11/12 h-11/12 relative">
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
        </div>

        {/* VIEWPORT 1 - Desktop: Right side content, Mobile: Below photo */}
        <div className="absolute top-0 left-0 md:left-1/3 w-full md:w-2/3 h-screen flex items-start justify-start z-20">
          <div className="px-8 md:px-12 lg:px-16 pt-16 md:pt-20 mt-96 md:mt-0">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-[0.95]">
              Helping business
              owners create
              engaging content.
              Together, we will make
              content that converts.
            </h2>
          </div>
        </div>

        {/* ABOUT ME - Positioned in section 1 (viewport 1) */}
        <div className="absolute left-0 md:left-1/3 w-full md:w-2/3 flex items-end justify-start z-30" style={{top: 'calc(100vh - 120px)'}}>
          <div className="px-8 md:px-12 lg:px-16 pb-16 md:pb-20">
            <Link href="/about">
              <PillButton 
                variant="dark-to-light"
                className="px-12 py-6 text-xl lg:text-2xl xl:text-3xl"
              >
                About me
              </PillButton>
            </Link>
          </div>
        </div>

        {/* VIEWPORT 2 - Desktop: Right side content, Mobile: Below viewport 1 */}
        <div className="absolute left-0 md:left-1/3 w-full md:w-2/3 h-screen flex items-end justify-start z-20" style={{top: '100vh'}}>
          <div className="px-8 md:px-12 lg:px-16 pb-16 md:pb-20">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Specialising in:
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Market Analysis
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Content Strategy
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Content Production
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
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