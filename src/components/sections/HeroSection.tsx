'use client'

export const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#282828' }}
      data-theme="dark"
    >
      <div className="relative h-screen flex items-center justify-center px-8">
        {/* Location Card */}
        <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block group">
          <div className="bg-card rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="text-right">
              <div className="text-xs md:text-sm font-medium text-card-foreground">Based in</div>
              <div className="text-xs md:text-sm font-medium text-card-foreground">Indonesia</div>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-foreground rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4 text-foreground-light">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="relative z-10 group">
          <div className="w-64 h-80 md:w-80 md:h-96 bg-gradient-to-b from-muted to-muted/80 rounded-lg shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <div className="text-center text-muted-foreground">
              <div className="text-xl md:text-2xl mb-2">👨‍💼</div>
              <div className="text-xs md:text-sm">Photo Placeholder</div>
              <div className="text-xs opacity-75">Adhara Eka</div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Skills */}
        <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <div className="text-white space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4 text-white transition-transform duration-300 group-hover:translate-y-1">
                <path d="M12 5v14"/>
                <path d="m19 12-7 7-7-7"/>
              </svg>
              <div className="text-sm md:text-lg font-medium transition-colors duration-300 group-hover:text-gray-300">Social Media Marketing</div>
            </div>
            <div className="text-sm md:text-lg font-medium ml-4 md:ml-6 transition-colors duration-300 hover:text-gray-300 cursor-pointer">Content Creator</div>
            <div className="text-sm md:text-lg font-medium ml-4 md:ml-6 transition-colors duration-300 hover:text-gray-300 cursor-pointer">Short-Form Video Editor</div>
          </div>
        </div>

        {/* Name */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-30">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-white leading-none tracking-tight">
            <div>Adhara</div>
            <div>Eka</div>
          </h1>
        </div>

        {/* Mobile Skills */}
        <div className="md:hidden absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="text-right">
                <div className="text-xs font-medium text-gray-800">Based in</div>
                <div className="text-xs font-medium text-gray-800">Indonesia</div>
              </div>
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-sm font-medium transition-colors duration-300 hover:text-gray-300">Social Media Marketing</div>
              <div className="text-sm font-medium transition-colors duration-300 hover:text-gray-300">Content Creator</div>
              <div className="text-sm font-medium transition-colors duration-300 hover:text-gray-300">Short-Form Video Editor</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-40">
          <div className="flex flex-col items-center text-white hover:text-gray-300 transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 5v14"/>
              <path d="m19 12-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
