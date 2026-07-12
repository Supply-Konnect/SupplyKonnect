'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '../../lib/theme'
import { fetchAnalytics } from '../../lib/api'

export default function AnalyticsPage() {
  const { theme: S } = useTheme()
  const [data, setData] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    fetchAnalytics().then(setData).catch(() => {})
  }, [])

  if (!data) return (
    <main className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ color: S.muted }}>
      Loading analytics...
    </main>
  )

  const eventsData = (data as { events_by_type?: {type: string; count: number}[]; top_products?: {id: string; name: string; event_count: number}[] })
  const maxEvents = Math.max(...(eventsData.events_by_type?.map(e => e.count) ?? [1]))

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: S.heading }}>Analytics</h1>
        <p className="mt-1 text-sm" style={{ color: S.muted }}>Platform-wide supply chain insights</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: data.product_count, icon: '📦' },
          { label: 'Total Events', value: data.event_count, icon: '📍' },
          { label: 'Event Types', value: data.events_by_type?.length ?? 0, icon: '🏷️' },
          { label: 'Active Products', value: data.top_products?.length ?? 0, icon: '✅' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-5 text-center"
            style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold" style={{ color: S.green }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: S.muted }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Events by type bar chart */}
        <div className="rounded-xl p-6" style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
          <h2 className="font-semibold text-lg mb-5" style={{ color: S.heading }}>Events by Type</h2>
          {data.events_by_type?.length === 0 ? (
            <p className="text-sm" style={{ color: S.muted }}>No events yet.</p>
          ) : (
            <div className="space-y-3">
              {data.events_by_type?.map((e: any) => (
                <div key={e.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: S.body }}>{e.type.replace('_', ' ')}</span>
                    <span style={{ color: S.muted }}>{e.count}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: S.bg }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(e.count / maxEvents) * 100}%`, backgroundColor: S.green }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="rounded-xl p-6" style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
          <h2 className="font-semibold text-lg mb-5" style={{ color: S.heading }}>Most Active Products</h2>
          {data.top_products?.length === 0 ? (
            <p className="text-sm" style={{ color: S.muted }}>No data yet.</p>
          ) : (
            <div className="space-y-3">
              {data.top_products?.map((p: any, i: number) => (
                <Link key={p.id} href={`/products/${p.id}`}
                  className="flex items-center justify-between p-3 rounded-lg transition-colors hover:opacity-80"
                  style={{ backgroundColor: S.bg, border: `1px solid ${S.border}` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold w-5" style={{ color: S.muted }}>#{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium" style={{ color: S.heading }}>{p.name}</div>
                      <div className="text-xs font-mono" style={{ color: S.accent }}>{p.id}</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: S.green }}>{p.event_count} events</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
