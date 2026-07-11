'use client'

import { useState } from 'react'
import { useTheme } from '../lib/theme'
import { transferOwner } from '../lib/api'

export default function TransferOwner({ productId, currentOwner, onSuccess }: {
  productId: string
  currentOwner: string
  onSuccess: (newOwner: string) => void
}) {
  const { theme: S } = useTheme()
  const [show, setShow] = useState(false)
  const [newOwner, setNewOwner] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleTransfer = async () => {
    if (!newOwner.trim()) return
    setError('')
    setLoading(true)
    try {
      await transferOwner(productId, newOwner.trim())
      setDone(true)
      onSuccess(newOwner.trim())
      setTimeout(() => { setDone(false); setShow(false); setNewOwner('') }, 2000)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={() => setShow(v => !v)}
        className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
        style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.muted }}>
        🔄 Transfer Ownership
      </button>

      {show && (
        <div className="mt-3 p-4 rounded-xl space-y-3"
          style={{ backgroundColor: S.bg, border: `1px solid ${S.border}` }}>
          <p className="text-xs" style={{ color: S.muted }}>
            Current owner: <span className="font-mono" style={{ color: S.body }}>{currentOwner}</span>
          </p>

          {done ? (
            <p className="text-sm" style={{ color: '#4ade80' }}>✅ Ownership transferred!</p>
          ) : (
            <>
              <input
                type="text"
                value={newOwner}
                onChange={e => setNewOwner(e.target.value)}
                placeholder="New owner address..."
                className="w-full px-3 py-2 rounded-lg text-sm font-mono"
                style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.heading }}
              />
              {error && <p className="text-xs" style={{ color: '#f87171' }}>{error}</p>}
              <div className="flex gap-2">
                <button onClick={handleTransfer} disabled={loading || !newOwner.trim()}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: S.green }}>
                  {loading ? 'Transferring...' : 'Confirm Transfer'}
                </button>
                <button onClick={() => setShow(false)}
                  className="px-4 py-2 rounded-lg text-sm hover:opacity-80"
                  style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.muted }}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
