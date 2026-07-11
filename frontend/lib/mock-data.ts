import { Product, TrackingEvent } from './stellar/types'

export const mockProducts: Product[] = [
  {
    id: 'PROD001',
    name: 'Organic Ethiopian Coffee',
    origin: 'Yirgacheffe, Ethiopia',
    owner: 'GABC...1234',
    timestamp: 1720000000,
  },
  {
    id: 'PROD002',
    name: 'Fair Trade Cocoa Beans',
    origin: 'Kumasi, Ghana',
    owner: 'GDEF...5678',
    timestamp: 1720100000,
  },
  {
    id: 'PROD003',
    name: 'Certified Organic Cotton',
    origin: 'Gujarat, India',
    owner: 'GHIJ...9012',
    timestamp: 1720200000,
  },
  {
    id: 'PROD004',
    name: 'Wild-Caught Atlantic Salmon',
    origin: 'Bergen, Norway',
    owner: 'GKLM...3456',
    timestamp: 1720300000,
  },
]

export const mockEvents: TrackingEvent[] = [
  // PROD001 events
  {
    product_id: 'PROD001',
    location: 'Yirgacheffe, Ethiopia',
    actor: 'GABC...1234',
    timestamp: 1720000000,
    event_type: 'HARVEST',
    metadata: JSON.stringify({ altitude: '1800m', variety: 'Heirloom', method: 'Natural' }),
  },
  {
    product_id: 'PROD001',
    location: 'Addis Ababa, Ethiopia',
    actor: 'GABC...2345',
    timestamp: 1720086400,
    event_type: 'PROCESSING',
    metadata: JSON.stringify({ process: 'Wet-washed', grade: 'Grade 1' }),
  },
  {
    product_id: 'PROD001',
    location: 'Port of Djibouti',
    actor: 'GABC...3456',
    timestamp: 1720259200,
    event_type: 'SHIPPING',
    metadata: JSON.stringify({ vessel: 'MSC Harmony', container: 'MSCU1234567' }),
  },
  {
    product_id: 'PROD001',
    location: 'Hamburg, Germany',
    actor: 'GABC...4567',
    timestamp: 1720864000,
    event_type: 'CUSTOMS',
    metadata: JSON.stringify({ cleared: true, inspector: 'DE-HH-042' }),
  },
  {
    product_id: 'PROD001',
    location: 'Rotterdam, Netherlands',
    actor: 'GABC...5678',
    timestamp: 1720950400,
    event_type: 'QUALITY_CHECK',
    metadata: JSON.stringify({ score: 87, cupper: 'SCA Certified', notes: 'Blueberry, jasmine' }),
  },
  // PROD002 events
  {
    product_id: 'PROD002',
    location: 'Kumasi, Ghana',
    actor: 'GDEF...5678',
    timestamp: 1720100000,
    event_type: 'HARVEST',
    metadata: JSON.stringify({ variety: 'Forastero', fermentation: '6 days' }),
  },
  {
    product_id: 'PROD002',
    location: 'Tema Port, Ghana',
    actor: 'GDEF...6789',
    timestamp: 1720360000,
    event_type: 'SHIPPING',
    metadata: JSON.stringify({ vessel: 'Maersk Sealand', container: 'MRKU7654321' }),
  },
  // PROD003 events
  {
    product_id: 'PROD003',
    location: 'Gujarat, India',
    actor: 'GHIJ...9012',
    timestamp: 1720200000,
    event_type: 'HARVEST',
    metadata: JSON.stringify({ certified: 'GOTS', yield: '1.2 tons/acre' }),
  },
  // PROD004 events
  {
    product_id: 'PROD004',
    location: 'Bergen, Norway',
    actor: 'GKLM...3456',
    timestamp: 1720300000,
    event_type: 'HARVEST',
    metadata: JSON.stringify({ vessel: 'Nordic Fisher', quota: 'MSC Certified' }),
  },
  {
    product_id: 'PROD004',
    location: 'Bergen Processing Plant',
    actor: 'GKLM...4567',
    timestamp: 1720310000,
    event_type: 'PROCESSING',
    metadata: JSON.stringify({ method: 'Fresh-frozen', temp: '-22°C' }),
  },
]

export const EVENT_TYPE_COLORS: Record<string, string> = {
  HARVEST: 'bg-green-100 text-green-800 border-green-200',
  PROCESSING: 'bg-blue-100 text-blue-800 border-blue-200',
  SHIPPING: 'bg-purple-100 text-purple-800 border-purple-200',
  CUSTOMS: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  QUALITY_CHECK: 'bg-orange-100 text-orange-800 border-orange-200',
  DELIVERY: 'bg-teal-100 text-teal-800 border-teal-200',
  OTHER: 'bg-gray-100 text-gray-800 border-gray-200',
}

export const EVENT_TYPE_ICONS: Record<string, string> = {
  HARVEST: '🌱',
  PROCESSING: '⚙️',
  SHIPPING: '🚢',
  CUSTOMS: '🛃',
  QUALITY_CHECK: '✅',
  DELIVERY: '📦',
  OTHER: '📋',
}

export function getProductEvents(productId: string): TrackingEvent[] {
  return mockEvents
    .filter(e => e.product_id === productId)
    .sort((a, b) => a.timestamp - b.timestamp)
}

export function getProduct(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id)
}

export function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
