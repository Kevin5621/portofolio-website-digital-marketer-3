'use client'

import { HeroPhoto } from './HeroPhoto'
import { HeroArrowIcon } from './HeroArrowIcon'


export const HeroSection = () => {
  // =======================================
  // CUSTOM POSITIONING FOR DESKTOP
  // =======================================
  // Anda bisa mengubah nilai-nilai ini untuk custom positioning
  const desktopPositions = {
    // Motto Section positioning
    mottoSection: {
      left: 'left-4 md:left-8', // Kiri: 'left-4', 'left-8', 'left-12', 'left-16', dll
      right: '', // Kanan: 'right-4', 'right-8', 'right-12', 'right-16', dll
      top: 'top-[45%]', // Atas: 'top-1/4', 'top-1/3', 'top-1/2', 'top-2/3', dll
      bottom: '', // Bawah: 'bottom-4', 'bottom-8', 'bottom-12', 'bottom-16', dll
      transform: 'transform -translate-y-1/2' // Centering vertical
    },
    
    // Skills positioning
    skills: {
      left: '', // Kiri: 'left-4', 'left-8', 'left-12', 'left-16', dll
      right: 'right-16 md:right-16', // Kanan: 'right-4', 'right-8', 'right-12', 'right-16', dll
      top: 'top-[45%]', // Atas: 'top-1/4', 'top-1/3', 'top-2/5', 'top-1/2', dll
      bottom: '', // Bawah: 'bottom-4', 'bottom-8', 'bottom-12', 'bottom-16', dll
      transform: 'transform -translate-y-1/2' // Centering vertical
    },
    
    // Name positioning
    name: {
      left: 'left-0', // Kiri: 'left-0', 'left-4', 'left-8', 'left-12', dll
      right: 'right-0', // Kanan: 'right-0', 'right-4', 'right-8', 'right-12', dll
      top: '', // Atas: 'top-4', 'top-8', 'top-12', 'top-16', dll
      bottom: 'bottom-0', // Bawah: 'bottom-0', 'bottom-4', 'bottom-8', 'bottom-12', dll
      padding: 'pb-8 md:pb-12' // Padding bottom: 'pb-4', 'pb-8', 'pb-12', 'pb-16', dll
    },
    
    // Photo positioning
    photo: {
      left: '-left-8 md:-left-26', // Kiri: 'left-0', '-left-4', '-left-8', '-left-12', dll
      right: '-right-1 md:-right-1', // Kanan: 'right-0', '-right-4', '-right-8', '-right-12', dll
      top: 'top-0 scale-[1.35] origin-[50%_35%] md:scale-100 md:origin-center md:-top-24', // Mobile: scale up to zoom in (half body effect)
      bottom: 'bottom-0 md:-bottom-12' // Mobile: full height
    }
  }

  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-visible bg-background-dark -z-20"
      data-theme="dark"
    >
      {/* Shadow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-108 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
      <div className="relative h-screen flex items-center justify-center">
        {/* Motto Section */}
        <div className={`absolute ${desktopPositions.mottoSection.left} ${desktopPositions.mottoSection.right} ${desktopPositions.mottoSection.top} ${desktopPositions.mottoSection.bottom} ${desktopPositions.mottoSection.transform} z-20 hidden md:block`}>
          <div className="text-content-inverse text-left pb-32">
            {/* Spacer untuk menyelaraskan dengan arrow icon di skills section */}
            <div className="mb-2" style={{height: '60px'}}></div>
            <div>
              <div className="text-xl md:text-2xl font-normal">
                My Motto Is:
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal pt-4">
                &quot;Sepi ing Pamrih,
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal pt-4">
                Rame ing Gawe&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Photo - Full width, overlapping, focus on face with parallax effect */}
        <HeroPhoto 
          className={`absolute ${desktopPositions.photo.left} ${desktopPositions.photo.right} ${desktopPositions.photo.top} ${desktopPositions.photo.bottom} z-0`}
        />

        {/* Skills */}
        <div className={`absolute ${desktopPositions.skills.left} ${desktopPositions.skills.right} ${desktopPositions.skills.top} ${desktopPositions.skills.bottom} ${desktopPositions.skills.transform} z-20 hidden md:block`}>
          <div className="text-content-inverse text-left -ml-8 pb-32">
            {/* Arrow Icon - Di atas text */}
            <HeroArrowIcon />
            
            {/* Skills Text */}
            <div className="space-y-6 pt-4">
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal">
                Social Media Marketing
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal">
                Content Creator
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal">
                Short-Form Video Editor
              </div>
            </div>
          </div>
        </div>

        {/* Name - Full width, static text */}
        <div className={`absolute ${desktopPositions.name.left} ${desktopPositions.name.right} ${desktopPositions.name.top} ${desktopPositions.name.bottom} z-30 ${desktopPositions.name.padding} hidden md:block`}>
          <h1 className="text-[12rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-semibold text-content-inverse leading-none tracking-tight text-center w-full flex items-center justify-center gap-4">
            <span>Adhara</span>
            <span>Eka</span>
          </h1>
        </div>

        {/* Mobile Layout - Infinite Marquee & Full Image */}
        <div className="md:hidden absolute inset-0 z-20 overflow-hidden pointer-events-none">
          {/* Marquee Name - Spans > 1 window */}
          {/* Name - Massive Static Text (Spans > 1 window via overflow) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center">
             <div className="whitespace-nowrap">
                <h1 className="font-bold text-content-inverse leading-none tracking-tighter text-[35vw]">
                  Adhara Eka
                </h1>
             </div>
          </div>

          {/* Bottom Left Info - Arrow & Jobs */}
          <div className="absolute bottom-8 left-6 text-left flex flex-col gap-4 pointer-events-auto">
            {/* Arrow */}
            <div className="w-8 h-8 text-content-inverse">
               <HeroArrowIcon />
            </div>
            
            {/* Job Titles */}
            <div className="flex flex-col gap-1">
              <span className="text-content-inverse/80 text-base font-medium">Freelance</span>
              <div className="flex flex-col">
                <span className="text-content-inverse text-xl font-medium leading-tight">Social Media Marketing</span>
                <span className="text-content-inverse text-xl font-medium leading-tight">Content Creator</span>
                <span className="text-content-inverse text-xl font-medium leading-tight">Video Editor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
