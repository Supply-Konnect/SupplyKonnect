use axum::{Json, http::StatusCode};
use serde_json::{json, Value};
use crate::models::{Product, CreateProductRequest};

pub async fn list_products() -> Json<Value> {
    // TODO: Fetch from database/blockchain
    Json(json!({
        "products": [],
        "total": 0
    }))
}

pub async fn create_product(
    Json(payload): Json<CreateProductRequest>,
) -> Result<Json<Product>, StatusCode> {
    // TODO: Validate and store product
    let product = Product {
        id: payload.id,
        name: payload.name,
        origin: payload.origin,
        owner: payload.owner,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };
    
    Ok(Json(product))
}
