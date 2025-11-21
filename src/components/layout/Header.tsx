'use client'

import { useState, useLayoutEffect, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion} from 'framer-motion'
import { scrollToElement } from '@/lib/animations/lenis'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/ui/magnetic'
import { PDFViewer } from '@/components/ui/pdf-viewer'

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
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)

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
        // Filter entries yang intersecting dan urutkan berdasarkan z-index
        const intersectingEntries = entries.filter(entry => entry.isIntersecting)
        
        if (intersectingEntries.length > 0) {
          // Urutkan berdasarkan z-index (yang tertinggi di atas)
          const sortedEntries = intersectingEntries.sort((a, b) => {
            const aElement = a.target as HTMLElement
            const bElement = b.target as HTMLElement
            
            const aZIndex = parseInt(window.getComputedStyle(aElement).zIndex) || 0
            const bZIndex = parseInt(window.getComputedStyle(bElement).zIndex) || 0
            
            return bZIndex - aZIndex // Descending order
          })
          
          // Ambil section dengan z-index tertinggi
          const highestZIndexSection = sortedEntries[0]
          const sectionId = highestZIndexSection.target.id
          setActiveSection(sectionId)
        }
      }

      const observer = new IntersectionObserver(observerCallback, options)

      // Scroll-based fallback untuk deteksi section dengan z-index tertinggi
      const handleScroll = () => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return
        
        const scrollY = window.scrollY
        const sections = document.querySelectorAll('section[id]')
        const intersectingSections: Array<{element: Element, zIndex: number}> = []
        
        sections.forEach(section => {
          const rect = section.getBoundingClientRect()
          const sectionTop = scrollY + rect.top
          const sectionHeight = rect.height
          const windowHeight = window.innerHeight
          
          // Check if we're in the section (dengan margin untuk transisi smooth)
          if (scrollY >= sectionTop - windowHeight * 0.3 && 
              scrollY < sectionTop + sectionHeight - windowHeight * 0.3) {
            const sectionElement = section as HTMLElement
            const zIndex = parseInt(window.getComputedStyle(sectionElement).zIndex) || 0
            intersectingSections.push({ element: section, zIndex })
          }
        })
        
        // Ambil section dengan z-index tertinggi
        if (intersectingSections.length > 0) {
          const highestZIndexSection = intersectingSections.sort((a, b) => b.zIndex - a.zIndex)[0]
          const sectionId = highestZIndexSection.element.id
          if (sectionId !== activeSection) {
            setActiveSection(sectionId)
          }
        }
      }

      // Observe semua section
      let sections: NodeListOf<Element> | null = null
      if (typeof document !== 'undefined') {
        sections = document.querySelectorAll('section[id]')
        sections.forEach(section => observer.observe(section))
      }

      // Add scroll listener sebagai backup
      window.addEventListener('scroll', handleScroll, { passive: true })

      // Fallback: Pastikan section pertama terdeteksi di awal
      setTimeout(() => {
        if (sections && sections[0]) {
          const firstSection = sections[0]
          if (firstSection && !activeSection) {
            setActiveSection(firstSection.id)
          }
        }
      }, 100)

      return () => {
        if (sections) {
          sections.forEach(section => observer.unobserve(section))
        }
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

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCVModalOpen(true)
    if (isMobileMenuOpen) {
      handleCloseMenu()
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

  // Sistem adaptif berdasarkan section aktif dengan z-index tertinggi
  const getSectionTheme = (sectionId: string) => {
    // Jika di server-side, return default
    if (typeof window === 'undefined') {
      return { isDark: false }
    }

    // Contact section - Background putih (z-index tertinggi)
    if (sectionId === 'contact') {
      return { isDark: false }
    }

    // HeroSection (home) - Background hitam
    if (sectionId === 'home') {
      return { isDark: true }
    }
    
    // Project sections dengan gambar - Variant terang untuk navbar (prioritas tinggi)
    if (sectionId === 'ortist-specialist' || sectionId === 'rumah-bahasa-asing' || sectionId === 'binjasiimen-samapta') {
      return { isDark: false }
    }
    
    // Project sections - Background dengan gambar (light theme untuk burger)
    if (sectionId === 'project-1' || sectionId === 'project-2' || sectionId === 'project-3') {
      return { isDark: false }
    }
    
    // AboutSection - Background putih
    if (sectionId === 'about' || sectionId === 'about-section') {
      return { isDark: false }
    }
    
    // About section transitions dengan background hitam (surface-inverse)
    if (sectionId === 'also' || sectionId === 'content-creator' || 
        sectionId === 'brands' || sectionId === 'about-section-2' ||
        sectionId === 'about-section-3' || sectionId === 'about-section-4' ||
        sectionId === 'about-section-5' || sectionId === 'finally' ||
        sectionId === 'flexible-approach') {
      return { isDark: true }
    }
    
    // About section transitions dengan background putih (surface-background)
    if (sectionId === 'oh-also' || sectionId === 'graphic-designer') {
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
  const [isContactPage, setIsContactPage] = useState(false)

  useEffect(() => {
    setIsWorkPage(window.location.pathname === '/work')
    setIsContactPage(window.location.pathname === '/contact')
  }, [])

  const { isDark } = getSectionTheme(activeSection)

  // Logika untuk menampilkan menu berdasarkan section aktif
  // Menu text hanya muncul di home section, di section lain transform menjadi burger
  const isHomeSection = activeSection === 'home' || activeSection === 'hello' || activeSection === ''
  const isSelectedWorksProjectSection = activeSection === 'ortist-specialist' || activeSection === 'rumah-bahasa-asing' || activeSection === 'binjasiimen-samapta'
  const isProjectSection = activeSection === 'project-1' || activeSection === 'project-2' || activeSection === 'project-3'
  const isAboutSection = activeSection === 'about' || activeSection === 'about-section'
  const isContactSection = activeSection === 'contact'
  const isAboutTransitionSection = activeSection === 'also' || activeSection === 'content-creator' || 
                                   activeSection === 'brands' || activeSection === 'about-section-2' ||
                                   activeSection === 'about-section-3' || activeSection === 'about-section-4' ||
                                   activeSection === 'about-section-5' || activeSection === 'finally' ||
                                   activeSection === 'flexible-approach' || activeSection === 'oh-also' ||
                                   activeSection === 'graphic-designer'
  const showTextMenu = isHomeSection && !isMobileMenuOpen && !isWorkPage && !isContactPage && !isProjectSection && !isAboutSection && !isContactSection && !isAboutTransitionSection && !isSelectedWorksProjectSection && isClient
  const showBurgerMenu = (!isHomeSection) || isMobileMenuOpen || isWorkPage || isContactPage || isProjectSection || isAboutSection || isContactSection || isAboutTransitionSection || isSelectedWorksProjectSection

  // Helper functions untuk styling berdasarkan section
  const getCopyrightTextClass = () => {
    // Project sections dengan gambar - Variant putih untuk navbar (copyright text putih)
    if (activeSection === 'ortist-specialist' || activeSection === 'rumah-bahasa-asing' || activeSection === 'binjasiimen-samapta') {
      return "text-foreground-light"
    }
    if (activeSection === 'project-1' || activeSection === 'project-2' || activeSection === 'project-3') {
      return "text-white"
    }
    if (activeSection === 'about' || activeSection === 'about-section' || activeSection === 'contact' || isContactPage) {
      return "text-foreground"
    }
    // About transition sections dengan background hitam
    if (activeSection === 'also' || activeSection === 'content-creator' || 
        activeSection === 'brands' || activeSection === 'finally' ||
        activeSection === 'flexible-approach' || isDark) {
      return "text-foreground-light"
    }
    // About transition sections dengan background putih
    if (activeSection === 'oh-also' || activeSection === 'graphic-designer') {
      return "text-foreground"
    }
    return "text-foreground"
  }

  const getBurgerBgClass = () => {
    // Project sections dengan gambar - Variant putih (prioritas tinggi)
    if (activeSection === 'ortist-specialist' || activeSection === 'rumah-bahasa-asing' || activeSection === 'binjasiimen-samapta') {
      return "bg-white hover:bg-gray-100"
    }
    if (activeSection === 'project-1' || activeSection === 'project-2' || activeSection === 'project-3') {
      return "bg-white hover:bg-gray-100"
    }
    if (activeSection === 'about' || activeSection === 'about-section' || activeSection === 'contact' || isContactPage) {
      return "bg-foreground hover:bg-foreground/90" // About dan Contact section menggunakan light background
    }
    // About transition sections dengan background hitam
    if (activeSection === 'also' || activeSection === 'content-creator' || 
        activeSection === 'brands' || activeSection === 'finally' ||
        activeSection === 'flexible-approach' || isDark) {
      return "bg-foreground-light hover:bg-foreground-light/90" // About transition sections menggunakan dark background
    }
    // About transition sections dengan background putih
    if (activeSection === 'oh-also' || activeSection === 'graphic-designer') {
      return "bg-foreground hover:bg-foreground/90"
    }
    return "bg-foreground hover:bg-foreground/90"
  }

  const getBurgerTextClass = () => {
    // Project sections dengan gambar - Variant putih dengan text hitam (prioritas tinggi)
    if (activeSection === 'ortist-specialist' || activeSection === 'rumah-bahasa-asing' || activeSection === 'binjasiimen-samapta') {
      return "text-black"
    }
    if (activeSection === 'project-1' || activeSection === 'project-2' || activeSection === 'project-3') {
      return "text-black"
    }
    if (activeSection === 'about' || activeSection === 'about-section' || activeSection === 'contact' || isContactPage) {
      return "text-background" // About dan Contact section menggunakan dark text
    }
    // About transition sections dengan background hitam
    if (activeSection === 'also' || activeSection === 'content-creator' || 
        activeSection === 'brands' || activeSection === 'finally' ||
        activeSection === 'flexible-approach' || isDark) {
      return "text-background-dark" // About transition sections menggunakan light text
    }
    // About transition sections dengan background putih
    if (activeSection === 'oh-also' || activeSection === 'graphic-designer') {
      return "text-background"
    }
    return "text-background"
  }

  const getSidebarTransformClass = () => {
    if (isMenuEntering) return "translate-x-full rounded-l-[1500px]"
    if (isMenuSliding) return "translate-x-full rounded-l-[1500px]"
    return "translate-x-0 rounded-none"
  }

  // Jika belum di client, render dengan default state
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[999] bg-transparent">
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
      <header className="fixed top-0 left-0 right-0 z-[999] bg-transparent">
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
                      if (item.name === 'CV') {
                        handleCVClick(e)
                      } else if (item.href.startsWith('/')) {
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
            "fixed top-8 right-8 z-[1001] transition-all duration-700 ease-out",
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
              "fixed top-0 right-0 h-full w-1/3 bg-background-dark z-[1000] shadow-2xl",
              "transition-all duration-800 ease-out",
              getSidebarTransformClass()
            )}
          >
            {/* Navigation Content */}
            <motion.div 
              className="pt-24 px-8 pl-12"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isMenuEntering || isMenuSliding ? 0 : 1 
              }}
              transition={{ 
                duration: 0.6, 
                delay: isMenuSliding ? 0 : 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {/* Navigation Header */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isMenuSliding ? 0 : 1,
                  x: isMenuSliding ? 20 : 0
                }}
                transition={{ 
                  duration: 0.5,
                  delay: isMenuSliding ? 0 : 0.9,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="mb-8"
              >
                <h2 className="text-sm font-medium text-gray-400 mb-2">Navigation</h2>
                <motion.div
                  initial={{ scaleX: 0, transformOrigin: 'right' }}
                  animate={{ 
                    scaleX: isMenuSliding ? 0 : 1,
                    transformOrigin: isMenuSliding ? 'left' : 'right'
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: isMenuSliding ? 0 : 0.95,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full h-px bg-gray-400"
                />
              </motion.div>

              {/* Navigation Links */}
              <nav className="mb-20">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: isMenuSliding ? 0 : 1,
                      x: isMenuSliding ? 20 : 0
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: isMenuSliding 
                        ? (navigation.length - index - 1) * 0.05 
                        : 0.95 + (index * 0.08),
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="mb-16"
                  >
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
                          if (item.name === 'CV') {
                            handleCVClick(e)
                          } else if (item.href.startsWith('/')) {
                            window.location.href = item.href
                          } else {
                            handleSmoothScroll(item.href)
                          }
                        }}
                        className="block text-5xl font-bold text-foreground-light hover:text-foreground-light/80 transition-all duration-300 ease-out leading-tight"
                      >
                        <span className="magnetic-text">{item.name}</span>
                      </Link>
                    </Magnetic>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isMenuSliding ? 0 : 1,
                  x: isMenuSliding ? 20 : 0
                }}
                transition={{ 
                  duration: 0.5,
                  delay: isMenuSliding ? 0 : 1.35,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="pt-12"
              >
                <h3 className="text-sm font-medium text-gray-400 mb-4">Socials</h3>
                <motion.div
                  initial={{ scaleX: 0, transformOrigin: 'right' }}
                  animate={{ 
                    scaleX: isMenuSliding ? 0 : 1,
                    transformOrigin: isMenuSliding ? 'left' : 'right'
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: isMenuSliding ? 0 : 1.4,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full h-px bg-gray-400 mb-4"
                />
                <div className="flex space-x-8">
                  {socials.map((social, index) => (
                    <motion.div
                      key={social.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: isMenuSliding ? 0 : 1,
                        y: isMenuSliding ? 10 : 0
                      }}
                      transition={{ 
                        duration: 0.4,
                        delay: isMenuSliding
                          ? (socials.length - index - 1) * 0.05
                          : 1.45 + (index * 0.08),
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      <Magnetic 
                        strength={0.25} 
                        range={60} 
                        onlyOnHover={true}
                        textStrength={0.4}
                        className="inline-block"
                      >
                        <button
                          onClick={() => handleSocialClick(social.href)}
                          className="text-lg text-foreground-light hover:text-foreground-light/80 transition-all duration-300 ease-out"
                        >
                          <span className="magnetic-text">{social.name}</span>
                        </button>
                      </Magnetic>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}

      {/* CV PDF Modal */}
      <PDFViewer
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        pdfUrl="/pdf/CV.pdf"
        title="Curriculum Vitae"
      />
    </>
  )
}
