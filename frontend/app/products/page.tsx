'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '../../lib/theme'
import { fetchProducts, fetchEvents } from '../../lib/api'

export default function ProductsPage() {
  const { theme: S } = useTheme()
  const [products, setProducts] = useState<any[]>([])
  const [eventsMap, setEventsMap] = useState<Record<string, any[]>>({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts().then(async ps => {
      setProducts(ps)
      const map: Record<string, any[]> = {}
      await Promise.all(ps.map(async (p: any) => {
        map[p.id] = await fetchEvents(p.id).catch(() => [])
      }))
      setEventsMap(map)
    }).catch(() => {})
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.origin.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: S.heading }}>Products</h1>
          <p className="mt-1 text-sm" style={{ color: S.muted }}>{products.length} products on chain</p>
        </div>
        <Link href="/register"
          className="px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: S.green }}>
          + Register Product
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: S.muted }}>🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, origin or ID..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
          style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.heading }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl p-16 text-center" style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.muted }}>
          {search ? `No products matching "${search}"` : 'No products yet.'}{' '}
          {!search && <Link href="/register" style={{ color: S.accent }}>Register the first one →</Link>}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((product: any) => {
            const events = eventsMap[product.id] ?? []
            const latest = [...events].sort((a, b) => b.timestamp - a.timestamp)[0]
            return (
              <Link key={product.id} href={`/products/${product.id}`}
                className="rounded-xl p-6 transition-all hover:-translate-y-0.5 block"
                style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-semibold text-lg" style={{ color: S.heading }}>{product.name}</h2>
                    <p className="text-sm mt-0.5" style={{ color: S.muted }}>📍 {product.origin}</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded"
                    style={{ backgroundColor: S.bg, color: S.accent, border: `1px solid ${S.border}` }}>
                    {product.id}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-4 pt-4"
                  style={{ borderTop: `1px solid ${S.border}` }}>
                  <span style={{ color: S.muted }}>{events.length} tracking events</span>
                  {latest && (
                    <span style={{ color: S.muted }}>
                      Last: <span style={{ color: S.body }}>{latest.event_type.replace('_', ' ')}</span>
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
