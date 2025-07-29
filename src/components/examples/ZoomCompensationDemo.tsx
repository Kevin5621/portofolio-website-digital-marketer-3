'use client'

import React, { useState } from 'react'
import { useZoomCompensationContext } from '@/components/layout/ZoomCompensationProvider'
import { 
  getZoomCompensatedFontSize,
  getZoomCompensatedRem,
  getZoomCategory 
} from '@/lib/zoom-compensation'

/**
 * Demo component showing zoom compensation in action
 * Demonstrates different compensation techniques
 */
export const ZoomCompensationDemo: React.FC = () => {
  const { 
    zoomLevel, 
    compensationFactor, 
    isCompensating, 
    isEnabled,
    setEnabled,
    resetCompensation 
  } = useZoomCompensationContext()

  const [manualCompensation, setManualCompensation] = useState(true)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Zoom Compensation Demo
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrasi sistem kompensasi zoom yang membuat semua elemen tetap konsisten
        </p>
      </div>

      {/* Status Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Status Zoom</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {zoomLevel.toFixed(2)}x
            </div>
            <div className="text-sm text-gray-500">Zoom Level</div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {compensationFactor.toFixed(2)}x
            </div>
            <div className="text-sm text-gray-500">Compensation</div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className={`text-2xl font-bold ${isCompensating ? 'text-yellow-600' : 'text-green-600'}`}>
              {isCompensating ? 'Aktif' : 'Normal'}
            </div>
            <div className="text-sm text-gray-500">Status</div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-lg font-medium text-purple-600">
              {getZoomCategory(zoomLevel)}
            </div>
            <div className="text-sm text-gray-500">Kategori</div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Kontrol Kompensasi</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setEnabled(!isEnabled)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isEnabled 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isEnabled ? 'Disable' : 'Enable'} Kompensasi
          </button>
          
          <button
            onClick={resetCompensation}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset Kompensasi
          </button>
          
          <button
            onClick={() => setManualCompensation(!manualCompensation)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              manualCompensation 
                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {manualCompensation ? 'Disable' : 'Enable'} Manual Demo
          </button>
        </div>
      </div>

      {/* Comparison Examples */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Without Compensation */}
        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-red-700">
            Tanpa Kompensasi Zoom
          </h3>
          <div 
            className="bg-white p-4 rounded-lg shadow-sm"
            style={{
              // Disable zoom compensation for this demo
              fontSize: '16px',
              padding: '16px',
            }}
          >
            <h4 className="text-lg font-medium mb-2">Elemen Biasa</h4>
            <p className="text-gray-600 mb-3">
              Teks ini akan berubah ukuran sesuai zoom browser. 
              Pada zoom tinggi akan terlihat sangat besar, pada zoom rendah akan kecil.
            </p>
            <button className="px-4 py-2 bg-red-500 text-white rounded">
              Button Tidak Stabil
            </button>
          </div>
        </div>

        {/* With Compensation */}
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            Dengan Kompensasi Zoom
          </h3>
          <div 
            className="bg-white p-4 rounded-lg shadow-sm zoom-compensated"
            style={manualCompensation ? {
              fontSize: getZoomCompensatedFontSize(16, zoomLevel),
              padding: getZoomCompensatedRem(1, zoomLevel),
            } : {}}
          >
            <h4 className="text-lg font-medium mb-2">Elemen Terkompensasi</h4>
            <p className="text-gray-600 mb-3">
              Teks ini akan tetap konsisten ukurannya meskipun user melakukan zoom. 
              Ukuran visual akan selalu sama terlepas dari zoom level browser.
            </p>
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              Button Stabil
            </button>
          </div>
        </div>
      </div>

      {/* CSS Custom Properties Demo */}
      <div className="bg-yellow-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-yellow-700">
          CSS Custom Properties
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
            <div>
              <span className="text-gray-500">--zoom-level:</span>
              <span className="ml-2 text-blue-600">{zoomLevel.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-gray-500">--zoom-compensation-factor:</span>
              <span className="ml-2 text-green-600">{compensationFactor.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-gray-500">--base-font-size:</span>
              <span className="ml-2 text-purple-600">16px</span>
            </div>
          </div>
          
          <div 
            className="mt-4 p-3 bg-gray-100 rounded"
            style={{
              fontSize: 'calc(1rem * var(--zoom-compensation-factor))',
              padding: 'calc(0.75rem * var(--zoom-compensation-factor))',
            }}
          >
            <p>
              Element ini menggunakan CSS custom properties untuk kompensasi otomatis.
              <br />
              <code className="text-sm bg-white px-2 py-1 rounded">
                font-size: calc(1rem * var(--zoom-compensation-factor))
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="bg-purple-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">
          Performance & Browser Info
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Device Pixel Ratio</div>
              <div className="font-medium">{window.devicePixelRatio}</div>
            </div>
            <div>
              <div className="text-gray-500">Window Size</div>
              <div className="font-medium">{window.innerWidth}×{window.innerHeight}</div>
            </div>
            <div>
              <div className="text-gray-500">Screen Size</div>
              <div className="font-medium">{window.screen.width}×{window.screen.height}</div>
            </div>
            <div>
              <div className="text-gray-500">User Agent</div>
              <div className="font-medium truncate">{navigator.userAgent.split(' ')[0]}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">
          Cara Menguji
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>• <strong>Zoom In:</strong> Tekan Ctrl++ (Windows/Linux) atau Cmd++ (Mac)</p>
          <p>• <strong>Zoom Out:</strong> Tekan Ctrl+- (Windows/Linux) atau Cmd+- (Mac)</p>
          <p>• <strong>Reset Zoom:</strong> Tekan Ctrl+0 (Windows/Linux) atau Cmd+0 (Mac)</p>
          <p>• Perhatikan bagaimana elemen di panel hijau tetap konsisten ukurannya</p>
          <p>• Bandingkan dengan elemen di panel merah yang mengikuti zoom browser</p>
        </div>
      </div>
    </div>
  )
}

export default ZoomCompensationDemo
