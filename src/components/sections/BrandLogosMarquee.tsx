'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations/gsap'

export const BrandLogosMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const logoPaths = [
    '/logo/1 (2).webp',
    '/logo/2 (2).webp',
    '/logo/3 (2).webp',
    '/logo/4 (2).webp',
    '/logo/5 (1).webp',
    '/logo/6 (1).webp',
    '/logo/7 (1).webp',
    '/logo/8 (1).webp'
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    // Create infinite scroll animation
    const createInfiniteScroll = () => {
      const containerWidth = container.scrollWidth
      
      // Calculate animation distance (full width of one set of logos)
      const animationDistance = containerWidth / 2

      animationRef.current = gsap.timeline({ repeat: -1 })
        .to(container, {
          x: -animationDistance,
          duration: 20, // 20 seconds for one complete cycle
          ease: 'none',
          onComplete: () => {
            // Reset position seamlessly
            gsap.set(container, { x: 0 })
          }
        })
    }

    // Start animation after a short delay
    const timer = setTimeout(createInfiniteScroll, 1000)

    // Handle window resize
    const handleResize = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      setTimeout(createInfiniteScroll, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        animationRef.current.kill()
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="flex items-center gap-8 md:gap-12 lg:gap-16"
        style={{ willChange: 'transform' }}
      >
        {/* First set of logos */}
        {logoPaths.map((logoPath, index) => (
          <div 
            key={`first-${index}`}
            className="flex-shrink-0 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 bg-surface-secondary rounded-lg flex items-center justify-center p-4"
          >
            <img 
              src={logoPath} 
              alt={`Brand logo ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
        
        {/* Duplicate set for seamless infinite scroll */}
        {logoPaths.map((logoPath, index) => (
          <div 
            key={`second-${index}`}
            className="flex-shrink-0 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 bg-surface-secondary rounded-lg flex items-center justify-center p-4"
          >
            <img 
              src={logoPath} 
              alt={`Brand logo ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 