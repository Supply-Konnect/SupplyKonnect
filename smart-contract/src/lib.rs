#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};

mod types;
mod storage;
mod error;

use types::{Product, TrackingEvent};
use error::Error;

#[contract]
pub struct SupplyKonnectContract;

#[contractimpl]
impl SupplyKonnectContract {
    /// Register a new product on the blockchain
    pub fn register_product(
        env: Env,
        id: String,
        name: String,
        origin: String,
        owner: Address,
    ) -> Result<Product, Error> {
        owner.require_auth();
        
        let product = Product {
            id: id.clone(),
            name,
            origin,
            owner,
            timestamp: env.ledger().timestamp(),
        };
        
        // TODO: Store product in persistent storage
        
        Ok(product)
    }
    
    /// Add a tracking event to a product
    pub fn add_tracking_event(
        env: Env,
        product_id: String,
        location: String,
        event_type: String,
        actor: Address,
        metadata: String,
    ) -> Result<TrackingEvent, Error> {
        actor.require_auth();
        
        let event = TrackingEvent {
            product_id,
            location,
            actor,
            timestamp: env.ledger().timestamp(),
            event_type,
            metadata,
        };
        
        // TODO: Store event and link to product
        
        Ok(event)
    }
    
    /// Get product details by ID
    pub fn get_product(env: Env, id: String) -> Result<Product, Error> {
        // TODO: Retrieve from storage
        Err(Error::NotImplemented)
    }
    
    /// Get all tracking events for a product
    pub fn get_tracking_events(env: Env, product_id: String) -> Result<Vec<TrackingEvent>, Error> {
        // TODO: Retrieve events from storage
        Err(Error::NotImplemented)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::{Address as _, Ledger};
    
    #[test]
    fn test_register_product() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SupplyKonnectContract);
        let client = SupplyKonnectContractClient::new(&env, &contract_id);
        
        let owner = Address::generate(&env);
        let id = String::from_str(&env, "PROD001");
        let name = String::from_str(&env, "Organic Coffee");
        let origin = String::from_str(&env, "Ethiopia");
        
        env.mock_all_auths();
        
        let result = client.register_product(&id, &name, &origin, &owner);
        assert!(result.is_ok());
    }
}
