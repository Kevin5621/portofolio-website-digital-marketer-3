'use client'

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { useZoomCompensation } from '@/hooks/useZoomCompensation'

interface ZoomCompensationContextValue {
  zoomLevel: number
  compensationFactor: number
  isCompensating: boolean
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
  resetCompensation: () => void
  forceUpdate: () => void
}

const ZoomCompensationContext = createContext<ZoomCompensationContextValue | null>(null)

interface ZoomCompensationProviderProps {
  children: React.ReactNode
  /** Enable zoom compensation by default (default: true) */
  defaultEnabled?: boolean
  /** Minimum zoom level to compensate (default: 0.5) */
  minZoom?: number
  /** Maximum zoom level to compensate (default: 3.0) */
  maxZoom?: number
  /** Debounce delay for zoom detection in ms (default: 100) */
  debounceDelay?: number
  /** Enable smooth transitions (default: true) */
  smoothTransition?: boolean
  /** Enable debug logging (default: false) */
  debug?: boolean
}

/**
 * Global provider for zoom compensation
 * Manages zoom detection and compensation across the entire application
 */
export const ZoomCompensationProvider: React.FC<ZoomCompensationProviderProps> = ({
  children,
  defaultEnabled = true,
  minZoom = 0.5,
  maxZoom = 3.0,
  debounceDelay = 100,
  smoothTransition = true,
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled)

  const {
    zoomLevel,
    compensationFactor,
    isCompensating,
    resetCompensation,
    forceUpdate,
  } = useZoomCompensation({
    enabled: isEnabled,
    minZoom,
    maxZoom,
    debounceDelay,
    smoothTransition,
  })

  // Add global CSS class to indicate when zoom compensation is active
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (isCompensating && isEnabled) {
      root.classList.add('zoom-compensating')
      root.setAttribute('data-zoom-level', zoomLevel.toFixed(2))
      root.setAttribute('data-compensation-factor', compensationFactor.toFixed(2))
    } else {
      root.classList.remove('zoom-compensating')
      root.removeAttribute('data-zoom-level')
      root.removeAttribute('data-compensation-factor')
    }

    return () => {
      root.classList.remove('zoom-compensating')
      root.removeAttribute('data-zoom-level')
      root.removeAttribute('data-compensation-factor')
    }
  }, [isCompensating, isEnabled, zoomLevel, compensationFactor])

  const contextValue: ZoomCompensationContextValue = useMemo(() => ({
    zoomLevel,
    compensationFactor,
    isCompensating,
    isEnabled,
    setEnabled: setIsEnabled,
    resetCompensation,
    forceUpdate,
  }), [zoomLevel, compensationFactor, isCompensating, isEnabled, resetCompensation, forceUpdate])

  return (
    <ZoomCompensationContext.Provider value={contextValue}>
      {children}
    </ZoomCompensationContext.Provider>
  )
}

/**
 * Hook to access zoom compensation context
 */
export const useZoomCompensationContext = (): ZoomCompensationContextValue => {
  const context = useContext(ZoomCompensationContext)
  
  if (!context) {
    throw new Error(
      'useZoomCompensationContext must be used within a ZoomCompensationProvider'
    )
  }
  
  return context
}

/**
 * Higher-order component for zoom compensation
 */
export const withZoomCompensation = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ZoomCompensationProviderProps, 'children'>
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <ZoomCompensationProvider {...options}>
      <Component {...props} />
    </ZoomCompensationProvider>
  )

  WrappedComponent.displayName = `withZoomCompensation(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

export default ZoomCompensationProvider
