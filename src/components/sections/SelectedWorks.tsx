'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { MaskButton } from '../ui/mask-button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Data projects yang bisa diambil dari API atau props
const projects = [
  {
    id: 'ortist-specialist',
    image: '/landing/1.png',
    title: 'Ortist Specialist',
    year: '2023 - 2024',
    category: 'Social Media Marketing Manager'
  },
  {
    id: 'rumah-bahasa-asing', 
    image: '/landing/2.png',
    title: 'Rumah Bahasa Asing',
    year: '2023 - 2024',
    category: 'Digital Marketing'
  },
  {
    id: 'binjasiimen-samapta',
    image: '/landing/3.png', 
    title: 'Binjasiimen Samapta',
    year: '2023 - 2024',
    category: 'Brand Strategy'
  }
]

interface Project {
  id: string
  image: string
  title: string
  year: string
  category: string
}

const ProjectSection = ({ project }: { project: Project }) => {
  const { id, image, title, year, category } = project
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    // Same parallax intensity for all projects
    const parallaxIntensity = 20
    const scaleStart = 1.15
    const scaleEnd = 1.05

    // Create single combined parallax and scale effect
    const parallaxTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.fromTo(imageRef.current, 
        { 
          yPercent: -parallaxIntensity,
          scale: scaleStart,
          transformOrigin: 'center center'
        },
        { 
          yPercent: parallaxIntensity,
          scale: scaleEnd,
          transformOrigin: 'center center',
          ease: 'none'
        }
      ),
    })

    // Cleanup function
    return () => {
      if (parallaxTrigger) {
        parallaxTrigger.kill()
      }
    }
  }, [id])
  
  return (
    <section 
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen overflow-hidden"
      data-theme="dark"
    >
      <div className="relative w-full h-full">
        {/* Background Image dengan parallax effect */}
        <div 
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{
            height: '125%',
            top: '-12.5%'
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority={id === 'ortist-specialist'}
          />
          {/* Dark overlay untuk memastikan text putih terlihat jelas */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Year positioned at top left */}
        <div className="absolute top-8 left-8 z-10">
          <p className="text-content-inverse text-lg font-normal">
            {year}
          </p>
        </div>

        {/* Main title positioned in center-left */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="ml-8 space-y-6">
            <h1 className="text-content-inverse text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] font-bold leading-none tracking-tight">
              {title}
            </h1>
            
            {/* Category and button positioned below title */}
            <div className="space-y-4">
              <p className="text-content-inverse text-xl font-normal">
                {category}
              </p>
              <MaskButton 
                variant="light"
                size="custom"
                customSize="px-8 py-4 text-lg"
                onClick={() => {
                  // Navigate to specific project using correct route
                  window.location.href = `/work/${id}`
                }}
              >
                View project
              </MaskButton>
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
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </>
  )
} 