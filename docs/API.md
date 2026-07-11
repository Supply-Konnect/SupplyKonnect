# Supply-Konnect API Documentation

## Base URL

```
Development: http://localhost:3001
Production: https://api.supplykonnect.com
```

## Authentication

All write operations require wallet authentication via Stellar signatures.

## Endpoints

### Health Check

**GET** `/health`

Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "version": "0.1.0"
}
```

---

### List Products

**GET** `/api/products`

Retrieve all registered products.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Response:**
```json
{
  "products": [
    {
      "id": "PROD001",
      "name": "Organic Coffee",
      "origin": "Ethiopia",
      "owner": "GXXXXXXX...",
      "timestamp": 1234567890
    }
  ],
  "total": 1
}
```

---

### Create Product

**POST** `/api/products`

Register a new product on the blockchain.

**Request Body:**
```json
{
  "id": "PROD001",
  "name": "Organic Coffee",
  "origin": "Ethiopia",
  "owner": "GXXXXXXX..."
}
```

**Response:**
```json
{
  "id": "PROD001",
  "name": "Organic Coffee",
  "origin": "Ethiopia",
  "owner": "GXXXXXXX...",
  "timestamp": 1234567890
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid request
- `409`: Product already exists
- `500`: Server error

---

### Get Product

**GET** `/api/products/:id`

Retrieve product details by ID.

**Response:**
```json
{
  "id": "PROD001",
  "name": "Organic Coffee",
  "origin": "Ethiopia",
  "owner": "GXXXXXXX...",
  "timestamp": 1234567890
}
```

---

### Get Product Events

**GET** `/api/products/:id/events`

Retrieve all tracking events for a product.

**Response:**
```json
{
  "events": [
    {
      "product_id": "PROD001",
      "location": "Port of Seattle",
      "actor": "GXXXXXXX...",
      "timestamp": 1234567890,
      "event_type": "SHIPPING",
      "metadata": "{\"carrier\": \"DHL\"}"
    }
  ]
}
```

---

### Add Tracking Event

**POST** `/api/products/:id/events`

Add a new tracking event to a product.

**Request Body:**
```json
{
  "location": "Port of Seattle",
  "event_type": "SHIPPING",
  "metadata": "{\"carrier\": \"DHL\"}"
}
```

**Response:**
```json
{
  "product_id": "PROD001",
  "location": "Port of Seattle",
  "actor": "GXXXXXXX...",
  "timestamp": 1234567890,
  "event_type": "SHIPPING",
  "metadata": "{\"carrier\": \"DHL\"}"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

**Common Error Codes:**
- `PRODUCT_NOT_FOUND`: Product doesn't exist
- `UNAUTHORIZED`: Authentication required
- `VALIDATION_ERROR`: Invalid input
- `RATE_LIMIT_EXCEEDED`: Too many requests

---

## Rate Limits

- Unauthenticated: 100 requests / 15 minutes
- Authenticated: 1000 requests / 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```
