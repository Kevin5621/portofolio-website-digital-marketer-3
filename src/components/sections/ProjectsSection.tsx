'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from '@/lib/animations/gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, GitBranch } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js, Stripe, and Supabase. Features include user authentication, product management, and secure payments.',
    image: '/assets/images/project-1.svg',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
    image: '/assets/images/project-2.svg',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    featured: true
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that helps create blog posts, social media content, and marketing copy using OpenAI API.',
    image: '/assets/images/project-3.svg',
    technologies: ['Next.js', 'OpenAI API', 'Prisma', 'Clerk', 'Vercel'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    featured: false
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with smooth animations, dark mode support, and content management system.',
    image: '/assets/images/project-4.svg',
    technologies: ['Next.js', 'GSAP', 'Lenis', 'Supabase', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    featured: false
  }
]

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    const description = descriptionRef.current
    const projectsContainer = projectsRef.current

    if (!container || !title || !description || !projectsContainer) return

    // Create timeline for scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animate title
    tl.fromTo(title, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Animate description
    tl.fromTo(description,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )

    // Animate project cards with stagger
    tl.fromTo(projectsContainer.children,
      { opacity: 0, y: 80, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out'
      },
      '-=0.2'
    )

    // Add hover animations for project cards
    const projectCards = projectsContainer.querySelectorAll('.project-card')
    projectCards.forEach(card => {
      const image = card.querySelector('.project-image')
      const overlay = card.querySelector('.project-overlay')
      
      card.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.1, duration: 0.4, ease: 'power2.out' })
        gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' })
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      })
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="projects" ref={containerRef} className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            Featured Projects
          </h2>
          <p ref={descriptionRef} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in modern web development, 
            from e-commerce platforms to AI-powered applications.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="project-card group overflow-hidden border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <div className="project-image relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500"
                  />
                </div>
                <div className="project-overlay absolute inset-0 bg-primary opacity-0 flex items-center justify-center space-x-4 transition-opacity duration-300">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
