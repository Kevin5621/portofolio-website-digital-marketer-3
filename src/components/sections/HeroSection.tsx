'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTextReveal, useSlideUp, useFadeIn } from '@/hooks/useGSAP'
import { useSmoothScroll } from '@/hooks/useLenis'

export const HeroSection = () => {
  const titleRef = useTextReveal({ delay: 0.5 })
  const subtitleRef = useSlideUp({ delay: 0.8 })
  const ctaRef = useFadeIn({ delay: 1.2 })
  const scrollIndicatorRef = useFadeIn({ delay: 1.5 })
  const { scrollTo } = useSmoothScroll()

  const handleScrollToProjects = () => scrollTo('#projects')
  const handleScrollToContact = () => scrollTo('#contact')
  const handleScrollToAbout = () => scrollTo('#about')

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className="text-4xl sm:text-6xl lg:text-8xl font-bold text-foreground mb-6"
        >
          Creative Developer
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Crafting exceptional digital experiences through innovative design, 
          cutting-edge technology, and meticulous attention to detail.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef as React.RefObject<HTMLDivElement>} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" onClick={handleScrollToProjects}>
            View My Work
          </Button>
          <Button variant="outline" size="lg" onClick={handleScrollToContact}>
            Get In Touch
          </Button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleScrollToAbout}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
