'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations/gsap'
import { AnimationConfig } from '@/types'

/**
 * Hook for GSAP animations with ScrollTrigger
 */
export const useGSAP = (
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  deps: React.DependencyList = []
) => {
  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Kill previous animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    // Create new animation
    animationRef.current = animation(elementRef.current)

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, ...deps])

  return elementRef
}

/**
 * Hook for fade in animation
 */
export const useFadeIn = (config?: Partial<AnimationConfig>) => {
  return useGSAP((element) => {
    gsap.set(element, { opacity: 0, y: 30 })
    
    return gsap.to(element, {
      duration: config?.duration ?? 0.8,
      ease: config?.ease ?? 'power2.out',
      opacity: 1,
      y: 0,
      delay: config?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

/**
 * Hook for slide up animation
 */
export const useSlideUp = (config?: Partial<AnimationConfig>) => {
  return useGSAP((element) => {
    gsap.set(element, { opacity: 0, y: 100 })
    
    return gsap.to(element, {
      duration: config?.duration ?? 1,
      ease: config?.ease ?? 'power3.out',
      opacity: 1,
      y: 0,
      delay: config?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

/**
 * Hook for scale animation
 */
export const useScaleIn = (config?: Partial<AnimationConfig>) => {
  return useGSAP((element) => {
    gsap.set(element, { opacity: 0, scale: 0.8 })
    
    return gsap.to(element, {
      duration: config?.duration ?? 0.8,
      ease: config?.ease ?? 'back.out(1.7)',
      opacity: 1,
      scale: 1,
      delay: config?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

/**
 * Hook for stagger animations
 */
export const useStagger = (
  selector: string,
  config?: Partial<AnimationConfig>
) => {
  return useGSAP((element) => {
    const children = element.querySelectorAll(selector)
    
    gsap.set(children, { opacity: 0, y: 30 })
    
    return gsap.to(children, {
      duration: config?.duration ?? 0.6,
      ease: config?.ease ?? 'power2.out',
      opacity: 1,
      y: 0,
      stagger: config?.stagger ?? 0.1,
      delay: config?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

/**
 * Hook for parallax effect
 */
export const useParallax = (speed: number = 0.5) => {
  return useGSAP((element) => {
    return gsap.to(element, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

/**
 * Hook for text reveal animation
 */
export const useTextReveal = (config?: Partial<AnimationConfig>) => {
  return useGSAP((element) => {
    // Split text into characters
    const text = element.textContent ?? ''
    element.innerHTML = text
      .split('')
      .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')
    
    const chars = element.querySelectorAll('.char')
    
    gsap.set(chars, { opacity: 0, y: 100, rotationX: -90 })
    
    return gsap.to(chars, {
      duration: config?.duration ?? 0.8,
      ease: config?.ease ?? 'back.out(1.7)',
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: config?.stagger ?? 0.02,
      delay: config?.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

/**
 * Hook for hover animations
 */
export const useHover = (
  hoverConfig: Record<string, unknown> = {},
  leaveConfig: Record<string, unknown> = {}
) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

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

    const handleMouseEnter = () => {
      gsap.to(element, { ...defaultHover, ...hoverConfig })
    }

    const handleMouseLeave = () => {
      gsap.to(element, { ...defaultLeave, ...leaveConfig })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hoverConfig, leaveConfig])

  return elementRef
}
