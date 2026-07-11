export interface Product {
  id: string;
  name: string;
  origin: string;
  owner: string;
  timestamp: number;
}

export interface TrackingEvent {
  product_id: string;
  location: string;
  actor: string;
  timestamp: number;
  event_type: string;
  metadata: string;
}
