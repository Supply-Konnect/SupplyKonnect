'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '../lib/theme'
import { fetchProducts, fetchEvents } from '../lib/api'
import { Product, TrackingEvent } from '../lib/stellar/types'

export default function Home() {
  const { theme } = useTheme()
  const [products, setProducts] = useState<Product[]>([])
  const [totalEvents, setTotalEvents] = useState(0)
  const [countries, setCountries] = useState(0)

  useEffect(() => {
    fetchProducts().then(async ps => {
      setProducts(ps)
      const all = await Promise.all(ps.map((p: Product) => fetchEvents(p.id).catch(() => [])))
      setTotalEvents(all.reduce((s: number, e: TrackingEvent[]) => s + e.length, 0))
      setCountries(new Set(ps.map((p: Product) => p.origin.split(',').pop()?.trim())).size)
    }).catch(() => {})
  }, [])

  const S = theme

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase"
          style={{ backgroundColor: S.card, color: S.accent, border: `1px solid ${S.border}` }}>
          Powered by Stellar Blockchain
        </div>
        <h1 className="text-5xl font-bold mb-4 leading-tight" style={{ color: S.heading }}>
          Transparent Supply Chains
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: S.body }}>
          Tamper-proof product tracking from origin to consumer. Every step, immutably recorded.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products"
            className="px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: S.green }}>
            Browse Products
          </Link>
          <Link href="/register"
            className="px-6 py-3 rounded-lg font-semibold transition-colors"
            style={{ border: `1px solid ${S.border}`, color: S.body }}>
            Register Product
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        {[
          { label: 'Products Tracked', value: products.length },
          { label: 'Tracking Events', value: totalEvents },
          { label: 'Countries', value: countries },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-6 text-center"
            style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
            <div className="text-4xl font-bold mb-1" style={{ color: S.green }}>{stat.value}</div>
            <div className="text-sm" style={{ color: S.muted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: '🔗', title: 'Register Products', desc: 'Register products at origin with cryptographic proof of authenticity on Stellar blockchain.', href: '/register' },
          { icon: '📍', title: 'Track Events', desc: 'Record every step — harvest, processing, shipping, quality checks — with timestamps and locations.', href: '/products' },
          { icon: '✅', title: 'Verify Instantly', desc: 'Scan QR codes or search by ID to verify product authenticity and view the full journey.', href: '/products' },
        ].map(f => (
          <Link key={f.title} href={f.href}
            className="rounded-xl p-6 block group transition-all duration-200 hover:-translate-y-1"
            style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
            <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110 inline-block">{f.icon}</div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: S.heading }}>{f.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: S.muted }}>{f.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ color: S.heading }}>Recent Products</h2>
          <Link href="/products" className="text-sm" style={{ color: S.accent }}>View all →</Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl p-10 text-center" style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.muted }}>
            No products yet.{' '}
            <Link href="/register" style={{ color: S.accent }}>Register the first one →</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {products.slice(0, 4).map(p => (
              <Link key={p.id} href={`/products/${p.id}`}
                className="rounded-xl p-5 flex items-start gap-4 transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
                <div className="text-2xl">📦</div>
                <div>
                  <div className="font-semibold" style={{ color: S.heading }}>{p.name}</div>
                  <div className="text-sm mt-0.5" style={{ color: S.muted }}>📍 {p.origin}</div>
                  <div className="text-xs mt-1 font-mono" style={{ color: S.accent }}>{p.id}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
