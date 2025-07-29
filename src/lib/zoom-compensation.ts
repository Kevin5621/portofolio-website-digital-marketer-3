/**
 * Zoom Compensation Utility Functions
 * Provides helper functions for working with zoom compensation
 */

/**
 * Calculate font size that compensates for zoom level
 */
export const getZoomCompensatedFontSize = (
  baseFontSize: number, 
  zoomLevel: number = 1
): string => {
  const compensationFactor = 1 / zoomLevel
  return `${baseFontSize * compensationFactor}px`
}

/**
 * Calculate rem units that compensate for zoom level
 */
export const getZoomCompensatedRem = (
  baseRem: number, 
  zoomLevel: number = 1
): string => {
  const compensationFactor = 1 / zoomLevel
  return `${baseRem * compensationFactor}rem`
}

/**
 * Calculate spacing that compensates for zoom level
 */
export const getZoomCompensatedSpacing = (
  baseSpacing: number, 
  zoomLevel: number = 1,
  unit: 'px' | 'rem' | 'em' = 'px'
): string => {
  const compensationFactor = 1 / zoomLevel
  return `${baseSpacing * compensationFactor}${unit}`
}

/**
 * Create CSS transform scale that compensates for zoom
 */
export const getZoomCompensatedScale = (
  baseScale: number = 1, 
  zoomLevel: number = 1
): string => {
  const compensationFactor = 1 / zoomLevel
  const finalScale = baseScale * compensationFactor
  return `scale(${finalScale})`
}

/**
 * Get zoom compensation CSS custom properties
 */
export const getZoomCompensationCSS = (zoomLevel: number): Record<string, string> => {
  const compensationFactor = 1 / zoomLevel
  
  return {
    '--zoom-level': zoomLevel.toString(),
    '--zoom-compensation-factor': compensationFactor.toString(),
    '--zoom-compensated-font-size': `${16 * compensationFactor}px`,
  }
}

/**
 * Apply zoom compensation to an element's inline styles
 */
export const applyZoomCompensationToElement = (
  element: HTMLElement, 
  zoomLevel: number
): void => {
  const compensationFactor = 1 / zoomLevel
  
  // Set CSS custom properties
  element.style.setProperty('--zoom-compensation-factor', compensationFactor.toString())
  element.style.setProperty('--zoom-level', zoomLevel.toString())
  
  // Apply transform compensation if element has data-zoom-compensate attribute
  if (element.hasAttribute('data-zoom-compensate')) {
    element.style.transform = `scale(${compensationFactor})`
    element.style.transformOrigin = 'top left'
  }
}

/**
 * Remove zoom compensation from an element
 */
export const removeZoomCompensationFromElement = (element: HTMLElement): void => {
  element.style.removeProperty('--zoom-compensation-factor')
  element.style.removeProperty('--zoom-level')
  element.style.removeProperty('transform')
  element.style.removeProperty('transform-origin')
}

/**
 * Check if browser supports zoom detection
 */
export const supportsZoomDetection = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return (
    'devicePixelRatio' in window ||
    'visualViewport' in window ||
    'matchMedia' in window
  )
}

/**
 * Detect if user is currently zooming (based on rapid zoom changes)
 */
export const isActivelyZooming = (
  currentZoom: number, 
  previousZoom: number, 
  threshold: number = 0.1
): boolean => {
  return Math.abs(currentZoom - previousZoom) > threshold
}

/**
 * Round zoom level to reasonable precision
 */
export const roundZoomLevel = (zoomLevel: number, precision: number = 2): number => {
  return Math.round(zoomLevel * Math.pow(10, precision)) / Math.pow(10, precision)
}

/**
 * Get zoom level category for debugging
 */
export const getZoomCategory = (zoomLevel: number): string => {
  if (zoomLevel < 0.75) return 'Zoomed Out (High)'
  if (zoomLevel < 0.9) return 'Zoomed Out (Medium)'
  if (zoomLevel < 1.1) return 'Normal'
  if (zoomLevel < 1.5) return 'Zoomed In (Medium)'
  if (zoomLevel < 2.0) return 'Zoomed In (High)'
  return 'Zoomed In (Extreme)'
}

/**
 * Create debounced zoom change handler
 */
export const createDebouncedZoomHandler = (
  callback: (zoomLevel: number) => void,
  delay: number = 100
): ((zoomLevel: number) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (zoomLevel: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      callback(zoomLevel)
    }, delay)
  }
}

/**
 * Create throttled zoom change handler
 */
export const createThrottledZoomHandler = (
  callback: (zoomLevel: number) => void,
  delay: number = 16 // ~60fps
): ((zoomLevel: number) => void) => {
  let lastCall = 0
  
  return (zoomLevel: number) => {
    const now = Date.now()
    
    if (now - lastCall >= delay) {
      lastCall = now
      callback(zoomLevel)
    }
  }
}

/**
 * Validate zoom compensation options
 */
export const validateZoomOptions = (options: {
  minZoom?: number
  maxZoom?: number
  debounceDelay?: number
}): { minZoom: number; maxZoom: number; debounceDelay: number } => {
  const minZoom = Math.max(0.1, options.minZoom || 0.5)
  const maxZoom = Math.min(10, options.maxZoom || 3.0)
  const debounceDelay = Math.max(0, Math.min(1000, options.debounceDelay || 100))
  
  if (minZoom >= maxZoom) {
    throw new Error('minZoom must be less than maxZoom')
  }
  
  return { minZoom, maxZoom, debounceDelay }
}

/**
 * Get responsive breakpoint adjusted for zoom
 */
export const getZoomAdjustedBreakpoint = (
  breakpoint: number, 
  zoomLevel: number
): number => {
  return breakpoint * zoomLevel
}

/**
 * Calculate viewport dimensions adjusted for zoom
 */
export const getZoomAdjustedViewport = (zoomLevel: number): {
  width: number
  height: number
  adjustedWidth: number
  adjustedHeight: number
} => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, adjustedWidth: 0, adjustedHeight: 0 }
  }
  
  const width = window.innerWidth
  const height = window.innerHeight
  
  return {
    width,
    height,
    adjustedWidth: width * zoomLevel,
    adjustedHeight: height * zoomLevel,
  }
}

const zoomCompensationUtils = {
  getZoomCompensatedFontSize,
  getZoomCompensatedRem,
  getZoomCompensatedSpacing,
  getZoomCompensatedScale,
  getZoomCompensationCSS,
  applyZoomCompensationToElement,
  removeZoomCompensationFromElement,
  supportsZoomDetection,
  isActivelyZooming,
  roundZoomLevel,
  getZoomCategory,
  createDebouncedZoomHandler,
  createThrottledZoomHandler,
  validateZoomOptions,
  getZoomAdjustedBreakpoint,
  getZoomAdjustedViewport,
}

export default zoomCompensationUtils
