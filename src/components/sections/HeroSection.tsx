'use client'

import Image from 'next/image'
import { useHorizontalScrollMarquee } from '@/hooks/useScrollMarquee'

export const HeroSection = () => {
  // =======================================
  // SCROLL-RESPONSIVE MARQUEE ANIMATION
  // =======================================
  const nameMarqueeRef = useHorizontalScrollMarquee({
    speed: 0.3,
    ease: 'power1.out'
  })

  // Debug: Log when component mounts
  console.log('HeroSection mounted, nameMarqueeRef:', nameMarqueeRef)

  // =======================================
  // CUSTOM POSITIONING FOR DESKTOP
  // =======================================
  // Anda bisa mengubah nilai-nilai ini untuk custom positioning
  const desktopPositions = {
    // Location Card positioning
    locationCard: {
      left: '-left-4 md:-left-4', // Kiri: '-left-4', '-left-8', '-left-12', '-left-16', dll
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
      top: '-top-8 md:-top-24', // Atas: 'top-0', '-top-4', '-top-8', '-top-12', dll
      bottom: '-bottom-8 md:-bottom-12' // Bawah: 'bottom-0', '-bottom-4', '-bottom-8', '-bottom-12', dll
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
        {/* Location Card - Terpotong di pinggir */}
        <div className={`absolute ${desktopPositions.locationCard.left} ${desktopPositions.locationCard.right} ${desktopPositions.locationCard.top} ${desktopPositions.locationCard.bottom} ${desktopPositions.locationCard.transform} z-20 hidden md:block`}>
          <div className="bg-content-inverse rounded-r-full px-8 md:px-12 py-4 md:py-6 flex items-center gap-8 md:gap-10 shadow-xl">
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-content">Based</div>
              <div className="text-2xl md:text-3xl font-bold text-content">in</div>
              <div className="text-2xl md:text-3xl font-bold text-content">Indonesia</div>
            </div>
            <div className="w-20 md:w-24 h-20 md:h-24 bg-background-dark rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/landing/gif.gif"
                alt="Globe Animation"
                width={64}
                height={64}
                className="w-16 md:w-18 h-16 md:h-18 object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Photo - Full width, overlapping, focus on face */}
        <div className={`absolute ${desktopPositions.photo.left} ${desktopPositions.photo.right} ${desktopPositions.photo.top} ${desktopPositions.photo.bottom} z-0`}>
          <div className="w-full h-full overflow-visible">
            <Image 
              src="/landing/hero-man.png" 
              alt="Adhara Eka"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Skills */}
        <div className={`absolute ${desktopPositions.skills.left} ${desktopPositions.skills.right} ${desktopPositions.skills.top} ${desktopPositions.skills.bottom} ${desktopPositions.skills.transform} z-20 hidden md:block`}>
          <div className="text-content-inverse text-left -ml-8">
            {/* Arrow Icon - Di atas text */}
            <div className="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-content-inverse transform rotate-45">
                <path d="M7 7l10 10"/>
                <path d="M17 7v10H7"/>
              </svg>
            </div>
            
            {/* Skills Text */}
            <div className="space-y-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-semibold">Social Media Marketing</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-semibold">Content Creator</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-semibold">Short-Form Video Editor</div>
            </div>
          </div>
        </div>

        {/* Name - Full width, 1 baris dengan scroll-responsive marquee */}
        <div className={`absolute ${desktopPositions.name.left} ${desktopPositions.name.right} ${desktopPositions.name.top} ${desktopPositions.name.bottom} z-30 ${desktopPositions.name.padding}`}>
          <h1 
            ref={nameMarqueeRef}
            className="text-[10rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-semibold text-content-inverse leading-none tracking-tight text-center whitespace-nowrap overflow-visible"
            style={{ willChange: 'transform' }}
          >
            Adhara Eka -
          </h1>
        </div>

        {/* Mobile Skills - TETAP PERTAHANKAN */}
        <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-4 text-content-inverse">
            <div className="bg-content-inverse rounded-full px-6 py-4 flex items-center gap-4 shadow-lg">
              <div className="text-right">
                <div className="text-sm font-medium text-content">Based in</div>
                <div className="text-sm font-medium text-content">Indonesia</div>
              </div>
              <div className="w-8 h-8 bg-background-dark rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-content-inverse">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-content-inverse">
                  <path d="M12 5v14"/>
                  <path d="m19 12-7 7-7-7"/>
                </svg>
                <div className="text-base font-medium">Social Media Marketing</div>
              </div>
              <div className="text-base font-medium">Content Creator</div>
              <div className="text-base font-medium">Short-Form Video Editor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
