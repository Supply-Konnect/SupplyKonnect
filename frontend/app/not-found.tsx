import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#bae6fd' }}>Not Found</h1>
      <p className="mb-6" style={{ color: '#4a7fa5' }}>That product doesn't exist on chain.</p>
      <Link href="/products" style={{ color: '#38bdf8' }}>← Back to Products</Link>
    </main>
  )
}
