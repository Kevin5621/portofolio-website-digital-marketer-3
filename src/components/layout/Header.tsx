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
  { name: 'CV', href: '#cv' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
]

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home') // Default ke home section
  const [isMenuSliding, setIsMenuSliding] = useState(false)
  const [isMenuEntering, setIsMenuEntering] = useState(false)

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
      // Tutup menu dengan animasi yang sama seperti handleCloseMenu
      if (isMobileMenuOpen) {
        handleCloseMenu()
      }
    }
  }

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank')
    // Tutup menu dengan animasi yang sama seperti handleCloseMenu
    if (isMobileMenuOpen) {
      handleCloseMenu()
    }
  }

  const handleOpenMenu = () => {
    setIsMobileMenuOpen(true)
    setIsMenuEntering(true) // Mulai dengan animasi masuk
    setIsMenuSliding(false) // Reset sliding state
    
    // Setelah sedikit delay, hilangkan state entering untuk animasi smooth
    setTimeout(() => {
      setIsMenuEntering(false)
    }, 50) // 50ms delay agar animasi terdeteksi
  }

  const handleCloseMenu = () => {
    setIsMenuSliding(true) // Mulai animasi slide keluar
    
    // Tunggu animasi selesai baru close menu
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsMenuSliding(false)
      setIsMenuEntering(false)
    }, 1000) // 1000ms sesuai durasi animasi
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
              {/* Menu Text - Setiap item bergerak lurus ke kanan */}
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
                      handleSmoothScroll(item.href)
                    }}
                    className={cn(
                      "text-2xl text-foreground-light hover:text-foreground-light/80 transition-all duration-1000 ease-out",
                      "transform hover:scale-105 hover:-translate-y-0.5",
                      // Bergerak lurus ke kanan tanpa flip
                      showTextMenu 
                        ? "opacity-100 translate-x-0 scale-100" 
                        : "opacity-0 translate-x-96 scale-0"
                    )}
                    style={{
                      // Staggered animation untuk efek berurutan
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

              {/* Burger Button - Expanding dari tengah */}
              <div 
                className={cn(
                  "absolute top-1/2 right-0 transform -translate-y-1/2 transition-all duration-1000 ease-out",
                  showBurgerMenu 
                    ? "opacity-100 scale-100 translate-x-0" 
                    : "opacity-0 scale-0 translate-x-0 pointer-events-none"
                )}
                style={{
                  // Burger muncul setelah semua teks bergerak
                  transitionDelay: showBurgerMenu ? '600ms' : '0ms',
                  transitionDuration: showBurgerMenu ? '800ms' : '400ms'
                }}
              >
                <button
                  onClick={handleOpenMenu}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                    "transform hover:scale-105 active:scale-95",
                    // Background lingkaran tanpa efek kelip-kelip
                    isDarkSection 
                      ? "bg-foreground-light hover:bg-foreground-light/90 shadow-lg hover:shadow-xl" 
                      : "bg-foreground hover:bg-foreground/90 shadow-xl hover:shadow-2xl"
                  )}
                  aria-label="Open menu"
                >
                  {/* Menu Icon tanpa efek kelip-kelip */}
                  <Menu className={cn(
                    "h-10 w-10 transition-all duration-300",
                    isDarkSection 
                      ? "text-background-dark" 
                      : "text-background"
                  )} />
                </button>
              </div>
            </div>

            {/* Mobile Burger Button - Lingkaran tanpa efek kelip-kelip */}
            <div className="md:hidden">
              <button
                onClick={handleOpenMenu}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                  "transform hover:scale-105 active:scale-95",
                  isDarkSection 
                    ? "bg-foreground-light hover:bg-foreground-light/90" 
                    : "bg-foreground hover:bg-foreground/90"
                )}
                aria-label="Open menu"
              >
                <Menu className={cn(
                  "h-8 w-8 transition-all duration-300",
                  isDarkSection 
                    ? "text-background-dark" 
                    : "text-background"
                )} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Sidebar - Smooth slide animation seperti IntroSlideUp */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop dengan fade animation yang konsisten */}
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
          
          {/* Close Button - Moved outside sidebar untuk memastikan bisa diklik */}
          <div className={cn(
            "fixed top-6 right-6 z-[60] transition-all duration-700 ease-out",
            (isMenuEntering || isMenuSliding) ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}>
            <button
              onClick={handleCloseMenu}
              className="w-16 h-16 rounded-full bg-foreground-light hover:bg-foreground-light/90 transition-colors duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-8 w-8 text-background-dark" />
            </button>
          </div>
          
          {/* Sidebar - Smooth slide animation masuk dan keluar dengan gaya yang sama */}
          <div 
            className={cn(
              "fixed top-0 right-0 h-full w-1/3 bg-background-dark z-50 shadow-2xl",
              "transition-all duration-1000 ease-out",
              // Kondisi animasi: entering atau sliding = slide out, normal = slide in
              (isMenuEntering || isMenuSliding) 
                ? "translate-x-full rounded-l-[1500px]" 
                : "translate-x-0 rounded-none"
            )}
          >

            {/* Navigation Content dengan staggered smooth animation */}
            <div className={cn(
              "pt-20 px-8 pl-12 transition-all duration-800 ease-out",
              (isMenuEntering || isMenuSliding) 
                ? "opacity-0 translate-x-16" 
                : "opacity-100 translate-x-0"
            )}>
              {/* Navigation Header */}
              <div className={cn(
                "mb-8 transition-all duration-600 ease-out delay-100",
                (isMenuEntering || isMenuSliding) 
                  ? "opacity-0 translate-x-8" 
                  : "opacity-100 translate-x-0"
              )}>
                <h2 className="text-sm font-medium text-foreground-light mb-2">Navigation</h2>
                <div className="w-8 h-px bg-foreground-light/50"></div>
              </div>

              {/* Navigation Links dengan staggered smooth animation */}
              <nav className="space-y-8 mb-12">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleSmoothScroll(item.href)
                    }}
                    className={cn(
                      "block text-6xl font-bold text-foreground-light hover:text-foreground-light/80 transition-all duration-700 ease-out leading-tight",
                      (isMenuEntering || isMenuSliding) 
                        ? "opacity-0 translate-x-12" 
                        : "opacity-100 translate-x-0"
                    )}
                    style={{
                      transitionDelay: (isMenuEntering || isMenuSliding) 
                        ? `${index * 50}ms` 
                        : `${200 + index * 100}ms`
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Social Links dengan smooth animation */}
              <div className={cn(
                "pt-8 border-t border-foreground-light/30 transition-all duration-600 ease-out delay-500",
                (isMenuEntering || isMenuSliding) 
                  ? "opacity-0 translate-x-8" 
                  : "opacity-100 translate-x-0"
              )}>
                <h3 className="text-sm font-medium text-foreground-light mb-4">Socials</h3>
                <div className="w-8 h-px bg-foreground-light/50 mb-4"></div>
                <div className="flex space-x-8">
                  {socials.map((social, index) => (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social.href)}
                      className={cn(
                        "text-2xl text-foreground-light hover:text-foreground-light/80 transition-all duration-500 ease-out",
                        (isMenuEntering || isMenuSliding) 
                          ? "opacity-0 translate-y-4" 
                          : "opacity-100 translate-y-0"
                      )}
                      style={{
                        transitionDelay: (isMenuEntering || isMenuSliding) 
                          ? `${index * 50}ms` 
                          : `${600 + index * 100}ms`
                      }}
                    >
                      {social.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo/Brand dengan smooth animation */}
              <div className={cn(
                "absolute bottom-8 left-8 transition-all duration-500 ease-out delay-700",
                (isMenuEntering || isMenuSliding) 
                  ? "opacity-0 translate-y-4" 
                  : "opacity-100 translate-y-0"
              )}>
                <div className="text-xs text-foreground-light">
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
