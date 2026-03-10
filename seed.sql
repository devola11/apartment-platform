-- ============================================================
-- AptGuide seed data — paste this entire file into:
-- Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- 1. Create tables if they don't exist yet
-- ============================================================

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  address text,
  city text,
  state text,
  zip text,
  price integer,
  bedrooms integer,
  bathrooms numeric,
  sqft integer,
  latitude numeric,
  longitude numeric,
  image_url text,
  amenities text[],
  created_at timestamptz default now()
);

create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  listing_id uuid references listings(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, listing_id)
);

-- 2. Enable RLS and add read policy (listings are public)
-- ============================================================

alter table listings enable row level security;
alter table favorites enable row level security;

-- Allow anyone to read listings
drop policy if exists "Listings are publicly readable" on listings;
create policy "Listings are publicly readable"
  on listings for select using (true);

-- Favorites: users can only read/write their own
drop policy if exists "Users manage own favorites" on favorites;
create policy "Users manage own favorites"
  on favorites for all using (auth.uid() = user_id);

-- 3. Clear existing seed data and re-insert
-- ============================================================

truncate table listings restart identity cascade;

-- ============================================================
-- CALIFORNIA (25 listings)
-- ============================================================

insert into listings (title, description, address, city, state, zip, price, bedrooms, bathrooms, sqft, latitude, longitude, image_url, amenities) values

('Modern Studio in Silver Lake',
 'Bright, newly renovated studio in the heart of Silver Lake. Exposed brick, polished concrete floors, and a private deck overlooking the hills. Walking distance to Sunset Junction shops and cafés.',
 '2847 Sunset Blvd', 'Los Angeles', 'California', '90026',
 1950, 0, 1, 520, 34.0768, -118.2617,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
 array['Air Conditioning','Hardwood Floors','Dishwasher','Parking','Laundry in Building']),

('Spacious 2BR in West Hollywood',
 'Sun-drenched two-bedroom apartment with floor-to-ceiling windows and an open-concept kitchen. Steps from the Sunset Strip, boutique gyms, and world-class restaurants.',
 '1120 N Clark St', 'Los Angeles', 'California', '90069',
 3400, 2, 2, 1080, 34.0900, -118.3617,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Rooftop Deck','In-Unit Washer/Dryer','Air Conditioning','Parking']),

('Luxury High-Rise 1BR in Downtown LA',
 'Stunning panoramic city views from the 22nd floor. Floor-to-ceiling windows, chef''s kitchen with quartz counters, and resort-style amenities including a rooftop infinity pool.',
 '888 S Olive St', 'Los Angeles', 'California', '90014',
 3100, 1, 1, 760, 34.0441, -118.2566,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Concierge','Rooftop Deck','In-Unit Washer/Dryer','Parking','Air Conditioning']),

('Charming 3BR Bungalow in Culver City',
 'Renovated 1940s bungalow with original hardwood floors and a large private backyard. Fully updated kitchen and bathrooms, two-car garage, and mature fruit trees.',
 '4215 Washington Blvd', 'Los Angeles', 'California', '90232',
 4800, 3, 2, 1620, 34.0012, -118.3965,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','In-Unit Washer/Dryer','Parking','Pet Friendly','Air Conditioning']),

('Cozy 1BR Near UCLA',
 'Well-maintained one-bedroom apartment just four blocks from UCLA campus. Quiet building with a courtyard garden, secure entry, and on-site laundry.',
 '671 Gayley Ave', 'Los Angeles', 'California', '90024',
 2350, 1, 1, 640, 34.0617, -118.4487,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
 array['Laundry in Building','Courtyard','Dishwasher','Air Conditioning','Bike Storage']),

('Victorian Flat in the Mission',
 'Stunning top-floor Victorian flat with 12-foot ceilings, original bay windows, and restored moldings. Updated kitchen, in-unit laundry, and a private deck with city views.',
 '3312 22nd St', 'San Francisco', 'California', '94110',
 3850, 2, 1, 1100, 37.7553, -122.4195,
 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=800&q=80',
 array['In-Unit Washer/Dryer','Hardwood Floors','Dishwasher','Deck','Bike Storage','Pet Friendly']),

('Modern Condo in SoMa',
 'Sleek one-bedroom condo in the heart of SoMa. Open floor plan, chef''s kitchen, and a private balcony. Building amenities include a fitness center, bike room, and doorman.',
 '255 King St', 'San Francisco', 'California', '94107',
 4200, 1, 1, 780, 37.7785, -122.3948,
 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
 array['Gym','Doorman','Concierge','Balcony','In-Unit Washer/Dryer','Parking']),

('Sunny Studio in the Castro',
 'Bright south-facing studio in a classic Castro building. Hardwood floors, updated kitchen, and steps from the J-Church MUNI line. Perfect for young professionals.',
 '492 Castro St', 'San Francisco', 'California', '94114',
 2200, 0, 1, 490, 37.7609, -122.4350,
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Laundry in Building','Dishwasher','Bike Storage']),

('Pacific Heights 2BR with Bay Views',
 'Beautiful two-bedroom apartment on the top floor of an Edwardian building. Sweeping views of the Bay and Golden Gate Bridge. Period details throughout with modern updates.',
 '2734 Clay St', 'San Francisco', 'California', '94115',
 5500, 2, 2, 1350, 37.7887, -122.4402,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','In-Unit Washer/Dryer','Parking','Fireplace','Bay Views']),

('Gaslamp Quarter Studio Loft',
 'Stylish studio loft in a converted warehouse steps from the Gaslamp Quarter. Exposed brick, 14-foot ceilings, and industrial finishes. Walkable to Petco Park and the waterfront.',
 '755 6th Ave', 'San Diego', 'California', '92101',
 2050, 0, 1, 540, 32.7087, -117.1592,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
 array['Air Conditioning','Hardwood Floors','Rooftop Deck','Gym','Bike Storage']),

('Beach-Close 1BR in Pacific Beach',
 'Breezy one-bedroom apartment three blocks from the sand. Sunny balcony, updated kitchen, and an outdoor community deck with BBQ grills. Walk to restaurants on Garnet Ave.',
 '1847 Chalcedony St', 'San Diego', 'California', '92109',
 2600, 1, 1, 690, 32.7939, -117.2374,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
 array['Balcony','Air Conditioning','Laundry in Building','Parking','BBQ Area','Pet Friendly']),

('Mission Hills 2BR with Yard',
 'Charming lower duplex unit in quiet Mission Hills with a large private patio. Newly remodeled kitchen and bathrooms, hardwood floors, and a one-car garage.',
 '3826 Hawk St', 'San Diego', 'California', '92103',
 3200, 2, 1, 1020, 32.7397, -117.1744,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Parking','Patio','In-Unit Washer/Dryer','Pet Friendly','Air Conditioning']),

('Midtown Sacramento 1BR',
 'Newly renovated one-bedroom in Midtown Sacramento''s vibrant arts district. Quartz countertops, stainless appliances, and in-unit laundry. Steps from the Farm-to-Fork dining corridor.',
 '1916 P St', 'Sacramento', 'California', '95811',
 1750, 1, 1, 680, 38.5669, -121.4822,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
 array['In-Unit Washer/Dryer','Air Conditioning','Stainless Steel Appliances','Parking','Pet Friendly']),

('Downtown Sacramento 2BR Tower',
 'High-floor two-bedroom in a modern downtown high-rise. City views, resort-style pool and spa, fitness center, and secure parking. Minutes from the Golden 1 Center.',
 '500 J St', 'Sacramento', 'California', '95814',
 2900, 2, 2, 1150, 38.5816, -121.5005,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Concierge','Rooftop Deck','In-Unit Washer/Dryer','Parking','Air Conditioning']),

('San Jose Tech Corridor 1BR',
 'Modern apartment in the heart of San Jose''s tech corridor. Smart home features, EV charging, and resort-style amenities. Shuttle stop to major tech campuses.',
 '188 W Santa Clara St', 'San Jose', 'California', '95113',
 2950, 1, 1, 740, 37.3327, -121.8924,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
 array['Gym','Pool','EV Charging','In-Unit Washer/Dryer','Rooftop Deck','Bike Storage','Air Conditioning']),

('Oakland Uptown 2BR Loft',
 'Industrial-chic loft in Oakland''s Uptown arts district. Exposed concrete, 13-foot ceilings, and giant south-facing windows. Walk to BART, galleries, and nightlife.',
 '2323 Broadway', 'Oakland', 'California', '94612',
 2700, 2, 2, 1180, 37.8112, -122.2716,
 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','In-Unit Washer/Dryer','Bike Storage','Rooftop Deck','Air Conditioning','Pet Friendly']),

('Temescal 1BR with Garage',
 'Cute one-bedroom in Temescal with a private one-car garage and small patio. Updated kitchen with white shaker cabinets, original hardwood floors, and walking distance to excellent dining.',
 '4819 Shafter Ave', 'Oakland', 'California', '94609',
 2250, 1, 1, 720, 37.8388, -122.2642,
 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Parking','Patio','In-Unit Washer/Dryer','Pet Friendly']),

('Belmont Shore Beachside 2BR',
 'Airy two-bedroom two blocks from the beach in coveted Belmont Shore. Vaulted ceilings, updated baths, and a community rooftop deck with ocean views.',
 '248 Prospect Ave', 'Long Beach', 'California', '90803',
 2950, 2, 2, 980, 33.7497, -118.1302,
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
 array['Rooftop Deck','Air Conditioning','Laundry in Building','Parking','Pet Friendly']),

('Anaheim Resort District Studio',
 'Fully furnished studio near the Anaheim Resort District. Ideal for travel nurses or contractors. Includes utilities, Wi-Fi, and weekly cleaning service.',
 '1510 S Harbor Blvd', 'Anaheim', 'California', '92802',
 1800, 0, 1, 450, 33.8091, -117.9238,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
 array['Pool','Air Conditioning','Furnished','Parking','Gym']),

('Pasadena Old Town 1BR',
 'Elegant one-bedroom in a restored 1920s building in Old Town Pasadena. Original crown molding, refinished hardwood floors, and a gourmet kitchen. Walk score 95.',
 '88 E Colorado Blvd', 'Pasadena', 'California', '91105',
 2450, 1, 1, 760, 34.1448, -118.1503,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Dishwasher','Air Conditioning','Laundry in Building','Bike Storage']),

('Santa Monica 3BR Family Apartment',
 'Rare three-bedroom apartment just six blocks from Santa Monica Beach. Bright and airy with a large living area, updated kitchen, and two full baths. Tandem parking included.',
 '1347 5th St', 'Santa Monica', 'California', '90401',
 6200, 3, 2, 1580, 34.0195, -118.4912,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
 array['In-Unit Washer/Dryer','Parking','Air Conditioning','Dishwasher','Pet Friendly']),

('Berkeley Hills 2BR with Views',
 'Stunning hillside two-bedroom with breathtaking views of the Bay and San Francisco skyline. Deck, fireplace, and a private garden. Minutes from UC Berkeley campus.',
 '2845 Hillegass Ave', 'Berkeley', 'California', '94705',
 3600, 2, 1, 1050, 37.8598, -122.2542,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
 array['Fireplace','Deck','Hardwood Floors','Laundry in Building','Pet Friendly','Bay Views']),

('Irvine Village 2BR',
 'Immaculate two-bedroom apartment in Irvine''s master-planned village. Resort-style pools, tennis courts, and excellent schools. Attached two-car garage and private patio.',
 '14 Sagebrush', 'Irvine', 'California', '92620',
 3100, 2, 2, 1200, 33.7175, -117.7981,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Tennis Court','Parking','In-Unit Washer/Dryer','Air Conditioning','Pet Friendly']),

('Chula Vista 1BR Near Trolley',
 'Move-in ready one-bedroom near the Blue Line Trolley in Chula Vista. Stainless appliances, new carpet, and a private balcony. Community pool and BBQ area.',
 '680 Third Ave', 'Chula Vista', 'California', '91910',
 1850, 1, 1, 650, 32.6401, -117.0842,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
 array['Pool','Balcony','Air Conditioning','BBQ Area','Laundry in Building','Parking']),

('Nob Hill Studio with Character',
 'Cozy studio in a classic Nob Hill building. High ceilings, bay window with cable car views, and a walk-in closet. Doorman building with on-site laundry.',
 '1050 California St', 'San Francisco', 'California', '94108',
 2400, 0, 1, 480, 37.7924, -122.4135,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
 array['Doorman','Hardwood Floors','Laundry in Building','Dishwasher']);

-- ============================================================
-- FLORIDA (25 listings)
-- ============================================================

insert into listings (title, description, address, city, state, zip, price, bedrooms, bathrooms, sqft, latitude, longitude, image_url, amenities) values

('Brickell Luxury 1BR with Bay View',
 'Stunning one-bedroom in Miami''s Financial District with direct Biscayne Bay views. Floor-to-ceiling impact glass, Italian kitchen, and access to a resort-style amenity deck with infinity pool.',
 '1300 Brickell Bay Dr', 'Miami', 'Florida', '33131',
 3800, 1, 1, 820, 25.7596, -80.1918,
 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Concierge','Valet Parking','In-Unit Washer/Dryer','Bay Views','Air Conditioning']),

('Wynwood Art District 2BR Loft',
 'Converted warehouse loft in Miami''s celebrated Wynwood art district. 16-foot ceilings, polished concrete floors, and direct access to the building''s rooftop terrace with murals.',
 '2750 NW 3rd Ave', 'Miami', 'Florida', '33127',
 3200, 2, 2, 1280, 25.7987, -80.2016,
 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
 array['Rooftop Deck','In-Unit Washer/Dryer','Air Conditioning','Bike Storage','Pet Friendly']),

('South Beach Art Deco 1BR',
 'Iconic Art Deco building steps from Ocean Drive. Beautifully restored one-bedroom with terrazzo floors and original jalousie windows. Courtyard pool and lounge chairs included.',
 '1001 Collins Ave', 'Miami', 'Florida', '33139',
 2900, 1, 1, 700, 25.7795, -80.1303,
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
 array['Pool','Air Conditioning','Laundry in Building','Doorman','Beach Access']),

('Coral Gables 3BR Family Home',
 'Elegant three-bedroom apartment in historic Coral Gables. Mediterranean-style architecture, large private patio, mature landscaping, and walking distance to the Miracle Mile shopping district.',
 '3440 Segovia St', 'Miami', 'Florida', '33134',
 4600, 3, 2, 1780, 25.7216, -80.2683,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
 array['Patio','In-Unit Washer/Dryer','Parking','Air Conditioning','Pet Friendly','Dishwasher']),

('Downtown Orlando Studio',
 'Modern studio in a boutique high-rise steps from Lake Eola. Floor-to-ceiling windows, custom closets, and a smart thermostat. Building amenities include a gym and sky lounge.',
 '215 E Central Blvd', 'Orlando', 'Florida', '32801',
 1700, 0, 1, 510, 28.5414, -81.3755,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
 array['Gym','Sky Lounge','In-Unit Washer/Dryer','Air Conditioning','Bike Storage']),

('College Park 2BR Bungalow',
 'Adorable Craftsman bungalow in Orlando''s walkable College Park neighborhood. Updated kitchen with butcher block counters, original hardwood floors, and a screened back porch.',
 '2108 Edgewater Dr', 'Orlando', 'Florida', '32804',
 2400, 2, 1, 1050, 28.5732, -81.3826,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Screened Porch','In-Unit Washer/Dryer','Air Conditioning','Pet Friendly']),

('Lake Nona Medical City 1BR',
 'Brand new apartment in Lake Nona''s Medical City campus. Perfect for healthcare workers and researchers. Attached garage, resort pool, and complimentary shuttle to the hospital.',
 '6807 Tavistock Lakes Blvd', 'Orlando', 'Florida', '32827',
 2100, 1, 1, 780, 28.3722, -81.2482,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Parking','In-Unit Washer/Dryer','Air Conditioning','EV Charging']),

('Hyde Park 1BR Near Bayshore',
 'Charming one-bedroom in Tampa''s Hyde Park neighborhood, two blocks from Bayshore Boulevard. Updated kitchen, hardwood floors, and a covered private patio.',
 '814 S Willow Ave', 'Tampa', 'Florida', '33606',
 2000, 1, 1, 730, 27.9395, -82.4719,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Patio','Air Conditioning','Laundry in Building','Pet Friendly','Bike Storage']),

('Channelside 2BR with Water Views',
 'Upscale two-bedroom in Tampa''s Channelside District with views of the cruise ship terminals and Hillsborough Bay. Concierge, heated pool, and walking distance to Amalie Arena.',
 '107 Harbour Place Dr', 'Tampa', 'Florida', '33602',
 3500, 2, 2, 1200, 27.9428, -82.4480,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Concierge','In-Unit Washer/Dryer','Parking','Water Views','Air Conditioning']),

('Ybor City Loft Studio',
 'Hip studio loft in the historic Ybor City cigar district. Exposed brick, tin ceilings, and original iron columns. Walking distance to live music venues and the Saturday market.',
 '1600 E 8th Ave', 'Tampa', 'Florida', '33605',
 1550, 0, 1, 560, 27.9578, -82.4373,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Air Conditioning','Laundry in Building','Bike Storage']),

('San Marco 2BR Classic',
 'Spacious two-bedroom in Jacksonville''s prestigious San Marco neighborhood. Original 1950s hardwood floors, updated baths, and a screened porch overlooking a quiet tree-lined street.',
 '1872 River Oaks Rd', 'Jacksonville', 'Florida', '32207',
 1900, 2, 1, 1100, 30.3014, -81.6477,
 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Screened Porch','In-Unit Washer/Dryer','Air Conditioning','Pet Friendly','Parking']),

('Riverside Arts Market 1BR',
 'Stylish one-bedroom in Jacksonville''s Riverside neighborhood, blocks from the Riverside Arts Market and the St. Johns River. Updated kitchen and quartz counters throughout.',
 '2020 Park St', 'Jacksonville', 'Florida', '32204',
 1600, 1, 1, 670, 30.3212, -81.6846,
 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
 array['Air Conditioning','Laundry in Building','Dishwasher','Parking','Pet Friendly']),

('Las Olas Luxury 2BR',
 'Sophisticated two-bedroom in Fort Lauderdale''s premier Las Olas corridor. Italian marble baths, chef''s kitchen, and a wraparound balcony. Heated pool and valet parking.',
 '350 SE 2nd St', 'Fort Lauderdale', 'Florida', '33301',
 3900, 2, 2, 1300, 26.1214, -80.1410,
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Valet Parking','In-Unit Washer/Dryer','Concierge','Air Conditioning','Balcony']),

('Victoria Park 1BR Bungalow',
 'Tropical one-bedroom bungalow in Fort Lauderdale''s Victoria Park. Private fenced yard with a pool, lush landscaping, and a one-car garage. Minutes from the beach.',
 '618 NE 7th Ave', 'Fort Lauderdale', 'Florida', '33304',
 2500, 1, 1, 800, 26.1311, -80.1278,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
 array['Pool','Air Conditioning','Parking','In-Unit Washer/Dryer','Pet Friendly','Yard']),

('St. Pete Beach 2BR Retreat',
 'Breezy two-bedroom apartment half a mile from St. Pete Beach. Plantation shutters, tile throughout, and a screened patio. Community pool and direct bike path to the beach.',
 '4240 Gulf Blvd', 'St. Petersburg', 'Florida', '33706',
 2700, 2, 2, 1040, 27.7208, -82.7357,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
 array['Pool','Air Conditioning','Screened Porch','Parking','Pet Friendly','Bike Storage']),

('Downtown St. Pete 1BR',
 'Vibrant one-bedroom in downtown St. Pete''s Central Arts District. Walking distance to the Dali Museum, craft beer bars, and Saturday Morning Market. Rooftop pool and dog walk.',
 '100 2nd Ave S', 'St. Petersburg', 'Florida', '33701',
 2200, 1, 1, 720, 27.7676, -82.6403,
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
 array['Pool','Rooftop Deck','Gym','In-Unit Washer/Dryer','Air Conditioning','Dog Park','Pet Friendly']),

('Boca Raton Luxury 3BR',
 'Impeccable three-bedroom in a prestigious Boca Raton community. Private two-car garage, heated pool and spa, summer kitchen, and a spacious screened lanai.',
 '9100 W Palmetto Park Rd', 'Boca Raton', 'Florida', '33428',
 5800, 3, 3, 2200, 26.3683, -80.1289,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
 array['Pool','Gym','Parking','In-Unit Washer/Dryer','Air Conditioning','Screened Lanai','Pet Friendly']),

('Delray Beach 2BR Walk to Atlantic',
 'Gorgeous two-bedroom two blocks from Atlantic Avenue and the beach. Tropical landscaping, community pool, and outdoor grill area. Sought-after location in walkable Delray.',
 '220 NE 4th St', 'Delray Beach', 'Florida', '33444',
 2850, 2, 2, 1050, 26.4618, -80.0728,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
 array['Pool','Air Conditioning','Laundry in Building','Parking','BBQ Area','Pet Friendly']),

('Tallahassee College Town Studio',
 'Affordable furnished studio near FSU and the Capitol complex. Ideal for students, interns, or legislative staffers. All utilities included, community pool and study lounge.',
 '510 W Tennessee St', 'Tallahassee', 'Florida', '32304',
 1100, 0, 1, 430, 30.4384, -84.2930,
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
 array['Pool','Furnished','Air Conditioning','Laundry in Building','Utilities Included']),

('Fort Myers River District 1BR',
 'Charming one-bedroom in the Fort Myers River District, steps from First Street''s galleries and waterfront restaurants. Updated kitchen, large balcony, and assigned covered parking.',
 '2220 First St', 'Fort Myers', 'Florida', '33901',
 1750, 1, 1, 690, 26.6406, -81.8723,
 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
 array['Balcony','Air Conditioning','Parking','Laundry in Building','Pet Friendly']),

('Naples Park Shore 2BR Retreat',
 'Pristine two-bedroom in Naples'' prestigious Park Shore neighborhood. Steps from Venetian Village shops and the Gulf beach. Community pool, private beach access, and carport.',
 '4255 Gulf Shore Blvd N', 'Naples', 'Florida', '34103',
 4200, 2, 2, 1320, 26.2019, -81.8128,
 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=800&q=80',
 array['Pool','Beach Access','Air Conditioning','Parking','In-Unit Washer/Dryer','Balcony']),

('Hialeah Modern 2BR',
 'Brand new two-bedroom in Hialeah with a modern open-plan layout. Quartz counters, porcelain tile throughout, and a private patio. Easy access to the Tri-Rail commuter line.',
 '1230 W 49th St', 'Hialeah', 'Florida', '33012',
 2100, 2, 2, 960, 25.8576, -80.2781,
 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
 array['Air Conditioning','Patio','Parking','In-Unit Washer/Dryer','Pool','Pet Friendly']),

('Clearwater Beach 1BR Steps from Sand',
 'Coveted beachfront building — this one-bedroom is just steps from the powdery white sands of Clearwater Beach. Saltwater pool, private beach access, and a large wrap-around balcony.',
 '715 S Gulfview Blvd', 'Clearwater', 'Florida', '33767',
 3100, 1, 1, 750, 27.9745, -82.8301,
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
 array['Pool','Beach Access','Air Conditioning','Balcony','Parking','In-Unit Washer/Dryer']),

('Pensacola Downtown 1BR Loft',
 'Historic brick loft in downtown Pensacola. Original timber beams, exposed brick, and an updated industrial kitchen. Walking distance to Seville Quarter and the downtown waterfront.',
 '312 S Palafox St', 'Pensacola', 'Florida', '32502',
 1450, 1, 1, 740, 30.4090, -87.2169,
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
 array['Hardwood Floors','Air Conditioning','Laundry in Building','Bike Storage','Pet Friendly']),

('Gainesville University 2BR',
 'Spacious two-bedroom near the University of Florida campus and Butler Plaza. Renovated interior with granite counters and stainless appliances. Screened patio and covered parking.',
 '3800 SW 34th St', 'Gainesville', 'Florida', '32608',
 1650, 2, 2, 1010, 29.6407, -82.3889,
 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
 array['Pool','Air Conditioning','Screened Porch','Parking','In-Unit Washer/Dryer','Pet Friendly']);

-- Confirm count
select count(*) as total_listings, state from listings group by state;
