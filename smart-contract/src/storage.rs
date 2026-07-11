#![no_std]
use soroban_sdk::{Env, String};

// Storage key helpers
pub fn product_key(id: &String) -> String {
    id.clone()
}

pub fn events_key(product_id: &String) -> String {
    product_id.clone()
}
