'use client'

import { motion } from 'framer-motion'
import { Globe, ArrowDown } from 'lucide-react'
import { useTextReveal, useSlideUp, useFadeIn } from '@/hooks/useGSAP'
import { scrollToElement } from '@/lib/animations/lenis'

export const HeroSection = () => {
  const headerRef = useFadeIn({ delay: 0.2 })
  const photoRef = useSlideUp({ delay: 0.5 })
  const skillsRef = useSlideUp({ delay: 0.8 })
  const locationRef = useSlideUp({ delay: 0.6 })
  const nameRef = useTextReveal({ delay: 1.0 })
  const scrollIndicatorRef = useFadeIn({ delay: 1.5 })

  const handleScrollToAbout = () => scrollToElement('#about')

  return (
    <section className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#282828' }}>
      {/* Header Navigation */}
      <header 
        ref={headerRef as React.RefObject<HTMLElement>}
        className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center"
      >
        {/* Copyright */}
        <div className="text-xs md:text-sm text-foreground-light opacity-80">
          © Adhara Eka Sakti
        </div>

        {/* Navigation */}
        <nav className="flex gap-4 md:gap-8">
          <a href="#home" className="text-xs md:text-sm text-foreground-light opacity-80 hover:opacity-100 transition-opacity">Home</a>
          <a href="#work" className="text-xs md:text-sm text-foreground-light opacity-80 hover:opacity-100 transition-opacity">Work</a>
          <a href="#about" className="text-xs md:text-sm text-foreground-light opacity-80 hover:opacity-100 transition-opacity">About</a>
          <a href="#contact" className="text-xs md:text-sm text-foreground-light opacity-80 hover:opacity-100 transition-opacity">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative h-screen flex items-center justify-center px-8">
        {/* Left Side - Location Card */}
        <div 
          ref={locationRef as React.RefObject<HTMLDivElement>}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block group"
        >
          <div className="bg-card rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="text-right">
              <div className="text-xs md:text-sm font-medium text-card-foreground">Based in</div>
              <div className="text-xs md:text-sm font-medium text-card-foreground">Indonesia</div>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-foreground rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <Globe className="w-3 h-3 md:w-4 md:h-4 text-foreground-light" />
            </div>
          </div>
        </div>

        {/* Center - Photo */}
        <div 
          ref={photoRef as React.RefObject<HTMLDivElement>}
          className="relative z-10 group"
        >
          {/* Photo Placeholder */}
          <div className="w-64 h-80 md:w-80 md:h-96 bg-gradient-to-b from-muted to-muted/80 rounded-lg shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <div className="text-center text-muted-foreground">
              <div className="text-xl md:text-2xl mb-2">👨‍💼</div>
              <div className="text-xs md:text-sm">Photo Placeholder</div>
              <div className="text-xs opacity-75">Adhara Eka</div>
            </div>
          </div>
          {/* Photo Glow Effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Right Side - Skills */}
        <div 
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block"
        >
          <div className="text-foreground-light space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 group">
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-foreground-light opacity-60 transition-transform duration-300 group-hover:translate-y-1" />
              <div className="text-sm md:text-lg font-medium transition-colors duration-300 group-hover:text-muted">Social Media Marketing</div>
            </div>
            <div className="text-sm md:text-lg font-medium ml-4 md:ml-6 transition-colors duration-300 hover:text-muted cursor-pointer">Content Creator</div>
            <div className="text-sm md:text-lg font-medium ml-4 md:ml-6 transition-colors duration-300 hover:text-muted cursor-pointer">Short-Form Video Editor</div>
          </div>
        </div>

        {/* Large Name Text */}
        <div 
          ref={nameRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-30"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-foreground-light leading-none tracking-tight">
            <div>Adhara</div>
            <div>Eka</div>
          </h1>
        </div>

        {/* Mobile Skills and Location */}
        <div className="md:hidden absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-4 text-foreground-light">
            {/* Mobile Location */}
            <div className="bg-card rounded-full px-4 py-2 flex items-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="text-right">
                <div className="text-xs font-medium text-card-foreground">Based in</div>
                <div className="text-xs font-medium text-card-foreground">Indonesia</div>
              </div>
              <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                <Globe className="w-3 h-3 text-foreground-light" />
              </div>
            </div>
            
            {/* Mobile Skills */}
            <div className="text-center space-y-2">
              <div className="text-sm font-medium transition-colors duration-300 hover:text-muted">Social Media Marketing</div>
              <div className="text-sm font-medium transition-colors duration-300 hover:text-muted">Content Creator</div>
              <div className="text-sm font-medium transition-colors duration-300 hover:text-muted">Short-Form Video Editor</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-40"
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
          <div className="flex flex-col items-center text-foreground-light opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
