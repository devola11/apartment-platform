// src/hooks/useListing.js
// Fetches a single listing by its ID. Used on the detail page.
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useListing(id) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single() // .single() returns one object instead of an array
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setListing(data);
        setLoading(false);
      });
  }, [id]);

  return { listing, loading, error };
}
