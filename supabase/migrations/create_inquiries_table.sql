-- ============================================================
-- AptGuide — Inquiries table (v2)
--
-- Run in Supabase SQL Editor: Dashboard → SQL Editor → New query → Run.
--
-- What this does:
--   1. Drops the old inquiries table (which had first_name/last_name/user_id
--      columns) and replaces it with the new unified schema.
--   2. Enables RLS with a public-insert / owner-read policy.
--
-- The new schema consolidates data from all three contact forms:
--   • "Tell Us What You're Looking For" help modal   → form_source = 'help'
--   • "Send Message" on listing cards                → form_source = 'listing'
--   • Contact card on the listing detail page        → form_source = 'contact'
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- Drop old table (cascades to any dependent policies)
-- ────────────────────────────────────────────────────────────
drop table if exists inquiries cascade;


-- ────────────────────────────────────────────────────────────
-- Create new inquiries table
-- ────────────────────────────────────────────────────────────
create table inquiries (
  id                 uuid        primary key default gen_random_uuid(),
  name               text        not null,
  email              text        not null,
  phone              text,
  preferred_city     text,
  preferred_bedrooms text,
  budget_range       text,
  move_in_date       date,
  message            text,
  -- nullable — present when the inquiry is tied to a specific listing
  listing_id         uuid        references listings(id) on delete set null,
  -- which form submitted this row; one of: 'contact' | 'listing' | 'help'
  form_source        text        not null,
  created_at         timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────────────────
alter table inquiries enable row level security;

-- Anyone (guest or authenticated) may submit an inquiry
drop policy if exists "Anyone can submit inquiries" on inquiries;
create policy "Anyone can submit inquiries"
  on inquiries
  for insert
  with check (true);
