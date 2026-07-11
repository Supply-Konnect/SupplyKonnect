use axum::{extract::{Path, State}, http::StatusCode, Json};
use serde_json::{json, Value};
use std::time::{SystemTime, UNIX_EPOCH};

use crate::models::*;
use crate::state::AppState;
use crate::db;

fn now() -> u64 {
    SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()
}

fn err(msg: &str) -> (StatusCode, Json<Value>) {
    (StatusCode::BAD_REQUEST, Json(json!({"error": msg})))
}

pub async fn list_products(State(s): State<AppState>) -> Json<Value> {
    let conn = s.db.lock().unwrap();
    let products = db::get_all_products(&conn).unwrap_or_default();
    Json(json!({ "products": products, "total": products.len() }))
}

pub async fn create_product(
    State(s): State<AppState>,
    Json(p): Json<CreateProductRequest>,
) -> Result<Json<Product>, (StatusCode, Json<Value>)> {
    let conn = s.db.lock().unwrap();
    if db::get_product(&conn, &p.id).unwrap_or(None).is_some() {
        return Err(err("Product ID already exists"));
    }
    let product = Product {
        id: p.id, name: p.name, origin: p.origin,
        owner: p.owner.unwrap_or_else(|| "anonymous".into()),
        timestamp: now(),
    };
    db::insert_product(&conn, &product).map_err(|e| err(&e.to_string()))?;
    Ok(Json(product))
}

pub async fn bulk_import(
    State(s): State<AppState>,
    Json(body): Json<BulkImportRequest>,
) -> Json<Value> {
    let conn = s.db.lock().unwrap();
    let mut created = 0;
    let mut errors: Vec<String> = vec![];

    for p in body.products {
        if db::get_product(&conn, &p.id).unwrap_or(None).is_some() {
            errors.push(format!("{}: already exists", p.id));
            continue;
        }
        let product = Product {
            id: p.id.clone(), name: p.name, origin: p.origin,
            owner: p.owner.unwrap_or_else(|| "anonymous".into()),
            timestamp: now(),
        };
        match db::insert_product(&conn, &product) {
            Ok(_) => created += 1,
            Err(e) => errors.push(format!("{}: {}", p.id, e)),
        }
    }
    Json(json!({ "created": created, "errors": errors }))
}

pub async fn get_product(
    State(s): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<Product>, (StatusCode, Json<Value>)> {
    let conn = s.db.lock().unwrap();
    db::get_product(&conn, &id)
        .unwrap_or(None)
        .map(Json)
        .ok_or_else(|| (StatusCode::NOT_FOUND, Json(json!({"error":"Product not found"}))))
}

pub async fn transfer_owner(
    State(s): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<TransferOwnerRequest>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let conn = s.db.lock().unwrap();
    let updated = db::update_owner(&conn, &id, &body.new_owner)
        .map_err(|e| err(&e.to_string()))?;
    if updated == 0 {
        return Err((StatusCode::NOT_FOUND, Json(json!({"error":"Product not found"}))));
    }
    Ok(Json(json!({ "success": true, "new_owner": body.new_owner })))
}

pub async fn list_events(
    State(s): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let conn = s.db.lock().unwrap();
    if db::get_product(&conn, &id).unwrap_or(None).is_none() {
        return Err((StatusCode::NOT_FOUND, Json(json!({"error":"Product not found"}))));
    }
    let events = db::get_events(&conn, &id).unwrap_or_default();
    Ok(Json(json!({ "events": events, "total": events.len() })))
}

pub async fn create_event(
    State(s): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<CreateEventRequest>,
) -> Result<Json<TrackingEvent>, (StatusCode, Json<Value>)> {
    let conn = s.db.lock().unwrap();
    if db::get_product(&conn, &id).unwrap_or(None).is_none() {
        return Err((StatusCode::NOT_FOUND, Json(json!({"error":"Product not found"}))));
    }
    let event = TrackingEvent {
        product_id: id,
        location: body.location,
        actor: body.actor.unwrap_or_else(|| "anonymous".into()),
        timestamp: now(),
        event_type: body.event_type,
        metadata: body.metadata.unwrap_or_else(|| "{}".into()),
    };
    db::insert_event(&conn, &event).map_err(|e| err(&e.to_string()))?;
    Ok(Json(event))
}

pub async fn analytics(State(s): State<AppState>) -> Json<Value> {
    let conn = s.db.lock().unwrap();
    Json(db::get_analytics(&conn).unwrap_or_else(|_| json!({})))
}
