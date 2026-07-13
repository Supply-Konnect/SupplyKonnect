import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../lib/theme'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'

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
          {/* Sidebar for desktop */}
          <Sidebar />
          {/* Mobile top nav */}
          <MobileNav />
          {/* Main content — offset by sidebar width on desktop */}
          <div className="sm:pl-56 min-h-screen" style={{ backgroundColor: 'inherit' }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
