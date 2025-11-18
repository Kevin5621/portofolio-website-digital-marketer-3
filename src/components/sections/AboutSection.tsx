'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PillButton } from '@/components/ui/pill-button'
import { TextBlockHighlight } from '@/components/ui/text-block-highlight'

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
            <TextBlockHighlight delay={0}>Helping business</TextBlockHighlight>
            <br />
            <TextBlockHighlight delay={0.1}>owners create</TextBlockHighlight>
            <br />
            <TextBlockHighlight delay={0.2}>engaging content.</TextBlockHighlight>
            <br />
            <TextBlockHighlight delay={0.3}>Together, we will make</TextBlockHighlight>
            <br />
            <TextBlockHighlight delay={0.4}>content that converts.</TextBlockHighlight>
          </h2>

          {/* Specializations */}
          <div className="space-y-4">
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              <TextBlockHighlight delay={0.5}>
                Specialising in:
              </TextBlockHighlight>
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              <TextBlockHighlight delay={0.6}>Market Analysis</TextBlockHighlight>
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              <TextBlockHighlight delay={0.7}>Content Strategy</TextBlockHighlight>
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              <TextBlockHighlight delay={0.8}>Content Production</TextBlockHighlight>
            </div>
            <div className="text-2xl sm:text-3xl text-content-primary font-semibold" style={{fontSize: '3.5rem'}}>
              <TextBlockHighlight delay={0.9}>Cross-Platform Management</TextBlockHighlight>
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
      <div className="hidden md:block px-4 sm:px-6 py-12">
        {/* intro - Main container */}
        <div 
          className="intro"
          style={{
            display: 'flex',
            flexFlow: 'row',
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            gridColumnGap: '2em',
            gridRowGap: '2em'
          }}
        >
          {/* intro_image-container */}
          <div 
            className="intro_image-container"
            style={{
              width: 'var(--4-columns, 33.333%)',
              minHeight: '100vh',
              position: 'relative',
              flexShrink: 0
            }}
          >
            {/* project_asset-wrapper - Image wrapper */}
            <div 
              className="project_asset-wrapper"
              style={{
                display: 'flex',
                flexFlow: 'column',
                width: '100%',
                minHeight: '100%',
                height: '100%',
                position: 'relative',
                gridColumnGap: '2em',
                gridRowGap: '2em'
              }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src="/landing/about-man.webp" 
                  alt="About - Digital Designer"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="33.333vw"
                />
              </div>
            </div>
          </div>

          {/* intro_text-container */}
          <div 
            className="intro_text-container"
            style={{
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flex: '1',
              gridColumnGap: '18vw',
              gridRowGap: '18vw',
              padding: '1rem 1rem',
              minHeight: '100vh'
            }}
          >
            {/* Main Heading */}
            <h2 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-content-primary leading-[0.95]">
              <TextBlockHighlight delay={0}>Helping business</TextBlockHighlight>
              <br />
              <TextBlockHighlight delay={0.1}>owners create</TextBlockHighlight>
              <br />
              <TextBlockHighlight delay={0.2}>engaging content.</TextBlockHighlight>
              <br />
              <TextBlockHighlight delay={0.3}>Together, we will make</TextBlockHighlight>
              <br />
              <TextBlockHighlight delay={0.4}>content that converts.</TextBlockHighlight>
            </h2>

            {/* About Me Button */}
            <div className="pt-6">
              <Link href="/about">
                <PillButton 
                  variant="dark-to-light"
                  className="px-12 py-6 text-2xl lg:text-3xl"
                >
                  About me
                </PillButton>
              </Link>
            </div>

            {/* Specialisations */}
            <div className="space-y-3 pt-6">
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  <TextBlockHighlight delay={0.5}>Specialising in:</TextBlockHighlight>
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  <TextBlockHighlight delay={0.6}>Market Analysis</TextBlockHighlight>
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  <TextBlockHighlight delay={0.7}>Content Strategy</TextBlockHighlight>
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  <TextBlockHighlight delay={0.8}>Content Production</TextBlockHighlight>
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl text-content-primary font-semibold leading-[0.9]">
                  <TextBlockHighlight delay={0.9}>Cross-Platform Management</TextBlockHighlight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}