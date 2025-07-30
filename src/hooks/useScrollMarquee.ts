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
    speed = 1.0, // Increased default speed for better performance
    ease = 'none',
    direction = 'horizontal'
  } = config

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Store original text and create dynamic clone system
    const originalText = element.textContent || ''
    const separator = direction === 'horizontal' ? ' ' : '\n'
    
    // Calculate optimal clone count based on viewport and text size
    const calculateOptimalCloneCount = (): number => {
      // Create a temporary element to measure text dimensions
      const tempElement = element.cloneNode(true) as HTMLElement
      tempElement.textContent = originalText
      tempElement.style.position = 'absolute'
      tempElement.style.visibility = 'hidden'
      tempElement.style.whiteSpace = 'nowrap'
      document.body.appendChild(tempElement)
      
      const textSize = direction === 'horizontal' 
        ? tempElement.offsetWidth 
        : tempElement.offsetHeight
      const viewportSize = direction === 'horizontal' 
        ? window.innerWidth 
        : window.innerHeight
      
      document.body.removeChild(tempElement)
      
      // Ensure enough clones to cover viewport + buffer for smooth scrolling
      // Minimum 5 clones, but scale with viewport/text ratio
      return Math.max(5, Math.ceil((viewportSize * 3) / textSize))
    }
    
    const cloneCount = calculateOptimalCloneCount()
    const clones = Array(cloneCount).fill(originalText).join(separator)
    element.textContent = clones

    // Get the computed dimensions - single text unit size
    const singleTextDimension = direction === 'horizontal'
      ? element.scrollWidth / cloneCount
      : element.scrollHeight / cloneCount

    // Set initial position to allow seamless movement in both directions
    const initialOffset = direction === 'horizontal' 
      ? { x: -singleTextDimension * Math.floor(cloneCount / 2) }
      : { y: -singleTextDimension * Math.floor(cloneCount / 2) }
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

      // Use user-defined speed for responsive animation
      const duration = (1 / speed) * 10 // Convert speed to duration (higher speed = lower duration)
      const isHorizontal = direction === 'horizontal'

      // Get current position to ensure smooth transitions
      const currentPosition = isHorizontal 
        ? gsap.getProperty(element, 'x') as number
        : gsap.getProperty(element, 'y') as number

      // Create infinite seamless animation with modular position reset
      const createInfiniteAnimation = (moveDirection: number) => {
        const targetDistance = singleTextDimension * moveDirection
        const targetPosition = isHorizontal 
          ? { x: currentPosition + targetDistance }
          : { y: currentPosition + targetDistance }
        
        animationRef.current = gsap.timeline({ repeat: -1 })
          .to(element, {
            ...targetPosition,
            duration,
            ease,
            onComplete: () => {
              // Seamless position reset using modular arithmetic
              const currentPos = isHorizontal 
                ? gsap.getProperty(element, 'x') as number
                : gsap.getProperty(element, 'y') as number
              
              // Calculate new position within the clone range
              const totalRange = singleTextDimension * cloneCount
              const minPos = -totalRange + singleTextDimension
              const maxPos = 0
              
              let newPos = currentPos
              if (moveDirection < 0 && currentPos < minPos) {
                // Reset to rightmost position
                newPos = currentPos + singleTextDimension
              } else if (moveDirection > 0 && currentPos > maxPos) {
                // Reset to leftmost position  
                newPos = currentPos - singleTextDimension
              }
              
              const resetPos = isHorizontal 
                ? { x: newPos } 
                : { y: newPos }
              gsap.set(element, resetPos)
            }
          })
      }

      // Create new animation based on scroll direction
      if (scrollDirection > 0) {
        // Scrolling down - move from right to left (negative direction)
        createInfiniteAnimation(-1)
      } else if (scrollDirection < 0) {
        // Scrolling up - move from left to right (positive direction)
        createInfiniteAnimation(1)
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

      // Use user-defined speed for idle animation (slightly slower for smooth idle)
      const duration = (1 / speed) * 15 // Idle animation slightly slower than scroll animation
      const isHorizontal = direction === 'horizontal'
      
      // Create seamless infinite loop for idle state
      const createIdleLoop = () => {
        const currentPos = isHorizontal 
          ? gsap.getProperty(element, 'x') as number
          : gsap.getProperty(element, 'y') as number
        
        const targetPosition = isHorizontal 
          ? { x: currentPos - singleTextDimension }
          : { y: currentPos - singleTextDimension }
        
        animationRef.current = gsap.timeline({ repeat: -1 })
          .to(element, {
            ...targetPosition,
            duration,
            ease: 'none',
            onComplete: () => {
              // Seamless reset using modular position
              const newCurrentPos = isHorizontal 
                ? gsap.getProperty(element, 'x') as number
                : gsap.getProperty(element, 'y') as number
              
              // Calculate position within clone range
              const totalRange = singleTextDimension * cloneCount
              const minPos = -totalRange + singleTextDimension
              
              if (newCurrentPos < minPos) {
                const resetPos = isHorizontal 
                  ? { x: newCurrentPos + singleTextDimension }
                  : { y: newCurrentPos + singleTextDimension }
                gsap.set(element, resetPos)
              }
            }
          })
      }
      
      createIdleLoop()
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