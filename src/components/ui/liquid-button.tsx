'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const LiquidButton = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}: LiquidButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // Variant-based color configurations using semantic colors
  const variants = {
    primary: {
      base: 'bg-content-primary text-content-inverse',
      liquid: 'bg-content-inverse', // White liquid from semantic colors
      text: {
        initial: 'text-content-inverse', // White text initially 
        hover: 'text-content-primary'   // Dark text when liquid fills
      }
    },
    secondary: {
      base: 'bg-surface-secondary text-content-primary border border-border-primary',
      liquid: 'bg-content-primary',
      text: {
        initial: 'text-content-primary',
        hover: 'text-content-inverse'
      }
    },
    accent: {
      base: 'bg-accent-500 text-content-inverse',
      liquid: 'bg-content-inverse',
      text: {
        initial: 'text-content-inverse',
        hover: 'text-content-primary'
      }
    }
  }

  // Size configurations
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-12 py-4 text-lg md:text-xl',
    lg: 'px-16 py-6 text-xl md:text-2xl'
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  return (
    <button
      className={cn(
        'relative overflow-hidden font-medium rounded-full transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-content-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        currentVariant.base,
        currentSize,
        className
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Single liquid wave that fills the button */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-700 ease-out',
          currentVariant.liquid,
          isHovered ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{
          clipPath: isHovered 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' // Completely fills button when hovered
            : 'polygon(0 80%, 10% 85%, 20% 80%, 30% 85%, 40% 80%, 50% 85%, 60% 80%, 70% 85%, 80% 80%, 90% 85%, 100% 80%, 100% 100%, 0 100%)' // Wave pattern at bottom when not hovered
        }}
      />

      {/* Animated wave layer for liquid surface effect */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-700 ease-out delay-100',
          currentVariant.liquid,
          'opacity-60 liquid-wave',
          isHovered ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{
          clipPath: isHovered 
            ? 'polygon(0 5%, 15% 0%, 30% 5%, 45% 0%, 60% 5%, 75% 0%, 90% 5%, 100% 0%, 100% 100%, 0 100%)' // Top wave when filled
            : 'polygon(0 85%, 15% 80%, 30% 85%, 45% 80%, 60% 85%, 75% 80%, 90% 85%, 100% 80%, 100% 100%, 0 100%)' // Wave pattern when not hovered
        }}
      />

      {/* Additional wave layer for more depth */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-800 ease-out delay-200',
          currentVariant.liquid,
          'opacity-40 liquid-wave-secondary',
          isHovered ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{
          clipPath: isHovered 
            ? 'polygon(0 8%, 20% 3%, 40% 8%, 60% 3%, 80% 8%, 100% 3%, 100% 100%, 0 100%)' // Secondary wave when filled
            : 'polygon(0 88%, 20% 83%, 40% 88%, 60% 83%, 80% 88%, 100% 83%, 100% 100%, 0 100%)' // Secondary wave pattern when not hovered
        }}
      />

      {/* Button content with dynamic text color */}
      <span 
        className={cn(
          'relative z-10 transition-colors duration-300',
          isHovered ? currentVariant.text.hover : currentVariant.text.initial
        )}
      >
        {children}
      </span>

      {/* Liquid wave CSS animations */}
      <style jsx>{`
        /* Primary wave animation for liquid effect */
        .liquid-wave {
          animation: liquidWave 3s ease-in-out infinite;
        }

        /* Secondary wave animation with offset timing */
        .liquid-wave-secondary {
          animation: liquidWaveSecondary 2.5s ease-in-out infinite reverse;
        }

        @keyframes liquidWave {
          0%, 100% {
            clip-path: polygon(
              0 5%, 15% 0%, 30% 5%, 45% 0%, 60% 5%, 75% 0%, 90% 5%, 100% 0%, 
              100% 100%, 0 100%
            );
          }
          25% {
            clip-path: polygon(
              0 0%, 15% 5%, 30% 0%, 45% 5%, 60% 0%, 75% 5%, 90% 0%, 100% 5%, 
              100% 100%, 0 100%
            );
          }
          50% {
            clip-path: polygon(
              0 3%, 15% 8%, 30% 3%, 45% 8%, 60% 3%, 75% 8%, 90% 3%, 100% 8%, 
              100% 100%, 0 100%
            );
          }
          75% {
            clip-path: polygon(
              0 8%, 15% 3%, 30% 8%, 45% 3%, 60% 8%, 75% 3%, 90% 8%, 100% 3%, 
              100% 100%, 0 100%
            );
          }
        }

        @keyframes liquidWaveSecondary {
          0%, 100% {
            clip-path: polygon(
              0 8%, 20% 3%, 40% 8%, 60% 3%, 80% 8%, 100% 3%, 
              100% 100%, 0 100%
            );
          }
          33% {
            clip-path: polygon(
              0 3%, 20% 8%, 40% 3%, 60% 8%, 80% 3%, 100% 8%, 
              100% 100%, 0 100%
            );
          }
          66% {
            clip-path: polygon(
              0 6%, 20% 1%, 40% 6%, 60% 1%, 80% 6%, 100% 1%, 
              100% 100%, 0 100%
            );
          }
        }

        /* Wave surface shimmer effect */
        .liquid-surface {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          animation: liquidShimmer 2s ease-in-out infinite;
        }

        @keyframes liquidShimmer {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </button>
  )
}
