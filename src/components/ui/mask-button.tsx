'use client'

import { cn } from '@/lib/utils'

interface MaskButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light'
  disabled?: boolean
}

export const MaskButton = ({
  children,
  onClick,
  className,
  size = 'md',
  variant = 'dark',
  disabled = false,
  ...props
}: MaskButtonProps) => {

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-12 py-4 text-lg',
    lg: 'px-16 py-6 text-xl'
  }

  const variants = {
    dark: 'mask-button-dark',
    light: 'mask-button-light border-2 border-content-primary'
  }

  const currentSize = sizes[size]
  const currentVariant = variants[variant]

  return (
    <button
      className={cn(
        'relative overflow-hidden font-medium rounded-full border-0',
        'focus:outline-none focus:ring-2 focus:ring-content-primary focus:ring-offset-2 focus:ring-offset-surface-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-300 hover:shadow-lg',
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
