'use client'

import React from 'react'
import { useZoomCompensationContext } from '@/components/layout/ZoomCompensationProvider'

interface ZoomDebugPanelProps {
  className?: string
}

/**
 * Debug panel component for monitoring zoom compensation
 * Remove this component in production builds
 */
export const ZoomDebugPanel: React.FC<ZoomDebugPanelProps> = ({ 
  className = '' 
}) => {
  const { 
    zoomLevel, 
    compensationFactor, 
    isCompensating, 
    isEnabled, 
    setEnabled,
    resetCompensation,
    forceUpdate 
  } = useZoomCompensationContext()

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div 
      className={`fixed bottom-4 left-4 bg-gray-900 text-[#F2F1EF] p-4 rounded-lg shadow-lg font-mono text-sm max-w-xs z-50 ${className}`}
      style={{ fontSize: '12px' }}
    >
      <div className="mb-3">
        <h3 className="font-bold text-green-400 mb-2">Zoom Compensation Debug</h3>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-300">Zoom Level:</span>
            <span className={isCompensating ? 'text-yellow-400' : 'text-green-400'}>
              {zoomLevel.toFixed(3)}x
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Compensation:</span>
            <span className="text-blue-400">
              {compensationFactor.toFixed(3)}x
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Status:</span>
            <span className={isCompensating ? 'text-yellow-400' : 'text-green-400'}>
              {isCompensating ? 'Active' : 'Normal'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Enabled:</span>
            <span className={isEnabled ? 'text-green-400' : 'text-red-400'}>
              {isEnabled ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-3 space-y-2">
        <button
          onClick={() => setEnabled(!isEnabled)}
          className={`w-full px-2 py-1 rounded text-xs transition-colors ${
            isEnabled 
              ? 'bg-yellow-600 hover:bg-yellow-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isEnabled ? 'Disable' : 'Enable'} Compensation
        </button>
        
        <button
          onClick={resetCompensation}
          className="w-full px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
        >
          Reset
        </button>
        
        <button
          onClick={forceUpdate}
          className="w-full px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs transition-colors"
        >
          Force Update
        </button>
      </div>

      <div className="border-t border-gray-700 pt-2 mt-2">
        <div className="text-xs text-gray-400">
          Browser: {window.devicePixelRatio}dpr
        </div>
        <div className="text-xs text-gray-400">
          Window: {Math.round(window.outerWidth)}×{Math.round(window.outerHeight)}
        </div>
        <div className="text-xs text-gray-400">
          Inner: {Math.round(window.innerWidth)}×{Math.round(window.innerHeight)}
        </div>
      </div>
    </div>
  )
}

export default ZoomDebugPanel
