'use client'

import Image from 'next/image'

export const HeroSection = () => {
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
      className="min-h-screen relative overflow-visible bg-background-dark -z-10"
      data-theme="dark"
    >
      {/* Shadow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-108 bg-gradient-to-t from-black/50 to-transparent z-20"></div>
      <div className="relative h-screen flex items-center justify-center">
        {/* Location Card - Terpotong di pinggir */}
        <div className={`absolute ${desktopPositions.locationCard.left} ${desktopPositions.locationCard.right} ${desktopPositions.locationCard.top} ${desktopPositions.locationCard.bottom} ${desktopPositions.locationCard.transform} z-30 hidden md:block`}>
          <div className="bg-content-inverse rounded-r-full px-8 md:px-12 py-4 md:py-6 flex items-center gap-8 md:gap-10 shadow-xl">
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-content">Based</div>
              <div className="text-2xl md:text-3xl font-bold text-content">in</div>
              <div className="text-2xl md:text-3xl font-bold text-content">Indonesia</div>
            </div>
            <div className="w-20 md:w-24 h-20 md:h-24 bg-background-dark rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe w-16 md:w-18 h-16 md:h-18 text-content-inverse" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Photo - Full width, overlapping, focus on face */}
        <div className={`absolute ${desktopPositions.photo.left} ${desktopPositions.photo.right} ${desktopPositions.photo.top} ${desktopPositions.photo.bottom} z-10`}>
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
        <div className={`absolute ${desktopPositions.skills.left} ${desktopPositions.skills.right} ${desktopPositions.skills.top} ${desktopPositions.skills.bottom} ${desktopPositions.skills.transform} z-30 hidden md:block`}>
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

        {/* Name - Full width, 1 baris */}
        <div className={`absolute ${desktopPositions.name.left} ${desktopPositions.name.right} ${desktopPositions.name.top} ${desktopPositions.name.bottom} z-40 ${desktopPositions.name.padding}`}>
          <h1 className="text-[10rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-content-inverse leading-none tracking-tight text-center">
            Adhara Eka
          </h1>
        </div>

        {/* Mobile Skills - TETAP PERTAHANKAN */}
        <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
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
