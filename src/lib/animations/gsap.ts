import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { AnimationConfig, ParallaxConfig } from '@/types'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
  
  // Register MorphSVG only if you have a license
  // import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
  // gsap.registerPlugin(MorphSVGPlugin)
}

/**
 * Default animation configurations
 */
export const defaultAnimations = {
  fadeIn: {
    duration: 0.8,
    ease: 'power2.out',
    opacity: 1,
    y: 0,
  },
  slideUp: {
    duration: 1,
    ease: 'power3.out',
    y: 0,
    opacity: 1,
  },
  slideDown: {
    duration: 1,
    ease: 'power3.out',
    y: 0,
    opacity: 1,
  },
  slideLeft: {
    duration: 1,
    ease: 'power3.out',
    x: 0,
    opacity: 1,
  },
  slideRight: {
    duration: 1,
    ease: 'power3.out',
    x: 0,
    opacity: 1,
  },
  scale: {
    duration: 0.8,
    ease: 'back.out(1.7)',
    scale: 1,
    opacity: 1,
  },
  stagger: {
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
  },
}

/**
 * Create fade in animation
 */
export const fadeIn = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  gsap.set(element, { opacity: 0, y: 30 })
  
  return tl.to(element, {
    ...defaultAnimations.fadeIn,
    ...config,
  })
}

/**
 * Create slide up animation
 */
export const slideUp = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  gsap.set(element, { opacity: 0, y: 100 })
  
  return tl.to(element, {
    ...defaultAnimations.slideUp,
    ...config,
  })
}

/**
 * Create slide down animation
 */
export const slideDown = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  gsap.set(element, { opacity: 0, y: -100 })
  
  return tl.to(element, {
    ...defaultAnimations.slideDown,
    ...config,
  })
}

/**
 * Create slide left animation
 */
export const slideLeft = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  gsap.set(element, { opacity: 0, x: 100 })
  
  return tl.to(element, {
    ...defaultAnimations.slideLeft,
    ...config,
  })
}

/**
 * Create slide right animation
 */
export const slideRight = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  gsap.set(element, { opacity: 0, x: -100 })
  
  return tl.to(element, {
    ...defaultAnimations.slideRight,
    ...config,
  })
}

/**
 * Create scale animation
 */
export const scaleIn = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  gsap.set(element, { opacity: 0, scale: 0.8 })
  
  return tl.to(element, {
    ...defaultAnimations.scale,
    ...config,
  })
}

/**
 * Create stagger animation for multiple elements
 */
export const staggerAnimation = (
  elements: string | Element[],
  animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' = 'fadeIn',
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  // Set initial states based on animation type
  switch (animationType) {
    case 'slideUp':
      gsap.set(elements, { opacity: 0, y: 100 })
      break
    case 'slideLeft':
      gsap.set(elements, { opacity: 0, x: 100 })
      break
    case 'slideRight':
      gsap.set(elements, { opacity: 0, x: -100 })
      break
    case 'scale':
      gsap.set(elements, { opacity: 0, scale: 0.8 })
      break
    default:
      gsap.set(elements, { opacity: 0, y: 30 })
  }
  
  const animation = {
    ...defaultAnimations[animationType],
    ...defaultAnimations.stagger,
    ...config,
  }
  
  return tl.to(elements, animation)
}

/**
 * Create parallax scrolling effect
 */
export const createParallax = (
  element: string | Element,
  config: ParallaxConfig
): ScrollTrigger => {
  const { speed, direction, trigger } = config
  
  let transform: Record<string, number> = {}
  
  switch (direction) {
    case 'up':
      transform = { yPercent: -speed * 100 }
      break
    case 'down':
      transform = { yPercent: speed * 100 }
      break
    case 'left':
      transform = { xPercent: -speed * 100 }
      break
    case 'right':
      transform = { xPercent: speed * 100 }
      break
  }
  
  return ScrollTrigger.create({
    trigger: trigger || element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to(element, transform),
  })
}

/**
 * Create text reveal animation
 */
export const textReveal = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline()
  
  // Wrap each character in a span
  const target = typeof element === 'string' ? document.querySelector(element) : element
  if (!target) return tl
  
  const text = target.textContent || ''
  target.innerHTML = text
    .split('')
    .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('')
  
  const chars = target.querySelectorAll('.char')
  
  gsap.set(chars, { opacity: 0, y: 100, rotationX: -90 })
  
  return tl.to(chars, {
    duration: 0.8,
    ease: 'back.out(1.7)',
    opacity: 1,
    y: 0,
    rotationX: 0,
    stagger: 0.02,
    ...config,
  })
}

/**
 * Create hover animation
 */
export const createHoverAnimation = (
  element: string | Element,
  hoverConfig: Record<string, unknown> = {},
  leaveConfig: Record<string, unknown> = {}
): void => {
  const target = typeof element === 'string' ? document.querySelector(element) : element
  if (!target) return
  
  const defaultHover = {
    duration: 0.3,
    ease: 'power2.out',
    scale: 1.05,
    y: -5,
  }
  
  const defaultLeave = {
    duration: 0.3,
    ease: 'power2.out',
    scale: 1,
    y: 0,
  }
  
  target.addEventListener('mouseenter', () => {
    gsap.to(target, { ...defaultHover, ...hoverConfig })
  })
  
  target.addEventListener('mouseleave', () => {
    gsap.to(target, { ...defaultLeave, ...leaveConfig })
  })
}

/**
 * Create loading animation
 */
export const createLoadingAnimation = (): gsap.core.Timeline => {
  const tl = gsap.timeline({ repeat: -1 })
  
  return tl
    .to('.loading-dot-1', { duration: 0.6, y: -20, ease: 'power2.out' })
    .to('.loading-dot-1', { duration: 0.6, y: 0, ease: 'power2.in' })
    .to('.loading-dot-2', { duration: 0.6, y: -20, ease: 'power2.out' }, '-=0.4')
    .to('.loading-dot-2', { duration: 0.6, y: 0, ease: 'power2.in' })
    .to('.loading-dot-3', { duration: 0.6, y: -20, ease: 'power2.out' }, '-=0.4')
    .to('.loading-dot-3', { duration: 0.6, y: 0, ease: 'power2.in' })
}

/**
 * Create page transition animation
 */
export const pageTransition = {
  enter: (element: string | Element): gsap.core.Timeline => {
    const tl = gsap.timeline()
    
    gsap.set(element, { opacity: 0, y: 50 })
    
    return tl.to(element, {
      duration: 0.8,
      ease: 'power3.out',
      opacity: 1,
      y: 0,
    })
  },
  
  exit: (element: string | Element): gsap.core.Timeline => {
    const tl = gsap.timeline()
    
    return tl.to(element, {
      duration: 0.5,
      ease: 'power3.in',
      opacity: 0,
      y: -50,
    })
  },
}

/**
 * Kill all GSAP animations and ScrollTriggers
 */
export const killAllAnimations = (): void => {
  gsap.killTweensOf('*')
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

/**
 * Refresh ScrollTrigger (useful after content changes)
 */
export const refreshScrollTrigger = (): void => {
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger }
