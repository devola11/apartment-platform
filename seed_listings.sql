-- seed_listings.sql
-- Run this in your Supabase SQL Editor to populate the listings table.
-- 50 listings: 25 in California, 25 in Florida

INSERT INTO listings (title, description, address, city, state, zip, price, bedrooms, bathrooms, sqft, latitude, longitude, image_url, amenities) VALUES

-- ─── CALIFORNIA ────────────────────────────────────────────────────────────

-- Los Angeles
('Modern Studio in Downtown LA',
 'Stylish studio in the heart of downtown Los Angeles. Floor-to-ceiling windows with city views. Walking distance to restaurants, nightlife, and public transit.',
 '123 S Grand Ave', 'Los Angeles', 'California', '90012',
 1850, 0, 1, 480, 34.0522, -118.2584,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
 ARRAY['Gym', 'Rooftop Deck', 'Concierge', 'Pet Friendly']),

('Bright 1BR in Silver Lake',
 'Charming one-bedroom in trendy Silver Lake with hardwood floors, updated kitchen, and private patio. Minutes from Sunset Blvd dining and shopping.',
 '456 Hyperion Ave', 'Los Angeles', 'California', '90027',
 2450, 1, 1, 720, 34.0869, -118.2703,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
 ARRAY['Parking', 'In-Unit Laundry', 'Pet Friendly', 'Air Conditioning']),

('Spacious 2BR in Koreatown',
 'Renovated two-bedroom with open-plan living, stainless steel appliances, and in-unit washer/dryer. Close to Metro Purple Line.',
 '789 Wilshire Blvd', 'Los Angeles', 'California', '90010',
 3100, 2, 2, 1050, 34.0625, -118.3103,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
 ARRAY['In-Unit Laundry', 'Dishwasher', 'Air Conditioning', 'Parking']),

('Luxury 3BR in West Hollywood',
 'Stunning three-bedroom with designer finishes, private balcony, and gourmet kitchen. Building features rooftop pool and valet parking.',
 '222 N La Cienega Blvd', 'Los Angeles', 'California', '90048',
 5200, 3, 2, 1600, 34.0771, -118.3747,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Valet Parking', 'Concierge', 'Rooftop Deck']),

('Cozy 1BR in Hollywood Hills',
 'Hillside one-bedroom with breathtaking canyon views and private deck. Updated bathroom, newer appliances, and gated parking.',
 '55 Mulholland Dr', 'Los Angeles', 'California', '90068',
 2750, 1, 1, 690, 34.1120, -118.3396,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
 ARRAY['Parking', 'Deck', 'Air Conditioning', 'Views']),

-- San Francisco
('Chic Studio in SoMa',
 'Contemporary studio in SF''s SoMa district. Exposed brick, polished concrete floors, and fully equipped kitchen. Walk to Caltrain and BART.',
 '310 Folsom St', 'San Francisco', 'California', '94105',
 2600, 0, 1, 510, 37.7862, -122.3928,
 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80',
 ARRAY['Bike Storage', 'Gym', 'Rooftop', 'Pet Friendly']),

('1BR in the Mission District',
 'Charming Victorian one-bedroom on a tree-lined block in the Mission. High ceilings, bay windows, and original hardwood floors. Steps from top restaurants.',
 '2401 Valencia St', 'San Francisco', 'California', '94110',
 3150, 1, 1, 740, 37.7558, -122.4206,
 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
 ARRAY['Storage', 'Laundry', 'Bike Friendly']),

('Modern 2BR in Hayes Valley',
 'Sleek two-bedroom in one of SF''s most walkable neighborhoods. Open floor plan, Nest thermostat, private balcony, and secure parking.',
 '480 Fell St', 'San Francisco', 'California', '94102',
 4700, 2, 2, 1100, 37.7761, -122.4329,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
 ARRAY['Parking', 'Balcony', 'In-Unit Laundry', 'Air Conditioning']),

('Penthouse 3BR in Nob Hill',
 'Spectacular penthouse with panoramic Bay Bridge and city views. Luxury finishes, chef''s kitchen, and 24-hour doorman. A rare SF gem.',
 '1200 California St', 'San Francisco', 'California', '94109',
 7500, 3, 3, 2000, 37.7920, -122.4148,
 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
 ARRAY['Doorman', 'Valet Parking', 'Views', 'Gym', 'Pet Friendly']),

('Studio with Bay Views in Embarcadero',
 'Compact but beautifully finished studio with partial bay views. Floor-to-ceiling windows, built-in storage, and access to rooftop garden.',
 '100 Brannan St', 'San Francisco', 'California', '94107',
 2900, 0, 1, 490, 37.7823, -122.3917,
 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
 ARRAY['Rooftop Garden', 'Concierge', 'Gym', 'Bike Storage']),

-- San Diego
('Sunny 1BR in North Park',
 'Bright one-bedroom in the heart of North Park. Renovated kitchen, quartz countertops, and a private fenced yard. Pet friendly.',
 '3021 University Ave', 'San Diego', 'California', '92104',
 2150, 1, 1, 700, 32.7485, -117.1301,
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
 ARRAY['Yard', 'Parking', 'Pet Friendly', 'Air Conditioning']),

('2BR Beach Bungalow in Ocean Beach',
 'Adorable two-bedroom bungalow two blocks from the beach. Hardwood floors, updated bath, and a large deck perfect for entertaining.',
 '4825 Narragansett Ave', 'San Diego', 'California', '92107',
 3200, 2, 1, 950, 32.7494, -117.2470,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
 ARRAY['Deck', 'Parking', 'Pet Friendly', 'Beach Access']),

('3BR Home in La Mesa',
 'Spacious three-bedroom with large backyard, two-car garage, and updated kitchen. Quiet suburban neighborhood with top-rated schools.',
 '7812 El Cajon Blvd', 'San Diego', 'California', '91942',
 3800, 3, 2, 1500, 32.7676, -117.0228,
 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
 ARRAY['Garage', 'Backyard', 'Air Conditioning', 'Washer/Dryer']),

-- Sacramento
('2BR Near Midtown Sacramento',
 'Updated two-bedroom in Sacramento''s vibrant Midtown neighborhood. Open layout, granite countertops, and walkable to restaurants and bars.',
 '2200 K St', 'Sacramento', 'California', '95816',
 1750, 2, 1, 900, 38.5720, -121.4824,
 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&q=80',
 ARRAY['Parking', 'Air Conditioning', 'Pet Friendly', 'Laundry']),

('3BR in East Sacramento',
 'Spacious three-bedroom in East Sacramento''s tree-lined streets. Original hardwood floors, large kitchen, and a charming front porch.',
 '4501 H St', 'Sacramento', 'California', '95819',
 2450, 3, 2, 1400, 38.5659, -121.4432,
 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
 ARRAY['Garage', 'Yard', 'Pet Friendly', 'Air Conditioning']),

-- Oakland
('1BR in Temescal, Oakland',
 'Hip one-bedroom in Oakland''s Temescal neighborhood. Exposed brick, modern appliances, and steps from some of the Bay Area''s best coffee shops.',
 '4220 Telegraph Ave', 'Oakland', 'California', '94609',
 2100, 1, 1, 680, 37.8294, -122.2659,
 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
 ARRAY['Bike Storage', 'Pet Friendly', 'Laundry']),

('2BR Overlooking Lake Merritt',
 'Beautiful two-bedroom with lake views. Hardwood floors, bay windows, newly renovated kitchen, and easy BART access.',
 '3001 Grand Ave', 'Oakland', 'California', '94610',
 2900, 2, 1, 1000, 37.8100, -122.2500,
 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80',
 ARRAY['Lake Views', 'Parking', 'Pet Friendly', 'Laundry']),

-- Fresno
('2BR in Central Fresno',
 'Affordable two-bedroom with spacious rooms, updated kitchen, and community pool. Convenient location near shopping and dining.',
 '1845 N Blackstone Ave', 'Fresno', 'California', '93703',
 1350, 2, 1, 900, 36.7779, -119.7871,
 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&q=80',
 ARRAY['Pool', 'Parking', 'Air Conditioning', 'Laundry']),

('3BR Craftsman in Tower District',
 'Charming three-bedroom in Fresno''s eclectic Tower District. Original 1940s details, large backyard, and two-car garage.',
 '890 N Van Ness Ave', 'Fresno', 'California', '93728',
 1750, 3, 2, 1350, 36.7530, -119.7960,
 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
 ARRAY['Garage', 'Backyard', 'Air Conditioning', 'Pet Friendly']),

-- Irvine
('2BR Resort-Style in Irvine Spectrum',
 'Contemporary two-bedroom with resort-style amenities. Gourmet kitchen, private balcony, and access to two pools, gym, and clubhouse.',
 '15100 Sand Canyon Ave', 'Irvine', 'California', '92618',
 3600, 2, 2, 1150, 33.6697, -117.7921,
 'https://images.unsplash.com/photo-1580587771525-4dddfa7b9a19?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Clubhouse', 'Balcony', 'Parking']),

-- Santa Monica
('1BR Steps from Santa Monica Beach',
 'Airy one-bedroom just two blocks from the beach. Light-filled rooms, updated kitchen, and a rooftop terrace with ocean views.',
 '400 Ocean Ave', 'Santa Monica', 'California', '90402',
 3100, 1, 1, 710, 34.0195, -118.4912,
 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
 ARRAY['Rooftop', 'Beach Access', 'Air Conditioning', 'Parking']),

-- Long Beach
('2BR in Belmont Shore',
 'Stylish two-bedroom in Long Beach''s Belmont Shore area. Open floor plan, private patio, and one block from the water. Pet friendly.',
 '5601 E Ocean Blvd', 'Long Beach', 'California', '90803',
 2700, 2, 2, 1020, 33.7607, -118.1290,
 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
 ARRAY['Patio', 'Pet Friendly', 'Parking', 'Air Conditioning']),

-- Pasadena
('2BR Victorian in Old Pasadena',
 'Beautifully restored two-bedroom Victorian apartment in Old Pasadena. Original woodwork, modern kitchen, and a charming garden.',
 '55 N Mentor Ave', 'Pasadena', 'California', '91106',
 2950, 2, 1, 1000, 34.1478, -118.1361,
 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
 ARRAY['Garden', 'Parking', 'Pet Friendly', 'Laundry']),

-- Anaheim
('2BR Near Anaheim Entertainment',
 'Comfortable two-bedroom close to Anaheim''s attractions. Fully renovated with quartz countertops and resort-style pool and gym.',
 '1800 S Harbor Blvd', 'Anaheim', 'California', '92802',
 2350, 2, 2, 980, 33.8006, -117.9186,
 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Parking', 'Air Conditioning']),

-- Beverly Hills
('2BR in the Heart of Beverly Hills',
 'Sophisticated two-bedroom with marble countertops, hardwood floors, and building amenities including pool, spa, and valet.',
 '310 N Crescent Dr', 'Beverly Hills', 'California', '90210',
 5800, 2, 2, 1300, 34.0746, -118.3956,
 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
 ARRAY['Pool', 'Spa', 'Valet', 'Concierge', 'Gym', 'Pet Friendly']),

-- ─── FLORIDA ───────────────────────────────────────────────────────────────

-- Miami
('1BR with Bay Views in Brickell',
 'Sleek one-bedroom in Miami''s financial district with stunning Biscayne Bay views. High-rise living with resort-style amenities and walkable neighborhood.',
 '1100 Brickell Ave', 'Miami', 'Florida', '33131',
 2400, 1, 1, 750, 25.7617, -80.1918,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Concierge', 'Valet', 'Bay Views']),

('2BR Loft in Wynwood Arts District',
 'Artistic two-bedroom loft in Miami''s famous Wynwood neighborhood. Exposed concrete, open kitchen, and surrounded by world-class murals and galleries.',
 '2800 NW 2nd Ave', 'Miami', 'Florida', '33127',
 3100, 2, 2, 1100, 25.8006, -80.1998,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
 ARRAY['Rooftop', 'Parking', 'Pet Friendly', 'Air Conditioning']),

('3BR Home in Coconut Grove',
 'Lush three-bedroom home in Coconut Grove with tropical landscaping, private pool, and two-car garage. Close to Biscayne Bay and top-rated schools.',
 '3450 Main Hwy', 'Miami', 'Florida', '33133',
 5500, 3, 2, 1800, 25.7285, -80.2399,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
 ARRAY['Private Pool', 'Garage', 'Yard', 'Air Conditioning', 'Pet Friendly']),

('2BR Condo on Miami Beach',
 'Gorgeous two-bedroom steps from the sand. Ocean views, designer interior, building pool, and rooftop sundeck.',
 '1500 Ocean Dr', 'Miami', 'Florida', '33139',
 4200, 2, 2, 1050, 25.7825, -80.1300,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
 ARRAY['Ocean Views', 'Pool', 'Gym', 'Doorman', 'Beach Access']),

('Studio in Edgewater Miami',
 'Bright studio in Miami''s Edgewater neighborhood. Modern finishes, Biscayne Bay views, and resort amenities. Five-minute drive to Wynwood.',
 '3301 NE 1st Ave', 'Miami', 'Florida', '33137',
 1950, 0, 1, 520, 25.7960, -80.1872,
 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Rooftop', 'Concierge']),

-- Orlando
('1BR Overlooking Lake Eola',
 'Stylish one-bedroom in downtown Orlando overlooking Lake Eola Park. Modern finishes, community pool, and walking distance to restaurants and nightlife.',
 '100 E Central Blvd', 'Orlando', 'Florida', '32801',
 1700, 1, 1, 720, 28.5383, -81.3792,
 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Lake Views', 'Pet Friendly', 'Parking']),

('2BR Bungalow in Thornton Park',
 'Beautiful two-bedroom bungalow in historic Thornton Park. Character-filled home with hardwood floors, updated kitchen, and a screened porch.',
 '717 E Washington St', 'Orlando', 'Florida', '32801',
 2200, 2, 1, 1000, 28.5405, -81.3675,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
 ARRAY['Porch', 'Yard', 'Parking', 'Pet Friendly']),

('3BR in Dr. Phillips, Orlando',
 'Spacious three-bedroom home with open floor plan, granite kitchen, community pool, and top-rated schools nearby.',
 '7823 Viera Blvd', 'Orlando', 'Florida', '32836',
 2950, 3, 2, 1650, 28.4595, -81.4789,
 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
 ARRAY['Pool', 'Garage', 'Air Conditioning', 'Pet Friendly']),

('2BR in College Park, Orlando',
 'Charming two-bedroom in Orlando''s eclectic College Park neighborhood. Large fenced yard, carport, and steps from Edgewater Drive dining.',
 '1200 Formosa Ave', 'Orlando', 'Florida', '32804',
 2100, 2, 1, 950, 28.5699, -81.3916,
 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
 ARRAY['Yard', 'Carport', 'Pet Friendly', 'Air Conditioning']),

-- Tampa
('1BR Historic Loft in Ybor City',
 'Historic one-bedroom loft in Tampa''s vibrant Ybor City. Exposed brick, 12-ft ceilings, and walking distance to the best nightlife in Tampa Bay.',
 '1901 N 19th St', 'Tampa', 'Florida', '33605',
 1800, 1, 1, 760, 27.9611, -82.4313,
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
 ARRAY['Parking', 'Pet Friendly', 'Air Conditioning']),

('2BR in Hyde Park, Tampa',
 'Elegant two-bedroom in Tampa''s upscale Hyde Park neighborhood. Oak-lined streets, updated finishes, private balcony, and walk to Bayshore Boulevard.',
 '2009 W Azeele St', 'Tampa', 'Florida', '33606',
 2600, 2, 2, 1100, 27.9400, -82.4700,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
 ARRAY['Balcony', 'Parking', 'Gym', 'Pet Friendly']),

('3BR with Pool in South Tampa',
 'Stunning three-bedroom home with open floor plan, gourmet kitchen, and private pool. Blocks from the water and top schools.',
 '4010 W San Pedro St', 'Tampa', 'Florida', '33629',
 3400, 3, 2, 1700, 27.9213, -82.5048,
 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
 ARRAY['Private Pool', 'Garage', 'Yard', 'Air Conditioning']),

-- Jacksonville
('2BR in Historic San Marco',
 'Lovely two-bedroom in historic San Marco. Original hardwood floors, high ceilings, and a private courtyard garden. Walk to boutiques and dining.',
 '1400 San Marco Blvd', 'Jacksonville', 'Florida', '32207',
 1750, 2, 1, 1000, 30.3054, -81.6549,
 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&q=80',
 ARRAY['Garden', 'Parking', 'Pet Friendly', 'Air Conditioning']),

('3BR Craftsman in Riverside, Jacksonville',
 'Spacious three-bedroom Craftsman bungalow in Jacksonville''s arts-centric Riverside neighborhood. Large front porch, updated interior, and fenced yard.',
 '2300 Myra St', 'Jacksonville', 'Florida', '32204',
 2300, 3, 2, 1500, 30.3215, -81.6879,
 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
 ARRAY['Porch', 'Yard', 'Parking', 'Pet Friendly']),

('1BR in Avondale, Jacksonville',
 'Cozy one-bedroom in Jacksonville''s charming Avondale neighborhood. Period details, updated bath, and steps from St. Johns Ave dining.',
 '3545 Herschel St', 'Jacksonville', 'Florida', '32205',
 1550, 1, 1, 680, 30.3049, -81.7095,
 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&q=80',
 ARRAY['Parking', 'Pet Friendly', 'Air Conditioning']),

-- Fort Lauderdale
('2BR on Las Olas, Fort Lauderdale',
 'Chic two-bedroom steps from Fort Lauderdale''s famous Las Olas Boulevard. Modern condo with a balcony, city pool, and premium gym.',
 '501 E Las Olas Blvd', 'Fort Lauderdale', 'Florida', '33301',
 2950, 2, 2, 1050, 26.1224, -80.1373,
 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Balcony', 'Parking', 'Concierge']),

('1BR near Fort Lauderdale Beach',
 'Bright one-bedroom condo a short walk from the beach. Open layout, tropical landscaping, and community pool. Perfect for beach living.',
 '3200 N Ocean Blvd', 'Fort Lauderdale', 'Florida', '33308',
 2100, 1, 1, 680, 26.1700, -80.1042,
 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80',
 ARRAY['Pool', 'Parking', 'Beach Access', 'Air Conditioning']),

-- St. Petersburg
('2BR Loft in the Edge District',
 'Trendy two-bedroom loft in St. Pete''s Edge District. Industrial-chic design, rooftop terrace, and walkable to Central Avenue bars and restaurants.',
 '1100 Central Ave', 'St. Petersburg', 'Florida', '33705',
 2300, 2, 2, 1050, 27.7676, -82.6402,
 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&q=80',
 ARRAY['Rooftop', 'Gym', 'Pet Friendly', 'Parking']),

('1BR with Bay Views near Vinoy Park',
 'Sunny one-bedroom with views of Tampa Bay and Vinoy Park. Updated kitchen, luxury finishes, and direct access to the waterfront trail.',
 '701 Bayshore Dr NE', 'St. Petersburg', 'Florida', '33701',
 1900, 1, 1, 720, 27.7750, -82.6284,
 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
 ARRAY['Bay Views', 'Parking', 'Pet Friendly', 'Air Conditioning']),

-- Boca Raton
('2BR in Mizner Park, Boca Raton',
 'Upscale two-bedroom steps from Boca Raton''s Mizner Park. Resort-style amenities, granite kitchen, and private balcony.',
 '433 Plaza Real', 'Boca Raton', 'Florida', '33432',
 2800, 2, 2, 1100, 26.3558, -80.0833,
 'https://images.unsplash.com/photo-1580587771525-4dddfa7b9a19?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Balcony', 'Parking', 'Concierge']),

('3BR Luxury Home in Boca Raton',
 'Stunning three-bedroom in a gated Boca Raton community. Soaring ceilings, gourmet kitchen, private pool, and access to a championship golf course.',
 '7400 Mandarin Dr', 'Boca Raton', 'Florida', '33433',
 3800, 3, 3, 2100, 26.3468, -80.1425,
 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
 ARRAY['Private Pool', 'Garage', 'Gated', 'Golf Course', 'Air Conditioning']),

-- Clearwater
('2BR with Lanai in Clearwater',
 'Comfortable two-bedroom with community pool in Clearwater. Large screened lanai, updated kitchen, and less than 5 miles from Clearwater Beach.',
 '2650 Drew St', 'Clearwater', 'Florida', '33759',
 2150, 2, 2, 1050, 27.9737, -82.7659,
 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
 ARRAY['Pool', 'Lanai', 'Parking', 'Air Conditioning', 'Pet Friendly']),

-- Gainesville
('2BR near University of Florida',
 'Clean two-bedroom apartment close to the University of Florida. Modern interior, community pool, and easy access to I-75.',
 '3800 SW Archer Rd', 'Gainesville', 'Florida', '32608',
 1450, 2, 2, 950, 29.6281, -82.3748,
 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
 ARRAY['Pool', 'Gym', 'Parking', 'Air Conditioning', 'Pet Friendly']),

-- Sarasota
('2BR in Downtown Sarasota',
 'Refined two-bedroom in downtown Sarasota. Walk to cultural venues, fine dining, and St. Armands Circle. Building includes pool and rooftop terrace.',
 '1255 N Palm Ave', 'Sarasota', 'Florida', '34236',
 2550, 2, 2, 1080, 27.3382, -82.5379,
 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
 ARRAY['Pool', 'Rooftop', 'Parking', 'Air Conditioning', 'Concierge']),

-- Tampa (Studio)
('Studio with Skyline Views in Channelside',
 'Modern studio in Tampa''s up-and-coming Channelside district. Stylish finishes, rooftop pool with skyline views, and steps from Amalie Arena.',
 '400 Channelside Dr', 'Tampa', 'Florida', '33602',
 1550, 0, 1, 510, 27.9440, -82.4507,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
 ARRAY['Rooftop Pool', 'Gym', 'Parking', 'Concierge', 'Skyline Views']);
