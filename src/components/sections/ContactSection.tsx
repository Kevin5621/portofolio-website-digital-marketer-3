'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Menu } from 'lucide-react'
import { useFadeIn, useSlideUp } from '@/hooks/useGSAP'
import { scrollToElement } from '@/lib/animations/lenis'

export const ContactSection = () => {
  const headerRef = useFadeIn({ delay: 0.2 })
  const leftContentRef = useSlideUp({ delay: 0.4 })
  const rightContentRef = useSlideUp({ delay: 0.6 })
  const backToTopRef = useFadeIn({ delay: 0.8 })

  const handleBackToTop = () => scrollToElement('#home')
  const handleGetInTouch = () => {
    window.open('mailto:ekaadharabusiness@gmail.com', '_blank')
  }

  return (
    <section id="contact" className="min-h-screen bg-background relative">
      {/* Header */}
      <header 
        ref={headerRef as React.RefObject<HTMLElement>}
        className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center"
      >
        {/* Copyright */}
        <div className="text-sm text-foreground">
          © Adhara Eka Sakti
        </div>

        {/* Hamburger Menu */}
        <button className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
          <Menu className="w-5 h-5 text-background" />
        </button>
      </header>

      {/* Main Content */}
      <div className="relative h-screen flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Side */}
          <div 
            ref={leftContentRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col justify-center space-y-16"
          >
            {/* Get in Touch Button */}
            <div className="flex justify-center lg:justify-start">
              <motion.button
                onClick={handleGetInTouch}
                className="w-48 h-48 bg-foreground rounded-full flex items-center justify-center text-background text-lg font-medium hover:bg-foreground/90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.button>
            </div>

            {/* Contact Title */}
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-foreground leading-none">
              Contact
            </h2>
          </div>

          {/* Right Side */}
          <div 
            ref={rightContentRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col justify-center space-y-12"
          >
            {/* Social Media Links */}
            <div className="flex flex-col space-y-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
              >
                <span className="text-xl font-medium">Instagram</span>
                <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
              >
                <span className="text-xl font-medium">LinkedIn</span>
                <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Horizontal Lines */}
              <div className="space-y-6">
                <div className="h-px bg-border"></div>
                <div className="h-px bg-border"></div>
                <div className="h-px bg-border"></div>
              </div>

              {/* Email */}
              <div className="text-3xl md:text-4xl font-medium text-foreground">
                ekaadharabusiness@gmail.com
              </div>

              {/* Phone */}
              <div className="text-3xl md:text-4xl font-medium text-foreground">
                +62 896-9734-6868
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <motion.button
          ref={backToTopRef as React.RefObject<HTMLButtonElement>}
          onClick={handleBackToTop}
          className="absolute bottom-8 right-8 flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
          whileHover={{ y: -2 }}
        >
          <span className="text-sm">(Back to top)</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </section>
  )
}
