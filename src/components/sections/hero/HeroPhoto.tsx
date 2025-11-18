'use client'

import Image from 'next/image'
import { useParallax } from '@/hooks/useParallax'

interface HeroPhotoProps {
  className?: string
}

export const HeroPhoto = ({ className = '' }: HeroPhotoProps) => {
  const photoParallaxRef = useParallax<HTMLDivElement>({
    speed: 0.3, // 30% kecepatan scroll normal - lebih subtle
    direction: 'up', // Bergerak ke atas saat scroll
    offset: 0
  })

  return (
    <div className={className}>
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
  )
}

