// src/lib/supabase.js
// ------------------------------------------------------------------
// This is the single shared Supabase client for the whole app.
// Import `supabase` from this file anywhere you need to query the DB,
// handle auth, or access storage.
//
// import.meta.env is how Vite exposes environment variables.
// Variables MUST start with VITE_ to be included in the browser bundle.
// ------------------------------------------------------------------
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
    "Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
