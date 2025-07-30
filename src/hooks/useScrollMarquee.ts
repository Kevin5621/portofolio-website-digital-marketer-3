'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations/gsap'

interface ScrollMarqueeConfig {
  speed?: number
  ease?: string
  direction?: 'horizontal' | 'vertical'
}

/**
 * Hook for scroll-responsive infinite scrolling text animation
 * Text moves left when scrolling down, right when scrolling up
 */
export const useScrollResponsiveMarquee = (
  config: ScrollMarqueeConfig = {}
) => {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const scrollDirection = useRef(0)
  const lastScrollY = useRef(0)
  const lastUpdateTime = useRef(0)
  const isUpdating = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const {
    speed = 0.5,
    ease = 'none',
    direction = 'horizontal'
  } = config

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

        // Clone the text for seamless infinite loop - both left and right
    const originalText = element.textContent || ''
    const separator = direction === 'horizontal' ? ' ' : '\n'
    
    // Create clones for both left and right sides
    const repeatCount = 9 // 3 copies on each side + 1 original = 7 total
    const clones = Array(repeatCount * 2 + 1).fill(originalText).join(separator)
    element.textContent = clones

    // Get the computed dimensions - one complete cycle
    const textDimension = direction === 'horizontal'
      ? element.scrollWidth / (repeatCount * 2 + 1)  // 7 total copies
      : element.scrollHeight / (repeatCount * 2 + 1)

    // Set initial position - start from middle clone so both sides are filled
    const initialOffset = direction === 'horizontal' 
      ? { x: -textDimension * repeatCount } // Start from middle (3rd clone)
      : { y: -textDimension * repeatCount }
    gsap.set(element, initialOffset)

    // Function to update animation based on scroll direction
    const updateAnimation = (scrollDirection: number) => {
      // Prevent too frequent updates but allow more responsive updates
      const now = Date.now()
      if (isUpdating.current || (now - lastUpdateTime.current) < 100) {
        return
      }

      isUpdating.current = true
      lastUpdateTime.current = now

      // Kill previous animation first
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }

      // Fixed duration for consistent speed
      const duration = 15 // Fixed 15 seconds for consistent speed
      const isHorizontal = direction === 'horizontal'

      // Get current position to ensure smooth transitions
      const currentPosition = isHorizontal 
        ? gsap.getProperty(element, 'x') as number
        : gsap.getProperty(element, 'y') as number

      // Create new animation based on scroll direction
      if (scrollDirection > 0) {
        // Scrolling down - move from right to left (negative direction)
        // Calculate target position relative to current position for seamless loop
        const targetPosition = isHorizontal 
          ? { x: currentPosition - textDimension }
          : { y: currentPosition - textDimension }
        
        animationRef.current = gsap.timeline({ repeat: -1 })
          .to(element, {
            ...targetPosition,
            duration,
            ease,
            onComplete: () => {
              // Reset position for seamless loop
              const resetPos = isHorizontal 
                ? { x: currentPosition } 
                : { y: currentPosition }
              gsap.set(element, resetPos)
            }
          })
      } else if (scrollDirection < 0) {
        // Scrolling up - move from left to right (positive direction)
        // Calculate target position relative to current position for seamless loop
        const targetPosition = isHorizontal 
          ? { x: currentPosition + textDimension }
          : { y: currentPosition + textDimension }
        
        animationRef.current = gsap.timeline({ repeat: -1 })
          .to(element, {
            ...targetPosition,
            duration,
            ease,
            onComplete: () => {
              // Reset position for seamless loop
              const resetPos = isHorizontal 
                ? { x: currentPosition } 
                : { y: currentPosition }
              gsap.set(element, resetPos)
            }
          })
      } else {
        // No scroll - restart idle animation
        startIdleAnimation()
      }

      // Reset updating flag after a delay
      setTimeout(() => {
        isUpdating.current = false
      }, 50)
    }

    // Scroll event handler with improved throttling
    const handleScroll = () => {
      try {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY.current
        
        // Clear previous timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
        
        // Determine scroll direction with threshold
        const threshold = 5 // Slightly higher threshold to reduce sensitivity
        if (Math.abs(delta) > threshold) {
          const newDirection = delta > 0 ? 1 : -1
          
          // Only update animation when direction actually changes
          if (scrollDirection.current !== newDirection) {
            scrollDirection.current = newDirection
            updateAnimation(scrollDirection.current)
          }
        }
        
        // Set timeout to return to idle when scrolling stops
        scrollTimeout.current = setTimeout(() => {
          if (scrollDirection.current !== 0) {
            scrollDirection.current = 0
            startIdleAnimation()
          }
        }, 500) // Wait 500ms after scroll stops
        
        lastScrollY.current = currentScrollY
      } catch (error) {
        console.error('Error in scroll handler:', error)
        // Restart idle animation on error
        startIdleAnimation()
      }
    }

    // Start with a default animation (idle state)
    const startIdleAnimation = () => {
      // Don't restart if already running idle animation
      if (animationRef.current && scrollDirection.current === 0) {
        return
      }

      // Kill any existing animation first
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }

      const duration = 25 // Slightly faster idle animation
      const isHorizontal = direction === 'horizontal'
      const targetPosition = isHorizontal 
        ? { x: -textDimension } // Move by one text width for seamless loop
        : { y: -textDimension }
      
      // Reset position to initial offset
      const resetPosition = direction === 'horizontal' 
        ? { x: -textDimension * 3 } // Back to middle clone
        : { y: -textDimension * 3 }
      gsap.set(element, resetPosition)
      
      animationRef.current = gsap.timeline({ repeat: -1 })
        .to(element, {
          ...targetPosition,
          duration,
          ease: 'none',
          // Remove onComplete to prevent restart
        })
    }

    // Start idle animation after a short delay
    setTimeout(startIdleAnimation, 1000)

    // Recovery mechanism - restart animation if it gets stuck
    const recoveryInterval = setInterval(() => {
      if (!animationRef.current || !animationRef.current.isActive()) {
        startIdleAnimation()
      }
    }, 10000) // Check every 10 seconds to be less aggressive

    // Listen to window scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      clearInterval(recoveryInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, ease, direction])

  return elementRef
}

/**
 * Hook for horizontal scroll-responsive marquee (specialized)
 */
export const useHorizontalScrollMarquee = (config?: Omit<ScrollMarqueeConfig, 'direction'>) => {
  return useScrollResponsiveMarquee({ ...config, direction: 'horizontal' })
}

/**
 * Hook for vertical scroll-responsive marquee (specialized)
 */
export const useVerticalScrollMarquee = (config?: Omit<ScrollMarqueeConfig, 'direction'>) => {
  return useScrollResponsiveMarquee({ ...config, direction: 'vertical' })
} 