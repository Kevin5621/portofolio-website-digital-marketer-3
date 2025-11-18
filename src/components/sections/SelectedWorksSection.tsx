'use client'

import { PillButton } from '@/components/ui/pill-button'
import { TextBlockHighlight } from '@/components/ui/text-block-highlight'

export const SelectedWorksSection = () => {
  return (
    <section 
      id="selected-works" 
      className="min-h-screen bg-surface-background relative overflow-hidden flex items-center justify-center"
      data-theme="light"
    >
      <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-0">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-extrabold text-content-primary leading-[0.8] tracking-tight">
              <TextBlockHighlight delay={0}>Selected</TextBlockHighlight>
            </h1>
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-extrabold text-content-primary leading-[0.8] tracking-tight">
              <TextBlockHighlight delay={0.1}>Works</TextBlockHighlight>
            </h1>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary text-center leading-[1]">
              <TextBlockHighlight delay={0.2}>
                A selection of project that represent my journey in the
              </TextBlockHighlight>
              <br />
              <TextBlockHighlight delay={0.3}>
                creative world, showing the projects I&apos;m proud of and
              </TextBlockHighlight>
              <br />
              <TextBlockHighlight delay={0.4}>
                the values I hold in every step of my work.
              </TextBlockHighlight>
            </p>
          </div>
          
          <div className="pt-8">
            <PillButton 
              variant="dark-to-light"
              className="px-12 py-6 text-2xl lg:text-3xl"
              onClick={() => {
                // Navigate to work page
                globalThis.window.location.href = '/work'
              }}
            >
              view all projects
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  )
}

