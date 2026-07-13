'use client'

import Link from 'next/link'
import { useTheme } from '../lib/theme'

export default function Footer() {
  const { theme: S } = useTheme()
  return (
    <footer className="mt-20 py-10" style={{ borderTop: `1px solid ${S.border}` }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-base font-bold mb-1" style={{ color: S.accent }}>⛓ Supply-Konnect</div>
          <div className="text-xs" style={{ color: S.muted }}>Making supply chains transparent, trustworthy, and traceable.</div>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: S.muted }}>
          <Link href="/products" className="hover:opacity-80 transition-opacity">Products</Link>
          <Link href="/analytics" className="hover:opacity-80 transition-opacity">Analytics</Link>
          <a href="https://github.com/Supply-Konnect/SupplyKonnect" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity">GitHub</a>
        </div>
        <div className="text-xs" style={{ color: S.muted }}>
          Powered by Stellar · MIT License
        </div>
      </div>
    </footer>
  )
}
