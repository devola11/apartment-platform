// src/components/listings/ListingCard.jsx
// ------------------------------------------------------------------
// Displays a single apartment listing as a card with image, price,
// key details, and a heart button to toggle favorites.
// ------------------------------------------------------------------
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";

export default function ListingCard({ listing }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const saved = isFavorite(listing.id);

  function handleFavorite(e) {
    e.preventDefault(); // stop the card link from navigating
    if (!user) return;  // silently do nothing if not logged in
    toggleFavorite(listing.id);
  }

  const imageUrl = listing.image_url || "https://placehold.co/400x250?text=No+Image";

  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Favorite heart button */}
        {user && (
          <button
            onClick={handleFavorite}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
            className={`absolute top-3 right-3 p-2 rounded-full shadow transition-colors
              ${saved ? "bg-red-500 text-white" : "bg-white/80 text-gray-500 hover:text-red-500"}`}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
        {/* State badge */}
        <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {listing.state}
        </span>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
        <p className="text-sm text-gray-500">{listing.city}, {listing.state}</p>

        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <span>{listing.bedrooms} bd</span>
          <span>·</span>
          <span>{listing.bathrooms} ba</span>
          <span>·</span>
          <span>{listing.sqft?.toLocaleString()} sqft</span>
        </div>

        <p className="text-brand-600 font-bold text-lg mt-auto pt-3">
          ${listing.price?.toLocaleString()}
          <span className="text-sm font-normal text-gray-400">/mo</span>
        </p>
      </div>
    </Link>
  );
}
