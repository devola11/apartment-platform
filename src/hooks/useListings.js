// src/hooks/useListings.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useListings(filters = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // skip allows callers to defer fetching until required data is ready
    if (filters.skip) {
      setListings([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchListings() {
      setLoading(true);
      setError(null);

      let query = supabase.from("listings").select("*");

      // Sorting
      if (filters.sort === "price_asc") {
        query = query.order("price", { ascending: true });
      } else if (filters.sort === "price_desc") {
        query = query.order("price", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      // Filters
      if (filters.state)    query = query.eq("state", filters.state);
      if (filters.city)     query = query.ilike("city", `%${filters.city}%`);
      if (filters.minPrice) query = query.gte("price", Number(filters.minPrice));
      if (filters.maxPrice) query = query.lte("price", Number(filters.maxPrice));
      // bedrooms: "0" = studio (exact), "1"/"2"/"3" = 1+/2+/3+ (gte)
      if (filters.bedrooms === "0") {
        query = query.eq("bedrooms", 0);
      } else if (filters.bedrooms) {
        query = query.gte("bedrooms", Number(filters.bedrooms));
      }
      if (filters.bathrooms) query = query.gte("bathrooms", Number(filters.bathrooms));
      if (filters.limit)     query = query.limit(filters.limit);

      const { data, error: err } = await query;

      if (!cancelled) {
        if (err) setError(err.message);
        else setListings(data ?? []);
        setLoading(false);
      }
    }

    fetchListings();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.skip,
    filters.state,
    filters.city,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
    filters.sort,
    filters.limit,
  ]);

  return { listings, loading, error };
}
