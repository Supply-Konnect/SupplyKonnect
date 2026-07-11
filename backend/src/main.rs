use axum::{routing::{get, post, put}, Json, Router};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

mod db;
mod models;
mod routes;
mod state;

use state::AppState;

#[derive(Serialize)]
struct HealthResponse { status: String, version: String }

async fn health_check() -> Json<HealthResponse> {
    Json(HealthResponse { status: "healthy".into(), version: env!("CARGO_PKG_VERSION").into() })
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let state = AppState::new();

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/products", get(routes::list_products).post(routes::create_product))
        .route("/api/products/bulk", post(routes::bulk_import))
        .route("/api/products/:id", get(routes::get_product))
        .route("/api/products/:id/transfer", put(routes::transfer_owner))
        .route("/api/products/:id/events", get(routes::list_events).post(routes::create_event))
        .route("/api/analytics", get(routes::analytics))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3001));
    tracing::info!("Server listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
