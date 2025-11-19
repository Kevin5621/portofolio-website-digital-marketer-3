'use client'

import { Magnetic } from '@/components/ui/magnetic'
import { PillButton } from '@/components/ui/pill-button'
import { InstagramIcon } from '@/components/ui/instagram-icon'
import { LinkedInIcon } from '@/components/ui/linkedin-icon'

export const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="bg-surface-background relative"
      data-theme="light"
    >
      {/* Mobile Layout - Completely separate from desktop */}
      <div className="block md:hidden">
        <div className="px-4 sm:px-6 py-12 space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-bold text-content-primary leading-none tracking-tight" style={{fontSize: '8.5rem'}}>
              Contact
            </h2>
          </div>

          {/* Contact Button */}
          <div className="text-center">
            <PillButton 
              variant="dark-to-light"
              className="w-full py-8 text-lg"
              onClick={() => {
                // Scroll to contact form or trigger contact action
                if (typeof document !== 'undefined') {
                  const contactInfo = document.querySelector('#contact .text-right')
                  contactInfo?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              aria-label="Get in touch - scroll to contact information"
            >
              <div className="text-center">
                <h3 className="text-3xl font-medium">
                  Get in touch
                </h3>
              </div>
            </PillButton>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Social Links */}
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://instagram.com/adharaeka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-content-primary flex items-center gap-3"
                style={{fontSize: '3.5rem'}}
              >
                <InstagramIcon size={32} />
                Instagram
              </a>
              <a 
                href="https://linkedin.com/in/adharaeka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-content-primary flex items-center gap-3"
                style={{fontSize: '3.5rem'}}
              >
                <LinkedInIcon size={32} />
                Linkedin
              </a>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="text-content-primary" style={{fontSize: '3.5rem'}}>
                ekaadharabusiness@gmail.com
              </div>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="text-content-primary" style={{fontSize: '3.5rem'}}>
                +62 896-9734-6868
              </div>
            </div>
          </div>

          {/* Back to Top Link */}
          <div className="text-center pt-8">
            <a 
              href="#home" 
              className="text-content-primary tracking-wide"
              style={{fontSize: '3.5rem'}}
            >
              ( Back to top ) ↑
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Only visible on desktop */}
      <div className="hidden md:block min-h-screen bg-surface-background relative">
        <div className="container mx-auto px-8 py-24 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-start">
            
            {/* Left Column - Circle & Title */}
            <div className="flex flex-col space-y-16">
              {/* Large Black Circle with Magnetic Effect - 2 Layer dengan sensitivitas tinggi */}
              <div className="w-80 h-80 relative flex items-center justify-center">
                {/* Layer 1: Outer Magnetic Effect (zona deteksi awal yang lebih besar) */}
                <Magnetic strength={0.04} range={200} onlyOnHover={true}>
                  {/* Layer 2: Inner Magnetic Effect (lebih sensitif dan responsif) */}
                  <Magnetic strength={0.15} range={140} onlyOnHover={true} textStrength={0.8}>
                    <PillButton 
                      variant="dark-to-light"
                      className="w-80 h-80 rounded-full flex items-center justify-center cursor-pointer group transition-all duration-300 hover:shadow-2xl"
                      onClick={() => {
                        // Scroll to contact form or trigger contact action
                        if (typeof document !== 'undefined') {
                          const contactInfo = document.querySelector('#contact .text-right')
                          contactInfo?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      aria-label="Get in touch - scroll to contact information"
                    >
                      <div className="text-center relative z-20">
                        <h3 
                          className="text-3xl font-medium magnetic-text group-hover:scale-105 transition-transform duration-300"
                        >
                          Get in touch
                        </h3>
                      </div>
                    </PillButton>
                  </Magnetic>
                </Magnetic>
              </div>
              
              {/* Contact Title - Made larger and takes more space */}
              <div className="w-full">
                <h2 className="text-[12rem] md:text-[14rem] lg:text-[16rem] font-bold text-content-primary leading-none tracking-tight">
                  Contact
                </h2>
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-0 pt-16">
              {/* Social Links - Positioned above contact info */}
              <div className="flex items-center justify-end gap-6 mb-12">
                <a 
                  href="https://instagram.com/adharaeka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-content-primary text-lg flex items-center gap-2"
                >
                  <InstagramIcon size={20} />
                  Instagram
                </a>
                <a 
                  href="https://linkedin.com/in/adharaeka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-content-primary text-lg flex items-center gap-2"
                >
                  <LinkedInIcon size={20} />
                  Linkedin
                </a>
              </div>
              {/* Full-width lines with contact info aligned right */}
              <div className="w-full">
                {/* First horizontal line */}
                <div className="border-t border-content-primary w-full mb-8"></div>
                
                {/* Email - Right aligned */}
                <div className="text-right mb-16">
                  <div className="text-4xl font-normal text-content-primary">
                    ekaadharabusiness@gmail.com
                  </div>
                </div>

                {/* Second horizontal line */}
                <div className="border-t border-content-primary w-full mb-8"></div>
                
                {/* Phone - Right aligned */}
                <div className="text-right">
                  <div className="text-4xl font-normal text-content-primary">
                    +62 896-9734-6868
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to Top Link - Adjusted positioning */}
        <div className="absolute bottom-12 right-8">
          <a 
            href="#home" 
            className="text-content-primary text-base tracking-wide"
          >
            ( Back to top ) ↑
          </a>
        </div>
      </div>
    </section>
  )
}
