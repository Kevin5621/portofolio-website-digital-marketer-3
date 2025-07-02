'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, FolderOpen, Eye, Plus } from 'lucide-react'

interface Stats {
  totalProjects: number
  totalBlogPosts: number
  totalViews: number
  publishedProjects: number
  publishedBlogPosts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalViews: 0,
    publishedProjects: 0,
    publishedBlogPosts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      try {
        // Fetch projects stats
        const { data: projects } = await supabase
          .from('projects')
          .select('status, views')

        // Fetch blog posts stats
        const { data: blogPosts } = await supabase
          .from('blog_posts')
          .select('status, views')

        if (projects && blogPosts) {
          const totalViews = [
            ...projects,
            ...blogPosts
          ].reduce((sum, item) => sum + (item.views ?? 0), 0)

          setStats({
            totalProjects: projects.length,
            totalBlogPosts: blogPosts.length,
            totalViews,
            publishedProjects: projects.filter(p => p.status === 'published').length,
            publishedBlogPosts: blogPosts.filter(p => p.status === 'published').length,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      published: stats.publishedProjects,
      icon: FolderOpen,
      href: '/admin/projects'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      published: stats.publishedBlogPosts,
      icon: FileText,
      href: '/admin/blog'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface-tertiary rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-surface-tertiary rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-display-sm text-content-primary">Dashboard</h1>
          <p className="text-body-lg text-content-secondary mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your portfolio.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => window.open('/', '_blank')}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Portfolio
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="card p-6 hover:card-elevated transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-md text-content-secondary">{stat.title}</p>
                  <p className="text-heading-lg text-content-primary mt-2">
                    {stat.value}
                  </p>
                  {stat.published !== undefined && (
                    <p className="text-body-sm text-content-tertiary">
                      {stat.published} published
                    </p>
                  )}
                </div>
                <div className="p-3 bg-interactive-secondary rounded-lg">
                  <Icon className="h-6 w-6 text-interactive-primary" />
                </div>
              </div>
              {stat.href && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = stat.href}
                    className="w-full"
                  >
                    Manage
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card p-6">
          <h3 className="text-heading-sm text-content-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/projects/new'}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/blog/new'}
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Blog Post
            </Button>
          </div>
        </Card>

        <Card className="card p-6">
          <h3 className="text-heading-sm text-content-primary mb-4">Recent Activity</h3>
          <div className="space-y-3 text-body-md text-content-secondary">
            <p>Dashboard functionality coming soon...</p>
            <p>Track recent changes and updates here.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
