// src/components/listings/ListingRow.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Horizontal listing card — used on the search results page (/listings).
//
// LAYOUT (left → right):
//  Image (fixed width 192px) | Content column (flex-1)
//   Content: title + price header, address, beds/baths/sqft, phone,
//            amenity tags, then "Send Message" button at the bottom.
//
// isActive: true when the user hovers this card — the parent (Listings.jsx)
//   sets hoveredId, which the map uses to highlight the matching price marker.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import SendMessageModal from "../common/SendMessageModal";

// Generates a deterministic fake phone from the listing UUID so each listing
// always shows the same number across sessions.
function fakePhone(id) {
  const n = parseInt((id || "0").replace(/-/g, "").slice(0, 8), 16);
  const a = (n % 900) + 100;
  const b = ((n >> 8) % 9000) + 1000;
  return `(800) ${a}-${b}`;
}

function BedIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>; }
function BathIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-2h-4V9h4zm-4 7H4V5h11v4h3v7z"/></svg>; }
function SqftIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function PhoneIcon(){ return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>; }

function HeartIcon({ filled }) {
  return filled
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}

export default function ListingRow({ listing, isActive, onMouseEnter, onMouseLeave }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user }                        = useAuth();
  const saved                           = isFavorite(listing.id);
  const [showModal, setShowModal]       = useState(false);

  // stopPropagation() prevents the click from reaching the <Link> parent
  function handleFav(e) {
    e.stopPropagation();
    if (!user) return;
    toggleFavorite(listing.id);
  }

  function handleSendMessage(e) {
    e.stopPropagation();
    setShowModal(true);
  }

  const imageUrl = listing.image_url || "https://placehold.co/320x200?text=No+Image";
  const amenities = listing.amenities?.slice(0, 3) ?? [];
  const phone = fakePhone(listing.id);

  return (
    <>
      <Link
        to={`/listings/${listing.id}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`flex bg-white rounded-xl border overflow-hidden shadow-sm
                    hover:shadow-md transition-all duration-150 group
                    ${isActive ? "border-[#1A73E8] shadow-md" : "border-[#E0E0E0]"}`}
      >
        {/* ── Image — fixed width, full card height ───────────────────── */}
        <div className="relative w-48 shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* State abbreviation badge */}
          <span className="absolute top-2 left-2 bg-[#1A73E8] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {listing.state === "California" ? "CA" : listing.state === "Florida" ? "FL" : listing.state}
          </span>
          {/* Favorite heart — stopPropagation prevents Link navigation */}
          <button
            onClick={handleFav}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
            className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition-colors
              ${saved ? "bg-red-500 text-white" : "bg-white/90 text-[#5F6368] hover:text-red-500"}`}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>

        {/* ── Content column ───────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-4 min-w-0">

          {/* Title + price header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-[#202124] text-sm leading-snug truncate flex-1">
              {listing.title}
            </h3>
            <p className="text-[#1A73E8] font-extrabold text-lg leading-tight shrink-0">
              ${listing.price?.toLocaleString()}
              <span className="text-xs font-normal text-[#5F6368]">/mo</span>
            </p>
          </div>

          {/* Address */}
          <p className="text-xs text-[#5F6368] mb-2 truncate">
            {listing.address}, {listing.city}, {listing.state} {listing.zip}
          </p>

          {/* Beds / Baths / Sqft row */}
          <div className="flex items-center gap-2 text-xs text-[#5F6368] mb-2">
            <span className="flex items-center gap-1"><BedIcon />{listing.bedrooms ?? "—"} bd</span>
            <span className="text-[#E0E0E0]">|</span>
            <span className="flex items-center gap-1"><BathIcon />{listing.bathrooms ?? "—"} ba</span>
            <span className="text-[#E0E0E0]">|</span>
            <span className="flex items-center gap-1"><SqftIcon />{listing.sqft?.toLocaleString() ?? "—"} sqft</span>
          </div>

          {/* Phone number */}
          <p className="flex items-center gap-1.5 text-xs text-[#1A73E8] font-medium mb-2">
            <PhoneIcon />{phone}
          </p>

          {/* Top 3 amenity tags */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {amenities.map(tag => (
                <span key={tag} className="bg-blue-50 text-[#1A73E8] text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Send Message button — mt-auto pushes it to the bottom of the card */}
          <button
            onClick={handleSendMessage}
            className="mt-auto w-full bg-[#1A73E8] hover:bg-blue-700
                       text-white font-semibold py-2 rounded-lg
                       transition-colors text-sm"
          >
            Send Message
          </button>
        </div>
      </Link>

      {/* Modal lives outside the Link so its fixed positioning works correctly */}
      <SendMessageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        listing={listing}
      />
    </>
  );
}
