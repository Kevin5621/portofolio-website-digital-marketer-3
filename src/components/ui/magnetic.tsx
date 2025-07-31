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

// Lerp function untuk smooth interpolation
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

// Smooth easing function
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

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
  const currentTransform = useRef({ x: 0, y: 0 })
  const targetTransform = useRef({ x: 0, y: 0 })
  const animationId = useRef<number | undefined>(undefined)

  useEffect(() => {
    const element = magneticRef.current
    if (!element) return

    const applyTextMagnetic = (deltaX: number, deltaY: number, force: number) => {
      if (!textStrength) return
      
      const textElements = element.querySelectorAll('.magnetic-text')
      const textTranslateX = deltaX * textStrength * force
      const textTranslateY = deltaY * textStrength * force
      
      textElements.forEach((textEl) => {
        const htmlEl = textEl as HTMLElement
        htmlEl.style.transform = `translate(${textTranslateX}px, ${textTranslateY}px)`
        htmlEl.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      })
    }

    const resetTextMagnetic = () => {
      if (!textStrength) return
      
      const textElements = element.querySelectorAll('.magnetic-text')
      textElements.forEach((textEl) => {
        const htmlEl = textEl as HTMLElement
        htmlEl.style.transform = 'translate(0px, 0px)'
        htmlEl.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      })
    }

    const updateTransform = () => {
      // Smooth interpolation untuk pergerakan
      const lerpFactor = 0.15 // Lebih kecil = lebih smooth
      
      currentTransform.current.x = lerp(
        currentTransform.current.x, 
        targetTransform.current.x, 
        lerpFactor
      )
      currentTransform.current.y = lerp(
        currentTransform.current.y, 
        targetTransform.current.y, 
        lerpFactor
      )

      element.style.transform = `translate(${currentTransform.current.x}px, ${currentTransform.current.y}px)`
      
      // Lanjutkan animasi jika masih ada pergerakan
      if (Math.abs(currentTransform.current.x - targetTransform.current.x) > 0.01 || 
          Math.abs(currentTransform.current.y - targetTransform.current.y) > 0.01) {
        animationId.current = requestAnimationFrame(updateTransform)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      if (distance < range || !onlyOnHover) {
        const force = onlyOnHover ? Math.max(0, (range - distance) / range) : 1
        const easedForce = easeOutCubic(force) // Smooth easing
        
        // Update target transform
        targetTransform.current.x = deltaX * strength * easedForce
        targetTransform.current.y = deltaY * strength * easedForce
        
        // Apply text magnetic effect
        applyTextMagnetic(deltaX, deltaY, easedForce)
        
        // Start smooth animation
        if (!animationId.current) {
          animationId.current = requestAnimationFrame(updateTransform)
        }
      } else if (onlyOnHover) {
        // Reset to original position
        targetTransform.current.x = 0
        targetTransform.current.y = 0
        resetTextMagnetic()
        
        if (!animationId.current) {
          animationId.current = requestAnimationFrame(updateTransform)
        }
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      
      // Reset to original position smoothly
      targetTransform.current.x = 0
      targetTransform.current.y = 0
      resetTextMagnetic()
      
      if (!animationId.current) {
        animationId.current = requestAnimationFrame(updateTransform)
      }
    }

    if (onlyOnHover) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    } else {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
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
        !isHovered && "transition-transform duration-500 ease-out",
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
