// Supabase Database Types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Union type aliases for better maintainability
export type ProjectStatus = 'draft' | 'published' | 'archived'
export type BlogPostStatus = 'draft' | 'published' | 'archived'
export type UserRole = 'admin' | 'user'

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          featured_image: string | null
          gallery_images: string[] | null
          technologies: string[]
          project_url: string | null
          github_url: string | null
          category: string
          status: ProjectStatus
          featured: boolean
          order_index: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          featured_image?: string | null
          gallery_images?: string[] | null
          technologies: string[]
          project_url?: string | null
          github_url?: string | null
          category: string
          status?: ProjectStatus
          featured?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          featured_image?: string | null
          gallery_images?: string[] | null
          technologies?: string[]
          project_url?: string | null
          github_url?: string | null
          category?: string
          status?: ProjectStatus
          featured?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image: string | null
          category: string
          tags: string[]
          status: BlogPostStatus
          featured: boolean
          published_at: string | null
          reading_time: number
          views: number
          order_index: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image?: string | null
          category: string
          tags?: string[]
          status?: BlogPostStatus
          featured?: boolean
          published_at?: string | null
          reading_time?: number
          views?: number
          order_index?: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          featured_image?: string | null
          category?: string
          tags?: string[]
          status?: BlogPostStatus
          featured?: boolean
          published_at?: string | null
          reading_time?: number
          views?: number
          order_index?: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          social_links: Json | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Json | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          social_links?: Json | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
