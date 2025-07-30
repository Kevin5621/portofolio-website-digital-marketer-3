import { useRef, useEffect } from 'react'
import { getLenis } from '@/lib/animations/lenis'

interface UseParallaxOptions {
  speed?: number // Kecepatan parallax (0 = tidak bergerak, 1 = bergerak normal, 0.5 = setengah kecepatan)
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
}

export const useParallax = <T extends HTMLElement>(
  options: UseParallaxOptions = {}
) => {
  const ref = useRef<T>(null)
  
  const {
    speed = 0.5, // Default 50% kecepatan scroll normal
    direction = 'up',
    offset = 0
  } = options

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const lenis = getLenis()

    const updateParallax = (scrollY: number) => {
      // Terapkan transform berdasarkan direction dan speed
      let transform = ''
      
      switch (direction) {
        case 'up':
          transform = `translateY(${scrollY * speed + offset}px)`
          break
        case 'down':
          transform = `translateY(${-scrollY * speed + offset}px)`
          break
        case 'left':
          transform = `translateX(${scrollY * speed + offset}px)`
          break
        case 'right':
          transform = `translateX(${-scrollY * speed + offset}px)`
          break
      }

      element.style.transform = transform
    }

    if (lenis) {
      // Use Lenis for smooth scrolling
      const handleLenisScroll = (e: { scroll: number }) => {
        updateParallax(e.scroll)
      }
      
      lenis.on('scroll', handleLenisScroll)
      
      return () => {
        lenis.off('scroll', handleLenisScroll)
      }
    } else {
      // Fallback to window scroll
      const handleWindowScroll = () => {
        updateParallax(window.scrollY)
      }
      
      window.addEventListener('scroll', handleWindowScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', handleWindowScroll)
      }
    }
  }, [speed, direction, offset])

  return ref
} 