'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/useParallax'

export const HeroSection = () => {
  // =======================================
  // PARALLAX EFFECT FOR PHOTO
  // =======================================
  const photoParallaxRef = useParallax<HTMLDivElement>({
    speed: 0.3, // 30% kecepatan scroll normal - lebih subtle
    direction: 'up', // Bergerak ke atas saat scroll
    offset: 0
  })



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
        {/* Motto Section */}
        <div className={`absolute ${desktopPositions.mottoSection.left} ${desktopPositions.mottoSection.right} ${desktopPositions.mottoSection.top} ${desktopPositions.mottoSection.bottom} ${desktopPositions.mottoSection.transform} z-20 hidden md:block`}>
          <div className="text-content-inverse text-left">
            {/* Spacer untuk menyelaraskan dengan arrow icon di skills section */}
            <div className="mb-2" style={{height: '60px'}}></div>
            <div>
              <div className="text-xl md:text-2xl font-normal">My Motto Is:</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal pt-4">&quot;Sepi ing Pamrih,</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal pt-4">Rame ing Gawe&quot;</div>
            </div>
          </div>
        </div>

        {/* Photo - Full width, overlapping, focus on face with parallax effect */}
        <div className={`absolute ${desktopPositions.photo.left} ${desktopPositions.photo.right} ${desktopPositions.photo.top} ${desktopPositions.photo.bottom} z-0`}>
          <div 
            ref={photoParallaxRef}
            className="w-full h-full overflow-visible"
            style={{ willChange: 'transform' }}
          >
            <Image 
              src="/landing/hero-man.webp" 
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
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ x: -8, y: -8 }}
                animate={{ x: 8, y: 8 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <path
                  d="M5.75739 7.17154L7.1716 5.75732L16.2426 14.8283L16.2426 10.2427H18.2426L18.2426 18.2427H10.2426V16.2427L14.8285 16.2427L5.75739 7.17154Z"
                  fill="currentColor"
                />
              </motion.svg>
            </div>
            
            {/* Skills Text */}
            <div className="space-y-6 pt-4">
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal">Social Media Marketing</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal">Content Creator</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-normal">Short-Form Video Editor</div>
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

        {/* Mobile Layout - Completely separate from desktop */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center z-20 px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="text-center mb-12">
            <h1 className="font-semibold text-content-inverse leading-none tracking-tight flex items-center justify-center gap-4" style={{fontSize: '8.5rem'}}>
              <span>Adhara</span>
              <span>Eka</span>
            </h1>
          </div>

          {/* Mobile Skills */}
          <div className="text-center space-y-6 mb-12">
            <div className="text-content-inverse font-normal" style={{fontSize: '3.5rem'}}>
              Social Media Marketing
            </div>
            <div className="text-content-inverse font-normal" style={{fontSize: '3.5rem'}}>
              Content Creator
            </div>
            <div className="text-content-inverse font-normal" style={{fontSize: '3.5rem'}}>
              Short-Form Video Editor
            </div>
          </div>

          {/* Mobile Motto */}
          <div className="text-center">
            <div className="text-content-inverse">
              <div className="text-content-inverse font-normal mb-4" style={{fontSize: '3.5rem'}}>My Motto Is:</div>
              <div className="space-y-4">
                <div className="text-content-inverse font-normal" style={{fontSize: '3.5rem'}}>&quot;Sepi ing Pamrih,&quot;</div>
                <div className="text-content-inverse font-normal" style={{fontSize: '3.5rem'}}>&quot;Rame ing Gawe&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
