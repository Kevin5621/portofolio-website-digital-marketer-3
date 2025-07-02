import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisConfig } from '@/types'

let lenisInstance: Lenis | null = null

declare global {
  interface Window {
    ScrollTrigger?: typeof ScrollTrigger
  }
}

/**
 * Default Lenis configuration
 */
const defaultConfig: Partial<LenisConfig> = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
}

/**
 * Initialize Lenis smooth scroll
 */
export const initLenis = (config?: Partial<LenisConfig>): Lenis | null => {
  if (typeof window === 'undefined') return null
  
  // Destroy existing instance
  if (lenisInstance) {
    lenisInstance.destroy()
  }
  
  // Create new instance
  lenisInstance = new Lenis({
    ...defaultConfig,
    ...config,
  })
  
  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', () => {
    if (typeof window !== 'undefined' && window.ScrollTrigger) {
      window.ScrollTrigger.update()
    }
  })
  
  // Start the animation loop
  const raf = (time: number) => {
    lenisInstance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  
  return lenisInstance
}

/**
 * Get current Lenis instance
 */
export const getLenis = (): Lenis | null => {
  return lenisInstance
}

/**
 * Scroll to top smoothly
 */
export const scrollToTop = (duration?: number): void => {
  if (!lenisInstance) return
  lenisInstance.scrollTo(0, { duration })
}

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (
  target: string | HTMLElement,
  options?: {
    offset?: number
    duration?: number
    easing?: (t: number) => number
  }
): void => {
  if (!lenisInstance) return
  
  const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
  if (!element) return
  
  lenisInstance.scrollTo(element, {
    offset: options?.offset ?? 0,
    duration: options?.duration,
    easing: options?.easing,
  })
}

/**
 * Scroll to specific position
 */
export const scrollToPosition = (
  position: number,
  options?: {
    duration?: number
    easing?: (t: number) => number
  }
): void => {
  if (!lenisInstance) return
  
  lenisInstance.scrollTo(position, {
    duration: options?.duration,
    easing: options?.easing,
  })
}

/**
 * Start smooth scroll
 */
export const startScroll = (): void => {
  if (!lenisInstance) return
  lenisInstance.start()
}

/**
 * Stop smooth scroll
 */
export const stopScroll = (): void => {
  if (!lenisInstance) return
  lenisInstance.stop()
}

/**
 * Destroy Lenis instance
 */
export const destroyLenis = (): void => {
  if (!lenisInstance) return
  lenisInstance.destroy()
  lenisInstance = null
}

/**
 * Add scroll event listener
 */
export const onScroll = (callback: (e: Lenis) => void): (() => void) | null => {
  if (!lenisInstance) return null
  
  lenisInstance.on('scroll', callback)
  
  // Return cleanup function
  return () => {
    lenisInstance?.off('scroll', callback)
  }
}

/**
 * Get current scroll position
 */
export const getScrollPosition = (): number => {
  if (!lenisInstance) return 0
  return lenisInstance.scroll
}

/**
 * Get scroll direction
 */
export const getScrollDirection = (): number => {
  if (!lenisInstance) return 0
  return lenisInstance.direction
}

/**
 * Check if currently scrolling
 */
export const isScrolling = (): boolean => {
  if (!lenisInstance) return false
  return typeof lenisInstance.isScrolling === 'boolean' ? lenisInstance.isScrolling : false
}

/**
 * Get scroll velocity
 */
export const getScrollVelocity = (): number => {
  if (!lenisInstance) return 0
  return lenisInstance.velocity
}

/**
 * Update Lenis (useful after content changes)
 */
export const updateLenis = (): void => {
  if (!lenisInstance) return
  lenisInstance.resize()
}

/**
 * Custom easing functions for Lenis
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
}

export { Lenis }
