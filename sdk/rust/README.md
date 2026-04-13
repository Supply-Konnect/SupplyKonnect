# Supply-Konnect Rust SDK

Rust SDK for interacting with Supply-Konnect smart contracts.

## Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
supply-konnect-sdk = "0.1.0"
```

## Usage

```rust
use supply_konnect_sdk::SupplyKonnectClient;

#[tokio::main]
async fn main() {
    let client = SupplyKonnectClient::new("CONTRACT_ID");
    
    // Register a product
    let product = client.register_product(
        "PROD001",
        "Organic Coffee",
        "Ethiopia",
        "OWNER_ADDRESS"
    ).await?;
    
    println!("Product registered: {:?}", product);
}
```

## Development

This SDK is under development. Contributions welcome!
