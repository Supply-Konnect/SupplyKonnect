'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '../lib/theme'

const nav = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/products', icon: '📦', label: 'Products' },
  { href: '/analytics', icon: '📊', label: 'Analytics' },
  { href: '/import', icon: '📥', label: 'Bulk Import' },
  { href: '/register', icon: '➕', label: 'Register' },
]

export default function Sidebar() {
  const { theme: S, isDark, toggle } = useTheme()
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className="hidden sm:flex flex-col fixed left-0 top-0 h-screen w-56 z-20 py-6 px-3"
      style={{ backgroundColor: S.navBg, borderRight: `1px solid ${S.navBorder}` }}>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-3 mb-8">
        <span className="text-xl">⛓</span>
        <span className="font-bold text-base tracking-tight" style={{ color: S.accent }}>Supply-Konnect</span>
      </Link>

      {/* Nav items */}
      <nav className="flex-1 space-y-1">
        {nav.map(item => {
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? (isDark ? '#1a3a5c' : '#dbeafe') : 'transparent',
                color: active ? S.accent : S.muted,
              }}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: S.accent }} />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-2 pt-4" style={{ borderTop: `1px solid ${S.navBorder}` }}>
        <button onClick={toggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: S.muted }}>
          <span className="text-base w-5 text-center">{isDark ? '☀️' : '🌙'}</span>
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <Link href="/register"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: S.green }}>
          <span>+</span> New Product
        </Link>
      </div>
    </aside>
  )
}
