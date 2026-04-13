# Backend API

High-performance Rust backend using Axum framework.

## Getting Started

```bash
# Install dependencies
cargo build

# Copy environment file
cp .env.example .env

# Run server
cargo run
```

Server runs on [http://localhost:3001](http://localhost:3001)

## Project Structure

```
backend/
├── src/
│   ├── main.rs         # Server entry point
│   ├── routes/         # API route handlers
│   ├── services/       # Business logic
│   └── models/         # Data models
└── Cargo.toml
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product
- `GET /api/products/:id/events` - Get events
- `POST /api/products/:id/events` - Add event

See [docs/API.md](../docs/API.md) for full API documentation.

## Environment Variables

```
DATABASE_URL=postgres://user:pass@localhost:5432/supplykonnect
REDIS_URL=redis://localhost:6379
HOST=0.0.0.0
PORT=3001
RUST_LOG=info
```

## Testing

```bash
cargo test
```

## Development Roadmap

This is a foundational implementation. Key areas to implement:

1. **Database Integration**: Connect to PostgreSQL with SQLx
2. **Caching**: Implement Redis caching
3. **Authentication**: Add wallet-based auth
4. **Rate Limiting**: Implement rate limits
5. **Webhooks**: Add webhook support
6. **Monitoring**: Add metrics and tracing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to contribute.
