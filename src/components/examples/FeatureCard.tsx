import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  variant?: 'default' | 'highlighted' | 'minimal'
  className?: string
}

/**
 * FeatureCard component demonstrating the new semantic design system
 * 
 * Features:
 * - Semantic color naming (content-primary, surface-card, etc.)
 * - Size scale system (space-4, space-6, etc.)
 * - Typography scale (text-heading-sm, text-body-md, etc.)
 * - Consistent component patterns
 */
export function FeatureCard({
  title,
  description,
  icon,
  action,
  variant = 'default',
  className
}: FeatureCardProps) {
  return (
    <Card 
      variant={variant === 'highlighted' ? 'interactive' : 'default'}
      className={cn(
        // Base spacing using size scale
        'p-6',
        
        // Variant-specific styling using semantic colors
        {
          // Default variant
          'bg-surface-card border-border-primary': variant === 'default',
          
          // Highlighted variant with brand accent
          'bg-gradient-to-br from-surface-card to-brand-primary/5 border-brand-primary/20': 
            variant === 'highlighted',
          
          // Minimal variant with subtle styling
          'bg-surface-card border-border-secondary shadow-none': variant === 'minimal',
        },
        className
      )}
    >
      <CardHeader className="pb-4">
        {/* Icon with semantic spacing */}
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10">
            <div className="text-brand-primary">
              {icon}
            </div>
          </div>
        )}
        
        {/* Title using typography scale */}
        <CardTitle className="text-heading-sm text-content-primary">
          {title}
        </CardTitle>
        
        {/* Description using semantic content color */}
        <CardDescription className="text-body-md text-content-secondary leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Action area with semantic spacing */}
      {action && (
        <CardContent className="pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={action.onClick}
            className="group"
          >
            <span>{action.label}</span>
            <svg 
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

// Example usage component showing various variants
export function FeatureCardsExample() {
  const features = [
    {
      title: 'Semantic Colors',
      description: 'Use meaningful color names that describe purpose, not appearance. Makes theming and maintenance easier.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      action: { label: 'Learn More', onClick: () => console.log('Semantic colors clicked') },
      variant: 'highlighted' as const
    },
    {
      title: 'Size Scale System',
      description: 'Consistent spacing and sizing using a mathematical scale based on 4px grid system.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      action: { label: 'View Scale', onClick: () => console.log('Size scale clicked') },
      variant: 'default' as const
    },
    {
      title: 'Component Patterns',
      description: 'Reusable patterns that ensure consistency across the entire application.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      action: { label: 'Explore', onClick: () => console.log('Patterns clicked') },
      variant: 'minimal' as const
    }
  ]

  return (
    <section className="py-20 bg-surface-background">
      <div className="container mx-auto px-4">
        {/* Section header using typography scale */}
        <div className="text-center mb-16">
          <h2 className="text-display-sm text-content-primary mb-6">
            Design System Features
          </h2>
          <p className="text-body-xl text-content-secondary max-w-3xl mx-auto">
            Our semantic design system provides a foundation for building consistent, 
            maintainable, and scalable user interfaces.
          </p>
        </div>

        {/* Feature cards grid with semantic spacing */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              action={feature.action}
              variant={feature.variant}
            />
          ))}
        </div>

        {/* Call to action with semantic styling */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-xl">
            <div className="text-content-primary">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-heading-sm text-content-primary mb-1">
                Ready to build?
              </h3>
              <p className="text-body-sm text-content-secondary">
                Start using our design system in your next project
              </p>
            </div>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
