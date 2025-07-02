'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/animations/gsap'
import { Card } from '@/components/ui/card'

const skills = [
  { name: 'Frontend Development', level: 95 },
  { name: 'Backend Development', level: 88 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Database Design', level: 90 },
  { name: 'DevOps', level: 78 },
  { name: 'Mobile Development', level: 82 }
]

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of modern web applications using React, Next.js, and Node.js.'
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2020 - 2022',
    description: 'Created responsive and interactive user interfaces for various client projects.'
  },
  {
    title: 'Junior Developer',
    company: 'Startup',
    period: '2019 - 2020',
    description: 'Developed and maintained web applications while learning industry best practices.'
  }
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    const description = descriptionRef.current
    const skillsContainer = skillsRef.current
    const experienceContainer = experienceRef.current

    if (!container || !title || !description || !skillsContainer || !experienceContainer) return

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

    // Animate skills
    tl.fromTo(skillsContainer.children,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power3.out'
      },
      '-=0.2'
    )

    // Animate experience cards
    tl.fromTo(experienceContainer.children,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        ease: 'power3.out'
      },
      '-=0.3'
    )

    // Animate skill bars
    const skillBars = skillsContainer.querySelectorAll('.skill-bar')
    skillBars.forEach((bar, index) => {
      const progress = bar.querySelector('.skill-progress') as HTMLElement
      if (progress) {
        const level = skills[index].level
        gsap.fromTo(progress,
          { width: '0%' },
          { 
            width: `${level}%`, 
            duration: 1.2, 
            delay: 0.5 + (index * 0.1),
            ease: 'power3.out'
          }
        )
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="about" ref={containerRef} className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            About Me
          </h2>
          <p ref={descriptionRef} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a passionate full-stack developer with over 5 years of experience creating 
            beautiful, functional, and user-friendly digital experiences. I specialize in 
            modern web technologies and love bringing innovative ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
            <div ref={skillsRef} className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="skill-bar h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Experience</h3>
            <div ref={experienceRef} className="space-y-6">
              {experiences.map((exp) => (
                <Card key={exp.title} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <h4 className="font-semibold text-lg">{exp.title}</h4>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="font-medium text-primary mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
