'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '../lib/theme'
import { fetchProducts, fetchEvents } from '../lib/api'
import { Product, TrackingEvent } from '../lib/stellar/types'
import AnimatedCounter from '../components/AnimatedCounter'
import Footer from '../components/Footer'

const EVENT_BADGE: Record<string, { bg: string; text: string }> = {
  HARVEST:       { bg: '#052e16', text: '#4ade80' },
  PROCESSING:    { bg: '#0c1a3a', text: '#60a5fa' },
  SHIPPING:      { bg: '#1a0a3a', text: '#c084fc' },
  CUSTOMS:       { bg: '#2d1a00', text: '#fbbf24' },
  QUALITY_CHECK: { bg: '#001a2e', text: '#22d3ee' },
  DELIVERY:      { bg: '#012a2a', text: '#2dd4bf' },
  OTHER:         { bg: '#0f1a2e', text: '#94a3b8' },
}

export default function Home() {
  const { theme: S } = useTheme()
  const [products, setProducts] = useState<Product[]>([])
  const [totalEvents, setTotalEvents] = useState(0)
  const [countries, setCountries] = useState(0)
  const [latestEvents, setLatestEvents] = useState<Record<string, TrackingEvent>>({})

  useEffect(() => {
    fetchProducts().then(async ps => {
      setProducts(ps)
      const allEvents = await Promise.all(ps.map((p: Product) => fetchEvents(p.id).catch(() => [])))
      setTotalEvents(allEvents.reduce((s: number, e: TrackingEvent[]) => s + e.length, 0))
      setCountries(new Set(ps.map((p: Product) => p.origin.split(',').pop()?.trim())).size)
      const latest: Record<string, TrackingEvent> = {}
      ps.forEach((p: Product, i: number) => {
        const sorted = [...(allEvents[i] as TrackingEvent[])].sort((a, b) => b.timestamp - a.timestamp)
        if (sorted[0]) latest[p.id] = sorted[0]
      })
      setLatestEvents(latest)
    }).catch(() => {})
  }, [])

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase"
            style={{ backgroundColor: S.card, color: S.accent, border: `1px solid ${S.border}` }}>
            Powered by Stellar Blockchain
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: S.heading }}>
            Transparent Supply Chains
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: S.body }}>
            Tamper-proof product tracking from origin to consumer. Every step, immutably recorded.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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

        {/* Stats with animated counters */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-16">
          {[
            { label: 'Products Tracked', value: products.length },
            { label: 'Tracking Events', value: totalEvents },
            { label: 'Countries', value: countries },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-4 sm:p-6 text-center"
              style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
              <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: S.green }}>
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-xs sm:text-sm" style={{ color: S.muted }}>{stat.label}</div>
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

        {/* Recent products with event badges */}
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
            <div className="grid sm:grid-cols-2 gap-4">
              {products.slice(0, 4).map(p => {
                const latest = latestEvents[p.id]
                const badge = latest ? (EVENT_BADGE[latest.event_type] ?? EVENT_BADGE.OTHER) : null
                return (
                  <Link key={p.id} href={`/products/${p.id}`}
                    className="rounded-xl p-5 flex items-start gap-4 transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
                    <div className="text-2xl mt-0.5">📦</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate" style={{ color: S.heading }}>{p.name}</div>
                      <div className="text-sm mt-0.5 truncate" style={{ color: S.muted }}>📍 {p.origin}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs font-mono" style={{ color: S.accent }}>{p.id}</div>
                        {badge && latest && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: badge.bg, color: badge.text }}>
                            {latest.event_type.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
