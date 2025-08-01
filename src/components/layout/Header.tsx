'use client'

import { useState, useLayoutEffect, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { scrollToElement } from '@/lib/animations/lenis'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/ui/magnetic'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'CV', href: '#cv' },
  { name: 'Contact', href: '/contact' },
]

const socials = [
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
]

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMenuSliding, setIsMenuSliding] = useState(false)
  const [isMenuEntering, setIsMenuEntering] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set client flag untuk menghindari hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Intersection Observer untuk mendeteksi section aktif
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const options = {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Reduced margin untuk deteksi lebih sensitif
        threshold: 0.3, // Reduced threshold untuk deteksi lebih awal
      }

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            console.log('Section detected:', sectionId) // Debug log
            setActiveSection(sectionId)
          }
        })
      }

      const observer = new IntersectionObserver(observerCallback, options)

      // Scroll-based fallback untuk deteksi section
      const handleScroll = () => {
        const scrollY = window.scrollY
        const sections = document.querySelectorAll('section[id]')
        
        sections.forEach(section => {
          const rect = section.getBoundingClientRect()
          const sectionTop = scrollY + rect.top
          const sectionHeight = rect.height
          const windowHeight = window.innerHeight
          
          // Check if we're in the section (dengan margin untuk transisi smooth)
          if (scrollY >= sectionTop - windowHeight * 0.3 && 
              scrollY < sectionTop + sectionHeight - windowHeight * 0.3) {
            const sectionId = section.id
            if (sectionId !== activeSection) {
              console.log('Scroll detected section:', sectionId)
              setActiveSection(sectionId)
            }
          }
        })
      }

      // Observe semua section
      const sections = document.querySelectorAll('section[id]')
      console.log('Found sections:', Array.from(sections).map(s => s.id)) // Debug log
      sections.forEach(section => observer.observe(section))

      // Add scroll listener sebagai backup
      window.addEventListener('scroll', handleScroll, { passive: true })

      // Fallback: Pastikan section pertama terdeteksi di awal
      setTimeout(() => {
        const firstSection = sections[0]
        if (firstSection && !activeSection) {
          setActiveSection(firstSection.id)
        }
      }, 100)

      return () => {
        sections.forEach(section => observer.unobserve(section))
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [activeSection])

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      scrollToElement(href, { offset: -100 })
      if (isMobileMenuOpen) {
        handleCloseMenu()
      }
    }
  }

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank')
    if (isMobileMenuOpen) {
      handleCloseMenu()
    }
  }

  const handleOpenMenu = () => {
    setIsMobileMenuOpen(true)
    setIsMenuEntering(true)
    setIsMenuSliding(false)
    
    setTimeout(() => {
      setIsMenuEntering(false)
    }, 100)
  }

  const handleCloseMenu = () => {
    setIsMenuSliding(true)
    
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsMenuSliding(false)
      setIsMenuEntering(false)
    }, 600)
  }

  // Sistem adaptif berdasarkan section aktif
  const getSectionTheme = (sectionId: string) => {
    // Jika di server-side, return default
    if (typeof window === 'undefined') {
      return { isDark: false }
    }

    // HeroSection (home) - Background hitam
    if (sectionId === 'home') {
      return { isDark: true }
    }
    
    // Project sections - Background dengan gambar (light theme untuk burger)
    if (sectionId === 'project-1' || sectionId === 'project-2' || sectionId === 'project-3') {
      return { isDark: false }
    }
    
    // AboutSection - Background putih
    if (sectionId === 'about' || sectionId === 'about-section') {
      return { isDark: false }
    }
    
    // About page sections berdasarkan background class
    const section = document.getElementById(sectionId)
    if (section) {
      const hasDarkBg = section.classList.contains('bg-surface-inverse') || 
                        section.classList.contains('bg-background-dark')
      
      return { isDark: hasDarkBg }
    }
    
    // Default untuk section yang tidak terdeteksi
    return { isDark: false }
  }

  const [isWorkPage, setIsWorkPage] = useState(false)

  useEffect(() => {
    setIsWorkPage(window.location.pathname === '/work')
  }, [])

  const { isDark } = getSectionTheme(activeSection)

  // Logika untuk menampilkan menu berdasarkan section aktif
  // Menu text hanya muncul di home section, di section lain transform menjadi burger
  const isHomeSection = activeSection === 'home' || activeSection === 'hello' || activeSection === ''
  const isProjectSection = activeSection === 'project-1' || activeSection === 'project-2' || activeSection === 'project-3'
  const isAboutSection = activeSection === 'about' || activeSection === 'about-section'
  const showTextMenu = isHomeSection && !isMobileMenuOpen && !isWorkPage && !isProjectSection && !isAboutSection && isClient
  const showBurgerMenu = (!isHomeSection) || isMobileMenuOpen || isWorkPage || isProjectSection || isAboutSection

  // Debug logs
  useEffect(() => {
    console.log('Active section:', activeSection)
    console.log('isHomeSection:', isHomeSection)
    console.log('isAboutSection:', isAboutSection)
    console.log('showTextMenu:', showTextMenu)
    console.log('showBurgerMenu:', showBurgerMenu)
  }, [activeSection, isHomeSection, isAboutSection, showTextMenu, showBurgerMenu])

  // Helper functions untuk styling berdasarkan section
  const getCopyrightTextClass = () => {
    if (isProjectSection) return "text-white"
    if (isAboutSection) return "text-foreground"
    if (isDark) return "text-foreground-light"
    return "text-foreground"
  }

  const getBurgerBgClass = () => {
    if (isProjectSection) return "bg-white hover:bg-gray-100"
    if (isAboutSection) return "bg-foreground hover:bg-foreground/90" // About section menggunakan light background
    if (isDark) return "bg-foreground-light hover:bg-foreground-light/90"
    return "bg-foreground hover:bg-foreground/90"
  }

  const getBurgerTextClass = () => {
    if (isProjectSection) return "text-black"
    if (isAboutSection) return "text-background" // About section menggunakan dark text
    if (isDark) return "text-background-dark"
    return "text-background"
  }

  const getSidebarTransformClass = () => {
    if (isMenuEntering) return "translate-x-full rounded-l-[1500px]"
    if (isMenuSliding) return "translate-x-full rounded-l-[1500px]"
    return "translate-x-0 rounded-none"
  }

  const getContentTransformClass = () => {
    if (isMenuEntering) return "opacity-0 translate-x-16"
    if (isMenuSliding) return "opacity-0 translate-x-16"
    return "opacity-100 translate-x-0"
  }

  // Jika belum di client, render dengan default state
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="w-full px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="text-2xl text-foreground">
              © Adhara Eka Sakti
            </div>
            <div className="hidden md:block relative">
              <div className="flex items-baseline space-x-12">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-2xl text-foreground hover:text-foreground/80"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center">
                <Menu className="h-8 w-8 text-background" />
              </button>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="w-full px-8 py-12">
          <div className="flex items-center justify-between">
            {/* Copyright - Adaptif berdasarkan section aktif */}
            <div className={cn(
              "text-2xl transition-colors duration-300",
              getCopyrightTextClass()
            )}>
              © Adhara Eka Sakti
            </div>

            {/* Navigation Container */}
            <div className="hidden md:block relative">
              {/* Menu Text - Adaptif berdasarkan section aktif */}
              <div 
                className={cn(
                  "flex items-baseline space-x-12 transition-all duration-1000 ease-out",
                  !showTextMenu && "pointer-events-none"
                )}
              >
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      if (item.href.startsWith('/')) {
                        window.location.href = item.href
                      } else {
                        handleSmoothScroll(item.href)
                      }
                    }}
                    className={cn(
                      "text-2xl transition-all duration-1000 ease-out",
                      "transform hover:scale-105 hover:-translate-y-0.5",
                      // Warna text berdasarkan section
                      isDark 
                        ? "text-foreground-light hover:text-foreground-light/80" 
                        : "text-foreground hover:text-foreground/80",
                      // Animasi slide - Menu text hanya muncul di section pertama
                      showTextMenu 
                        ? "opacity-100 translate-x-0 scale-100" 
                        : "opacity-0 translate-x-96 scale-0"
                    )}
                    style={{
                      transitionDelay: showTextMenu 
                        ? `${index * 100}ms` 
                        : `${(navigation.length - index - 1) * 150}ms`,
                      transitionDuration: showTextMenu ? '800ms' : '1200ms',
                    } as React.CSSProperties}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Burger Button - Adaptif berdasarkan section aktif */}
              <div 
                className={cn(
                  "absolute top-1/2 right-0 transform -translate-y-1/2 transition-all duration-1000 ease-out",
                  showBurgerMenu 
                    ? "opacity-100 scale-100 translate-x-0" 
                    : "opacity-0 scale-0 translate-x-0 pointer-events-none"
                )}
                style={{
                  // Burger muncul setelah menu text hilang
                  transitionDelay: showBurgerMenu ? '400ms' : '0ms',
                  transitionDuration: showBurgerMenu ? '800ms' : '400ms'
                }}
              >
                <button
                  onClick={handleOpenMenu}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                    "transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl",
                    getBurgerBgClass()
                  )}
                  aria-label="Open menu"
                >
                  <Menu className={cn(
                    "h-10 w-10 transition-all duration-300",
                    getBurgerTextClass()
                  )} />
                </button>
              </div>
            </div>

            {/* Mobile Burger Button - Adaptif berdasarkan section aktif */}
            <div className="md:hidden">
              <button
                onClick={handleOpenMenu}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                  "transform hover:scale-105 active:scale-95",
                  getBurgerBgClass()
                )}
                aria-label="Open menu"
              >
                <Menu className={cn(
                  "h-8 w-8 transition-all duration-300",
                  getBurgerTextClass()
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
            className={cn(
              "fixed inset-0 z-40 bg-black/20 cursor-default transition-all duration-1000 ease-out",
              (isMenuEntering || isMenuSliding) ? "opacity-0" : "opacity-100"
            )}
            onClick={handleCloseMenu}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleCloseMenu()
              }
            }}
            aria-label="Close menu"
            tabIndex={-1}
          />
          
          {/* Close Button dengan Magnetic Effect */}
          <div className={cn(
            "fixed top-8 right-8 z-[60] transition-all duration-700 ease-out",
            (isMenuEntering || isMenuSliding) ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}>
            <Magnetic 
              strength={0.2} 
              range={100} 
              onlyOnHover={true}
              className="inline-block"
            >
              <Magnetic 
                strength={0.6} 
                range={60} 
                onlyOnHover={true} 
                textStrength={0.8}
                className="inline-block"
              >
                <button
                  onClick={handleCloseMenu}
                  className="w-20 h-20 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 flex items-center justify-center cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-10 w-10 text-gray-600 magnetic-text" />
                </button>
              </Magnetic>
            </Magnetic>
          </div>
          
          {/* Sidebar */}
          <div 
            className={cn(
              "fixed top-0 right-0 h-full w-1/3 bg-background-dark z-50 shadow-2xl",
              "transition-all duration-800 ease-out",
              getSidebarTransformClass()
            )}
          >
            {/* Navigation Content */}
            <div className={cn(
              "pt-24 px-8 pl-12 transition-all duration-800 ease-out",
              getContentTransformClass()
            )}>
              {/* Navigation Header */}
              <div className={cn(
                "mb-8 transition-all duration-800 ease-out",
                isMenuSliding
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
              )}>
                <h2 className="text-sm font-medium text-gray-400 mb-2">Navigation</h2>
                <div className="w-full h-px bg-gray-400"></div>
              </div>

              {/* Navigation Links */}
              <nav className="mb-20">
                {navigation.map((item, index) => (
                  <div key={item.name} className="mb-16">
                    <Magnetic 
                      strength={0.4} 
                      range={150} 
                      onlyOnHover={true} 
                      textStrength={0.6}
                      className="inline-block"
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          if (item.href.startsWith('/')) {
                            window.location.href = item.href
                          } else {
                            handleSmoothScroll(item.href)
                          }
                        }}
                        className={cn(
                          "block text-5xl font-bold text-foreground-light hover:text-foreground-light/80 transition-all duration-300 ease-out leading-tight",
                          isMenuSliding
                            ? "opacity-0 translate-x-12"
                            : "opacity-100 translate-x-0"
                        )}
                        style={{
                          transitionDelay: isMenuSliding
                            ? `${index * 25}ms`
                            : `${150 + index * 75}ms`
                        }}
                      >
                        <span className="magnetic-text">{item.name}</span>
                      </Link>
                    </Magnetic>
                  </div>
                ))}
              </nav>

              {/* Social Links */}
              <div className={cn(
                "pt-12 transition-all duration-800 ease-out delay-300",
                isMenuSliding
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
              )}>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Socials</h3>
                <div className="w-full h-px bg-gray-400 mb-4"></div>
                <div className="flex space-x-8">
                  {socials.map((social, index) => (
                    <Magnetic 
                      key={social.name}
                      strength={0.25} 
                      range={60} 
                      onlyOnHover={true}
                      textStrength={0.4}
                      className="inline-block"
                    >
                      <button
                        onClick={() => handleSocialClick(social.href)}
                        className={cn(
                          "text-lg text-foreground-light hover:text-foreground-light/80 transition-all duration-800 ease-out",
                          isMenuSliding
                            ? "opacity-0 translate-y-4"
                            : "opacity-100 translate-y-0"
                        )}
                        style={{
                          transitionDelay: isMenuSliding
                            ? `${index * 25}ms`
                            : `${350 + index * 75}ms`
                        }}
                      >
                        <span className="magnetic-text">{social.name}</span>
                      </button>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
