// src/pages/Favorites.jsx — Protected page
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import ListingGrid from "../components/listings/ListingGrid";
import SEO from "../components/common/SEO";

function HeartEmptyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.2" strokeLinecap="round" className="text-gray-300 mx-auto mb-4">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

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

  const isEmpty = !loading && !error && listings.length === 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FA" }}>
      <SEO title="Saved Listings" noindex />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124] mb-8">
          Your Saved Listings
        </h1>

        {isEmpty ? (
          <div className="text-center py-24">
            <HeartEmptyIcon />
            <p className="text-lg font-semibold text-[#202124]">No saved apartments yet</p>
            <p className="text-sm text-[#5F6368] mt-2 mb-6">
              Start browsing and tap the heart icon to save your favorites.
            </p>
            <Link
              to="/listings"
              className="inline-block bg-[#1A73E8] text-white font-semibold
                         px-8 py-3 rounded-full hover:bg-[#1557b0]
                         transition-colors duration-150 text-sm"
            >
              Browse Apartments
            </Link>
          </div>
        ) : (
          <ListingGrid listings={listings} loading={loading} error={error} />
        )}
      </div>
    </div>
  );
}
