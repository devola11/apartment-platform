-- ============================================================
-- AptGuide — Run this in the Supabase SQL Editor (Dashboard →
-- SQL Editor → New query → paste → Run).
--
-- What this does:
--   1. Enables Row Level Security on listings & favorites
--      (Supabase tables are unprotected until RLS is turned on).
--   2. Adds the correct access policies for each table.
--   3. Creates the `inquiries` table for the Send Message form.
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. LISTINGS — public read, no client writes
-- ────────────────────────────────────────────────────────────
alter table listings enable row level security;

-- Drop if already exists so this script is safe to re-run
drop policy if exists "Public can read listings" on listings;

create policy "Public can read listings"
  on listings
  for select
  using (true);   -- every user (including anonymous) may SELECT


-- ────────────────────────────────────────────────────────────
-- 2. FAVORITES — owner-only access
-- ────────────────────────────────────────────────────────────
alter table favorites enable row level security;

drop policy if exists "Users can read own favorites"   on favorites;
drop policy if exists "Users can insert own favorites" on favorites;
drop policy if exists "Users can delete own favorites" on favorites;

create policy "Users can read own favorites"
  on favorites
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on favorites
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on favorites
  for delete
  using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────
-- 3. INQUIRIES — create table + RLS
-- ────────────────────────────────────────────────────────────
create table if not exists inquiries (
  id           uuid        primary key default gen_random_uuid(),
  listing_id   uuid        references listings(id) on delete cascade,
  -- null when submitted by a guest (not logged in)
  user_id      uuid        references auth.users(id) on delete set null,
  first_name   text        not null,
  last_name    text        not null,
  email        text        not null,
  phone        text,
  move_in_date date,
  message      text,
  opt_in_tips  boolean     not null default false,
  created_at   timestamptz not null default now()
);

alter table inquiries enable row level security;

drop policy if exists "Anyone can submit inquiries"    on inquiries;
drop policy if exists "Users can read own inquiries"   on inquiries;

-- Guests and authenticated users may both submit
create policy "Anyone can submit inquiries"
  on inquiries
  for insert
  with check (true);

-- Authenticated users may read back their own submissions
create policy "Users can read own inquiries"
  on inquiries
  for select
  using (auth.uid() = user_id);
