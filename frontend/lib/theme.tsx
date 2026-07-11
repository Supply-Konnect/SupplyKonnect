'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export const dark = {
  bg: '#0a1628', card: '#0f2137', border: '#1a3a5c',
  heading: '#bae6fd', body: '#7dd3fc', muted: '#4a7fa5', accent: '#38bdf8', green: '#10b981',
  navBg: '#0a1628', navBorder: '#1a3a5c',
}

export const light = {
  bg: '#f0f7ff', card: '#ffffff', border: '#bfdbfe',
  heading: '#0f2d5e', body: '#1e40af', muted: '#6b8fc4', accent: '#0369a1', green: '#059669',
  navBg: '#ffffff', navBorder: '#bfdbfe',
}

type Theme = typeof dark
type ThemeContextType = { theme: Theme; isDark: boolean; toggle: () => void }

const ThemeContext = createContext<ThemeContextType>({
  theme: dark, isDark: true, toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') setIsDark(false)
  }, [])

  const toggle = () => {
    setIsDark(prev => {
      localStorage.setItem('theme', prev ? 'light' : 'dark')
      return !prev
    })
  }

  return (
    <ThemeContext.Provider value={{ theme: isDark ? dark : light, isDark, toggle }}>
      <div style={{ backgroundColor: isDark ? dark.bg : light.bg, color: isDark ? dark.heading : light.heading, minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
