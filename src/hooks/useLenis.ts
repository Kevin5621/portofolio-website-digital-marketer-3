'use client'

import { useEffect, useRef, useCallback } from 'react'
import { initLenis, destroyLenis, getLenis } from '@/lib/animations/lenis'
import { LenisConfig } from '@/types'
import Lenis from 'lenis'

/**
 * Hook to initialize and manage Lenis smooth scroll
 */
export const useLenis = (config?: Partial<LenisConfig>) => {
  const lenisRef = useRef<ReturnType<typeof initLenis>>(null)

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = initLenis(config)

    return () => {
      // Cleanup on unmount
      destroyLenis()
    }
  }, [config])

  return lenisRef.current
}

/**
 * Hook to get current Lenis instance
 */
export const useCurrentLenis = () => {
  return getLenis()
}

/**
 * Hook for scroll-triggered callbacks
 */
export const useScrollCallback = (
  callback: (scrollY: number, direction: number, velocity: number) => void,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const handleScroll = (e: Lenis) => {
      callback(e.scroll, e.direction, e.velocity)
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps])
}

/**
 * Hook to track scroll position
 */
export const useScrollPosition = () => {
  const scrollY = useRef(0)
  const direction = useRef(0)
  const velocity = useRef(0)

  useScrollCallback((y, dir, vel) => {
    scrollY.current = y
    direction.current = dir
    velocity.current = vel
  })

  return { scrollY: scrollY.current, direction: direction.current, velocity: velocity.current }
}

/**
 * Hook for scroll-based animations
 */
export const useScrollAnimation = (
  element: React.RefObject<HTMLElement>,
  animationCallback: (progress: number, scrollY: number) => void,
  options?: {
    start?: number
    end?: number
  }
) => {
  const animationCallbackRef = useCallback(animationCallback, [animationCallback])

  useEffect(() => {
    const el = element.current
    if (!el) return

    const { start = 0, end = window.innerHeight } = options ?? {}

    const handleScroll = (scrollY: number) => {
      const elementTop = el.offsetTop
      const elementHeight = el.offsetHeight
      const windowHeight = window.innerHeight

      const elementStart = elementTop - windowHeight + start
      const elementEnd = elementTop + elementHeight - end

      if (scrollY >= elementStart && scrollY <= elementEnd) {
        const progress = (scrollY - elementStart) / (elementEnd - elementStart)
        animationCallbackRef(Math.max(0, Math.min(1, progress)), scrollY)
      }
    }

    const lenis = getLenis()
    if (!lenis) return

    const scrollHandler = (e: Lenis) => {
      handleScroll(e.scroll)
    }

    lenis.on('scroll', scrollHandler)

    return () => {
      lenis.off('scroll', scrollHandler)
    }
  }, [element, animationCallbackRef, options])
}

/**
 * Hook for revealing elements on scroll
 */
export const useScrollReveal = (
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const elementRef = useRef<HTMLElement>(null)
  const isVisible = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true
          element.classList.add('revealed')
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return { elementRef, isVisible: isVisible.current }
}

/**
 * Hook for smooth scrolling to elements
 */
export const useSmoothScroll = () => {
  const scrollTo = useCallback((target: string | HTMLElement, options?: {
    offset?: number
    duration?: number
  }) => {
    const lenis = getLenis()
    if (!lenis) return

    const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
    if (!element) return

    lenis.scrollTo(element, {
      offset: options?.offset ?? 0,
      duration: options?.duration,
    })
  }, [])

  const scrollToTop = useCallback((duration?: number) => {
    const lenis = getLenis()
    if (!lenis) return

    lenis.scrollTo(0, { duration })
  }, [])

  const scrollToPosition = useCallback((position: number, duration?: number) => {
    const lenis = getLenis()
    if (!lenis) return

    lenis.scrollTo(position, { duration })
  }, [])

  return { scrollTo, scrollToTop, scrollToPosition }
}

/**
 * Hook for disabling/enabling scroll
 */
export const useScrollControl = () => {
  const disableScroll = useCallback(() => {
    const lenis = getLenis()
    if (!lenis) return

    lenis.stop()
    document.body.style.overflow = 'hidden'
  }, [])

  const enableScroll = useCallback(() => {
    const lenis = getLenis()
    if (!lenis) return

    lenis.start()
    document.body.style.overflow = ''
  }, [])

  return { disableScroll, enableScroll }
}

/**
 * Hook for scroll progress indicator
 */
export const useScrollProgress = () => {
  const progress = useRef(0)

  useScrollCallback((scrollY) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    progress.current = Math.max(0, Math.min(1, scrollY / maxScroll))
  })

  return progress.current
}
