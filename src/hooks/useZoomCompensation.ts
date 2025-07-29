'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ZoomCompensationOptions {
  /** Enable/disable zoom compensation (default: true) */
  enabled?: boolean
  /** Minimum zoom level to compensate (default: 0.5) */
  minZoom?: number
  /** Maximum zoom level to compensate (default: 3.0) */
  maxZoom?: number
  /** Debounce delay for zoom detection in ms (default: 100) */
  debounceDelay?: number
  /** Enable smooth transitions (default: true) */
  smoothTransition?: boolean
  /** Callback when zoom level changes */
  onZoomChange?: (zoomLevel: number, compensationFactor: number) => void
}

interface ZoomState {
  zoomLevel: number
  compensationFactor: number
  isCompensating: boolean
}

/**
 * Custom hook for browser zoom compensation
 * Detects browser zoom level and applies global compensation via root font-size
 */
export const useZoomCompensation = (options: ZoomCompensationOptions = {}) => {
  const {
    enabled = true,
    minZoom = 0.5,
    maxZoom = 3.0,
    debounceDelay = 100,
    smoothTransition = true,
    onZoomChange,
  } = options

  const zoomStateRef = useRef<ZoomState>({
    zoomLevel: 1,
    compensationFactor: 1,
    isCompensating: false,
  })

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  /**
   * Detect current browser zoom level using multiple methods
   */
  const detectZoomLevel = useCallback((): number => {
    // Method 1: Using devicePixelRatio (most reliable for modern browsers)
    if (typeof window !== 'undefined') {
      // Get the zoom level from device pixel ratio
      const screenZoom = window.devicePixelRatio || 1
      
      // Method 2: Compare logical and physical pixels
      const windowZoom = window.outerWidth / window.innerWidth
      
      // Method 3: Use visual viewport if available (for mobile browsers)
      const visualViewportZoom = window.visualViewport 
        ? window.visualViewport.scale || 1 
        : 1

      // Use the most reliable method based on browser support
      let zoomLevel = screenZoom

      // Fallback to window ratio method if devicePixelRatio seems unreliable
      if (Math.abs(screenZoom - 1) < 0.01 && windowZoom > 0) {
        zoomLevel = 1 / windowZoom
      }

      // Apply visual viewport zoom for mobile devices
      if (visualViewportZoom !== 1) {
        zoomLevel *= visualViewportZoom
      }

      // Clamp zoom level to reasonable bounds
      return Math.max(minZoom, Math.min(maxZoom, zoomLevel))
    }

    return 1
  }, [minZoom, maxZoom])

  /**
   * Calculate compensation factor based on zoom level
   */
  const calculateCompensationFactor = useCallback((zoomLevel: number): number => {
    // Inverse relationship: if zoom is 2x, compensation should be 0.5x
    return 1 / zoomLevel
  }, [])

  /**
   * Apply zoom compensation to the document root
   */
  const applyZoomCompensation = useCallback((compensationFactor: number, smooth: boolean = true) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    
    // Apply transition for smooth scaling
    if (smooth && smoothTransition) {
      root.style.transition = 'font-size 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    } else {
      root.style.transition = 'none'
    }

    // Set the root font-size to compensate for zoom
    // Using 16px as base font size (1rem = 16px)
    const baseFontSize = 16
    const compensatedFontSize = baseFontSize * compensationFactor
    
    root.style.fontSize = `${compensatedFontSize}px`

    // Add a CSS custom property for advanced use cases
    root.style.setProperty('--zoom-compensation-factor', compensationFactor.toString())
    root.style.setProperty('--zoom-level', (1 / compensationFactor).toString())

    // Clean up transition after animation
    if (smooth && smoothTransition) {
      setTimeout(() => {
        if (root.style.transition) {
          root.style.transition = ''
        }
      }, 200)
    }
  }, [smoothTransition])

  /**
   * Handle zoom level changes with debouncing
   */
  const handleZoomChange = useCallback(() => {
    if (!enabled) return

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Debounce zoom detection
    debounceTimerRef.current = setTimeout(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const newZoomLevel = detectZoomLevel()
        const newCompensationFactor = calculateCompensationFactor(newZoomLevel)

        // Only update if there's a meaningful change (avoid micro-adjustments)
        const threshold = 0.01
        if (Math.abs(newZoomLevel - zoomStateRef.current.zoomLevel) > threshold) {
          zoomStateRef.current = {
            zoomLevel: newZoomLevel,
            compensationFactor: newCompensationFactor,
            isCompensating: newZoomLevel !== 1,
          }

          applyZoomCompensation(newCompensationFactor)

          // Call callback if provided
          onZoomChange?.(newZoomLevel, newCompensationFactor)
        }
      })
    }, debounceDelay)
  }, [enabled, detectZoomLevel, calculateCompensationFactor, applyZoomCompensation, debounceDelay, onZoomChange])

  /**
   * Reset zoom compensation
   */
  const resetCompensation = useCallback(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    root.style.fontSize = ''
    root.style.removeProperty('--zoom-compensation-factor')
    root.style.removeProperty('--zoom-level')
    root.style.transition = ''

    zoomStateRef.current = {
      zoomLevel: 1,
      compensationFactor: 1,
      isCompensating: false,
    }
  }, [])

  /**
   * Initialize zoom compensation
   */
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Initial zoom detection and compensation
    handleZoomChange()

    // Event listeners for zoom changes
    const events = [
      'resize',
      'orientationchange',
      'zoom',
      'devicePixelRatioChange',
    ] as const

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleZoomChange, { passive: true })
    })

    // Listen for visual viewport changes (mobile)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleZoomChange, { passive: true })
    }

    // Observe devicePixelRatio changes using MediaQuery
    let mediaQuery: MediaQueryList | null = null
    if (window.matchMedia) {
      mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleZoomChange)
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleZoomChange)
      }
    }

    // Cleanup function
    return () => {
      // Clear timers
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Remove event listeners
      events.forEach(event => {
        window.removeEventListener(event, handleZoomChange)
      })

      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleZoomChange)
      }

      if (mediaQuery) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleZoomChange)
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleZoomChange)
        }
      }

      // Reset compensation when component unmounts
      resetCompensation()
    }
  }, [enabled, handleZoomChange, resetCompensation])

  // Return current zoom state and utility functions
  return {
    zoomLevel: zoomStateRef.current.zoomLevel,
    compensationFactor: zoomStateRef.current.compensationFactor,
    isCompensating: zoomStateRef.current.isCompensating,
    resetCompensation,
    forceUpdate: handleZoomChange,
  }
}

export default useZoomCompensation
