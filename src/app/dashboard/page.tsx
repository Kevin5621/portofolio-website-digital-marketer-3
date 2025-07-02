'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, FolderOpen, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalProjects: number
  totalBlogPosts: number
  totalViews: number
  recentActivity: Array<{
    id: string
    type: 'project' | 'blog'
    title: string
    date: string
  }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalViews: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()
        
        // Fetch projects count
        const { count: projectsCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
        
        // Fetch blog posts count
        const { count: blogCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })

        // Fetch recent activity (last 5 items)
        const { data: recentProjects } = await supabase
          .from('projects')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3)

        const { data: recentBlogs } = await supabase
          .from('blog_posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3)

        const recentActivity = [
          ...(recentProjects || []).map(item => ({
            id: item.id,
            type: 'project' as const,
            title: item.title,
            date: new Date(item.created_at).toLocaleDateString()
          })),
          ...(recentBlogs || []).map(item => ({
            id: item.id,
            type: 'blog' as const,
            title: item.title,
            date: new Date(item.created_at).toLocaleDateString()
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

        setStats({
          totalProjects: projectsCount ?? 0,
          totalBlogPosts: blogCount ?? 0,
          totalViews: 1250, // Mock data - replace with real analytics
          recentActivity
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        // Set mock data on error
        setStats({
          totalProjects: 4,
          totalBlogPosts: 8,
          totalViews: 1250,
          recentActivity: [
            { id: '1', type: 'project', title: 'Portfolio Website', date: '2024-01-15' },
            { id: '2', type: 'blog', title: 'Modern Web Development', date: '2024-01-14' },
            { id: '3', type: 'project', title: 'E-Commerce App', date: '2024-01-13' }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['projects', 'blog', 'views'].map((type) => (
              <div key={type} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      href: '/dashboard/projects'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      icon: FileText,
      href: '/dashboard/blog'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      href: '#'
    }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              {card.href !== '#' && (
                <div className="mt-4">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={card.href}>
                      View all →
                    </Link>
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/projects/new">
                <FolderOpen className="w-4 h-4 mr-2" />
                Create New Project
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/blog/new">
                <FileText className="w-4 h-4 mr-2" />
                Write Blog Post
              </Link>
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No recent activity. Create your first project or blog post!
              </p>
            ) : (
              stats.recentActivity.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                    {item.type === 'project' ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
