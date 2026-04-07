-- randomize_timestamps.sql
-- Spreads created_at across the last 30 days with random offsets
-- so default sort (created_at DESC) produces a mixed order of studios/1-beds/2-beds.

UPDATE listings
SET created_at = now() - (random() * interval '30 days')
                       - (random() * interval '24 hours');
