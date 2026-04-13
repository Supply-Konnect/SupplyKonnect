export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Supply-Konnect</h1>
          <p className="text-xl text-gray-600">
            Decentralized Supply Chain Tracking on Stellar
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">🔗 Register Products</h2>
            <p className="text-gray-600">
              Register products at origin with cryptographic proof of authenticity
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">📍 Track Events</h2>
            <p className="text-gray-600">
              Record every step of the supply chain journey on blockchain
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">✅ Verify</h2>
            <p className="text-gray-600">
              Scan QR codes to verify product authenticity and history
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/register" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </main>
  )
}
