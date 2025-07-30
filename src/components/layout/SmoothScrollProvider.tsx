'use client'

import { useLenis } from '@/hooks/useLenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  // Initialize Lenis with custom configuration - Lebih berat
  useLenis({
    duration: 2.0, // Durasi lebih lama untuk scroll yang lebih berat
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)), // Easing yang lebih berat
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8, // Mouse scroll lebih lambat
    smoothTouch: true, // Enable smooth touch
    touchMultiplier: 1.5, // Touch scroll lebih lambat
    infinite: false,
  })

  return <>{children}</>
}
