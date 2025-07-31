'use client'

import React, { useRef, useEffect, ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  strength?: number
  range?: number
  onlyOnHover?: boolean
  className?: string
  textStrength?: number // Strength khusus untuk text elements
}

export const Magnetic = ({ 
  children, 
  strength = 0.3, 
  range = 100, 
  onlyOnHover = true,
  className,
  textStrength
}: MagneticProps) => {
  const magneticRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const element = magneticRef.current
    if (!element) return

    let animationId: number

    const applyTextMagnetic = (deltaX: number, deltaY: number, force: number) => {
      if (!textStrength) return
      
      const textElements = element.querySelectorAll('.magnetic-text')
      const textTranslateX = deltaX * textStrength * force
      const textTranslateY = deltaY * textStrength * force
      
      textElements.forEach((textEl) => {
        const htmlEl = textEl as HTMLElement
        htmlEl.style.transform = `translate(${textTranslateX}px, ${textTranslateY}px)`
        htmlEl.style.transition = 'none'
      })
    }

    const resetTextMagnetic = () => {
      if (!textStrength) return
      
      const textElements = element.querySelectorAll('.magnetic-text')
      textElements.forEach((textEl) => {
        const htmlEl = textEl as HTMLElement
        htmlEl.style.transform = 'translate(0px, 0px)'
        htmlEl.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      animationId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        if (distance < range || !onlyOnHover) {
          const force = onlyOnHover ? Math.max(0, (range - distance) / range) : 1
          
          // Apply main element magnetic effect
          const translateX = deltaX * strength * force
          const translateY = deltaY * strength * force
          
          element.style.transform = `translate(${translateX}px, ${translateY}px)`
          element.style.transition = 'none'
          
          // Apply text magnetic effect
          applyTextMagnetic(deltaX, deltaY, force)
        } else if (onlyOnHover) {
          element.style.transform = 'translate(0px, 0px)'
          element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          resetTextMagnetic()
        }
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      element.style.transform = 'translate(0px, 0px)'
      element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      resetTextMagnetic()
    }

    if (onlyOnHover) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    } else {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      
      if (onlyOnHover) {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      } else {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [strength, range, onlyOnHover, textStrength])

  return (
    <div 
      ref={magneticRef}
      className={cn(
        "transform-gpu will-change-transform inline-block",
        !isHovered && "transition-transform duration-300 ease-magnetic",
        className
      )}
      style={{
        transform: 'translate(0px, 0px)',
      }}
    >
      {children}
    </div>
  )
}
