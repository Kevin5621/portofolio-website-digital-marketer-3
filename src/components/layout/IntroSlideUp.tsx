'use client'

import { useEffect, useState } from 'react'

interface IntroSlideUpProps {
  onComplete?: () => void
  duration?: number
}

export const IntroSlideUp = ({ onComplete, duration = 1750 }: IntroSlideUpProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isSliding, setIsSliding] = useState(false)
  const [currentHelloIndex, setCurrentHelloIndex] = useState(0)

  // Hello text in different languages (without country names)
  const helloTexts = [
    'Hello',
    'こんにちは',
    '안녕하세요',
    '你好',
    'Hola',
    'Bonjour',
    'Hallo',
    'Ciao',
    'Olá',
    'السلام عليكم'
  ]

  useEffect(() => {
    // Animate through hello texts - 2x faster (150ms instead of 300ms)
    const helloInterval = setInterval(() => {
      setCurrentHelloIndex((prev) => (prev + 1) % helloTexts.length)
    }, 175) // 10 + word

    // Start slide up animation after duration
    const slideTimeout = setTimeout(() => {
      clearInterval(helloInterval)
      setIsSliding(true)
      
      // Hide completely after slide animation completes
      setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 600) 
    }, duration)

    return () => {
      clearInterval(helloInterval)
      clearTimeout(slideTimeout)
    }
  }, [duration, onComplete, helloTexts.length])

  if (!isVisible) return null

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] bg-surface-background 
        flex items-center justify-center
        transition-transform duration-350 ease-in-out
        ${isSliding ? '-translate-y-full' : 'translate-y-0'}
      `}
      data-theme="light"
    >
      {/* Main Hello Text */}
      <div className="text-center space-y-6">
        <div className="relative h-24 flex items-center justify-center">
          <h1 
            className="text-6xl md:text-8xl font-bold text-content-primary transition-all duration-300 ease-in-out"
            key={currentHelloIndex}
          >
            {helloTexts[currentHelloIndex]}
          </h1>
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {(['dot-1', 'dot-2', 'dot-3'] as const).map((dotId, i) => (
            <div
              key={dotId}
              className="w-2 h-2 bg-content-tertiary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: '1000ms'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
