import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Supply-Konnect - Decentralized Supply Chain Tracking',
  description: 'Transparent, tamper-proof tracking of products from origin to consumer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
