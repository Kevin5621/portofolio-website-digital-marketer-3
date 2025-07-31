'use client'

import { useState, useLayoutEffect, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { scrollToElement } from '@/lib/animations/lenis'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/ui/magnetic'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Work', href: '/work' },
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
    
    // Setelah animasi masuk selesai, hilangkan state entering
    setTimeout(() => {
      setIsMenuEntering(false)
    }, 100) // lebih responsive dan jangan diubah
  }

  const handleCloseMenu = () => {
    setIsMenuSliding(true) // Mulai animasi slide keluar
    
    // Tunggu animasi selesai baru close menu
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsMenuSliding(false)
      setIsMenuEntering(false)
    }, 600)
  }

  // Logika untuk menentukan tema header berdasarkan section aktif
  const isDarkSection = activeSection === 'home' // HeroSection adalah dark
  const isLightSection = ['about', 'work', 'contact'].includes(activeSection)
  const [isWorkPage, setIsWorkPage] = useState(false)

  useEffect(() => {
    setIsWorkPage(window.location.pathname === '/work')
  }, [])

  // Logika untuk menampilkan menu text atau burger
  // Versi 1: Menu text putih (dark section)
  const showTextMenuWhite = isDarkSection && !isMobileMenuOpen && !isWorkPage
  // Versi 2: Burger menu hitam (light section)
  const showBurgerMenu = (isLightSection || isMobileMenuOpen) && !isWorkPage
  // Versi 3: Menu text hitam (work page)
  const showTextMenuBlack = isWorkPage && !isMobileMenuOpen
  // Versi 4: Burger menu putih (work page mobile)
  const showBurgerMenuWhite = isWorkPage && isMobileMenuOpen

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="w-full px-8 py-12">
          <div className="flex items-center justify-between">
            {/* Copyright - Adaptif berdasarkan section aktif */}
            <div className={cn(
              "text-2xl transition-colors duration-300",
              (isDarkSection && !isWorkPage) ? "text-foreground-light" : "text-foreground"
            )}>
              © Adhara Eka Sakti
            </div>

            {/* Navigation Container - Selalu ada untuk animasi seamless */}
            <div className="hidden md:block relative">
              {/* Menu Text Putih - Versi 1 (dark section) */}
              <div 
                className={cn(
                  "flex items-baseline space-x-12 transition-all duration-1000 ease-out",
                  !showTextMenuWhite && "pointer-events-none"
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
                      "text-2xl text-foreground-light hover:text-foreground-light/80 transition-all duration-1000 ease-out",
                      "transform hover:scale-105 hover:-translate-y-0.5",
                      // Bergerak lurus ke kanan tanpa flip
                      showTextMenuWhite 
                        ? "opacity-100 translate-x-0 scale-100" 
                        : "opacity-0 translate-x-96 scale-0"
                    )}
                    style={{
                      // Staggered animation untuk efek berurutan
                      transitionDelay: showTextMenuWhite 
                        ? `${index * 100}ms` 
                        : `${(navigation.length - index - 1) * 150}ms`,
                      transitionDuration: showTextMenuWhite ? '800ms' : '1200ms',
                    } as React.CSSProperties}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Menu Text Hitam - Versi 3 (work page) */}
              <div 
                className={cn(
                  "flex items-baseline space-x-12 transition-all duration-1000 ease-out",
                  !showTextMenuBlack && "pointer-events-none"
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
                      "text-2xl text-foreground hover:text-foreground/80 transition-all duration-1000 ease-out",
                      "transform hover:scale-105 hover:-translate-y-0.5",
                      // Bergerak lurus ke kanan tanpa flip
                      showTextMenuBlack 
                        ? "opacity-100 translate-x-0 scale-100" 
                        : "opacity-0 translate-x-96 scale-0"
                    )}
                    style={{
                      // Staggered animation untuk efek berurutan
                      transitionDelay: showTextMenuBlack 
                        ? `${index * 100}ms` 
                        : `${(navigation.length - index - 1) * 150}ms`,
                      transitionDuration: showTextMenuBlack ? '800ms' : '1200ms',
                    } as React.CSSProperties}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Burger Button Hitam - Versi 2 (light section) */}
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
                    // Background lingkaran hitam
                    "bg-foreground hover:bg-foreground/90 shadow-xl hover:shadow-2xl"
                  )}
                  aria-label="Open menu"
                >
                  {/* Menu Icon hitam */}
                  <Menu className="h-10 w-10 transition-all duration-300 text-background" />
                </button>
              </div>

              {/* Burger Button Putih - Versi 4 (work page) */}
              <div 
                className={cn(
                  "absolute top-1/2 right-0 transform -translate-y-1/2 transition-all duration-1000 ease-out",
                  showBurgerMenuWhite 
                    ? "opacity-100 scale-100 translate-x-0" 
                    : "opacity-0 scale-0 translate-x-0 pointer-events-none"
                )}
                style={{
                  // Burger muncul setelah semua teks bergerak
                  transitionDelay: showBurgerMenuWhite ? '600ms' : '0ms',
                  transitionDuration: showBurgerMenuWhite ? '800ms' : '400ms'
                }}
              >
                <button
                  onClick={handleOpenMenu}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                    "transform hover:scale-105 active:scale-95",
                    // Background lingkaran putih
                    "bg-foreground-light hover:bg-foreground-light/90 shadow-lg hover:shadow-xl"
                  )}
                  aria-label="Open menu"
                >
                  {/* Menu Icon putih */}
                  <Menu className="h-10 w-10 transition-all duration-300 text-background-dark" />
                </button>
              </div>
            </div>

            {/* Mobile Burger Button - Adaptif berdasarkan halaman */}
            <div className="md:hidden">
              <button
                onClick={handleOpenMenu}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                  "transform hover:scale-105 active:scale-95",
                  isDarkSection || isWorkPage
                    ? "bg-foreground-light hover:bg-foreground-light/90" 
                    : "bg-foreground hover:bg-foreground/90"
                )}
                aria-label="Open menu"
              >
                <Menu className={cn(
                  "h-8 w-8 transition-all duration-300",
                  isDarkSection || isWorkPage
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
          
          {/* Close Button dengan Magnetic Effect 2 Layer */}
          <div className={cn(
            "fixed top-8 right-8 z-[60] transition-all duration-700 ease-out",
            (isMenuEntering || isMenuSliding) ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}>
            {/* Layer 1: Card Magnetic Effect (zona lebih besar) */}
            <Magnetic 
              strength={0.2} 
              range={100} 
              onlyOnHover={true}
              className="inline-block"
            >
              {/* Layer 2: Icon Magnetic Effect (lebih sensitif) */}
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
          
          {/* Sidebar - Layout persis dengan gambar */}
          <div 
            className={cn(
              "fixed top-0 right-0 h-full w-1/3 bg-background-dark z-50 shadow-2xl",
              "transition-all duration-800 ease-out",
              // Animasi slide yang lebih cepat dan responsif: 
              // - Masuk: slide dari kanan ke kiri dengan rounded corner
              // - Keluar: slide ke kanan dengan rounded corner yang membesar
              isMenuEntering 
                ? "translate-x-full rounded-l-[1500px]" 
                : isMenuSliding
                ? "translate-x-full rounded-l-[1500px]"
                : "translate-x-0 rounded-none"
            )}
          >

            {/* Navigation Content dengan layout persis gambar */}
            <div className={cn(
              "pt-24 px-8 pl-12 transition-all duration-800 ease-out",
              isMenuEntering 
                ? "opacity-0 translate-x-16" 
                : isMenuSliding
                ? "opacity-0 translate-x-16"
                : "opacity-100 translate-x-0"
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

              {/* Navigation Links dengan staggered animation dan magnetic effect */}
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

              {/* Social Links dengan layout persis gambar */}
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

              {/* Logo/Brand dengan animation yang lebih responsif */}
              <div className={cn(
                "absolute bottom-8 left-8 transition-all duration-800 ease-out delay-400",
                isMenuSliding
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              )}>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
