'use client'

import { useTheme } from '../lib/theme'

export default function PageShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <div style={{ backgroundColor: theme.bg, minHeight: 'calc(100vh - 65px)', color: theme.heading }}>
      {children}
    </div>
  )
}
