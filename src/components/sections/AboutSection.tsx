'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PillButton } from '@/components/ui/pill-button'

export const AboutSection = () => {
  return (
    <section 
      id="about-section" 
      className="bg-background relative"
      data-theme="light"
    >
      {/* Mobile Layout - Completely separate from desktop */}
      <div className="block md:hidden">
        {/* Content Container - Mobile */}
        <div className="px-4 sm:px-6 py-12 space-y-12">
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold text-content-primary leading-tight" style={{fontSize: '8.5rem'}}>
            Helping business
            owners create
            engaging content.
            Together, we will make
            content that converts.
          </h2>

          {/* Specializations */}
          <div className="space-y-4">
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              Specialising in:
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              Market Analysis
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              Content Strategy
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              Content Production
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              Cross-Platform Management
            </div>
          </div>

          {/* About Me Button */}
          <div className="pt-6">
            <Link href="/about">
              <div style={{fontSize: '1.5rem'}}>
                <PillButton 
                  variant="dark-to-light"
                  className="w-full px-8 py-6 text-2xl sm:text-3xl"
                >
                  About me
                </PillButton>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Only visible on desktop */}
      <div className="hidden md:block relative h-[200vh]">
        {/* Photo Container - Desktop */}
        <div className="absolute left-0 top-0 w-1/3 h-full z-10">
          <div className="relative w-full h-full p-8 flex items-center justify-center">
            <div className="w-11/12 h-11/12 relative">
              <Image 
                src="/landing/about-man.webp" 
                alt="About - Digital Designer"
                width={1920}
                height={2160}
                className="w-full h-full object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>

        {/* VIEWPORT 1 - Desktop: Right side content */}
        <div className="absolute top-0 left-1/3 w-2/3 h-screen flex items-start justify-start z-20">
          <div className="px-12 lg:px-16 pt-20">
            <h2 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-[0.95]">
              Helping business
              owners create
              engaging content.
              Together, we will make
              content that converts.
            </h2>
          </div>
        </div>

        {/* ABOUT ME - Desktop */}
        <div className="absolute left-1/3 w-2/3 flex items-end justify-start z-30" style={{top: 'calc(100vh - 120px)'}}>
          <div className="px-12 lg:px-16 pb-20">
            <Link href="/about">
              <PillButton 
                variant="dark-to-light"
                className="px-12 py-6 text-2xl lg:text-3xl"
              >
                About me
              </PillButton>
            </Link>
          </div>
        </div>

        {/* VIEWPORT 2 - Desktop: Right side content */}
        <div className="absolute left-1/3 w-2/3 h-screen flex items-end justify-start z-20" style={{top: '100vh'}}>
          <div className="px-12 lg:px-16 pb-20">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Specialising in:
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Market Analysis
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Content Strategy
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Content Production
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  Cross-Platform Management
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}