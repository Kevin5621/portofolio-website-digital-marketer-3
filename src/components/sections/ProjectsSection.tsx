'use client'

import { useHeader } from '@/components/layout/HeaderContext'
import { useEffect } from 'react'

export const ProjectsSection = () => {
  const { setIsWhite } = useHeader()
  
  useEffect(() => {
    setIsWhite(false)
    return () => setIsWhite(false)
  }, [setIsWhite])
  return (
    <section id="projects" className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Projects Section</h2>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </section>
  )
} 