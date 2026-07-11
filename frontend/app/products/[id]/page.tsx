'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '../../../lib/theme'
import { fetchProduct, fetchEvents } from '../../../lib/api'
import ProductQRCode from '../../../components/QRCode'
import TransferOwner from '../../../components/TransferOwner'

const EVENT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  HARVEST:       { bg: '#052e16', text: '#4ade80', border: '#166534' },
  PROCESSING:    { bg: '#0c1a3a', text: '#60a5fa', border: '#1e40af' },
  SHIPPING:      { bg: '#1a0a3a', text: '#c084fc', border: '#6b21a8' },
  CUSTOMS:       { bg: '#2d1a00', text: '#fbbf24', border: '#92400e' },
  QUALITY_CHECK: { bg: '#001a2e', text: '#22d3ee', border: '#0e7490' },
  DELIVERY:      { bg: '#012a2a', text: '#2dd4bf', border: '#0f766e' },
  OTHER:         { bg: '#0f1a2e', text: '#94a3b8', border: '#334155' },
}

const ICONS: Record<string, string> = {
  HARVEST: '🌱', PROCESSING: '⚙️', SHIPPING: '🚢',
  CUSTOMS: '🛃', QUALITY_CHECK: '✅', DELIVERY: '📦', OTHER: '📋',
}

function fmt(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { theme: S } = useTheme()
  const [product, setProduct] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchProduct(params.id)
      .then(setProduct)
      .catch(() => setNotFound(true))
    fetchEvents(params.id).then(setEvents).catch(() => {})
  }, [params.id])

  if (notFound) return (
    <main className="max-w-xl mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: S.heading }}>Not Found</h1>
      <p className="mb-6" style={{ color: S.muted }}>That product doesn't exist on chain.</p>
      <Link href="/products" style={{ color: S.accent }}>← Back to Products</Link>
    </main>
  )

  if (!product) return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-center" style={{ color: S.muted }}>
      Loading...
    </main>
  )

  const sorted = [...events].sort((a, b) => a.timestamp - b.timestamp)
  const latest = sorted[sorted.length - 1]

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link href="/products" className="text-sm mb-6 inline-block" style={{ color: S.accent }}>
        ← Back to Products
      </Link>

      <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: S.heading }}>{product.name}</h1>
            <p className="mt-1" style={{ color: S.muted }}>📍 {product.origin}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono px-3 py-1.5 rounded block mb-2"
              style={{ backgroundColor: S.bg, color: S.accent, border: `1px solid ${S.border}` }}>
              {product.id}
            </span>
            <Link href={`/products/${product.id}/add-event`}
              className="text-sm px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors"
              style={{ backgroundColor: S.green }}>
              + Add Event
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 text-sm" style={{ borderTop: `1px solid ${S.border}` }}>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: S.muted }}>Owner</div>
            <div className="font-mono truncate" style={{ color: S.body }}>{product.owner}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: S.muted }}>Registered</div>
            <div style={{ color: S.body }}>{fmt(product.timestamp)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: S.muted }}>Status</div>
            {latest ? (() => {
              const c = EVENT_STYLES[latest.event_type] ?? EVENT_STYLES.OTHER
              return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                  {ICONS[latest.event_type] ?? '📋'} {latest.event_type.replace('_', ' ')}
                </span>
              )
            })() : <span style={{ color: S.muted }}>Registered</span>}
          </div>
        </div>

        <div className="mt-4 pt-4 flex flex-wrap gap-3" style={{ borderTop: `1px solid ${S.border}` }}>
          <ProductQRCode productId={product.id} />
          <TransferOwner
            productId={product.id}
            currentOwner={product.owner}
            onSuccess={(newOwner) => setProduct((p: any) => ({ ...p, owner: newOwner }))}
          />
        </div>
      </div>

      <div className="rounded-xl p-6" style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
        <h2 className="font-semibold text-lg mb-6" style={{ color: S.heading }}>
          Supply Chain Timeline
          <span className="ml-2 text-sm font-normal" style={{ color: S.muted }}>({sorted.length} events)</span>
        </h2>

        {sorted.length === 0 ? (
          <div className="text-center py-8" style={{ color: S.muted }}>
            No events yet.{' '}
            <Link href={`/products/${product.id}/add-event`} style={{ color: S.accent }}>Add the first one →</Link>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ backgroundColor: S.border }} />
            <div className="space-y-6">
              {sorted.map((event, i) => {
                const c = EVENT_STYLES[event.event_type] ?? EVENT_STYLES.OTHER
                let meta: Record<string, unknown> = {}
                try { meta = JSON.parse(event.metadata) } catch {}
                return (
                  <div key={i} className="relative flex gap-4 pl-2">
                    <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                      {ICONS[event.event_type] ?? '📋'}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                            {event.event_type.replace('_', ' ')}
                          </span>
                          <p className="font-medium mt-1" style={{ color: S.heading }}>📍 {event.location}</p>
                        </div>
                        <span className="text-xs" style={{ color: S.muted }}>{fmt(event.timestamp)}</span>
                      </div>
                      <p className="text-xs font-mono mt-1" style={{ color: S.muted }}>Actor: {event.actor}</p>
                      {Object.keys(meta).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(meta).map(([k, v]) => (
                            <span key={k} className="text-xs px-2 py-0.5 rounded"
                              style={{ backgroundColor: S.bg, color: S.muted, border: `1px solid ${S.border}` }}>
                              {k}: {String(v)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
