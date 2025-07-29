'use client'

import { useHeader } from '@/components/layout/HeaderContext'
import { useLayoutEffect } from 'react'

export const AboutSection = () => {
  const { setIsWhite } = useHeader()
  
  useLayoutEffect(() => {
    setIsWhite(false)
    return () => setIsWhite(false)
  }, [setIsWhite])

  return (
    <section id="about" className="min-h-screen bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Photo */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="w-72 h-96 md:w-80 md:h-[500px] bg-gradient-to-b from-muted to-muted/80 rounded-lg shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl md:text-5xl mb-4">👨‍💼</div>
                  <div className="text-base md:text-lg font-medium">Full Body Photo</div>
                  <div className="text-sm opacity-75 mt-2">Professional Standing Pose</div>
                  <div className="text-xs opacity-60 mt-1">Suit & Formal Attire</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Helping business owners create engaging content.
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Together, we will make content that converts.
                </span>
              </h2>
            </div>
            
            <div className="pt-4">
              <button className="button-base inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                About me
              </button>
            </div>
            
            <div className="pt-6 md:pt-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6">Specialising in:</h3>
              <div className="space-y-4">
                <div className="group" style={{opacity:0,transform:'translateX(-20px)'}}>
                  <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-base md:text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-200">Market Analysis</span>
                  </div>
                </div>
                <div className="group" style={{opacity:0,transform:'translateX(-20px)'}}>
                  <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-base md:text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-200">Content Strategy</span>
                  </div>
                </div>
                <div className="group" style={{opacity:0,transform:'translateX(-20px)'}}>
                  <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-base md:text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-200">Content Production</span>
                  </div>
                </div>
                <div className="group" style={{opacity:0,transform:'translateX(-20px)'}}>
                  <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-base md:text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-200">Cross-Platform Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)',backgroundSize:'40px 40px'}}></div>
      </div>
    </section>
  )
}