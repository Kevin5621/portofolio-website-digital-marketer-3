'use client'

import Image from 'next/image'
import { MaskButton } from '../ui/mask-button'

const ProjectSection = ({ 
  id, 
  image, 
  title, 
  year, 
  category 
}: { 
  id: string
  image: string
  title: string
  year: string
  category: string 
}) => {
  return (
    <section 
      id={id}
      className="relative w-full h-screen overflow-hidden"
      data-theme="dark"
    >
      <div className="relative w-full h-full">
        {/* Background Image dengan overlay gelap */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority={id === 'project-1'}
          />
          {/* Dark overlay untuk memastikan text putih terlihat jelas */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Year positioned at top left */}
        <div className="absolute top-8 left-8 z-10">
          <p className="text-white text-lg font-normal">
            {year}
          </p>
        </div>

        {/* Main title positioned in center-left */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="ml-8 space-y-6">
            <h1 className="text-white text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] font-bold leading-none tracking-tight">
              {title}
            </h1>
            
            {/* Category and button positioned below title */}
            <div className="space-y-4">
              <p className="text-white text-xl font-normal">
                {category}
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
                View project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const SelectedWorks = () => {
  return (
    <>
      <section 
        id="work" 
        className="min-h-screen bg-surface-background relative overflow-hidden flex items-center justify-center"
        data-theme="light"
      >
        <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            <div className="space-y-0">
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black text-content-primary leading-[0.8] tracking-tight">
                selected
              </h1>
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black text-content-primary leading-[0.8] tracking-tight">
                works
              </h1>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-12">
              <p className="text-xl md:text-2xl lg:text-3xl text-content-primary leading-relaxed font-normal">
                a selection of projects that represent my approach to design and development. Each piece is crafted with a focus on detail, innovation, and effectiveness.
              </p>
            </div>
            
            <div className="pt-8">
              <MaskButton 
                size="md"
                onClick={() => {
                  // Navigate to work page
                  window.location.href = '/work'
                }}
              >
                view all projects
              </MaskButton>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Sections */}
      <ProjectSection
        id="project-1"
        image="/landing/1.png"
        title="Rumah Bahasa Asing"
        year="2023 - 2024"
        category="Social Media Marketing Manager"
      />
      
      <ProjectSection
        id="project-2"
        image="/landing/2.png"
        title="Digital Campaign"
        year="2023 - 2024"
        category="Digital Marketing"
      />
      
      <ProjectSection
        id="project-3"
        image="/landing/3.png"
        title="Brand Strategy"
        year="2023 - 2024"
        category="Brand Strategy"
      />
    </>
  )
} 