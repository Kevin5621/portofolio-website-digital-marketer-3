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

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false)
    }
  }

  // Hanya 2 warna: hitam dan putih
  const variants = {
    primary: {
      base: 'bg-content-primary text-content-inverse', // Hitam background, putih text
      liquid: 'bg-content-inverse', // Putih liquid
      text: {
        initial: 'text-content-inverse', // Putih text awal
        hover: 'text-content-primary'   // Hitam text saat hover
      }
    },
    secondary: {
      base: 'bg-content-primary text-content-inverse',
      liquid: 'bg-content-inverse',
      text: {
        initial: 'text-content-inverse',
        hover: 'text-content-primary'
      }
    },
    accent: {
      base: 'bg-content-primary text-content-inverse',
      liquid: 'bg-content-inverse',
      text: {
        initial: 'text-content-inverse',
        hover: 'text-content-primary'
      }
    }
  }

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-12 py-4 text-lg md:text-xl',
    lg: 'px-16 py-6 text-xl md:text-2xl'
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  return (
    <div className="relative inline-block">
      {/* Liquid wave dengan pattern wave SVG - sekarang di atas button */}
      <div
        className={cn(
          'absolute left-0 right-0 z-30 h-6 transition-all duration-700 ease-out pointer-events-none',
          isHovered ? 'bottom-full' : 'bottom-[-1.5rem]'
        )}
        style={{
          background: `url("data:image/svg+xml,%3Csvg width='100' height='24' viewBox='0 0 100 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12 Q25 0 50 12 T100 12 V24 H0 Z' fill='%23F2F1EF'/%3E%3C/svg%3E") repeat-x`,
          backgroundSize: '100px 24px',
          backgroundPosition: 'bottom',
          animation: isHovered ? 'waveMove 2s linear infinite' : 'none'
        }}
      />

      {/* CSS untuk animasi wave movement */}
      <style>{`
        @keyframes waveMove {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 100px;
          }
        }
      `}</style>

      <button
        className={cn(
          'relative overflow-hidden font-medium rounded-full',
          'focus:outline-none focus:ring-2 focus:ring-content-primary focus:ring-offset-2 focus:ring-offset-surface-background',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'border-0',
          currentVariant.base,
          currentSize,
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {/* Background solid - tidak rounded untuk efek liquid realistis */}
        <div
          className={cn(
            'absolute inset-0 transition-transform duration-700 ease-out',
            currentVariant.liquid,
            isHovered ? 'translate-y-0' : 'translate-y-full'
          )}
        />

        {/* Button content */}
        <span 
          className={cn(
            'relative z-10 transition-colors duration-300',
            isHovered ? currentVariant.text.hover : currentVariant.text.initial
          )}
        >
          {children}
        </span>
      </button>
    </div>
  )
} 