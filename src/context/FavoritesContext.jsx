// src/context/FavoritesContext.jsx
// ------------------------------------------------------------------
// Tracks which listings the current user has saved/favorited.
// Data is stored in the Supabase `favorites` table so it persists
// across sessions and devices.
// ------------------------------------------------------------------
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  // favoriteIds is a Set of listing IDs the user has saved
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Whenever the logged-in user changes, reload their favorites
  useEffect(() => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }

    setLoading(true);
    supabase
      .from("favorites")
      .select("listing_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          setFavoriteIds(new Set(data.map((r) => r.listing_id)));
        }
        setLoading(false);
      });
  }, [user]);

  // Toggle a listing in/out of favorites.
  // Uses optimistic UI: state updates immediately, then rolls back on DB error.
  async function toggleFavorite(listingId) {
    if (!user) return;

    if (favoriteIds.has(listingId)) {
      // Optimistic remove
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(listingId);
        return next;
      });

      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);

      if (error) {
        // Rollback: re-add the id
        setFavoriteIds((prev) => new Set(prev).add(listingId));
        console.error("Failed to remove favorite:", error.message);
      }
    } else {
      // Optimistic add
      setFavoriteIds((prev) => new Set(prev).add(listingId));

      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, listing_id: listingId });

      if (error) {
        // Rollback: remove the id
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(listingId);
          return next;
        });
        console.error("Failed to save favorite:", error.message);
      }
    }
  }

  const isFavorite = (listingId) => favoriteIds.has(listingId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
