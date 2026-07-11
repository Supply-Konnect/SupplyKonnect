use std::sync::{Arc, Mutex};
use rusqlite::Connection;

#[derive(Clone)]
pub struct AppState {
    pub db: Arc<Mutex<Connection>>,
}

impl AppState {
    pub fn new() -> Self {
        let conn = Connection::open("supply_konnect.db").expect("Failed to open database");
        crate::db::init(&conn).expect("Failed to initialize database");
        crate::db::seed(&conn).expect("Failed to seed database");
        Self { db: Arc::new(Mutex::new(conn)) }
    }
}
