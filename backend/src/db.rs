use rusqlite::{Connection, Result, params};
use crate::models::{Product, TrackingEvent};

pub fn init(conn: &Connection) -> Result<()> {
    conn.execute_batch("
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            origin TEXT NOT NULL,
            owner TEXT NOT NULL,
            timestamp INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id TEXT NOT NULL,
            location TEXT NOT NULL,
            actor TEXT NOT NULL,
            timestamp INTEGER NOT NULL,
            event_type TEXT NOT NULL,
            metadata TEXT NOT NULL DEFAULT '{}'
        );
    ")
}

pub fn seed(conn: &Connection) -> Result<()> {
    let count: i64 = conn.query_row("SELECT COUNT(*) FROM products", [], |r| r.get(0))?;
    if count > 0 { return Ok(()); }

    // ── Yirgacheffe Highlands Cooperative ──────────────────────────────────
    let products = vec![
        ("YHC-LOT-001", "Yirgacheffe Grade 1 - Natural Process", "Yirgacheffe, Gedeo Zone, Ethiopia", "t.bekele@yirgacheffehighlands.et", 1714521600i64),
        ("YHC-LOT-002", "Yirgacheffe Grade 1 - Washed Process", "Yirgacheffe, Gedeo Zone, Ethiopia", "t.bekele@yirgacheffehighlands.et", 1715126400i64),
        ("YHC-LOT-003", "Yirgacheffe Sundried Heirloom Lot", "Kochere District, Ethiopia", "t.bekele@yirgacheffehighlands.et", 1715731200i64),
        // ── Malaika Organic Textiles ───────────────────────────────────────
        ("MOT-BATCH-001", "Organic Kente Cotton - Indigo Dyed", "Kumasi, Ashanti Region, Ghana", "a.mensah@malaikatextiles.com", 1716940800i64),
        ("MOT-BATCH-002", "GOTS Certified Woven Fabric - Natural White", "Kumasi, Ashanti Region, Ghana", "a.mensah@malaikatextiles.com", 1717545600i64),
        ("MOT-BATCH-003", "Handloomed Kente Strip - Export Grade A", "Bonwire, Ashanti Region, Ghana", "a.mensah@malaikatextiles.com", 1718150400i64),
        // ── Finca Directa Roasters ─────────────────────────────────────────
        ("FDR-ORIGIN-001", "Ethiopia Guji Natural - Single Origin", "Guji Zone, Oromia, Ethiopia", "lars@fincadirecta.nl", 1719360000i64),
        ("FDR-ORIGIN-002", "Colombia Huila Washed - Direct Trade", "Huila Department, Colombia", "lars@fincadirecta.nl", 1719964800i64),
        ("FDR-ORIGIN-003", "Kenya AA Nyeri - Small Holder Lot", "Nyeri County, Kenya", "lars@fincadirecta.nl", 1720569600i64),
    ];

    for (id, name, origin, owner, ts) in &products {
        conn.execute(
            "INSERT INTO products (id,name,origin,owner,timestamp) VALUES (?1,?2,?3,?4,?5)",
            params![id, name, origin, owner, ts],
        )?;
    }

    // ── Events for YHC-LOT-001 ─────────────────────────────────────────────
    let events: Vec<(&str,&str,&str,i64,&str,&str)> = vec![
        ("YHC-LOT-001","Yirgacheffe Farm Block 7, Ethiopia","farmer.cooperative@yirgacheffehighlands.et",1714521600,"HARVEST",r#"{"altitude":"1,850m","variety":"Heirloom Kurume","cherry_selection":"Red ripe only","farm_area_ha":"2.4","farmer":"Abebe Girma"}"#),
        ("YHC-LOT-001","Yirgacheffe Central Washing Station, Ethiopia","washing.station@yirgacheffehighlands.et",1714694400,"PROCESSING",r#"{"method":"Natural sun-dried","raised_beds":"42 beds used","drying_days":"21","moisture_content_final":"11.2%","notes":"Exceptional fruit forward profile"}"#),
        ("YHC-LOT-001","Addis Ababa Dry Mill, Ethiopia","drymill@ethexport.et",1715472000,"PROCESSING",r#"{"mill":"Ethio Agri-CEFT","hulling":"Done","sorting":"Electronic colour sort","screen_size":"15+","defect_rate":"0.3%"}"#),
        ("YHC-LOT-001","Ethiopian Coffee Exchange, Addis Ababa","ecx.inspector@gov.et",1715644800,"QUALITY_CHECK",r#"{"cupping_score":"88.5","body":"Full","acidity":"Bright citric","aroma":"Jasmine, blueberry","graded_by":"ECX Certified Q-Grader","certification":"Rainforest Alliance #RA-2024-7743"}"#),
        ("YHC-LOT-001","Port of Djibouti, Djibouti","logistics@afrifreight.com",1716336000,"CUSTOMS",r#"{"vessel":"MSC Adriana","container":"MSCU4471823","bill_of_lading":"BOL-2024-DJ-08812","phytosanitary":"PC-ET-2024-0443","destination":"Rotterdam, Netherlands"}"#),
        ("YHC-LOT-001","Port of Rotterdam, Netherlands","customs@rotterdam-port.nl",1719619200,"CUSTOMS",r#"{"customs_cleared":"Yes","EU_organic_cert":"EU-BIO-140","inspection_officer":"J. van Dijk","duty_paid":"€0 – ACP preferential rate"}"#),
        ("YHC-LOT-001","Finca Directa Roasters Warehouse, Amsterdam","lars@fincadirecta.nl",1719792000,"DELIVERY",r#"{"bags_received":"30 x 60kg","condition":"Excellent","moisture_on_arrival":"11.4%","invoice":"FDR-INV-2024-0091","notes":"Allocated to Q3 single-origin release"}"#),

        // ── Events for YHC-LOT-002 ─────────────────────────────────────────
        ("YHC-LOT-002","Yirgacheffe Farm Block 12, Ethiopia","farmer.cooperative@yirgacheffehighlands.et",1715126400,"HARVEST",r#"{"altitude":"1,920m","variety":"Heirloom Wolisho","cherry_selection":"Red ripe only","farm_area_ha":"1.8","farmer":"Tigist Haile"}"#),
        ("YHC-LOT-002","Yirgacheffe Central Washing Station, Ethiopia","washing.station@yirgacheffehighlands.et",1715299200,"PROCESSING",r#"{"method":"Fully washed","fermentation_hours":"36","washing_channels":"Channel 3","drying_days":"15","moisture_content_final":"10.8%"}"#),
        ("YHC-LOT-002","Ethiopian Coffee Exchange, Addis Ababa","ecx.inspector@gov.et",1716249600,"QUALITY_CHECK",r#"{"cupping_score":"87.25","body":"Medium-light","acidity":"Lemon-lime","aroma":"Bergamot, black tea","graded_by":"ECX Certified Q-Grader","certification":"UTZ #UTZ-2024-5521"}"#),
        ("YHC-LOT-002","Port of Djibouti, Djibouti","logistics@afrifreight.com",1716940800,"SHIPPING",r#"{"vessel":"CMA CGM Rossini","container":"CMAU8834512","departure":"2024-05-29","destination":"Hamburg, Germany"}"#),

        // ── Events for MOT-BATCH-001 ───────────────────────────────────────
        ("MOT-BATCH-001","Ejura-Sekyedumase District, Ghana","rawmaterial@malaikatextiles.com",1716940800,"HARVEST",r#"{"cotton_type":"Organic Gossypium hirsutum","field_area_ha":"12.5","yield_kg":"4,200","gots_farm_cert":"GOTS-GH-2024-0031","farmer_group":"Ashanti Organic Growers Union"}"#),
        ("MOT-BATCH-001","Malaika Spinning Mill, Kumasi, Ghana","spinning@malaikatextiles.com",1717372800,"PROCESSING",r#"{"process":"Ring spinning","yarn_count":"Ne 30/1","lot_weight_kg":"380","machine":"Rieter G38","notes":"No synthetic blending"}"#),
        ("MOT-BATCH-001","Malaika Weaving Unit, Kumasi, Ghana","weaving@malaikatextiles.com",1717891200,"PROCESSING",r#"{"loom_type":"Semi-automatic shuttle loom","weave_structure":"Plain weave base with Kente inlay","width_cm":"114","metres_produced":"820","thread_count":"42x38"}"#),
        ("MOT-BATCH-001","Malaika Dyeing Unit, Kumasi, Ghana","dyeing@malaikatextiles.com",1718323200,"PROCESSING",r#"{"dye_type":"GOTS-approved reactive indigo","chemical_supplier":"Archroma GOTS Cert #AR-2024","water_treatment":"Closed loop recycled","shade_ref":"IND-DEEP-07","OEKO-TEX":"100 Class I"}"#),
        ("MOT-BATCH-001","Bureau Veritas Accra, Ghana","certification@bureauveritas.com.gh",1718755200,"QUALITY_CHECK",r#"{"standard":"GOTS 6.0","certificate_no":"BV-GOTS-GH-2024-1142","scope":"Spinning, weaving, dyeing","valid_until":"2025-06-30","auditor":"Kwame Asante"}"#),
        ("MOT-BATCH-001","Tema Port, Accra, Ghana","export@malaikatextiles.com",1719273600,"SHIPPING",r#"{"vessel":"Maersk Belem","container":"MRKU9921034","destination":"Rotterdam, Netherlands","buyer":"EcoThread B.V.","invoice":"MOT-EXP-2024-0218"}"#),
        ("MOT-BATCH-001","EcoThread Distribution, Rotterdam, Netherlands","receiving@ecothread.nl",1722038400,"DELIVERY",r#"{"rolls_received":"41 x 20m","inspection":"Passed third-party lab test","test_report":"SGS-NL-2024-88231","notes":"Approved for EU market release"}"#),

        // ── Events for FDR-ORIGIN-001 ──────────────────────────────────────
        ("FDR-ORIGIN-001","Shakiso District, Guji Zone, Ethiopia","producer@gujicoffee.et",1719360000,"HARVEST",r#"{"farm":"Hambela Estate","altitude":"2,100m","variety":"74110 & 74112 selections","harvest_method":"Hand-picked selective","cherry_brix":"24.2"}"#),
        ("FDR-ORIGIN-001","Hambela Washing Station, Guji, Ethiopia","processing@gujicoffee.et",1719532800,"PROCESSING",r#"{"method":"Natural anaerobic","fermentation":"72hr sealed tank","drying_surface":"African raised beds","drying_days":"28","final_moisture":"10.6%"}"#),
        ("FDR-ORIGIN-001","Mocha Specialty Lab, Addis Ababa","lab@mochaspecialty.et",1720224000,"QUALITY_CHECK",r#"{"cupping_score":"91.0","descriptor_1":"Dark cherry","descriptor_2":"Cardamom","descriptor_3":"70% dark chocolate","graded_by":"Hannah Tadesse SCA Q-Grader #22441"}"#),
        ("FDR-ORIGIN-001","Port of Djibouti, Djibouti","freight@hornlogistics.com",1720828800,"SHIPPING",r#"{"vessel":"Ever Gentle","container":"EITU3345621","reefer":"No","ETD":"2024-07-13","ETA":"2024-08-04"}"#),
        ("FDR-ORIGIN-001","Finca Directa Roasters, Amsterdam","lars@fincadirecta.nl",1722643200,"DELIVERY",r#"{"bags_received":"15 x 60kg","sample_retained":"2kg cupping reserve","roast_schedule":"Q4 2024 micro-lot release","retail_price_kg":"€62","qr_bags_printed":"600"}"#),
    ];

    for (pid, loc, actor, ts, etype, meta) in &events {
        conn.execute(
            "INSERT INTO events (product_id,location,actor,timestamp,event_type,metadata) VALUES (?1,?2,?3,?4,?5,?6)",
            params![pid, loc, actor, ts, etype, meta],
        )?;
    }

    Ok(())
}

pub fn get_all_products(conn: &Connection) -> Result<Vec<Product>> {
    let mut stmt = conn.prepare("SELECT id,name,origin,owner,timestamp FROM products ORDER BY timestamp DESC")?;
    let rows = stmt.query_map([], |r| Ok(Product {
        id: r.get(0)?, name: r.get(1)?, origin: r.get(2)?, owner: r.get(3)?,
        timestamp: r.get::<_,i64>(4)? as u64,
    }))?;
    rows.collect()
}

pub fn get_product(conn: &Connection, id: &str) -> Result<Option<Product>> {
    let mut stmt = conn.prepare("SELECT id,name,origin,owner,timestamp FROM products WHERE id=?1")?;
    let mut rows = stmt.query_map([id], |r| Ok(Product {
        id: r.get(0)?, name: r.get(1)?, origin: r.get(2)?, owner: r.get(3)?,
        timestamp: r.get::<_,i64>(4)? as u64,
    }))?;
    Ok(rows.next().transpose()?)
}

pub fn insert_product(conn: &Connection, p: &Product) -> Result<()> {
    conn.execute(
        "INSERT INTO products (id,name,origin,owner,timestamp) VALUES (?1,?2,?3,?4,?5)",
        params![p.id, p.name, p.origin, p.owner, p.timestamp as i64],
    )?;
    Ok(())
}

pub fn update_owner(conn: &Connection, id: &str, new_owner: &str) -> Result<usize> {
    conn.execute("UPDATE products SET owner=?1 WHERE id=?2", params![new_owner, id])
}

pub fn get_events(conn: &Connection, product_id: &str) -> Result<Vec<TrackingEvent>> {
    let mut stmt = conn.prepare(
        "SELECT product_id,location,actor,timestamp,event_type,metadata FROM events WHERE product_id=?1 ORDER BY timestamp ASC"
    )?;
    let rows = stmt.query_map([product_id], |r| Ok(TrackingEvent {
        product_id: r.get(0)?, location: r.get(1)?, actor: r.get(2)?,
        timestamp: r.get::<_,i64>(3)? as u64,
        event_type: r.get(4)?, metadata: r.get(5)?,
    }))?;
    rows.collect()
}

pub fn insert_event(conn: &Connection, e: &TrackingEvent) -> Result<()> {
    conn.execute(
        "INSERT INTO events (product_id,location,actor,timestamp,event_type,metadata) VALUES (?1,?2,?3,?4,?5,?6)",
        params![e.product_id, e.location, e.actor, e.timestamp as i64, e.event_type, e.metadata],
    )?;
    Ok(())
}

pub fn get_analytics(conn: &Connection) -> Result<serde_json::Value> {
    let product_count: i64 = conn.query_row("SELECT COUNT(*) FROM products", [], |r| r.get(0))?;
    let event_count: i64 = conn.query_row("SELECT COUNT(*) FROM events", [], |r| r.get(0))?;

    // Events by type
    let mut stmt = conn.prepare("SELECT event_type, COUNT(*) as cnt FROM events GROUP BY event_type ORDER BY cnt DESC")?;
    let by_type: Vec<(String, i64)> = stmt.query_map([], |r| Ok((r.get(0)?, r.get(1)?)))?.filter_map(|r| r.ok()).collect();

    // Top products by event count
    let mut stmt2 = conn.prepare(
        "SELECT p.id, p.name, COUNT(e.id) as cnt FROM products p LEFT JOIN events e ON p.id=e.product_id GROUP BY p.id ORDER BY cnt DESC LIMIT 5"
    )?;
    let top: Vec<(String, String, i64)> = stmt2.query_map([], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?)))?.filter_map(|r| r.ok()).collect();

    Ok(serde_json::json!({
        "product_count": product_count,
        "event_count": event_count,
        "events_by_type": by_type.iter().map(|(t,c)| serde_json::json!({"type": t, "count": c})).collect::<Vec<_>>(),
        "top_products": top.iter().map(|(id,name,c)| serde_json::json!({"id": id, "name": name, "event_count": c})).collect::<Vec<_>>(),
    }))
}
