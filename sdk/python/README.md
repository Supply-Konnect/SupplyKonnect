# Supply-Konnect Python SDK

Python SDK for interacting with Supply-Konnect smart contracts.

## Installation

```bash
pip install supply-konnect-sdk
```

## Usage

```python
from supply_konnect import SupplyKonnectClient

client = SupplyKonnectClient(contract_id="CONTRACT_ID")

# Register a product
product = client.register_product(
    id="PROD001",
    name="Organic Coffee",
    origin="Ethiopia",
    owner="OWNER_ADDRESS"
)

print(f"Product registered: {product}")
```

## Development

This SDK is under development. Contributions welcome!
