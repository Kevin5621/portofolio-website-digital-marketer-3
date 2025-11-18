'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface TextBlockHighlightProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'left-to-right' | 'right-to-left'
  onAnimationComplete?: () => void
}

export const TextBlockHighlight: React.FC<TextBlockHighlightProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'left-to-right',
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            // Trigger animasi setelah delay
            setTimeout(() => {
              containerRef.current?.classList.add('animate')
              
              // Call onAnimationComplete setelah animasi selesai
              if (onAnimationComplete) {
                setTimeout(onAnimationComplete, 800) // 0.8s animation duration
              }
            }, delay * 1000)
            
            // Unobserve setelah animasi dimulai
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [delay, onAnimationComplete])

  const classes = [
    'text-block-highlight',
    `text-block-highlight-${direction}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <span ref={containerRef} className={classes}>
      <span>{children}</span>
    </span>
  )
}

