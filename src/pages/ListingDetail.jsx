// src/pages/ListingDetail.jsx
// Full detail view for a single listing. The `:id` URL param is read
// with useParams() from React Router.
import { useParams, Link } from "react-router-dom";
import { useListing } from "../hooks/useListing";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import ListingsMap from "../components/maps/ListingsMap";

export default function ListingDetail() {
  // useParams reads dynamic segments from the URL path — here :id
  const { id } = useParams();
  const { listing, loading, error } = useListing(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-72 bg-gray-200 rounded-2xl" />
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold text-gray-700">Listing not found</p>
        <Link to="/listings" className="text-brand-600 underline mt-4 inline-block">
          ← Back to listings
        </Link>
      </div>
    );
  }

  const saved = isFavorite(listing.id);
  const imageUrl = listing.image_url || "https://placehold.co/800x450?text=No+Image";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link to="/listings" className="text-brand-600 hover:underline text-sm mb-6 inline-block">
        ← Back to listings
      </Link>

      {/* Main image */}
      <img
        src={imageUrl}
        alt={listing.title}
        className="w-full h-72 object-cover rounded-2xl shadow mb-6"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{listing.title}</h1>
          <p className="text-gray-500 mt-1">{listing.address}, {listing.city}, {listing.state} {listing.zip}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-brand-600">
            ${listing.price?.toLocaleString()}
            <span className="text-base font-normal text-gray-400">/mo</span>
          </p>
          {user && (
            <button
              onClick={() => toggleFavorite(listing.id)}
              className={`mt-2 text-sm px-4 py-1.5 rounded-full border transition-colors
                ${saved
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500"
                }`}
            >
              {saved ? "♥ Saved" : "♡ Save"}
            </button>
          )}
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4 mb-6 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-900">{listing.bedrooms}</p>
          <p className="text-sm text-gray-500">Bedrooms</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{listing.bathrooms}</p>
          <p className="text-sm text-gray-500">Bathrooms</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{listing.sqft?.toLocaleString()}</p>
          <p className="text-sm text-gray-500">sq ft</p>
        </div>
      </div>

      {/* Description */}
      {listing.description && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About this apartment</h2>
          <p className="text-gray-600 leading-relaxed">{listing.description}</p>
        </div>
      )}

      {/* Amenities */}
      {listing.amenities?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((a) => (
              <span key={a} className="bg-brand-50 text-brand-700 text-sm px-3 py-1 rounded-full">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Map for this single listing */}
      {listing.latitude && listing.longitude && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Location</h2>
          <ListingsMap listings={[listing]} className="h-[280px]" />
        </div>
      )}
    </div>
  );
}
