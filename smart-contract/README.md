# Smart Contract

The smart contract is built with Rust and Soroban SDK.

## Building

```bash
cargo build --target wasm32-unknown-unknown --release
```

## Testing

```bash
cargo test
```

## Deploying

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/supply_konnect.wasm \
  --source YOUR_SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

## Contract Functions

### register_product
Registers a new product on the blockchain.

**Parameters:**
- `id`: Unique product identifier
- `name`: Product name
- `origin`: Origin location
- `owner`: Stellar address of owner

### add_tracking_event
Adds a tracking event to a product.

**Parameters:**
- `product_id`: Product identifier
- `location`: Current location
- `event_type`: Type of event (HARVEST, SHIPPING, etc.)
- `actor`: Stellar address of actor
- `metadata`: Additional JSON metadata

### get_product
Retrieves product details by ID.

### get_tracking_events
Retrieves all tracking events for a product.

## Development

This is a foundational implementation. Key areas to implement:

1. **Storage**: Implement persistent storage for products and events
2. **Access Control**: Add authorization checks
3. **Events**: Emit blockchain events for tracking
4. **Validation**: Add input validation
5. **Tests**: Expand test coverage

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to contribute.
