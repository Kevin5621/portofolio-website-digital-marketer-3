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

  // Helper function untuk menentukan posisi Y akhir setiap menu item
  const getEndYPosition = (index: number): string => {
    switch (index) {
      case 0: return '-16px'
      case 1: return '-8px'
      case 2: return '8px'
      case 3: return '16px'
      default: return '0px'
    }
  }

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

      // Backup: Scroll event listener untuk mendeteksi section
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2
        
        const sections = document.querySelectorAll('section[id]')
        let currentSection = 'home'
        
        sections.forEach(section => {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          const sectionBottom = sectionTop + rect.height
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            currentSection = section.id
          }
        })
        
        setActiveSection(currentSection)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        sections.forEach(section => observer.unobserve(section))
        window.removeEventListener('scroll', handleScroll)
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
  // Menu text hanya muncul di HeroSection (dark section)
  const showTextMenu = isDarkSection && !isMobileMenuOpen
  // Burger menu muncul di semua section light (about, work, contact) atau saat mobile menu terbuka
  const showBurgerMenu = isLightSection || isMobileMenuOpen

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="w-full px-8 py-12">
          <div className="flex items-center justify-between">
            {/* Copyright - Adaptif berdasarkan section aktif */}
            <div className={cn(
              "text-2xl transition-colors duration-300",
              isDarkSection ? "text-foreground-light" : "text-foreground"
            )}>
              © Adhara Eka Sakti
            </div>

            {/* Navigation Container - Selalu ada untuk animasi seamless */}
            <div className="hidden md:block relative">
              {/* Menu Text - Setiap item bergerak ke posisi burger button */}
              <div 
                className={cn(
                  "flex items-baseline space-x-12 transition-all duration-1000 ease-convergence",
                  !showTextMenu && "pointer-events-none"
                )}
              >
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleSmoothScroll(item.href)
                    }}
                    className={cn(
                      "text-2xl text-foreground-light hover:text-foreground-light/80 transition-all duration-1000 ease-morph",
                      "transform hover:scale-105 hover:-translate-y-0.5",
                      // Setiap item bergerak ke posisi burger dengan path berbeda
                      showTextMenu 
                        ? "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0 skew-x-0" 
                        : cn(
                          "opacity-0 scale-0 skew-x-12",
                          // Path yang berbeda untuk setiap menu item menuju ke burger
                          index === 0 && "translate-x-96 -translate-y-4 rotate-45",
                          index === 1 && "translate-x-96 -translate-y-2 rotate-90", 
                          index === 2 && "translate-x-96 translate-y-2 rotate-135",
                          index === 3 && "translate-x-96 translate-y-4 rotate-180"
                        )
                    )}
                    style={{
                      // Staggered animation untuk efek berurutan
                      transitionDelay: showTextMenu 
                        ? `${index * 100}ms` 
                        : `${(navigation.length - index - 1) * 150}ms`,
                      transitionDuration: showTextMenu ? '800ms' : '1200ms',
                      // Custom CSS variables untuk path animation
                      '--start-x': '0px',
                      '--end-x': '384px', // translate-x-96 = 384px
                      '--start-y': '0px',
                      '--end-y': getEndYPosition(index)
                    } as React.CSSProperties}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Burger Button - Muncul dari konvergensi semua teks */}
              <div 
                className={cn(
                  "absolute top-1/2 right-0 transform -translate-y-1/2 transition-all duration-1000 ease-spring",
                  showBurgerMenu 
                    ? "opacity-100 scale-100 translate-x-0 rotate-0" 
                    : "opacity-0 scale-0 -translate-x-96 -rotate-180 pointer-events-none"
                )}
                style={{
                  // Burger muncul setelah semua teks bergerak
                  transitionDelay: showBurgerMenu ? '600ms' : '0ms',
                  transitionDuration: showBurgerMenu ? '800ms' : '400ms'
                }}
              >
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ease-bounce-in",
                    "transform hover:scale-110 active:scale-95",
                    "relative overflow-hidden group",
                    // Adaptasi warna berdasarkan section aktif
                    isDarkSection 
                      ? "bg-foreground-light hover:bg-foreground-light/90 shadow-lg hover:shadow-xl" 
                      : "bg-foreground hover:bg-foreground/90 shadow-xl hover:shadow-2xl"
                  )}
                  aria-label="Open menu"
                >
                  {/* Background morphing effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-20",
                    "bg-gradient-radial",
                    isDarkSection 
                      ? "from-background-dark/50 to-transparent"
                      : "from-background/50 to-transparent"
                  )} />

                  {/* Burger Icon dengan magnetic effect */}
                  <div className="relative">
                    <Menu className={cn(
                      "h-10 w-10 transition-all duration-500 ease-magnetic",
                      "group-hover:rotate-180 group-hover:scale-110 group-active:scale-90",
                      "filter group-hover:drop-shadow-lg",
                      isDarkSection 
                        ? "text-background-dark" 
                        : "text-background"
                    )} />
                    
                    {/* Convergence effect - partikel dari teks yang berkumpul */}
                    <div className={cn(
                      "absolute inset-0 rounded-full transition-all duration-700 opacity-0 group-active:opacity-40",
                      "animate-pulse group-active:animate-ping",
                      isDarkSection 
                        ? "bg-background-dark" 
                        : "bg-background"
                    )} />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Burger Button - Selalu terlihat di mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                  "transform hover:scale-110 active:scale-95 group relative overflow-hidden",
                  isDarkSection 
                    ? "bg-foreground-light hover:bg-foreground-light/90" 
                    : "bg-foreground hover:bg-foreground/90"
                )}
                aria-label="Open menu"
              >
                {/* Mobile background pulse effect */}
                <div className={cn(
                  "absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-20",
                  isDarkSection 
                    ? "bg-background-dark" 
                    : "bg-background"
                )} />

                <Menu className={cn(
                  "h-8 w-8 transition-all duration-300 relative z-10",
                  "group-hover:rotate-45 group-active:scale-90",
                  isDarkSection 
                    ? "text-background-dark" 
                    : "text-background"
                )} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <button
            className="fixed inset-0 z-40 bg-black/20 cursor-default"
            onClick={() => setIsMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsMobileMenuOpen(false)
              }
            }}
            aria-label="Close menu"
            tabIndex={-1}
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
