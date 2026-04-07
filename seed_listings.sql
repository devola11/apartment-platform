-- seed_listings.sql
-- 60 listings: 10 studios · 25 one-bedrooms · 25 two-bedrooms
-- 31 California · 29 Florida
--
-- Run in your Supabase SQL Editor.
-- The image_group column records which folder in apartment-images-raw
-- maps to each listing so images can be uploaded and linked later.
--
-- Add image_group column if it doesn't exist yet:
--   ALTER TABLE listings ADD COLUMN IF NOT EXISTS image_group text;

TRUNCATE TABLE listings RESTART IDENTITY CASCADE;

INSERT INTO listings (
  title, description, address, city, state, zip,
  price, bedrooms, bathrooms, sqft,
  latitude, longitude, image_url, amenities, image_group
) VALUES

-- ─── STUDIOS ────────────────────────────────────────────────────────────────

-- 1 · Santa Monica · CA
('The Promenade Studio',
 'Light-filled studio steps from the Third Street Promenade in the heart of Santa Monica. Features an efficient open layout with modern kitchen finishes and oversized windows letting in the Southern California sun. Rooftop sun deck and bike storage included.',
 '1450 2nd St', 'Santa Monica', 'California', '90401',
 2100, 0, 1, 480, 34.0160, -118.4957, '',
 ARRAY['Rooftop Deck','Gym','In-Unit Laundry','Dishwasher','Bike Storage','Elevator'],
 'Studio 144-50 25th Rd'),

-- 2 · San Francisco · CA
('Mission Street Studio Loft',
 'Stylish studio loft in San Francisco''s vibrant Mission District, moments from Dolores Park and the city''s best taquerias. Polished concrete floors and high ceilings give this compact space a distinct urban character. Steps from the 16th St BART station.',
 '2390 Mission St', 'San Francisco', 'California', '94110',
 2400, 0, 1, 460, 37.7588, -122.4186, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Bike Storage','Elevator'],
 'Brownsville Transit Village V'),

-- 3 · Oakland · CA
('Grand Lake Studio',
 'Cozy studio in Oakland''s sought-after Grand Lake neighborhood, blocks from the lakeside farmers market and beloved independent cinemas. Bright and efficient layout with updated kitchen and bath. Easy access to the 580 freeway and Lake Merritt BART.',
 '576 Grand Ave', 'Oakland', 'California', '94610',
 1800, 0, 1, 440, 37.8133, -122.2571, '',
 ARRAY['In-Unit Laundry','Dishwasher','Pet Friendly','Hardwood Floors'],
 'Studio 275 Fontaine Parc'),

-- 4 · Irvine · CA
('Campus Quarter Studio',
 'Modern studio near UC Irvine in the University Park neighborhood. Clean lines, in-unit laundry, and resort-style pool and gym make this the ideal base for professionals and students in Orange County. Covered parking included.',
 '4141 Campus Dr', 'Irvine', 'California', '92612',
 2000, 0, 1, 510, 33.6635, -117.8310, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Air Conditioning'],
 'Studio 1318 E 58th St #1'),

-- 5 · Sacramento · CA
('Midtown Sacramento Studio',
 'Alcove studio in Sacramento''s walkable Midtown grid, surrounded by art galleries, farm-to-fork restaurants, and the vibrant K Street scene. Freshly updated with quartz countertops and new cabinetry. Walk Score 95.',
 '1500 21st St', 'Sacramento', 'California', '95811',
 1350, 0, 1, 430, 38.5702, -121.4841, '',
 ARRAY['In-Unit Laundry','Dishwasher','Bike Storage','Hardwood Floors'],
 'Ardmore-Ca'),

-- 6 · Miami · FL
('Edgewater Studio Retreat',
 'Sleek studio in Miami''s Edgewater neighborhood with access to a rooftop amenity deck and Biscayne Bay views. Steps from Wynwood''s world-class art galleries and the Design District''s boutiques. Concierge building with 24-hour security.',
 '3301 NE 1st Ave', 'Miami', 'Florida', '33137',
 2200, 0, 1, 490, 25.8111, -80.1893, '',
 ARRAY['Rooftop Deck','Pool','Gym','In-Unit Laundry','Dishwasher','Concierge','Elevator'],
 'Studio The Halldale'),

-- 7 · Tampa · FL
('Ybor City Studio Loft',
 'Industrial-chic studio in Tampa''s historic Ybor City, steps from the Columbia Restaurant and Cigar City Brewing. Exposed brick walls and original hardwood floors honor the neighborhood''s century-old character. Pet friendly.',
 '1802 E 7th Ave', 'Tampa', 'Florida', '33605',
 1500, 0, 1, 470, 27.9570, -82.4319, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Pet Friendly','Bike Storage'],
 'Studio Seven Lions Apartments'),

-- 8 · Orlando · FL
('Thornton Park Studio',
 'Charming studio in Orlando''s Thornton Park neighborhood, moments from Lake Eola and the city''s emerging dining scene. Freshly renovated interior with updated appliances and plenty of natural light. Steps from Eola Drive''s weekend market.',
 '700 E Washington St', 'Orlando', 'Florida', '32801',
 1350, 0, 1, 450, 28.5443, -81.3647, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Pet Friendly'],
 'CONDO HOLDINGS'),

-- 9 · Jacksonville · FL
('Riverside Studio Flat',
 'Cozy studio in Jacksonville''s storied Riverside neighborhood, walkable to Five Points shops, the St. Johns River park, and acclaimed craft beer bars. Updated kitchen and bath with classic tile detail and good natural light.',
 '2215 Post St', 'Jacksonville', 'Florida', '32204',
 1200, 0, 1, 420, 30.3196, -81.6852, '',
 ARRAY['In-Unit Laundry','Dishwasher','Pet Friendly','Hardwood Floors'],
 'Studio Countyline Apartments'),

-- 10 · Sarasota · FL
('Burns Court Studio',
 'Intimate studio tucked in Sarasota''s celebrated Burns Court arts district, steps from independent galleries, the Burns Court Cinema, and evening farmers markets. Warm wood accents and a private patio create an inviting retreat.',
 '500 Burns Ct', 'Sarasota', 'Florida', '34236',
 1600, 0, 1, 435, 27.3355, -82.5412, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Pet Friendly','Bike Storage'],
 '461 Dean'),

-- ─── 1-BEDROOMS — CALIFORNIA ────────────────────────────────────────────────

-- 11 · Los Angeles · CA
('Silver Lake View One-Bedroom',
 'Bright one-bedroom apartment above Silver Lake''s reservoir corridor with treetop views and easy access to Sunset Junction''s coffee shops and boutiques. Features in-unit laundry, quartz countertops, and an open-plan living area.',
 '2901 Hyperion Ave', 'Los Angeles', 'California', '90027',
 2800, 1, 1, 720, 34.1109, -118.2796, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Pet Friendly','Hardwood Floors'],
 '1031 Clinton St #5B'),

-- 12 · Los Angeles · CA
('Wilshire Corridor One-Bedroom',
 'Spacious one-bedroom in Koreatown''s Wilshire corridor with city-facing views and quick Purple Line Metro access downtown. Modern finishes throughout, including stainless appliances and a renovated bath with designer tile.',
 '3470 Wilshire Blvd', 'Los Angeles', 'California', '90010',
 2600, 1, 1, 750, 34.0611, -118.3092, '',
 ARRAY['Gym','Rooftop Deck','In-Unit Laundry','Dishwasher','Parking','Elevator'],
 'Artem'),

-- 13 · San Francisco · CA
('Nob Hill Classic One-Bedroom',
 'Elegant one-bedroom in a classic Nob Hill building with original hardwood floors and gracious pre-war proportions. An elevator building steps from Grace Cathedral, the Fairmont Hotel, and the Hyde Street cable car line.',
 '1100 Sacramento St', 'San Francisco', 'California', '94108',
 3400, 1, 1, 820, 37.7920, -122.4148, '',
 ARRAY['Elevator','Hardwood Floors','Dishwasher','Laundry in Building','Doorman'],
 '111 Lincoln St unit 3rd Fl'),

-- 14 · San Diego · CA
('North Park One-Bedroom',
 'Stylish one-bedroom in San Diego''s walkable North Park neighborhood, steps from the Ray St Arts District, craft breweries, and diverse dining on University Avenue. In-unit laundry and a private balcony included.',
 '3812 30th St', 'San Diego', 'California', '92104',
 2400, 1, 1, 750, 32.7480, -117.1300, '',
 ARRAY['In-Unit Laundry','Dishwasher','Balcony','Pet Friendly','Bike Storage'],
 'Bay Pointe Apartments'),

-- 15 · San Diego · CA
('Hillcrest One-Bedroom Flat',
 'Renovated one-bedroom in the heart of San Diego''s vibrant Hillcrest neighborhood, surrounded by independent restaurants, the weekly farmers market, and Balboa Park''s cultural institutions. Updated kitchen with quartz counters.',
 '525 Walnut Ave', 'San Diego', 'California', '92103',
 2600, 1, 1, 730, 32.7462, -117.1631, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Air Conditioning','Pet Friendly'],
 'Central Apartments'),

-- 16 · Oakland · CA
('Temescal One-Bedroom',
 'Bright one-bedroom in Oakland''s Temescal neighborhood, walkable to the Saturday farmers market and some of the East Bay''s most celebrated restaurants. Hardwood floors, updated kitchen, and natural light throughout.',
 '4521 Telegraph Ave', 'Oakland', 'California', '94609',
 2300, 1, 1, 710, 37.8348, -122.2632, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Pet Friendly','Bike Storage'],
 'Chesapeake Apartments'),

-- 17 · Fresno · CA
('Tower District One-Bedroom',
 'Cheerful one-bedroom in Fresno''s artsy Tower District, steps from the Tower Theatre, vintage shops, and local craft coffee roasters. Recently refreshed with new flooring and updated kitchen appliances. On-site parking and AC.',
 '928 N Van Ness Ave', 'Fresno', 'California', '93728',
 1100, 1, 1, 680, 36.7583, -119.8019, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Pet Friendly','Parking'],
 'Country Creek'),

-- 18 · Irvine · CA
('Woodbridge Village One-Bedroom',
 'Serene one-bedroom in Irvine''s planned Woodbridge community, with access to two lakes, tennis courts, and resort-style pools. Open-plan living with updated finishes in a meticulously maintained building with covered parking.',
 '4 Autumn Walk', 'Irvine', 'California', '92604',
 2700, 1, 1, 800, 33.6855, -117.7952, '',
 ARRAY['Pool','Gym','Tennis Court','Parking','Air Conditioning','In-Unit Laundry','Dishwasher'],
 'Liberty Station Apartments'),

-- 19 · Long Beach · CA
('Belmont Shore One-Bedroom',
 'Sun-drenched one-bedroom two blocks from the beach in Long Beach''s Belmont Shore neighborhood. Enjoy walkable access to 2nd Street shops, the Belmont Pier, and a relaxed beachside dining scene.',
 '230 Termino Ave', 'Long Beach', 'California', '90803',
 2200, 1, 1, 740, 33.7647, -118.1382, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Bike Storage','Pet Friendly'],
 'Executive House Apartments'),

-- 20 · Pasadena · CA
('Old Town Pasadena One-Bedroom',
 'Charming one-bedroom in a classic Pasadena apartment building, steps from the boutiques and restaurants of Old Town and moments from the Metro Gold Line for downtown LA access. High ceilings and original character throughout.',
 '33 S Arroyo Pkwy', 'Pasadena', 'California', '91105',
 2400, 1, 1, 790, 34.1399, -118.1518, '',
 ARRAY['Laundry in Building','Dishwasher','Hardwood Floors','Parking','Pet Friendly'],
 'Chateaugay Apartments'),

-- 21 · Anaheim · CA
('Platinum Triangle One-Bedroom',
 'Modern one-bedroom in Anaheim''s emerging Platinum Triangle, walking distance from Angel Stadium and the Honda Center. Sleek finishes, a large private balcony, and access to resort-style pool and gym amenities.',
 '1800 E Katella Ave', 'Anaheim', 'California', '92805',
 2100, 1, 1, 780, 33.8030, -117.8706, '',
 ARRAY['Pool','Gym','Parking','In-Unit Laundry','Dishwasher','Air Conditioning','Balcony'],
 'Park Vanowen Apartments'),

-- 22 · Beverly Hills · CA
('Beverly Hills Flats One-Bedroom',
 'Elegant one-bedroom on a quiet tree-lined block in the heart of Beverly Hills. Spacious proportions, crown molding, and a landscaped courtyard define refined Beverly Hills living. Full-service elevator building with valet parking.',
 '436 N Bedford Dr', 'Beverly Hills', 'California', '90210',
 4200, 1, 1, 880, 34.0742, -118.4003, '',
 ARRAY['Doorman','Parking','Laundry in Building','Dishwasher','Hardwood Floors','Elevator'],
 'Telegraph Hill'),

-- 23 · Santa Monica · CA
('Ocean Park One-Bedroom',
 'Breezy one-bedroom in Santa Monica''s Ocean Park neighborhood, two miles from the pier and steps from Abbott Kinney Blvd''s acclaimed restaurants and shops. West-facing windows bring in ocean breezes and golden afternoon light.',
 '2501 Ocean Park Blvd', 'Santa Monica', 'California', '90405',
 3200, 1, 1, 840, 34.0035, -118.4721, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Balcony','Pet Friendly','Bike Storage'],
 '105 Elmont St unit 1'),

-- ─── 1-BEDROOMS — FLORIDA ────────────────────────────────────────────────────

-- 24 · Miami · FL
('Brickell One-Bedroom',
 'Sophisticated one-bedroom in Miami''s financial hub of Brickell, steps from Brickell City Centre, Mary Brickell Village, and the Brickell City Metrorail station. Panoramic skyline and bay views from floor-to-ceiling windows.',
 '1100 Brickell Ave', 'Miami', 'Florida', '33131',
 2900, 1, 1, 790, 25.7586, -80.1922, '',
 ARRAY['Pool','Gym','Concierge','Rooftop Deck','Doorman','In-Unit Laundry','Dishwasher','Valet Parking','Elevator'],
 'Lebanon Vue'),

-- 25 · Orlando · FL
('Eola Heights One-Bedroom',
 'Stylish one-bedroom overlooking Lake Eola in Orlando''s Thornton Park neighborhood. Enjoy weekend farmers markets, swan paddle boats on the lake, and the city''s best independent restaurants within walking distance.',
 '100 S Eola Dr', 'Orlando', 'Florida', '32801',
 1900, 1, 1, 760, 28.5398, -81.3720, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Air Conditioning','Parking','Elevator'],
 'Greenway Flats Apartments'),

-- 26 · Tampa · FL
('Hyde Park One-Bedroom',
 'Upscale one-bedroom in Tampa''s prestigious Hyde Park neighborhood, steps from SoHo''s restaurant row and Bayshore Boulevard''s waterfront promenade. Spacious layout with 10-foot ceilings and designer fixtures throughout.',
 '1005 S Howard Ave', 'Tampa', 'Florida', '33606',
 2100, 1, 1, 820, 27.9399, -82.4741, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Balcony'],
 'Green Meadows'),

-- 27 · Jacksonville · FL
('San Marco One-Bedroom',
 'Classic one-bedroom in Jacksonville''s beloved San Marco neighborhood, steps from San Marco Square boutiques and the city''s top-rated dining. Renovated kitchen with quartz countertops and hardwood floors throughout.',
 '1650 Hendricks Ave', 'Jacksonville', 'Florida', '32207',
 1600, 1, 1, 770, 30.3025, -81.6478, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Parking','Pet Friendly'],
 'Legacy at 19th'),

-- 28 · Fort Lauderdale · FL
('Victoria Park One-Bedroom',
 'Well-appointed one-bedroom in Fort Lauderdale''s peaceful Victoria Park, a short walk from Las Olas Boulevard''s dining and minutes from the beach. Tropical landscaping and a shaded garden courtyard.',
 '1515 NE 4th Ave', 'Fort Lauderdale', 'Florida', '33304',
 2300, 1, 1, 780, 26.1348, -80.1280, '',
 ARRAY['Pool','In-Unit Laundry','Dishwasher','Air Conditioning','Parking','Pet Friendly'],
 'Lupton Flats'),

-- 29 · Fort Lauderdale · FL
('Las Olas One-Bedroom',
 'Vibrant one-bedroom steps from Fort Lauderdale''s celebrated Las Olas Boulevard. Enjoy world-class dining, art galleries, and a quick bike ride to Fort Lauderdale Beach from this well-positioned apartment with resort amenities.',
 '620 E Las Olas Blvd', 'Fort Lauderdale', 'Florida', '33301',
 2500, 1, 1, 800, 26.1192, -80.1358, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Balcony','Air Conditioning','Concierge'],
 'Tennis Villas Apartments'),

-- 30 · St. Petersburg · FL
('Grand Central One-Bedroom',
 'Hip one-bedroom in St. Petersburg''s Grand Central arts corridor, surrounded by independent galleries, vintage furniture stores, and craft cocktail bars on Central Avenue. Open floor plan with polished concrete floors.',
 '2200 Central Ave', 'St. Petersburg', 'Florida', '33713',
 1900, 1, 1, 760, 27.7699, -82.6612, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Pet Friendly','Bike Storage'],
 'Riverside'),

-- 31 · Boca Raton · FL
('Mizner Park One-Bedroom',
 'Upscale one-bedroom steps from Mizner Park''s luxury shops, outdoor amphitheater, and fine dining. Resort-style amenities and lush Florida landscaping make this one of Boca Raton''s most coveted addresses.',
 '433 Plaza Real', 'Boca Raton', 'Florida', '33432',
 2600, 1, 1, 850, 26.3565, -80.0837, '',
 ARRAY['Pool','Gym','Concierge','In-Unit Laundry','Dishwasher','Parking','Balcony','Air Conditioning'],
 'Villas Havana'),

-- 32 · Clearwater · FL
('Downtown Clearwater One-Bedroom',
 'Well-priced one-bedroom in downtown Clearwater, steps from Coachman Park, the Clearwater Marine Aquarium, and a short drive to Clearwater Beach. Open kitchen concept, updated appliances, and on-site pool.',
 '600 Cleveland St', 'Clearwater', 'Florida', '33755',
 1700, 1, 1, 700, 27.9656, -82.8001, '',
 ARRAY['Pool','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Pet Friendly'],
 'Oxford III'),

-- 33 · Gainesville · FL
('University Area One-Bedroom',
 'Affordable one-bedroom near the University of Florida campus and Gainesville''s vibrant midtown restaurant scene. Recently updated kitchen and bathroom in a well-maintained building with on-site parking and landscaped grounds.',
 '1220 W University Ave', 'Gainesville', 'Florida', '32601',
 1100, 1, 1, 680, 29.6497, -82.3476, '',
 ARRAY['In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Pet Friendly'],
 'Westside Terrace Apartments'),

-- 34 · Sarasota · FL
('Downtown Sarasota One-Bedroom',
 'Sophisticated one-bedroom in the heart of downtown Sarasota, walkable to the Saturday morning farmers market, the Van Wezel Performing Arts Hall, and Marie Selby Botanical Gardens. Fresh finishes and abundant natural light.',
 '1255 N Palm Ave', 'Sarasota', 'Florida', '34236',
 2100, 1, 1, 780, 27.3430, -82.5432, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Elevator'],
 'The Brooklyner'),

-- 35 · Sarasota · FL
('Rosemary District One-Bedroom',
 'Artistic one-bedroom in Sarasota''s Rosemary District, an emerging creative neighborhood steps from the Ringling College of Art, the Sarasota Ballet, and the city''s best coffee shops and galleries. Bike storage and pet friendly.',
 '1415 3rd St', 'Sarasota', 'Florida', '34236',
 2000, 1, 1, 750, 27.3388, -82.5467, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Pet Friendly','Bike Storage'],
 'Talavera'),

-- ─── 2-BEDROOMS — CALIFORNIA ────────────────────────────────────────────────

-- 36 · Los Angeles · CA
('Hollywood Heights Two-Bedroom',
 'Contemporary two-bedroom in the heart of Hollywood, steps from the Pantages Theatre and easy Hollywood/Vine Metro access. Features in-unit laundry, a large private balcony with city views, and building-wide rooftop and pool amenities.',
 '1600 N Cahuenga Blvd', 'Los Angeles', 'California', '90028',
 3500, 2, 2, 1050, 34.1007, -118.3278, '',
 ARRAY['Rooftop Deck','Gym','Pool','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Balcony','Elevator'],
 'AERIE Apartments'),

-- 37 · Los Angeles · CA
('Mid-Wilshire Two-Bedroom',
 'Spacious two-bedroom in Los Angeles''s Mid-Wilshire corridor, convenient to LACMA, the Miracle Mile, and Purple Line Metro stations. Updated kitchen with stainless appliances and in-unit laundry. Hardwood floors throughout.',
 '1155 S Ogden Dr', 'Los Angeles', 'California', '90019',
 3200, 2, 2, 1020, 34.0556, -118.3463, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Parking','Pet Friendly','Air Conditioning'],
 'Canoga Park, CA'),

-- 38 · San Francisco · CA
('SoMa Two-Bedroom Loft',
 'Dramatic two-bedroom loft in San Francisco''s SoMa district with industrial-chic polished concrete floors, 14-foot ceilings, and steel-frame windows. Minutes from Oracle Park, the Embarcadero, and Montgomery Street BART.',
 '260 King St', 'San Francisco', 'California', '94107',
 4600, 2, 2, 1180, 37.7775, -122.3934, '',
 ARRAY['Rooftop Deck','Gym','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator','Bike Storage'],
 'Azure'),

-- 39 · San Diego · CA
('Downtown San Diego Two-Bedroom',
 'Modern two-bedroom in San Diego''s downtown core, steps from the Gaslamp Quarter, Petco Park, and the San Diego Bay. Floor-to-ceiling windows, designer finishes, and a wraparound balcony with bay views.',
 '550 Front St', 'San Diego', 'California', '92101',
 3400, 2, 2, 1100, 32.7177, -117.1651, '',
 ARRAY['Rooftop Deck','Pool','Gym','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator'],
 '3167 Market'),

-- 40 · Sacramento · CA
('East Sacramento Two-Bedroom',
 'Gracious two-bedroom in Sacramento''s coveted East Sacramento neighborhood, blocks from the American River Parkway bike trail, the Fab 40s historic district, and the vibrant J Street dining corridor.',
 '3700 J St', 'Sacramento', 'California', '95816',
 2400, 2, 2, 1080, 38.5658, -121.4549, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Parking','Pet Friendly','Air Conditioning'],
 '226 East End Avenue'),

-- 41 · Sacramento · CA
('Oak Park Two-Bedroom',
 'Renovated two-bedroom in Sacramento''s resurgent Oak Park neighborhood, close to the Guild Theatre and an emerging restaurant scene along Broadway. Restored hardwood floors and an updated open kitchen with quartz countertops.',
 '3412 4th Ave', 'Sacramento', 'California', '95817',
 2200, 2, 1, 980, 38.5496, -121.4784, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Parking','Pet Friendly'],
 '172 Mallory Ave unit 2'),

-- 42 · Oakland · CA
('Rockridge Two-Bedroom',
 'Sought-after two-bedroom in Oakland''s Rockridge neighborhood, one block from College Avenue''s acclaimed restaurants and boutiques, and the MacArthur BART station for direct San Francisco connections.',
 '5533 College Ave', 'Oakland', 'California', '94618',
 3700, 2, 2, 1120, 37.8458, -122.2524, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors','Pet Friendly','Parking','Bike Storage'],
 'Verde Jersey City'),

-- 43 · Fresno · CA
('Downtown Fresno Two-Bedroom',
 'Generous two-bedroom loft in revitalized downtown Fresno, steps from the Fulton Street promenade and a growing arts and culinary scene. High ceilings, large windows, and in-unit laundry in a well-located building.',
 '1840 Tulare St', 'Fresno', 'California', '93721',
 1600, 2, 2, 1050, 36.7368, -119.7885, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Parking','Pet Friendly'],
 'Gorman Crossings'),

-- 44 · Irvine · CA
('Portola Springs Two-Bedroom',
 'Luxurious two-bedroom in one of Irvine''s newest master-planned communities, featuring resort-style amenities, walking trails, and top-ranked schools. Modern open floor plan with premium finishes throughout and a private balcony.',
 '200 Portola Pkwy', 'Irvine', 'California', '92618',
 3800, 2, 2, 1250, 33.6824, -117.7389, '',
 ARRAY['Pool','Gym','Trails','Parking','In-Unit Laundry','Dishwasher','Air Conditioning','Balcony','Smart Home'],
 'The Grove'),

-- 45 · Long Beach · CA
('Downtown Long Beach Two-Bedroom',
 'Contemporary two-bedroom in Long Beach''s vibrant downtown waterfront district, steps from the Aquarium of the Pacific and the Queen Mary. Panoramic harbor views from a private terrace and full concierge building services.',
 '240 W Ocean Blvd', 'Long Beach', 'California', '90802',
 3200, 2, 2, 1100, 33.7699, -118.1955, '',
 ARRAY['Rooftop Deck','Pool','Gym','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator'],
 'Blackwolf Run at Hedingham'),

-- 46 · Pasadena · CA
('East Pasadena Two-Bedroom',
 'Spacious two-bedroom on Pasadena''s Colorado Boulevard corridor, walking distance to the Metro Gold Line, Pasadena Playhouse, and an outstanding selection of local restaurants. Hardwood floors and private balcony.',
 '1499 E Colorado Blvd', 'Pasadena', 'California', '91106',
 3300, 2, 2, 1150, 34.1462, -118.1227, '',
 ARRAY['In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Pet Friendly','Hardwood Floors'],
 'Marcom St Apartments'),

-- 47 · Anaheim · CA
('Downtown Anaheim Two-Bedroom',
 'Modern two-bedroom loft in Anaheim''s newly revitalized downtown district, close to the ARTIC transit center, Angel Stadium, and emerging restaurants along Center Street Promenade. Rooftop terrace and bike storage.',
 '201 S Anaheim Blvd', 'Anaheim', 'California', '92805',
 2700, 2, 2, 1080, 33.8355, -117.9139, '',
 ARRAY['Gym','Rooftop Deck','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Balcony','Bike Storage'],
 'Skylar Lofts JC'),

-- 48 · Beverly Hills · CA
('Beverly Hills Two-Bedroom',
 'Impeccably appointed two-bedroom just south of Wilshire Boulevard with full-service building amenities, valet parking, and 24-hour concierge. Designer-ready interiors with marble baths and a private terrace overlooking the pool.',
 '9876 Wilshire Blvd', 'Beverly Hills', 'California', '90210',
 5800, 2, 2, 1350, 34.0671, -118.4047, '',
 ARRAY['Pool','Gym','Concierge','Doorman','Valet Parking','In-Unit Laundry','Dishwasher','Elevator','Rooftop Deck'],
 'The Constantine'),

-- ─── 2-BEDROOMS — FLORIDA ────────────────────────────────────────────────────

-- 49 · Miami · FL
('Wynwood Two-Bedroom',
 'Creative two-bedroom in Miami''s internationally celebrated Wynwood Arts District, steps from world-class murals, galleries, and the neighborhood''s acclaimed food hall. Industrial-chic loft finishes and building concierge included.',
 '250 NW 24th St', 'Miami', 'Florida', '33127',
 3900, 2, 2, 1100, 25.7967, -80.1998, '',
 ARRAY['Rooftop Deck','Gym','In-Unit Laundry','Dishwasher','Concierge','Parking','Elevator','Bike Storage'],
 'Friendship Court'),

-- 50 · Miami · FL
('Coral Gables Two-Bedroom',
 'Gracious two-bedroom in the tree-lined streets of Coral Gables, steps from Miracle Mile''s boutiques and minutes from the University of Miami campus. Mediterranean-inspired architecture with a courtyard pool and lush tropical landscaping.',
 '2333 Ponce de Leon Blvd', 'Miami', 'Florida', '33134',
 3700, 2, 2, 1150, 25.7491, -80.2580, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Balcony','Air Conditioning','Concierge'],
 '46 Carlton Ave unit 2'),

-- 51 · Orlando · FL
('Lake Nona Two-Bedroom',
 'Smart and stylish two-bedroom in Orlando''s tech-forward Lake Nona community, home to the USTA National Campus and a walkable town center with curated shops and restaurants. Smart home features and resort-style amenities throughout.',
 '6900 Lake Nona Blvd', 'Orlando', 'Florida', '32827',
 2700, 2, 2, 1180, 28.3771, -81.2468, '',
 ARRAY['Pool','Gym','Trails','Parking','In-Unit Laundry','Dishwasher','Air Conditioning','Smart Home','Balcony'],
 '403 West'),

-- 52 · Tampa · FL
('Water Street Tampa Two-Bedroom',
 'Premier two-bedroom in Tampa''s transformative Water Street development, one of the most ambitious urban projects in the American Southeast. Walkable to Amalie Arena, the Tampa Riverwalk, and world-class dining and entertainment.',
 '1000 Water St', 'Tampa', 'Florida', '33602',
 2900, 2, 2, 1200, 27.9440, -82.4530, '',
 ARRAY['Pool','Gym','Rooftop Deck','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator','Smart Home'],
 '5522 Baum Blvd unit 705'),

-- 53 · Jacksonville · FL
('Jacksonville Riverwalk Two-Bedroom',
 'Sophisticated two-bedroom on Jacksonville''s historic waterfront, steps from the city''s expanding culinary scene and a short walk to EverBank Stadium. River views and downtown convenience from every room.',
 '500 Water St', 'Jacksonville', 'Florida', '32202',
 2200, 2, 2, 1080, 30.3229, -81.6588, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Elevator','Concierge'],
 '15 Dorothy St unit 15A'),

-- 54 · Fort Lauderdale · FL
('Downtown Fort Lauderdale Two-Bedroom',
 'Polished two-bedroom in Fort Lauderdale''s downtown core, walking distance to the Broward Center for the Performing Arts, the city''s Riverwalk, and the Las Olas nightlife and dining district. Resort-style pool and rooftop deck.',
 '200 SW 2nd St', 'Fort Lauderdale', 'Florida', '33312',
 3100, 2, 2, 1120, 26.1201, -80.1451, '',
 ARRAY['Pool','Gym','Rooftop Deck','In-Unit Laundry','Dishwasher','Parking','Elevator','Concierge'],
 '150 West Side Ave unit 1'),

-- 55 · St. Petersburg · FL
('Downtown St. Pete Two-Bedroom',
 'Stunning two-bedroom steps from St. Petersburg''s waterfront and world-class museums including the Salvador Dalí Museum and the Museum of Fine Arts. Enjoy the city''s thriving dining and nightlife scene from this premier address.',
 '200 Beach Dr NE', 'St. Petersburg', 'Florida', '33701',
 2600, 2, 2, 1130, 27.7741, -82.6318, '',
 ARRAY['Pool','Gym','Rooftop Deck','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator','Balcony'],
 '845 S. Kingsley'),

-- 56 · St. Petersburg · FL
('Kenwood Two-Bedroom Bungalow',
 'Charming two-bedroom in St. Petersburg''s historic Kenwood neighborhood, one of Florida''s most vibrant arts communities. Craftsman-influenced architecture, updated kitchen, hardwood floors, and a private backyard garden.',
 '1201 22nd St N', 'St. Petersburg', 'Florida', '33713',
 2300, 2, 1, 1020, 27.7788, -82.6623, '',
 ARRAY['In-Unit Laundry','Dishwasher','Air Conditioning','Pet Friendly','Parking','Hardwood Floors'],
 'Coronado St. Residences'),

-- 57 · Boca Raton · FL
('Downtown Boca Raton Two-Bedroom',
 'Upscale two-bedroom in walkable downtown Boca Raton, moments from Mizner Park''s outdoor dining, the Boca Raton Museum of Art, and the Brightline station for direct Miami and West Palm Beach connections.',
 '1 N Federal Hwy', 'Boca Raton', 'Florida', '33432',
 3200, 2, 2, 1150, 26.3587, -80.0838, '',
 ARRAY['Pool','Gym','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator','Balcony','Air Conditioning'],
 '736 E 83rd St #2'),

-- 58 · Clearwater · FL
('Clearwater Beach Two-Bedroom',
 'Rare two-bedroom steps from the white sand and crystal waters of Clearwater Beach, consistently ranked among America''s finest beaches. Light-filled interiors with ocean breezes and resort-style pool and fitness amenities.',
 '415 E Shore Dr', 'Clearwater', 'Florida', '33767',
 2700, 2, 2, 1050, 27.9776, -82.8276, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Balcony','Bike Storage'],
 '17 6th St unit 2'),

-- 59 · Gainesville · FL
('Midtown Gainesville Two-Bedroom',
 'Comfortable two-bedroom in Gainesville''s Midtown neighborhood, walkable to the University of Florida''s stadium, Depot Park, and the local food truck scene. Well-maintained building with updated finishes and on-site parking.',
 '601 NW 13th St', 'Gainesville', 'Florida', '32601',
 1600, 2, 1, 960, 29.6564, -82.3381, '',
 ARRAY['In-Unit Laundry','Dishwasher','Parking','Air Conditioning','Pet Friendly'],
 '77 Vinton St unit 1'),

-- 60 · Sarasota · FL
('Sarasota Bayfront Two-Bedroom',
 'Exceptional two-bedroom steps from Sarasota Bay, the Van Wezel Performing Arts Hall, and the boutiques of St. Armands Circle. Floor-to-ceiling windows frame sweeping water views from this premier Bayfront address. Concierge building.',
 '888 Boulevard of the Arts', 'Sarasota', 'Florida', '34236',
 2900, 2, 2, 1200, 27.3477, -82.5417, '',
 ARRAY['Pool','Gym','Concierge','In-Unit Laundry','Dishwasher','Parking','Elevator','Balcony','Air Conditioning'],
 '218 Grandview Terrace');
