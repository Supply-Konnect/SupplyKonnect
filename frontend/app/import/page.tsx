'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '../../lib/theme'
import { bulkImport } from '../../lib/api'

const EXAMPLE_CSV = `id,name,origin
PROD003,Wild Honey,Oaxaca, Mexico
PROD004,Arabica Coffee,Sidamo, Ethiopia
PROD005,Sea Salt,Trapani, Italy`

export default function ImportPage() {
  const { theme: S } = useTheme()
  const router = useRouter()
  const [csv, setCsv] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n').filter(Boolean)
    if (lines.length < 2) throw new Error('CSV needs a header row and at least one data row')
    const headers = lines[0].split(',').map(h => h.trim())
    return lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim())
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']))
    })
  }

  const handleImport = async () => {
    setError('')
    setLoading(true)
    try {
      const products = parseCSV(csv)
      if (!products.every(p => p.id && p.name && p.origin)) {
        throw new Error('Each row must have id, name, and origin columns')
      }
      const res = await bulkImport(products as any)
      setResult(res)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setCsv(ev.target?.result as string)
    reader.readAsText(file)
  }

  const inputStyle = { backgroundColor: S.bg, border: `1px solid ${S.border}`, color: S.heading }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/products" className="text-sm mb-6 inline-block" style={{ color: S.accent }}>
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold mb-2" style={{ color: S.heading }}>Bulk Import Products</h1>
      <p className="text-sm mb-8" style={{ color: S.muted }}>
        Upload a CSV file or paste CSV data to register multiple products at once.
      </p>

      {result ? (
        <div className="rounded-xl p-6" style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
          <h2 className="font-semibold mb-4" style={{ color: S.heading }}>Import Results</h2>
          <div className="flex gap-4 mb-4">
            <div className="rounded-lg p-4 flex-1 text-center" style={{ backgroundColor: '#052e16', border: '1px solid #166534' }}>
              <div className="text-2xl font-bold" style={{ color: '#4ade80' }}>{result.created}</div>
              <div className="text-xs mt-1" style={{ color: '#16a34a' }}>Created</div>
            </div>
            <div className="rounded-lg p-4 flex-1 text-center" style={{ backgroundColor: result.errors?.length ? '#2d0a0a' : S.bg, border: `1px solid ${result.errors?.length ? '#7f1d1d' : S.border}` }}>
              <div className="text-2xl font-bold" style={{ color: result.errors?.length ? '#f87171' : S.muted }}>{result.errors?.length ?? 0}</div>
              <div className="text-xs mt-1" style={{ color: S.muted }}>Errors</div>
            </div>
          </div>
          {result.errors?.length > 0 && (
            <div className="space-y-1 mb-4">
              {result.errors.map((e: string, i: number) => (
                <p key={i} className="text-xs px-3 py-1 rounded" style={{ color: '#f87171', backgroundColor: '#2d0a0a' }}>{e}</p>
              ))}
            </div>
          )}
          <button onClick={() => { setResult(null); setCsv('') }}
            className="w-full py-2.5 rounded-lg font-semibold text-white hover:opacity-90"
            style={{ backgroundColor: S.green }}>
            Import More
          </button>
          <button onClick={() => router.push('/products')}
            className="w-full py-2.5 rounded-lg font-semibold mt-2 hover:opacity-80 transition-colors"
            style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.body }}>
            View Products
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: S.card, border: `1px solid ${S.border}` }}>
          {/* File upload */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: S.body }}>Upload CSV File</label>
            <input type="file" accept=".csv,.txt" onChange={handleFile}
              className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:text-white file:cursor-pointer"
              style={{ color: S.muted }}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: S.border }} />
            <span className="text-xs" style={{ color: S.muted }}>or paste CSV</span>
            <div className="flex-1 h-px" style={{ backgroundColor: S.border }} />
          </div>

          {/* CSV textarea */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium" style={{ color: S.body }}>CSV Data</label>
              <button onClick={() => setCsv(EXAMPLE_CSV)} className="text-xs hover:opacity-80" style={{ color: S.accent }}>
                Load example
              </button>
            </div>
            <textarea
              value={csv}
              onChange={e => setCsv(e.target.value)}
              placeholder="id,name,origin&#10;PROD003,My Product,Country"
              rows={8}
              className="w-full px-4 py-3 rounded-lg text-sm font-mono resize-none"
              style={inputStyle}
            />
            <p className="text-xs mt-1" style={{ color: S.muted }}>
              Required columns: <span style={{ color: S.accent }}>id, name, origin</span>
            </p>
          </div>

          {error && (
            <p className="text-sm px-4 py-2 rounded-lg" style={{ color: '#f87171', backgroundColor: '#2d0a0a', border: '1px solid #7f1d1d' }}>
              {error}
            </p>
          )}

          <button onClick={handleImport} disabled={loading || !csv.trim()}
            className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-colors"
            style={{ backgroundColor: S.green }}>
            {loading ? 'Importing...' : `Import Products`}
          </button>
        </div>
      )}
    </main>
  )
}
