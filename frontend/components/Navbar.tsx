'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '../lib/theme'

export default function Navbar() {
  const { theme: S, isDark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/products', label: 'Products' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/import', label: 'Bulk Import' },
    { href: '/register', label: 'Register' },
  ]

  return (
    <nav className="sticky top-0 z-10" style={{ backgroundColor: S.navBg, borderBottom: `1px solid ${S.navBorder}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: S.accent }}>
          Supply-Konnect
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-5 text-sm font-medium">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="transition-colors hover:opacity-80" style={{ color: S.body }}>
              {l.label}
            </Link>
          ))}
          <button onClick={toggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: isDark ? '#1a3a5c' : '#dbeafe', color: S.accent }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link href="/register"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: S.green }}>
            + New Product
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button onClick={toggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: isDark ? '#1a3a5c' : '#dbeafe', color: S.accent }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setMenuOpen(v => !v)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
            style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.body }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2" style={{ backgroundColor: S.navBg, borderTop: `1px solid ${S.navBorder}` }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors"
              style={{ color: S.body, backgroundColor: S.card }}>
              {l.label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-semibold text-white text-center"
            style={{ backgroundColor: S.green }}>
            + New Product
          </Link>
        </div>
      )}
    </nav>
  )
}
