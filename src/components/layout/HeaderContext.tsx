'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface HeaderContextType {
  isWhite: boolean
  setIsWhite: (isWhite: boolean) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [isWhite, setIsWhite] = useState(false)

  return (
    <HeaderContext.Provider value={{ isWhite, setIsWhite }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = () => {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
} 