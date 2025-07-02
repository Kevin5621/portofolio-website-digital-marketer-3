'use client'

import Link from 'next/link'
import { ExternalLink, Mail, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { scrollToPosition } from '@/lib/animations/lenis'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: ExternalLink },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: ExternalLink },
  { name: 'Twitter', href: 'https://twitter.com', icon: ExternalLink },
  { name: 'Email', href: 'mailto:hello@example.com', icon: Mail },
]

const footerLinks = {
  'Navigation': [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  'Legal': [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export const Footer = () => {
  const handleScrollToTop = () => {
    scrollToPosition(0, { duration: 1.2 })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-foreground mb-4 block">
              Portfolio
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Creating exceptional digital experiences through innovative design and 
              cutting-edge technology. Let&apos;s build something amazing together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          
          {/* Back to Top Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleScrollToTop}
            className="mt-4 sm:mt-0"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  )
}
