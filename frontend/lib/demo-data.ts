import { Product, TrackingEvent } from './stellar/types'

export const demoProducts: Product[] = [
  { id: 'YHC-LOT-001', name: 'Yirgacheffe Grade 1 - Natural Process', origin: 'Yirgacheffe, Gedeo Zone, Ethiopia', owner: 't.bekele@yirgacheffehighlands.et', timestamp: 1714521600 },
  { id: 'YHC-LOT-002', name: 'Yirgacheffe Grade 1 - Washed Process', origin: 'Yirgacheffe, Gedeo Zone, Ethiopia', owner: 't.bekele@yirgacheffehighlands.et', timestamp: 1715126400 },
  { id: 'YHC-LOT-003', name: 'Yirgacheffe Sundried Heirloom Lot', origin: 'Kochere District, Ethiopia', owner: 't.bekele@yirgacheffehighlands.et', timestamp: 1715731200 },
  { id: 'MOT-BATCH-001', name: 'Organic Kente Cotton - Indigo Dyed', origin: 'Kumasi, Ashanti Region, Ghana', owner: 'a.mensah@malaikatextiles.com', timestamp: 1716940800 },
  { id: 'MOT-BATCH-002', name: 'GOTS Certified Woven Fabric - Natural White', origin: 'Kumasi, Ashanti Region, Ghana', owner: 'a.mensah@malaikatextiles.com', timestamp: 1717545600 },
  { id: 'MOT-BATCH-003', name: 'Handloomed Kente Strip - Export Grade A', origin: 'Bonwire, Ashanti Region, Ghana', owner: 'a.mensah@malaikatextiles.com', timestamp: 1718150400 },
  { id: 'FDR-ORIGIN-001', name: 'Ethiopia Guji Natural - Single Origin', origin: 'Guji Zone, Oromia, Ethiopia', owner: 'lars@fincadirecta.nl', timestamp: 1719360000 },
  { id: 'FDR-ORIGIN-002', name: 'Colombia Huila Washed - Direct Trade', origin: 'Huila Department, Colombia', owner: 'lars@fincadirecta.nl', timestamp: 1719964800 },
  { id: 'FDR-ORIGIN-003', name: 'Kenya AA Nyeri - Small Holder Lot', origin: 'Nyeri County, Kenya', owner: 'lars@fincadirecta.nl', timestamp: 1720569600 },
]

export const demoEvents: TrackingEvent[] = [
  { product_id: 'YHC-LOT-001', location: 'Yirgacheffe Farm Block 7, Ethiopia', actor: 'farmer.cooperative@yirgacheffehighlands.et', timestamp: 1714521600, event_type: 'HARVEST', metadata: '{"altitude":"1,850m","variety":"Heirloom Kurume","cherry_selection":"Red ripe only","farmer":"Abebe Girma"}' },
  { product_id: 'YHC-LOT-001', location: 'Yirgacheffe Central Washing Station', actor: 'washing.station@yirgacheffehighlands.et', timestamp: 1714694400, event_type: 'PROCESSING', metadata: '{"method":"Natural sun-dried","drying_days":"21","moisture_content_final":"11.2%"}' },
  { product_id: 'YHC-LOT-001', location: 'Ethiopian Coffee Exchange, Addis Ababa', actor: 'ecx.inspector@gov.et', timestamp: 1715644800, event_type: 'QUALITY_CHECK', metadata: '{"cupping_score":"88.5","aroma":"Jasmine, blueberry","certification":"Rainforest Alliance #RA-2024-7743"}' },
  { product_id: 'YHC-LOT-001', location: 'Port of Djibouti', actor: 'logistics@afrifreight.com', timestamp: 1716336000, event_type: 'SHIPPING', metadata: '{"vessel":"MSC Adriana","container":"MSCU4471823","destination":"Rotterdam, Netherlands"}' },
  { product_id: 'YHC-LOT-001', location: 'Port of Rotterdam, Netherlands', actor: 'customs@rotterdam-port.nl', timestamp: 1719619200, event_type: 'CUSTOMS', metadata: '{"customs_cleared":"Yes","EU_organic_cert":"EU-BIO-140","duty_paid":"€0 ACP preferential rate"}' },
  { product_id: 'YHC-LOT-001', location: 'Finca Directa Roasters, Amsterdam', actor: 'lars@fincadirecta.nl', timestamp: 1719792000, event_type: 'DELIVERY', metadata: '{"bags_received":"30 x 60kg","condition":"Excellent","invoice":"FDR-INV-2024-0091"}' },

  { product_id: 'MOT-BATCH-001', location: 'Ejura-Sekyedumase District, Ghana', actor: 'rawmaterial@malaikatextiles.com', timestamp: 1716940800, event_type: 'HARVEST', metadata: '{"cotton_type":"Organic Gossypium hirsutum","yield_kg":"4,200","gots_farm_cert":"GOTS-GH-2024-0031"}' },
  { product_id: 'MOT-BATCH-001', location: 'Malaika Spinning Mill, Kumasi', actor: 'spinning@malaikatextiles.com', timestamp: 1717372800, event_type: 'PROCESSING', metadata: '{"process":"Ring spinning","yarn_count":"Ne 30/1","lot_weight_kg":"380"}' },
  { product_id: 'MOT-BATCH-001', location: 'Malaika Weaving Unit, Kumasi', actor: 'weaving@malaikatextiles.com', timestamp: 1717891200, event_type: 'PROCESSING', metadata: '{"loom_type":"Semi-automatic shuttle loom","metres_produced":"820"}' },
  { product_id: 'MOT-BATCH-001', location: 'Malaika Dyeing Unit, Kumasi', actor: 'dyeing@malaikatextiles.com', timestamp: 1718323200, event_type: 'PROCESSING', metadata: '{"dye_type":"GOTS-approved reactive indigo","OEKO-TEX":"100 Class I"}' },
  { product_id: 'MOT-BATCH-001', location: 'Bureau Veritas Accra, Ghana', actor: 'certification@bureauveritas.com.gh', timestamp: 1718755200, event_type: 'QUALITY_CHECK', metadata: '{"standard":"GOTS 6.0","certificate_no":"BV-GOTS-GH-2024-1142","valid_until":"2025-06-30"}' },
  { product_id: 'MOT-BATCH-001', location: 'Tema Port, Accra, Ghana', actor: 'export@malaikatextiles.com', timestamp: 1719273600, event_type: 'SHIPPING', metadata: '{"vessel":"Maersk Belem","container":"MRKU9921034","destination":"Rotterdam, Netherlands"}' },
  { product_id: 'MOT-BATCH-001', location: 'EcoThread Distribution, Rotterdam', actor: 'receiving@ecothread.nl', timestamp: 1722038400, event_type: 'DELIVERY', metadata: '{"rolls_received":"41 x 20m","test_report":"SGS-NL-2024-88231","notes":"Approved for EU market"}' },

  { product_id: 'FDR-ORIGIN-001', location: 'Shakiso District, Guji Zone, Ethiopia', actor: 'producer@gujicoffee.et', timestamp: 1719360000, event_type: 'HARVEST', metadata: '{"farm":"Hambela Estate","altitude":"2,100m","cherry_brix":"24.2"}' },
  { product_id: 'FDR-ORIGIN-001', location: 'Hambela Washing Station, Guji', actor: 'processing@gujicoffee.et', timestamp: 1719532800, event_type: 'PROCESSING', metadata: '{"method":"Natural anaerobic","fermentation":"72hr sealed tank","final_moisture":"10.6%"}' },
  { product_id: 'FDR-ORIGIN-001', location: 'Mocha Specialty Lab, Addis Ababa', actor: 'lab@mochaspecialty.et', timestamp: 1720224000, event_type: 'QUALITY_CHECK', metadata: '{"cupping_score":"91.0","descriptors":"Dark cherry, cardamom, 70% dark chocolate","graded_by":"Hannah Tadesse SCA Q-Grader #22441"}' },
  { product_id: 'FDR-ORIGIN-001', location: 'Port of Djibouti', actor: 'freight@hornlogistics.com', timestamp: 1720828800, event_type: 'SHIPPING', metadata: '{"vessel":"Ever Gentle","container":"EITU3345621","ETD":"2024-07-13"}' },
  { product_id: 'FDR-ORIGIN-001', location: 'Finca Directa Roasters, Amsterdam', actor: 'lars@fincadirecta.nl', timestamp: 1722643200, event_type: 'DELIVERY', metadata: '{"bags_received":"15 x 60kg","roast_schedule":"Q4 2024 micro-lot release","qr_bags_printed":"600"}' },
]

export function getDemoEvents(productId: string): TrackingEvent[] {
  return demoEvents.filter(e => e.product_id === productId).sort((a, b) => a.timestamp - b.timestamp)
}
