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

  const {
    speed = 0.5,
    ease = 'none',
    direction = 'horizontal'
  } = config

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

        // Clone the text for seamless infinite loop
    const originalText = element.textContent || ''
    const separator = config.direction === 'horizontal' ? ' ' : '\n'
    // Create more copies for seamless infinite scroll
    const clonedText = originalText + separator + originalText + separator + originalText + separator + originalText + separator + originalText + separator + originalText + separator + originalText
    element.textContent = clonedText

    // Get the computed dimensions - one complete cycle
    const textDimension = config.direction === 'horizontal'
      ? element.scrollWidth / 7  // Since we have 7 copies now (6 + 1 original)
      : element.scrollHeight / 7

    // Set initial position
    const initialPosition = config.direction === 'horizontal' ? { x: 0 } : { y: 0 }
    gsap.set(element, initialPosition)
    console.log('GSAP initialized for element:', element) // Debug
    console.log('Text dimension:', textDimension) // Debug
    console.log('Config:', config) // Debug

    // Function to update animation based on scroll direction
    const updateAnimation = (scrollDirection: number) => {
      // Prevent too frequent updates
      const now = Date.now()
      if (isUpdating.current || (now - lastUpdateTime.current) < 500) {
        return
      }

      isUpdating.current = true
      lastUpdateTime.current = now

      // Kill previous animation first
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }

      const duration = Math.max(5, 20 / (speed * Math.abs(scrollDirection) + 0.1)) // Minimum 5 seconds
      const isHorizontal = config.direction === 'horizontal'

      console.log('Updating animation:', { scrollDirection, duration, isHorizontal, textDimension }) // Debug

      // Create new animation based on scroll direction
      if (scrollDirection > 0) {
        // Scrolling down - move from right to left
        const targetPosition = isHorizontal 
          ? { x: -textDimension } // Move by one text width for seamless loop
          : { y: -textDimension }
        
        console.log('Creating scroll down animation:', targetPosition) // Debug
        
        animationRef.current = gsap.timeline({ repeat: -1 })
          .to(element, {
            ...targetPosition,
            duration,
            ease,
            // Remove onComplete to prevent restart
          })
      } else if (scrollDirection < 0) {
        // Scrolling up - move from left to right
        const targetPosition = isHorizontal 
          ? { x: textDimension } // Move by one text width for seamless loop
          : { y: textDimension }
        
        console.log('Creating scroll up animation:', targetPosition) // Debug
        
        animationRef.current = gsap.timeline({ repeat: -1 })
          .to(element, {
            ...targetPosition,
            duration,
            ease,
            // Remove onComplete to prevent restart
          })
      } else {
        // No scroll - restart idle animation
        console.log('Restarting idle animation') // Debug
        startIdleAnimation()
      }

      // Reset updating flag after a delay
      setTimeout(() => {
        isUpdating.current = false
      }, 100)
    }

    // Scroll event handler with throttling
    const handleScroll = () => {
      try {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY.current
        
        // Determine scroll direction with threshold
        const threshold = 5 // Increased threshold to reduce sensitivity
        if (Math.abs(delta) > threshold) {
          const newDirection = delta > 0 ? 1 : -1
          
          // Only update if direction actually changed
          if (scrollDirection.current !== newDirection) {
            scrollDirection.current = newDirection
            console.log('Scroll direction:', scrollDirection.current) // Debug
            updateAnimation(scrollDirection.current)
          }
        } else {
          // Only reset to idle if we were actually scrolling
          if (scrollDirection.current !== 0) {
            scrollDirection.current = 0
            console.log('Returning to idle') // Debug
            startIdleAnimation()
          }
        }
        
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

      const duration = 30 // Slower idle animation for smoother effect
      const isHorizontal = config.direction === 'horizontal'
      const targetPosition = isHorizontal 
        ? { x: -textDimension } // Move by one text width for seamless loop
        : { y: -textDimension }
      
      console.log('Starting idle animation:', targetPosition) // Debug
      
      // Reset position first
      gsap.set(element, { x: 0, y: 0 })
      
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
        console.log('Animation stuck detected, restarting...') // Debug
        startIdleAnimation()
      }
    }, 5000) // Check every 5 seconds

    // Listen to window scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
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