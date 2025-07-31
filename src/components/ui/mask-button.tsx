'use client'

import { cn } from '@/lib/utils'

interface MaskButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const MaskButton = ({
  children,
  onClick,
  className,
  size = 'md',
  disabled = false,
  ...props
}: MaskButtonProps) => {

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-12 py-4 text-lg md:text-xl',
    lg: 'px-16 py-6 text-xl md:text-2xl'
  }

  const currentSize = sizes[size]

  return (
    <button
      className={cn(
        'relative overflow-hidden font-medium rounded-full border-0',
        'focus:outline-none focus:ring-2 focus:ring-content-primary focus:ring-offset-2 focus:ring-offset-surface-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'view-projects-button-enhanced group',
        'transition-all duration-300 hover:shadow-2xl',
        currentSize,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Button content */}
      <span className="view-projects-text relative z-10">
        {children}
      </span>
    </button>
  )
}
