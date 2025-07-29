'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useSlideUp, useFadeIn } from '@/hooks/useGSAP'

export const AboutSection = () => {
  const containerRef = useFadeIn({ delay: 0.2 })
  const photoRef = useSlideUp({ delay: 0.4 })
  const contentRef = useSlideUp({ delay: 0.6 })
  const skillsRef = useSlideUp({ delay: 0.8 })

  return (
    <section 
      id="about"
      className="min-h-screen bg-surface-background relative overflow-hidden"
      ref={containerRef as React.RefObject<HTMLElement>}
    >
      {/* Main Content Container */}
      <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Photo (Continuation) */}
          <div 
            ref={photoRef as React.RefObject<HTMLDivElement>}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Full-body photo placeholder - showing continuation from hero */}
            <div className="relative group">
              <div className="w-72 h-96 md:w-80 md:h-[500px] bg-gradient-to-b from-neutral-200 to-neutral-300 rounded-lg shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="text-center text-content-tertiary">
                  <div className="text-4xl md:text-5xl mb-4">👨‍💼</div>
                  <div className="text-base md:text-lg font-medium">Full Body Photo</div>
                  <div className="text-sm opacity-75 mt-2">Professional Standing Pose</div>
                  <div className="text-xs opacity-60 mt-1">Suit & Formal Attire</div>
                </div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div 
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className="space-y-8 md:space-y-10"
          >
            {/* Main Tagline */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary leading-tight">
                Helping business owners create engaging content.{' '}
                <span className="text-brand-600">
                  Together, we will make content that converts.
                </span>
              </h2>
            </div>

            {/* Call-to-Action Button */}
            <div className="pt-4">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-content-primary text-content-inverse hover:bg-content-secondary px-8 py-4 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                About me
              </Button>
            </div>

            {/* Skills/Specializations */}
            <div 
              ref={skillsRef as React.RefObject<HTMLDivElement>}
              className="pt-6 md:pt-8"
            >
              <h3 className="text-lg md:text-xl font-semibold text-content-primary mb-6">
                Specialising in:
              </h3>
              
              <div className="space-y-4">
                {[
                  'Market Analysis',
                  'Content Strategy', 
                  'Content Production',
                  'Cross-Platform Management'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-surface-secondary transition-colors duration-200">
                      <div className="w-2 h-2 bg-brand-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                      <span className="text-base md:text-lg text-content-primary font-medium group-hover:text-brand-600 transition-colors duration-200">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>
    </section>
  )
}