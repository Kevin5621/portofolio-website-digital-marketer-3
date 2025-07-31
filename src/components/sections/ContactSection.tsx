'use client'

export const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="min-h-screen bg-surface-background relative"
      data-theme="light"
    >
      <div className="container mx-auto px-8 py-24 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-start">
          
          {/* Left Column - Circle & Title */}
          <div className="flex flex-col space-y-16">
            {/* Large Black Circle */}
            <div className="w-80 h-80 bg-content-primary rounded-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-medium text-content-inverse">Get in touch</h3>
              </div>
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
                className="text-content-primary text-lg"
              >
                Instagram ↗
              </a>
              <a 
                href="https://linkedin.com/in/adharaeka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-content-primary text-lg"
              >
                Linkedin ↗
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
    </section>
  )
}
