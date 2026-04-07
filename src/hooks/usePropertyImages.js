// src/hooks/usePropertyImages.js
// Fetches all gallery images for a listing from the property_images table.
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Room-type labels derived from sort_order position.
// Images were optimized in this priority: living-room, kitchen, bed, bath, amenities, exterior.
const ROOM_LABELS = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Amenities",
  "Exterior",
];

// Heuristic: assign room type based on sort_order position within a set of up to 15 images.
// Typical distribution mirrors the optimize-images.js priority order.
function inferRoomType(sortOrder, total) {
  if (total <= 0) return "Photo";
  // Divide images proportionally across 6 categories
  const perGroup = total / 6;
  const groupIndex = Math.min(Math.floor((sortOrder - 1) / Math.max(perGroup, 1)), 5);
  return ROOM_LABELS[groupIndex] || "Photo";
}

export function usePropertyImages(listingId) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    let cancelled = false;
    setLoading(true);

    supabase
      .from("property_images")
      .select("id, image_url, sort_order")
      .eq("listing_id", listingId)
      .order("sort_order")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("property_images fetch error:", error.message);
          setImages([]);
        } else {
          const total = data.length;
          setImages(
            data.map((img) => ({
              ...img,
              roomType: inferRoomType(img.sort_order, total),
            }))
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [listingId]);

  return { images, loading };
}
