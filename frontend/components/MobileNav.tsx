'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '../lib/theme'

const nav = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/products', icon: '📦', label: 'Products' },
  { href: '/analytics', icon: '📊', label: 'Analytics' },
  { href: '/import', icon: '📥', label: 'Import' },
  { href: '/register', icon: '➕', label: 'Register' },
]

export default function MobileNav() {
  const { theme: S, isDark, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="sm:hidden">
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-20"
        style={{ backgroundColor: S.navBg, borderBottom: `1px solid ${S.navBorder}` }}>
        <Link href="/" className="flex items-center gap-2 font-bold" style={{ color: S.accent }}>
          <span>⛓</span><span>Supply-Konnect</span>
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: S.card, color: S.accent }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setOpen(v => !v)} className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.body }}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-1" style={{ backgroundColor: S.navBg, borderBottom: `1px solid ${S.navBorder}` }}>
          {nav.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: pathname === item.href ? (isDark ? '#1a3a5c' : '#dbeafe') : 'transparent',
                color: pathname === item.href ? S.accent : S.muted,
              }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
