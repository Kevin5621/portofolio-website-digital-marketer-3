'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useFadeIn, useSlideUp } from '@/hooks/useGSAP'

export const SelectedWorks = () => {
  const containerRef = useFadeIn({ delay: 0.2 })
  const titleRef = useSlideUp({ delay: 0.4 })
  const descriptionRef = useFadeIn({ delay: 0.6 })
  const buttonRef = useSlideUp({ delay: 0.8 })

  return (
    <section 
      id="work"
      className="min-h-screen bg-surface-background relative overflow-hidden flex items-center justify-center"
      ref={containerRef as React.RefObject<HTMLElement>}
    >
      {/* Main Content Container */}
      <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          
          {/* Main Title */}
          <div 
            ref={titleRef as React.RefObject<HTMLDivElement>}
            className="space-y-4"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-content-primary leading-none tracking-tight">
              Selected
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-content-primary leading-none tracking-tight">
              Works
            </h2>
          </div>

          {/* Description Text */}
          <div 
            ref={descriptionRef as React.RefObject<HTMLDivElement>}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-base md:text-lg lg:text-xl text-content-secondary leading-relaxed">
              A selection of project that represent my journey in the creative world, 
              showing the projects I&apos;m proud of and the values I hold in every step of my work.
            </p>
          </div>

          {/* Call-to-Action Button */}
          <div 
            ref={buttonRef as React.RefObject<HTMLDivElement>}
            className="pt-6 md:pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                className="bg-content-primary text-content-inverse hover:bg-content-secondary px-10 py-4 text-base md:text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View all project
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Icon (Hamburger Menu) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-14 md:h-14 bg-content-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="space-y-1.5">
            <div className="w-5 h-0.5 bg-content-inverse rounded-full"></div>
            <div className="w-5 h-0.5 bg-content-inverse rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      {/* Floating elements for visual interest */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-brand-500 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-16 w-3 h-3 bg-accent-500 rounded-full opacity-20"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  )
}