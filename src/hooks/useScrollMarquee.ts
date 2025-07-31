'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations/gsap'

interface ScrollMarqueeConfig {
  speed?: number
  ease?: string
  direction?: 'horizontal' | 'vertical'
  defaultDirection?: 'left' | 'right' | 'up' | 'down'
}

/**
 * Hook for scroll-responsive infinite scrolling text animation
 * Text moves left when scrolling down, right when scrolling up
 */
export const useScrollResponsiveMarquee = <T extends HTMLElement = HTMLElement>(
  config: ScrollMarqueeConfig = {}
): React.RefObject<T | null> => {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const scrollDirection = useRef(0)
  const lastScrollY = useRef(0)
  const lastUpdateTime = useRef(0)
  const isUpdating = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null)
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null)

  const {
    speed = 1.0, // Increased default speed for better performance
    ease = 'none',
    direction = 'horizontal',
    defaultDirection = 'left' // Default direction for idle animation
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
      
      // Ensure enough clones for true infinite scroll
      // Calculate clones needed to cover viewport + generous buffer for seamless scrolling
      if (textSize <= 0) {
        return 10 // Fallback for edge cases
      }
      
      // For infinite scroll, we need at least enough clones to cover:
      // - Current viewport
      // - Movement buffer (2x viewport for smooth bidirectional scroll)
      // - Reset buffer (additional space for seamless position reset)
      const baseClones = Math.ceil((viewportSize * 4) / textSize)
      
      // Minimum clones must be enough for smooth infinite effect
      // For very long text (text > viewport), need at least 3 clones
      // For short text, need more clones to fill space
      const minClones = textSize > viewportSize ? 3 : 8
      
      return Math.max(minClones, baseClones)
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
      if (isUpdating.current || (now - lastUpdateTime.current) < 150) {
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

      // Reset updating flag after a delay with proper error handling
      setTimeout(() => {
        try {
          isUpdating.current = false
        } catch (error) {
          console.error('Error resetting updating flag:', error)
          isUpdating.current = false
        }
      }, 100)
    }

    // Enhanced scroll event handler with proper throttling
    const handleScroll = () => {
      // Clear existing throttle timeout
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current)
      }
      
      // Throttle scroll events to improve performance
      throttleTimeout.current = setTimeout(() => {
        try {
          const currentScrollY = window.scrollY
          const delta = currentScrollY - lastScrollY.current
          
          // Clear previous timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
          }
          
          // Determine scroll direction with threshold
          const threshold = 8 // Increased threshold to reduce sensitivity and improve performance
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
          }, 600) // Increased to 600ms for better performance
          
          lastScrollY.current = currentScrollY
        } catch (error) {
          console.error('Error in scroll handler:', error)
          // Reset states and restart idle animation on error
          scrollDirection.current = 0
          isUpdating.current = false
          startIdleAnimation()
        }
      }, 16) // 60fps throttling - approximately 16ms
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
        
        // Determine movement direction based on defaultDirection
        let moveDirection = -1 // Default: left (negative)
        if (isHorizontal) {
          if (defaultDirection === 'right') {
            moveDirection = 1
          }
        } else {
          if (defaultDirection === 'down') {
            moveDirection = 1
          }
        }
        
        const targetPosition = isHorizontal 
          ? { x: currentPos + (singleTextDimension * moveDirection) }
          : { y: currentPos + (singleTextDimension * moveDirection) }
        
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
              const maxPos = 0
              
              let newPos = newCurrentPos
              if (moveDirection < 0 && newCurrentPos < minPos) {
                // Reset to rightmost position when moving left
                newPos = newCurrentPos + singleTextDimension
              } else if (moveDirection > 0 && newCurrentPos > maxPos) {
                // Reset to leftmost position when moving right
                newPos = newCurrentPos - singleTextDimension
              }
              
              const resetPos = isHorizontal 
                ? { x: newPos }
                : { y: newPos }
              gsap.set(element, resetPos)
            }
          })
      }
      
      createIdleLoop()
    }

    // Start idle animation after a short delay
    setTimeout(startIdleAnimation, 1000)

    // Handle window resize to recalculate clones if needed
    const handleResize = () => {
      try {
        const newCloneCount = calculateOptimalCloneCount()
        if (newCloneCount !== cloneCount) {
          // Recalculate and update clones if viewport significantly changed
          const newClones = Array(newCloneCount).fill(originalText).join(separator)
          element.textContent = newClones
          
          // Reset position
          const newSingleTextDimension = direction === 'horizontal'
            ? element.scrollWidth / newCloneCount
            : element.scrollHeight / newCloneCount
          
          const newInitialOffset = direction === 'horizontal' 
            ? { x: -newSingleTextDimension * Math.floor(newCloneCount / 2) }
            : { y: -newSingleTextDimension * Math.floor(newCloneCount / 2) }
          gsap.set(element, newInitialOffset)
          
          // Restart animation
          if (animationRef.current) {
            animationRef.current.kill()
            animationRef.current = null
          }
          startIdleAnimation()
        }
      } catch (error) {
        console.error('Error handling resize:', error)
      }
    }

    // Debounced resize handler for performance
    const debouncedResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      resizeTimeout.current = setTimeout(handleResize, 300)
    }

    // Recovery mechanism - restart animation if it gets stuck
    const recoveryInterval = setInterval(() => {
      try {
        if (!animationRef.current || !animationRef.current.isActive()) {
          startIdleAnimation()
        }
      } catch (error) {
        console.error('Error in recovery mechanism:', error)
        // Force restart on recovery errors
        if (animationRef.current) {
          animationRef.current.kill()
          animationRef.current = null
        }
        startIdleAnimation()
      }
    }, 15000) // Increased to 15 seconds to be less aggressive on performance

    // Listen to events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', debouncedResize, { passive: true })

    // Enhanced cleanup function
    return () => {
      try {
        // Kill animation
        if (animationRef.current) {
          animationRef.current.kill()
          animationRef.current = null
        }
        
        // Clear all timeouts
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
          scrollTimeout.current = null
        }
        
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current)
          throttleTimeout.current = null
        }
        
        // Clear recovery interval
        clearInterval(recoveryInterval)
        
        // Remove event listeners
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', debouncedResize)
        
        // Clear resize timeout
        if (resizeTimeout.current) {
          clearTimeout(resizeTimeout.current)
        }
        
        // Reset state flags
        isUpdating.current = false
        scrollDirection.current = 0
      } catch (error) {
        console.error('Error during cleanup:', error)
      }
    }
  }, [speed, ease, direction, defaultDirection])

  return elementRef
}

/**
 * Hook for horizontal scroll-responsive marquee (specialized)
 */
export const useHorizontalScrollMarquee = <T extends HTMLElement = HTMLHeadingElement>(
  config?: Omit<ScrollMarqueeConfig, 'direction'>
) => {
  return useScrollResponsiveMarquee<T>({ ...config, direction: 'horizontal' })
}

/**
 * Hook for vertical scroll-responsive marquee (specialized)
 */
export const useVerticalScrollMarquee = <T extends HTMLElement = HTMLElement>(
  config?: Omit<ScrollMarqueeConfig, 'direction'>
) => {
  return useScrollResponsiveMarquee<T>({ ...config, direction: 'vertical' })
} 