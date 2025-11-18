'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PillButton } from '@/components/ui/pill-button'

// Register ScrollTrigger plugin
if (globalThis.window !== undefined) {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: string
  image: string
  title: string | ReactNode
  year: string
  category: string
}

interface ProjectSectionProps {
  project: Project
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
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
            alt={typeof title === 'string' ? title : id}
            fill
            className="object-cover"
            priority={id === 'ortist-specialist'}
          />
          {/* Primary color overlay 30% untuk memberikan warna pada gambar */}
          <div className="absolute inset-0 bg-black/55"></div>
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
              <p className="text-content-inverse text-xl font-normal pb-8 pt-8">
                {category}
              </p>
              <PillButton 
                variant="light-to-dark"
                className="px-8 py-4 text-lg"
                onClick={() => {
                  // Navigate to specific project using correct route
                  globalThis.window.location.href = `/work/${id}`
                }}
              >
                View project
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Data projects yang bisa diambil dari API atau props
const projects = [
  {
    id: 'ortist-specialist',
    image: '/landing/1.webp',
    title: 'Ortist Specialist',
    year: '2023 - 2024',
    category: 'Social Media Marketing Manager'
  },
  {
    id: 'rumah-bahasa-asing', 
    image: '/landing/2.webp',
    title: 'Rumah Bahasa Asing',
    year: '2023 - 2024',
    category: 'Digital Marketing'
  },
  {
    id: 'binjasiimen-samapta',
    image: '/landing/3.webp', 
    title: 'Binjasiimen Samapta',
    year: '2023 - 2024',
    category: 'Brand Strategy'
  },
  {
    id: 'gen-ztrive',
    image: '/landing/4.webp',
    title: (
      <>
        GEN-ZTRIVE<sup className="text-[0.5em]">TM</sup>
      </>
    ),
    year: '2023 - 2024',
    category: 'Content Creator'
  }
]

export const ShowcaseImageSection = () => {
  return (
    <>
      {/* Project Gallery Sections */}
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </>
  )
}

