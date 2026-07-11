import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../lib/theme'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  title: 'Supply-Konnect - Decentralized Supply Chain Tracking',
  description: 'Transparent, tamper-proof tracking of products from origin to consumer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          input:focus, select:focus, textarea:focus { outline: none; box-shadow: 0 0 0 2px #38bdf840; }
          ::placeholder { opacity: 0.4; }
          option { background-color: #0f2137; color: #bae6fd; }
        `}</style>
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
