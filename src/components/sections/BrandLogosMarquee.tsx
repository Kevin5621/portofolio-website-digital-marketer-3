'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/animations/gsap'

export const BrandLogosMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const logoPaths = [
    { src: '/work/fest-z-2025/logo.webp', id: 'fest-z-2025' },
    { src: '/work/ika-binus-ceo-forum/logo.webp', id: 'ika-binus-ceo-forum' },
    { src: '/work/ortist-specialist/logo.webp', id: 'ortist-specialist' },
    { src: '/work/gen-ztrive/logo.webp', id: 'gen-ztrive' },
    { src: '/work/a5x-studio/logo.webp', id: 'a5x-studio' },
    { src: '/work/aerospace/logo.webp', id: 'aerospace' },
    { src: '/work/binjasiimen-samapta/logo.webp', id: 'binjasiimen-samapta' },
    { src: '/work/genzummit/logo.webp', id: 'genzummit' },
    { src: '/work/rumah-bahasa-asing/logo.webp', id: 'rumah-bahasa-asing' },
    { src: '/work/ppm-himma-2025/logo.webp', id: 'ppm-himma-2025' }
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
    <div className="w-full overflow-hidden relative">
      {/* Left fade gradient */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, hsl(var(--color-background)), transparent)'
        }}
      />
      
      {/* Right fade gradient */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, hsl(var(--color-background)), transparent)'
        }}
      />
      
      <div 
        ref={containerRef}
        className="flex items-center gap-8 md:gap-12 lg:gap-16"
        style={{ willChange: 'transform' }}
      >
        {/* First set of logos */}
        {logoPaths.map((logo) => (
          <div 
            key={`first-${logo.id}`}
            className="relative shrink-0 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 bg-surface-secondary rounded-lg flex items-center justify-center p-4"
          >
            <Image 
              src={logo.src} 
              alt={`Brand logo ${logo.id}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
            />
          </div>
        ))}
        
        {/* Duplicate set for seamless infinite scroll */}
        {logoPaths.map((logo) => (
          <div 
            key={`second-${logo.id}`}
            className="relative shrink-0 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 bg-surface-secondary rounded-lg flex items-center justify-center p-4"
          >
            <Image 
              src={logo.src} 
              alt={`Brand logo ${logo.id}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 