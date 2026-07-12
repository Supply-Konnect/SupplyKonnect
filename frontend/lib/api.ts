// v2 - typed
import { Product, TrackingEvent } from './stellar/types'
import { demoProducts, getDemoEvents } from './demo-data'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

async function req<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, { cache: 'no-store', ...opts })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? `Request failed: ${res.status}`)
  }
  return res.json()
}

async function tryReq<T>(path: string, fallback: T, opts?: RequestInit): Promise<T> {
  if (IS_DEMO) return fallback
  try {
    return await req<T>(path, opts)
  } catch {
    return fallback
  }
}

export const fetchProducts = (): Promise<Product[]> =>
  tryReq<{ products: Product[] }>('/api/products', { products: demoProducts })
    .then(d => d.products)

export const fetchProduct = async (id: string): Promise<Product> => {
  if (IS_DEMO) {
    const p = demoProducts.find(p => p.id === id)
    if (!p) throw new Error('Not found')
    return p
  }
  try {
    return await req<Product>(`/api/products/${id}`)
  } catch {
    const p = demoProducts.find(p => p.id === id)
    if (!p) throw new Error('Not found')
    return p
  }
}

export const fetchEvents = async (productId: string): Promise<TrackingEvent[]> => {
  if (IS_DEMO) return getDemoEvents(productId)
  try {
    const d = await req<{ events: TrackingEvent[] }>(`/api/products/${productId}/events`)
    return d.events
  } catch {
    return getDemoEvents(productId)
  }
}

export const fetchAnalytics = async (): Promise<Record<string, unknown>> => {
  if (IS_DEMO) {
    const byType = ['HARVEST','PROCESSING','SHIPPING','QUALITY_CHECK','CUSTOMS','DELIVERY']
      .map(t => ({ type: t, count: Math.floor(Math.random() * 8) + 2 }))
    return {
      product_count: demoProducts.length,
      event_count: 18,
      events_by_type: byType,
      top_products: demoProducts.slice(0,5).map((p,i) => ({ id: p.id, name: p.name, event_count: 6 - i })),
    }
  }
  return req('/api/analytics')
}

export const createProduct = (payload: { id: string; name: string; origin: string; owner?: string }): Promise<Product> =>
  req('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

export const bulkImport = (products: { id: string; name: string; origin: string }[]): Promise<Record<string, unknown>> =>
  req('/api/products/bulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  })

export const createEvent = (productId: string, payload: { location: string; event_type: string; metadata?: string; actor?: string }): Promise<TrackingEvent> =>
  req(`/api/products/${productId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

export const transferOwner = (productId: string, newOwner: string): Promise<Record<string, unknown>> =>
  req(`/api/products/${productId}/transfer`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ new_owner: newOwner }),
  })
