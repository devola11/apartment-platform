-- update_listing_images.sql
-- Generated automatically after Supabase Storage upload.
-- Run this in your Supabase SQL Editor in order:
--   Step 1: CREATE TABLE property_images
--   Step 2: UPDATE listings.image_url (primary/hero image)
--   Step 3: INSERT all images into property_images gallery

-- ─────────────────────────────────────────────────────────────
-- STEP 1 — Create property_images table
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS property_images (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id  uuid        NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  image_url   text        NOT NULL,
  sort_order  integer     NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS property_images_listing_id_idx
  ON property_images (listing_id, sort_order);

ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read property_images" ON property_images;
CREATE POLICY "Public read property_images"
  ON property_images FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────
-- STEP 2 — Set primary hero image_url on each listing
-- ─────────────────────────────────────────────────────────────
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-1.webp'
  WHERE image_group = 'Studio 144-50 25th Rd';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-1.webp'
  WHERE image_group = 'Brownsville Transit Village V';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-1.webp'
  WHERE image_group = 'Studio 275 Fontaine Parc';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-1.webp'
  WHERE image_group = 'Studio 1318 E 58th St #1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-1.webp'
  WHERE image_group = 'Ardmore-Ca';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-1.webp'
  WHERE image_group = 'Studio The Halldale';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-1.webp'
  WHERE image_group = 'Studio Seven Lions Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-1.webp'
  WHERE image_group = 'CONDO HOLDINGS';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-1.webp'
  WHERE image_group = 'Studio Countyline Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-1.webp'
  WHERE image_group = '461 Dean';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-1.webp'
  WHERE image_group = '1031 Clinton St #5B';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-1.webp'
  WHERE image_group = 'Artem';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-1.webp'
  WHERE image_group = '111 Lincoln St unit 3rd Fl';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-1.webp'
  WHERE image_group = 'Bay Pointe Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-1.webp'
  WHERE image_group = 'Central Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-1.webp'
  WHERE image_group = 'Chesapeake Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-1.webp'
  WHERE image_group = 'Country Creek';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-1.webp'
  WHERE image_group = 'Liberty Station Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-1.webp'
  WHERE image_group = 'Executive House Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-1.webp'
  WHERE image_group = 'Chateaugay Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-1.webp'
  WHERE image_group = 'Park Vanowen Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-1.webp'
  WHERE image_group = 'Telegraph Hill';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-1.webp'
  WHERE image_group = '105 Elmont St unit 1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-1.webp'
  WHERE image_group = 'Lebanon Vue';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-1.webp'
  WHERE image_group = 'Greenway Flats Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-1.webp'
  WHERE image_group = 'Green Meadows';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-1.webp'
  WHERE image_group = 'Legacy at 19th';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-1.webp'
  WHERE image_group = 'Lupton Flats';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-1.webp'
  WHERE image_group = 'Tennis Villas Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-1.webp'
  WHERE image_group = 'Riverside';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-1.webp'
  WHERE image_group = 'Villas Havana';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-1.webp'
  WHERE image_group = 'Oxford III';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-1.webp'
  WHERE image_group = 'Westside Terrace Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-1.webp'
  WHERE image_group = 'The Brooklyner';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-1.webp'
  WHERE image_group = 'Talavera';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-1.webp'
  WHERE image_group = 'AERIE Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-1.webp'
  WHERE image_group = 'Canoga Park, CA';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-1.webp'
  WHERE image_group = 'Azure';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-1.webp'
  WHERE image_group = '3167 Market';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-1.webp'
  WHERE image_group = '226 East End Avenue';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-1.webp'
  WHERE image_group = '172 Mallory Ave unit 2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-1.webp'
  WHERE image_group = 'Verde Jersey City';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-1.webp'
  WHERE image_group = 'Gorman Crossings';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-1.webp'
  WHERE image_group = 'The Grove';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-1.webp'
  WHERE image_group = 'Blackwolf Run at Hedingham';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-1.webp'
  WHERE image_group = 'Marcom St Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-1.webp'
  WHERE image_group = 'Skylar Lofts JC';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-1.webp'
  WHERE image_group = 'The Constantine';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-1.webp'
  WHERE image_group = 'Friendship Court';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-1.webp'
  WHERE image_group = '46 Carlton Ave unit 2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-1.webp'
  WHERE image_group = '403 West';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-1.webp'
  WHERE image_group = '5522 Baum Blvd unit 705';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-1.webp'
  WHERE image_group = '15 Dorothy St unit 15A';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-1.webp'
  WHERE image_group = '150 West Side Ave unit 1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-1.webp'
  WHERE image_group = '845 S. Kingsley';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-1.webp'
  WHERE image_group = 'Coronado St. Residences';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-1.webp'
  WHERE image_group = '736 E 83rd St #2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-1.webp'
  WHERE image_group = '17 6th St unit 2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-1.webp'
  WHERE image_group = '77 Vinton St unit 1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-1.webp'
  WHERE image_group = '218 Grandview Terrace';

-- ─────────────────────────────────────────────────────────────
-- STEP 3 — Populate property_images gallery table
-- (delete existing rows first so re-runs are idempotent)
-- ─────────────────────────────────────────────────────────────
DELETE FROM property_images;

-- listing-01: Studio 144-50 25th Rd
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-11.webp', 11)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Studio 144-50 25th Rd';

-- listing-02: Brownsville Transit Village V
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Brownsville Transit Village V';

-- listing-03: Studio 275 Fontaine Parc
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-8.webp', 8)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Studio 275 Fontaine Parc';

-- listing-04: Studio 1318 E 58th St #1
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-8.webp', 8)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Studio 1318 E 58th St #1';

-- listing-05: Ardmore-Ca
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Ardmore-Ca';

-- listing-06: Studio The Halldale
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-9.webp', 9)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Studio The Halldale';

-- listing-07: Studio Seven Lions Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-8.webp', 8)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Studio Seven Lions Apartments';

-- listing-08: CONDO HOLDINGS
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-9.webp', 9)
) AS v(image_url, sort_order)
WHERE l.image_group = 'CONDO HOLDINGS';

-- listing-09: Studio Countyline Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-7.webp', 7)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Studio Countyline Apartments';

-- listing-10: 461 Dean
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-8.webp', 8)
) AS v(image_url, sort_order)
WHERE l.image_group = '461 Dean';

-- listing-11: 1031 Clinton St #5B
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-13.webp', 13)
) AS v(image_url, sort_order)
WHERE l.image_group = '1031 Clinton St #5B';

-- listing-12: Artem
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-13.webp', 13)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Artem';

-- listing-13: 111 Lincoln St unit 3rd Fl
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = '111 Lincoln St unit 3rd Fl';

-- listing-14: Bay Pointe Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-11.webp', 11)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Bay Pointe Apartments';

-- listing-15: Central Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-11.webp', 11)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Central Apartments';

-- listing-16: Chesapeake Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-12.webp', 12)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Chesapeake Apartments';

-- listing-17: Country Creek
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Country Creek';

-- listing-18: Liberty Station Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-11.webp', 11)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Liberty Station Apartments';

-- listing-19: Executive House Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-11.webp', 11)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Executive House Apartments';

-- listing-20: Chateaugay Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Chateaugay Apartments';

-- listing-21: Park Vanowen Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Park Vanowen Apartments';

-- listing-22: Telegraph Hill
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Telegraph Hill';

-- listing-23: 105 Elmont St unit 1
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '105 Elmont St unit 1';

-- listing-24: Lebanon Vue
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-12.webp', 12)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Lebanon Vue';

-- listing-25: Greenway Flats Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Greenway Flats Apartments';

-- listing-26: Green Meadows
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Green Meadows';

-- listing-27: Legacy at 19th
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Legacy at 19th';

-- listing-28: Lupton Flats
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Lupton Flats';

-- listing-29: Tennis Villas Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Tennis Villas Apartments';

-- listing-30: Riverside
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-13.webp', 13)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Riverside';

-- listing-31: Villas Havana
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Villas Havana';

-- listing-32: Oxford III
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Oxford III';

-- listing-33: Westside Terrace Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Westside Terrace Apartments';

-- listing-34: The Brooklyner
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'The Brooklyner';

-- listing-35: Talavera
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-10.webp', 10)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Talavera';

-- listing-36: AERIE Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = 'AERIE Apartments';

-- listing-37: Canoga Park, CA
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Canoga Park, CA';

-- listing-38: Azure
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Azure';

-- listing-39: 3167 Market
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '3167 Market';

-- listing-40: 226 East End Avenue
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '226 East End Avenue';

-- listing-41: 172 Mallory Ave unit 2
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '172 Mallory Ave unit 2';

-- listing-42: Verde Jersey City
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Verde Jersey City';

-- listing-43: Gorman Crossings
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Gorman Crossings';

-- listing-44: The Grove
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'The Grove';

-- listing-45: Blackwolf Run at Hedingham
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Blackwolf Run at Hedingham';

-- listing-46: Marcom St Apartments
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Marcom St Apartments';

-- listing-47: Skylar Lofts JC
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Skylar Lofts JC';

-- listing-48: The Constantine
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'The Constantine';

-- listing-49: Friendship Court
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Friendship Court';

-- listing-50: 46 Carlton Ave unit 2
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '46 Carlton Ave unit 2';

-- listing-51: 403 West
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '403 West';

-- listing-52: 5522 Baum Blvd unit 705
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '5522 Baum Blvd unit 705';

-- listing-53: 15 Dorothy St unit 15A
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '15 Dorothy St unit 15A';

-- listing-54: 150 West Side Ave unit 1
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '150 West Side Ave unit 1';

-- listing-55: 845 S. Kingsley
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = '845 S. Kingsley';

-- listing-56: Coronado St. Residences
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = 'Coronado St. Residences';

-- listing-57: 736 E 83rd St #2
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-14.webp', 14)
) AS v(image_url, sort_order)
WHERE l.image_group = '736 E 83rd St #2';

-- listing-58: 17 6th St unit 2
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '17 6th St unit 2';

-- listing-59: 77 Vinton St unit 1
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-13.webp', 13)
) AS v(image_url, sort_order)
WHERE l.image_group = '77 Vinton St unit 1';

-- listing-60: 218 Grandview Terrace
INSERT INTO property_images (listing_id, image_url, sort_order)
SELECT l.id, v.image_url, v.sort_order
FROM listings l,
(VALUES
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-1.webp', 1),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-2.webp', 2),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-3.webp', 3),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-4.webp', 4),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-5.webp', 5),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-6.webp', 6),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-7.webp', 7),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-8.webp', 8),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-9.webp', 9),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-10.webp', 10),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-11.webp', 11),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-12.webp', 12),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-13.webp', 13),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-14.webp', 14),
  ('https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-15.webp', 15)
) AS v(image_url, sort_order)
WHERE l.image_group = '218 Grandview Terrace';
