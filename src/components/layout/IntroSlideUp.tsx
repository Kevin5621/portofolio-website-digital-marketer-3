'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { workData } from '@/data/work'
import { archiveData } from '@/data/archive'

interface IntroSlideUpProps {
  onComplete?: () => void
  duration?: number
}

const routeTexts: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact',
  '/work': 'Work',
  '/archive': 'Archive'
}

const getRouteText = (pathname: string) => {
  // Handle dynamic routes
  if (pathname.startsWith('/work/')) {
    const workId = pathname.split('/work/')[1]
    if (workId) {
      const workItem = workData.find((item: { id: string }) => item.id === workId)
      return workItem ? workItem.client : 'Work Detail'
    }
    return 'Work Detail'
  }
  
  if (pathname.startsWith('/archive/')) {
    const archiveId = pathname.split('/archive/')[1]
    if (archiveId) {
      const archiveItem = archiveData.find((item: { id: string }) => item.id === archiveId)
      return archiveItem ? archiveItem.client : 'Archive Detail'
    }
    return 'Archive Detail'
  }
  
  // Return static route text or fallback
  return routeTexts[pathname] || 'Page'
}

export const IntroSlideUp = ({ onComplete, duration = 1750 }: IntroSlideUpProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isSliding, setIsSliding] = useState(false)
  const [currentHelloIndex, setCurrentHelloIndex] = useState(0)
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const pathname = usePathname()

  const routeTransitionDuration = 300

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
    const hasVisited = localStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      setIsFirstVisit(true)
      localStorage.setItem('hasVisited', 'true')
    }

    let helloInterval: NodeJS.Timeout

    if (isFirstVisit) {
      helloInterval = setInterval(() => {
        setCurrentHelloIndex((prev) => (prev + 1) % helloTexts.length)
      }, 175)
    }

    const slideTimeout = setTimeout(() => {
      if (helloInterval) clearInterval(helloInterval)
      setIsSliding(true)
      
      setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 2000)
    }, isFirstVisit ? duration : routeTransitionDuration)

    return () => {
      if (helloInterval) clearInterval(helloInterval)
      clearTimeout(slideTimeout)
    }
  }, [duration, onComplete, helloTexts.length, isFirstVisit])

  if (!isVisible) return null

  const displayText = isFirstVisit 
    ? helloTexts[currentHelloIndex] 
    : getRouteText(pathname)

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] bg-surface-background 
        flex items-center justify-center
        transition-all duration-1000 ease-out
        ${isSliding ? '-translate-y-full' : 'translate-y-0'}
        ${isSliding ? 'rounded-b-[1500px]' : 'rounded-none'}
      `}
      data-theme="light"
    >
      <div className="text-center space-y-6">
        <div className="relative h-24 flex items-center justify-center">
          <h1 
            className="text-6xl md:text-8xl font-bold text-content-primary transition-all duration-300 ease-in-out"
            key={isFirstVisit ? currentHelloIndex : pathname}
          >
            {displayText}
          </h1>
        </div>
        
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
