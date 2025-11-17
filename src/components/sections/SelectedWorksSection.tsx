'use client'

import { PillButton } from '@/components/ui/pill-button'

export const SelectedWorksSection = () => {
  return (
    <section 
      id="selected-works" 
      className="min-h-screen bg-surface-background relative overflow-hidden flex items-center justify-center"
      data-theme="light"
    >
      <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-0">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black text-content-primary leading-[0.8] tracking-tight">
              Selected
            </h1>
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black text-content-primary leading-[0.8] tracking-tight">
              Works
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-content-primary leading-relaxed font-normal">
              A selection of projects that represent my approach to design and development. Each piece is crafted with a focus on detail, innovation, and effectiveness.
            </p>
          </div>
          
          <div className="pt-8">
            <PillButton 
              variant="dark-to-light"
              className="px-12 py-4 text-lg"
              onClick={() => {
                // Navigate to work page
                window.location.href = '/work'
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

