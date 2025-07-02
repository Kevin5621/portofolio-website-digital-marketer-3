import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          // Base button styles using semantic design system
          'button-base',
          'inline-flex items-center justify-center',
          'rounded-md font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Size variants using size scale
          {
            'h-8 px-3 text-body-sm': size === 'sm',
            'h-10 px-4 text-body-md': size === 'md', 
            'h-12 px-6 text-body-lg': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          
          // Variant styles using semantic colors
          {
            // Primary - main brand action
            'bg-interactive-primary text-interactive-primary-foreground hover:bg-interactive-primary-hover shadow-sm hover:shadow-md': 
              variant === 'primary',
            
            // Secondary - supporting action  
            'bg-interactive-secondary text-interactive-secondary-foreground hover:bg-interactive-secondary-hover border border-border-primary': 
              variant === 'secondary',
            
            // Outline - subtle action
            'border border-border-primary bg-surface-card hover:bg-interactive-secondary text-content-primary': 
              variant === 'outline',
            
            // Ghost - minimal action
            'hover:bg-interactive-secondary text-content-primary': 
              variant === 'ghost',
            
            // Link - text-based action
            'text-content-link hover:text-content-link-hover underline-offset-4 hover:underline': 
              variant === 'link',
            
            // Destructive - dangerous action
            'bg-state-error text-state-error-foreground hover:bg-state-error/90 shadow-sm': 
              variant === 'destructive',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
