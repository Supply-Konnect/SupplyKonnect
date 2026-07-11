'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '../../../../lib/theme'
import { createEvent } from '../../../../lib/api'

const EVENT_TYPES = ['HARVEST', 'PROCESSING', 'SHIPPING', 'CUSTOMS', 'QUALITY_CHECK', 'DELIVERY', 'OTHER']

export default function AddEventPage({ params }: { params: { id: string } }) {
  const { theme: S } = useTheme()
  const router = useRouter()
  const [form, setForm] = useState({ location: '', event_type: 'SHIPPING', metadata: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const inputStyle = { backgroundColor: S.bg, border: `1px solid ${S.border}`, color: S.heading }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createEvent(params.id, {
        location: form.location,
        event_type: form.event_type,
        metadata: form.metadata ? JSON.stringify({ notes: form.metadata }) : undefined,
      })
      setDone(true)
      setTimeout(() => router.push(`/products/${params.id}`), 1200)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <Link href={`/products/${params.id}`} className="text-sm mb-6 inline-block" style={{ color: S.accent }}>
        ← Back to Product
      </Link>
      <h1 className="text-2xl font-bold mb-2" style={{ color: S.heading }}>Add Tracking Event</h1>
      <p className="text-sm mb-8" style={{ color: S.muted }}>
        Recording event for <span className="font-mono" style={{ color: S.accent }}>{params.id}</span>
      </p>

      {done ? (
        <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#052e16', border: '1px solid #166534' }}>
          <div className="text-3xl mb-2">✅</div>
          <p className="font-semibold" style={{ color: '#4ade80' }}>Event recorded!</p>
          <p className="text-sm mt-1" style={{ color: '#16a34a' }}>Redirecting...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl p-6 space-y-5"
          style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: S.body }}>Event Type</label>
            <select value={form.event_type} onChange={e => setForm({ ...form, event_type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm" style={inputStyle}>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: S.body }}>Location</label>
            <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Hamburg, Germany" required
              className="w-full px-4 py-2.5 rounded-lg text-sm" style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: S.body }}>
              Notes <span className="font-normal" style={{ color: S.muted }}>(optional)</span>
            </label>
            <textarea value={form.metadata} onChange={e => setForm({ ...form, metadata: e.target.value })}
              placeholder="Any additional details..." rows={3}
              className="w-full px-4 py-2.5 rounded-lg text-sm resize-none" style={inputStyle} />
          </div>
          {error && (
            <p className="text-sm px-4 py-2 rounded-lg"
              style={{ color: '#f87171', backgroundColor: '#2d0a0a', border: '1px solid #7f1d1d' }}>
              {error}
            </p>
          )}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: S.green }}>
            {loading ? 'Recording...' : 'Record Event'}
          </button>
        </form>
      )}
    </main>
  )
}
