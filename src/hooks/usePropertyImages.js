// src/hooks/usePropertyImages.js
// Fetches all gallery images for a listing from the property_images table.
// Room type labels come from the room_type column (set by fix_room_types.sql).
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function usePropertyImages(listingId) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    let cancelled = false;
    setLoading(true);

    supabase
      .from("property_images")
      .select("id, image_url, sort_order, room_type")
      .eq("listing_id", listingId)
      .order("sort_order")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setImages([]);
        } else {
          setImages(
            data.map((img) => ({
              ...img,
              roomType: img.room_type || "Photo",
            }))
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [listingId]);

  return { images, loading };
}
