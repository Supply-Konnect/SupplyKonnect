'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { useTheme } from '../lib/theme'

export default function ProductQRCode({ productId }: { productId: string }) {
  const { theme: S, isDark } = useTheme()
  const [show, setShow] = useState(false)
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/products/${productId}`
    : `/products/${productId}`

  return (
    <div>
      <button
        onClick={() => setShow(v => !v)}
        className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
        style={{ backgroundColor: S.card, border: `1px solid ${S.border}`, color: S.accent }}
      >
        {show ? 'Hide QR' : '⊞ QR Code'}
      </button>

      {show && (
        <div className="mt-4 flex flex-col items-center gap-3 p-5 rounded-xl"
          style={{ backgroundColor: isDark ? '#0f2137' : '#f0f7ff', border: `1px solid ${S.border}` }}>
          <div className="p-3 rounded-lg bg-white">
            <QRCodeSVG
              value={url}
              size={160}
              bgColor="#ffffff"
              fgColor="#0f2d5e"
              level="M"
            />
          </div>
          <p className="text-xs text-center font-mono" style={{ color: S.muted }}>{productId}</p>
          <p className="text-xs text-center" style={{ color: S.muted }}>
            Scan to verify product authenticity
          </p>
          <button
            onClick={() => {
              const svg = document.querySelector('svg')
              if (!svg) return
              const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
              const a = document.createElement('a')
              a.href = URL.createObjectURL(blob)
              a.download = `${productId}-qr.svg`
              a.click()
            }}
            className="text-xs px-3 py-1 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: S.green, color: '#fff' }}
          >
            ↓ Download
          </button>
        </div>
      )}
    </div>
  )
}
