'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="min-h-screen bg-background relative overflow-hidden"
      data-theme="light"
    >
      <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Column - Circle & Title */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            {/* Large Black Circle */}
            <div className="w-64 h-64 md:w-80 md:h-80 bg-foreground rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-center text-background">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Get in touch</h3>
                <p className="text-sm md:text-base opacity-90">Let&apos;s work together</p>
              </div>
            </div>
            
            {/* Contact Title */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Contact
              </h2>
            </div>
          </div>

          {/* Right Column - Contact Info & Socials */}
          <div className="space-y-8 md:space-y-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Get in touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:hello@adharaeka.com" className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors duration-200">
                      hello@adharaeka.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Phone className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href="tel:+6281234567890" className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors duration-200">
                      +62 812 3456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <MapPin className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-base md:text-lg font-medium text-foreground">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Follow me</h3>
              
              <div className="space-y-4">
                <a 
                  href="https://instagram.com/adharaeka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group hover:bg-muted p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-background font-bold text-lg">I</span>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      Instagram
                    </p>
                    <p className="text-sm text-muted-foreground">@adharaeka</p>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/adharaeka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group hover:bg-muted p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-background font-bold text-lg">L</span>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      LinkedIn
                    </p>
                    <p className="text-sm text-muted-foreground">in/adharaeka</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Link */}
      <div className="absolute bottom-8 left-8">
        <a 
          href="#home" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          Back to top
        </a>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)',backgroundSize:'40px 40px'}}></div>
      </div>
    </section>
  )
}
