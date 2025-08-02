'use client'

import { cn } from '@/lib/utils'

interface MaskButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'custom'
  variant?: 'dark' | 'light'
  disabled?: boolean
  customSize?: string // Untuk custom size
}

export const MaskButton = ({
  children,
  onClick,
  className,
  size = 'md',
  variant = 'dark',
  disabled = false,
  customSize,
  ...props
}: MaskButtonProps) => {

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-12 py-4 text-lg',
    lg: 'px-16 py-6 text-xl',
    custom: customSize || 'px-8 py-4 text-lg' // Default fallback untuk custom
  }

  const variants = {
    dark: 'mask-button-dark',
    light: 'mask-button-light'
  }

  const currentSize = sizes[size]
  const currentVariant = variants[variant]

  // Fallback styling yang robust untuk kedua variant
  const fallbackStyles = variant === 'dark' 
    ? 'bg-[#f2f1ef] text-[#f2f1ef] hover:bg-[#282828] hover:text-[#f2f1ef]' 
    : 'bg-black text-black border-2 border-black hover:bg-white hover:text-black'

  // Focus ring yang sesuai dengan variant
  const focusRingStyles = variant === 'dark'
    ? 'focus:ring-[#282828] focus:ring-offset-[#f2f1ef]'
    : 'focus:ring-white focus:ring-offset-black'

  return (
    <button
      className={cn(
        'relative overflow-hidden font-medium rounded-full',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-300 hover:shadow-lg',
        // Fallback styling yang robust untuk semua browser
        fallbackStyles,
        // Focus ring yang sesuai dengan variant
        focusRingStyles,
        currentSize,
        currentVariant,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Button content */}
      <span className="mask-button-text relative z-10">
        {children}
      </span>
    </button>
  )
}
