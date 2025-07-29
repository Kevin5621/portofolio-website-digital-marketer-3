'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUp } from 'lucide-react'
import { scrollToElement } from '@/lib/animations/lenis'
import { cn } from '@/lib/utils'
import { useHeader } from './HeaderContext'

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
  const { isWhite } = useHeader()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)



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



  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      >
        <nav className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Copyright */}
            <div className={cn(
              "text-sm",
              isWhite ? "text-foreground-light" : "text-foreground"
            )}>
              © Adhara Eka Sakti
            </div>

            {/* Desktop Navigation - Show when on hero section */}
            {isWhite && (
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

            {/* Burger Menu Button - Show when not on hero section */}
            {!isWhite && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 bg-foreground hover:bg-foreground/90"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-background" />
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
          <div
            className="fixed top-0 right-0 h-full w-1/3 max-w-md bg-background-dark z-50 shadow-2xl"
          >
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

              {/* Menu Content */}
              <div className="flex flex-col h-full px-8 pt-20">
                <div className="flex-1 space-y-12">
                  
                  {/* Navigation Section */}
                  <div className="space-y-6">
<div className="text-sm text-muted-foreground font-medium">   
                    Navigation
                  </div>
                  <div className="h-px bg-border"></div>
                    <div className="space-y-6">
                                          {navigation.map((item) => (
                      <div key={item.name}>
                        <button
                          onClick={() => handleSmoothScroll(item.href)}
                          className="text-2xl font-bold text-foreground-light hover:text-foreground-light/80 transition-colors duration-200 text-left"
                        >
                          {item.name}
                        </button>
                      </div>
                    ))}
                    </div>
                  </div>

                  {/* Socials Section */}
                  <div className="space-y-6">
                                      <div className="text-sm text-muted-foreground font-medium">
                    Socials
                  </div>
                  <div className="h-px bg-border"></div>
                    <div className="flex space-x-6">
                      {socials.map((social) => (
                        <div key={social.name}>
                          <button
                            onClick={() => handleSocialClick(social.href)}
                            className="text-base text-foreground-light hover:text-foreground-light/80 transition-colors duration-200 flex items-center gap-2 group"
                          >
                            <span>{social.name}</span>
                            <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logo at bottom */}
                <div className="pb-8">
                  <div className="w-8 h-8 bg-foreground-light rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-background-dark">N</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }
