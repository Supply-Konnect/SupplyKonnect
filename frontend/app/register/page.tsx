'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '../../lib/theme'
import { createProduct } from '../../lib/api'

export default function RegisterPage() {
  const { theme: S } = useTheme()
  const router = useRouter()
  const [form, setForm] = useState({ id: '', name: '', origin: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createProduct(form)
      setDone(true)
      setTimeout(() => router.push('/products'), 1200)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const field = (key: keyof typeof form, label: string, placeholder: string) => (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: S.body }}>{label}</label>
      <input
        type="text"
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2.5 rounded-lg text-sm transition-colors"
        style={{ backgroundColor: S.bg, border: `1px solid ${S.border}`, color: S.heading }}
      />
    </div>
  )

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/products" className="text-sm mb-6 inline-block" style={{ color: S.accent }}>
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold mb-2" style={{ color: S.heading }}>Register Product</h1>
      <p className="text-sm mb-8" style={{ color: S.muted }}>
        Register a new product with a permanent, tamper-proof record on Stellar.
      </p>

      {done ? (
        <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#052e16', border: '1px solid #166534' }}>
          <div className="text-3xl mb-2">🎉</div>
          <p className="font-semibold" style={{ color: '#4ade80' }}>Product registered!</p>
          <p className="text-sm mt-1" style={{ color: '#16a34a' }}>Redirecting...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl p-6 space-y-5"
          style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
          {field('id', 'Product ID', 'PROD003')}
          {field('name', 'Product Name', 'Organic Coffee')}
          {field('origin', 'Origin', 'Yirgacheffe, Ethiopia')}
          {error && (
            <p className="text-sm px-4 py-2 rounded-lg"
              style={{ color: '#f87171', backgroundColor: '#2d0a0a', border: '1px solid #7f1d1d' }}>
              {error}
            </p>
          )}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: S.green }}>
            {loading ? 'Registering...' : 'Register Product'}
          </button>
        </form>
      )}
    </main>
  )
}
