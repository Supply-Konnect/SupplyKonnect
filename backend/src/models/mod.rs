use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub origin: String,
    pub owner: String,
    pub timestamp: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TrackingEvent {
    pub product_id: String,
    pub location: String,
    pub actor: String,
    pub timestamp: u64,
    pub event_type: String,
    pub metadata: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateProductRequest {
    pub id: String,
    pub name: String,
    pub origin: String,
    pub owner: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateEventRequest {
    pub location: String,
    pub event_type: String,
    pub metadata: Option<String>,
    pub actor: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct TransferOwnerRequest {
    pub new_owner: String,
}

#[derive(Debug, Deserialize)]
pub struct BulkImportRequest {
    pub products: Vec<CreateProductRequest>,
}
