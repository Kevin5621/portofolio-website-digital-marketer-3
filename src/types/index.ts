import { Database } from './supabase'

// Extract types from Supabase
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// Additional application types
export interface NavigationItem {
  href: string
  label: string
  external?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface ProjectFilter {
  category?: string
  technology?: string
  featured?: boolean
}

export interface BlogFilter {
  category?: string
  tag?: string
  featured?: boolean
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}

export interface AnimationConfig {
  duration: number
  ease: string
  delay?: number
  stagger?: number
}

export interface ParallaxConfig {
  speed: number
  direction: 'up' | 'down' | 'left' | 'right'
  trigger?: string
}

export interface LenisConfig {
  duration: number
  easing: (t: number) => number
  direction: 'vertical' | 'horizontal'
  gestureDirection: 'vertical' | 'horizontal' | 'both'
  smooth: boolean
  mouseMultiplier: number
  smoothTouch: boolean
  touchMultiplier: number
  infinite: boolean
}

// Form validation schemas
export interface ValidationError {
  field: string
  message: string
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

// Dashboard types
export interface DashboardStats {
  totalProjects: number
  publishedProjects: number
  totalBlogPosts: number
  publishedBlogPosts: number
  totalViews: number
  featuredItems: number
}

export interface FileUpload {
  file: File
  preview?: string
  progress?: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export interface MediaAsset {
  id: string
  filename: string
  url: string
  type: 'image' | 'video' | 'document'
  size: number
  mimeType: string
  alt?: string
  caption?: string
  createdAt: string
}

// Theme and styling
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
  }
  fonts: {
    sans: string
    serif: string
    mono: string
  }
  animations: {
    duration: {
      fast: string
      normal: string
      slow: string
    }
    easing: {
      default: string
      ease: string
      easeIn: string
      easeOut: string
      easeInOut: string
    }
  }
}

// Page props types
export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface LayoutProps {
  children: React.ReactNode
  params?: { [key: string]: string }
}

// Component props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animation?: AnimationConfig
  trigger?: string
  once?: boolean
}

export interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}
