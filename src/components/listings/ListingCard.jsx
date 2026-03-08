// src/components/listings/ListingCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";

// Inline SVG icons — no external library needed
function BedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
    </svg>
  );
}
function BathIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M22 9V7h-2V5a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-2h-4V9h4zm-4 7H4V5h11v4h3v7z"/>
    </svg>
  );
}
function SqftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );
}

export default function ListingCard({ listing }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const saved = isFavorite(listing.id);

  function handleFavorite(e) {
    e.preventDefault();
    if (!user) return;
    toggleFavorite(listing.id);
  }

  const imageUrl = listing.image_url || "https://placehold.co/400x250?text=No+Image";
  const amenities = listing.amenities?.slice(0, 3) ?? [];

  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col
                 border border-gray-200
                 shadow-sm hover:shadow-lg
                 transition-shadow duration-200"
    >
      {/* ── Image ──────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* State badge */}
        <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {listing.state}
        </span>
        {/* Favorite button */}
        {user && (
          <button
            onClick={handleFavorite}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
            className={`absolute top-3 right-3 p-2 rounded-full shadow transition-colors duration-150
              ${saved ? "bg-red-500 text-white" : "bg-white/90 text-[#5F6368] hover:text-red-500"}`}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
      </div>

      {/* ── Card body ──────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Price — prominent at top of body */}
        <p className="text-brand-600 font-extrabold text-xl leading-none">
          ${listing.price?.toLocaleString()}
          <span className="text-sm font-normal text-[#5F6368]">/mo</span>
        </p>

        {/* Title */}
        <h3 className="font-semibold text-[#202124] text-sm leading-snug truncate">
          {listing.title}
        </h3>

        {/* City, State */}
        <p className="text-xs text-[#5F6368]">
          {listing.city}, {listing.state}
        </p>

        {/* Beds / Baths / Sqft with icons */}
        <div className="flex items-center gap-3 text-xs text-[#5F6368] mt-1">
          <span className="flex items-center gap-1">
            <BedIcon />
            {listing.bedrooms} bd
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <BathIcon />
            {listing.bathrooms} ba
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <SqftIcon />
            {listing.sqft?.toLocaleString()} sqft
          </span>
        </div>

        {/* Amenity tags — top 3 */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
            {amenities.map((tag) => (
              <span
                key={tag}
                className="bg-brand-50 text-brand-700 text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
