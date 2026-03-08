// src/hooks/useListings.js
// ------------------------------------------------------------------
// A custom hook that fetches listings from Supabase and supports
// filtering by state, city, price range, and bedroom count.
//
// Custom hooks are just functions that start with "use" and call
// other hooks inside them — they let you reuse stateful logic.
// ------------------------------------------------------------------
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useListings(filters = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // prevents state updates if the component unmounts

    async function fetchListings() {
      setLoading(true);
      setError(null);

      // Start building the query
      let query = supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      // Apply optional filters (only if a value was provided)
      if (filters.state)    query = query.eq("state", filters.state);
      if (filters.city)     query = query.ilike("city", `%${filters.city}%`);
      if (filters.minPrice) query = query.gte("price", filters.minPrice);
      if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
      if (filters.bedrooms) query = query.eq("bedrooms", filters.bedrooms);
      if (filters.limit)    query = query.limit(filters.limit);

      const { data, error: err } = await query;

      if (!cancelled) {
        if (err) setError(err.message);
        else setListings(data ?? []);
        setLoading(false);
      }
    }

    fetchListings();
    return () => { cancelled = true; };
  // Re-run whenever any filter value changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.state,
    filters.city,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.limit,
  ]);

  return { listings, loading, error };
}
