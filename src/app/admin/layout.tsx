'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { LogOut, FolderOpen, FileText, User as UserIcon, BarChart3 } from 'lucide-react'

interface AdminLayoutProps {
  readonly children: React.ReactNode
}

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Profile', href: '/admin/profile', icon: UserIcon },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      
      if (!user) {
        router.push('/')
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/')
        } else {
          setUser(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-background">
        <div className="w-8 h-8 border-4 border-interactive-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-surface-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-surface-card border-r border-border-primary">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border-primary">
            <h1 className="text-heading-md text-content-primary">Admin Panel</h1>
            <p className="text-body-sm text-content-secondary mt-1">Portfolio Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-body-md text-content-secondary hover:text-content-primary hover:bg-interactive-secondary rounded-md transition-all"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-content-primary">
                  {user.email}
                </p>
                <p className="text-body-sm text-content-tertiary">Admin</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-content-secondary hover:text-content-primary"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
