import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Explore my latest projects and work showcasing modern web development skills.',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Projects
          </h1>
          <p className="text-xl text-content-tertiary max-w-3xl mx-auto">
            A comprehensive collection of my work spanning web applications, 
            mobile apps, and innovative digital solutions.
          </p>
        </div>
        
        <ProjectsSection />
      </div>
    </div>
  )
}
