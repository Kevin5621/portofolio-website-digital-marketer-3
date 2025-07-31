'use client'

export const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="min-h-screen bg-surface-background relative"
      data-theme="light"
    >
      {/* Header Section with Social Links */}
      <div className="absolute top-8 right-8 flex items-center gap-6">
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

      <div className="container mx-auto px-8 py-24 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-center">
          
          {/* Left Column - Circle & Title */}
          <div className="flex flex-col space-y-16">
            {/* Large Black Circle */}
            <div className="w-80 h-80 bg-content-primary rounded-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-medium text-content-inverse">Get in touch</h3>
              </div>
            </div>
            
            {/* Contact Title */}
            <div>
              <h2 className="text-8xl font-bold text-content-primary leading-none">
                Contact
              </h2>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-20">
            {/* Email */}
            <div className="border-t border-content-primary pt-8">
              <div className="text-4xl font-normal text-content-primary">
                ekaadharabusiness@gmail.com
              </div>
            </div>

            {/* Phone */}
            <div className="border-t border-content-primary pt-8">
              <div className="text-4xl font-normal text-content-primary">
                +62 896-9734-6868
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Link */}
      <div className="absolute bottom-8 right-8">
        <a 
          href="#home" 
          className="text-content-primary text-lg"
        >
          ( Back to top ) ↑
        </a>
      </div>
    </section>
  )
}
