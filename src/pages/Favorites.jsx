// src/pages/Favorites.jsx — Protected page
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import ListingGrid from "../components/listings/ListingGrid";

export default function Favorites() {
  const { user } = useAuth();
  const { favoriteIds } = useFavorites();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || favoriteIds.size === 0) {
      setListings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Convert Set to Array for the .in() filter
    supabase
      .from("listings")
      .select("*")
      .in("id", [...favoriteIds])
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setListings(data ?? []);
        setLoading(false);
      });
  }, [user, favoriteIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Saved Listings</h1>
      <ListingGrid listings={listings} loading={loading} error={error} />
    </div>
  );
}
