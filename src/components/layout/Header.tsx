'use client'

import { useState, useLayoutEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { scrollToElement } from '@/lib/animations/lenis'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
]

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home') // Default ke home section

  // Intersection Observer untuk mendeteksi section aktif
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const options = {
        root: null, // viewport
        rootMargin: '-20% 0px -20% 0px', // Section dianggap aktif jika 60% terlihat
        threshold: 0.5, // 50% section harus terlihat
      }

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setActiveSection(sectionId)
          }
        })
      }

      const observer = new IntersectionObserver(observerCallback, options)

      // Observe semua section
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(section => observer.observe(section))

      return () => {
        sections.forEach(section => observer.unobserve(section))
      }
    }
  }, [])

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      scrollToElement(href, { offset: -100 })
      setIsMobileMenuOpen(false)
    }
  }

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank')
    setIsMobileMenuOpen(false)
  }

  // Logika untuk menentukan tema header berdasarkan section aktif
  const isDarkSection = activeSection === 'home' // HeroSection adalah dark
  const isLightSection = ['about', 'work', 'contact'].includes(activeSection)

  // Logika untuk menampilkan menu text atau burger
  const showTextMenu = isDarkSection && !isMobileMenuOpen
  const showBurgerMenu = isLightSection || isMobileMenuOpen

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Copyright - Adaptif berdasarkan section aktif */}
            <div className={cn(
              "text-sm transition-colors duration-300",
              isDarkSection ? "text-foreground-light" : "text-foreground"
            )}>
              © Adhara Eka Sakti
            </div>

            {/* Desktop Navigation - Menu Text (hanya di Hero Section) */}
            {showTextMenu && (
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleSmoothScroll(item.href)
                      }}
                      className="text-sm text-foreground-light hover:text-foreground-light/80 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Burger Menu Button - Adaptif berdasarkan section aktif */}
            {showBurgerMenu && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  // Adaptasi warna berdasarkan section aktif
                  isDarkSection 
                    ? "bg-foreground-light hover:bg-foreground-light/90" // Light button on dark section
                    : "bg-foreground hover:bg-foreground/90" // Dark button on light section
                )}
                aria-label="Open menu"
              >
                <Menu className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  isDarkSection 
                    ? "text-background-dark" // Dark icon on light button
                    : "text-background" // Light icon on dark button
                )} />
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-1/3 max-w-md bg-background-dark z-50 shadow-2xl">
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 bg-foreground-light rounded-full flex items-center justify-center hover:bg-foreground-light/90 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-background-dark" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="pt-24 px-8">
              <nav className="space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleSmoothScroll(item.href)
                    }}
                    className="block text-lg font-medium text-foreground-light hover:text-foreground-light/80 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-medium text-foreground-light mb-4">Follow</h3>
                <div className="space-y-4">
                  {socials.map((social) => (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social.href)}
                      className="block text-base text-foreground-light hover:text-foreground-light/80 transition-colors duration-200"
                    >
                      {social.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo/Brand */}
              <div className="absolute bottom-8 left-8">
                <div className="text-sm text-foreground-light">
                  © Adhara Eka Sakti
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
