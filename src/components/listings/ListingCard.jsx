// src/components/listings/ListingCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Vertical listing card — used on the Home page (featured listings) and on
// the ListingDetail page (Similar Listings section).
//
// LAYOUT (top to bottom):
//  1. Full-width property image
//  2. Price (bold large) + Share icon + Heart "Save" button
//  3. Address: street bold, city/state/zip normal weight — same line
//  4. All amenities as inline text with " • " separators
//  5. Beds on its own line | Sqft on its own line | price /mo in gray
//  6. "Send Message" full-width primary blue button
//
// KEY PATTERN: The outer wrapper is a <Link> so the whole card is clickable.
// Buttons inside (Share, Save, Send Message) call e.stopPropagation() so
// their clicks do NOT bubble up to the Link and trigger navigation.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import SendMessageModal from "../common/SendMessageModal";

// ── Inline SVG icons (no icon library dependency) ────────────────────────────
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6"  cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return filled ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#EF4444">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function ListingCard({ listing }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user }                        = useAuth();
  const saved                           = isFavorite(listing.id);

  // Controls the Send Message modal visibility
  const [showModal, setShowModal] = useState(false);

  const imageUrl = listing.image_url || "https://placehold.co/400x260?text=No+Image";

  // Join ALL amenities into one line separated by " • "
  // e.g. "Pool • Gym • In-Unit Washer • AC"
  const amenitiesLine = listing.amenities?.join(" • ") || "";

  // Beds display: 0 bedrooms = "Studio", otherwise "1 Bed", "2 Beds" etc.
  const bedsLabel =
    listing.bedrooms === 0
      ? "Studio"
      : listing.bedrooms != null
      ? `${listing.bedrooms} Bed${listing.bedrooms !== 1 ? "s" : ""}`
      : null;

  // ── Handlers — all use stopPropagation() ─────────────────────────────────
  // stopPropagation() stops the click from bubbling up to the parent <Link>,
  // so the user can click these buttons without navigating to the detail page.

  function handleFavorite(e) {
    e.stopPropagation();
    if (!user) return;
    toggleFavorite(listing.id);
  }

  function handleShare(e) {
    e.stopPropagation();
    const url = `${window.location.origin}/listings/${listing.id}`;
    // Web Share API is available on mobile/some desktop browsers
    if (navigator.share) {
      navigator.share({ title: listing.title, url });
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(url).catch(() => {});
    }
  }

  function handleSendMessage(e) {
    e.stopPropagation();
    setShowModal(true);
  }

  return (
    <>
      {/* ── Card wrapper — entire card navigates to listing detail ─────── */}
      <Link
        to={`/listings/${listing.id}`}
        className="group bg-white rounded-xl border border-[#E0E0E0] shadow-sm
                   hover:shadow-md transition-shadow duration-200
                   overflow-hidden flex flex-col"
      >
        {/* ── 1. Full-width property image ─────────────────────────────── */}
        {/* h-52 = 208px — tall enough to show the property clearly */}
        <div className="relative h-52 overflow-hidden shrink-0">
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* ── Card body ─────────────────────────────────────────────────── */}
        <div className="p-4 flex flex-col flex-1 gap-2">

          {/* ── 2. Price row — price left, share + heart right ─────────── */}
          {/* items-center vertically aligns the price text with the icon buttons */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-2xl font-extrabold text-[#202124] leading-none">
              ${listing.price?.toLocaleString()}
            </p>

            <div className="flex items-center gap-1 shrink-0">
              {/* Share button */}
              <button
                onClick={handleShare}
                aria-label="Share listing"
                className="p-1.5 rounded-full text-[#5F6368] hover:bg-gray-100 transition-colors"
              >
                <ShareIcon />
              </button>

              {/* Heart "Save" button — shows label text next to icon */}
              <button
                onClick={handleFavorite}
                aria-label={saved ? "Remove from saved" : "Save listing"}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${saved
                    ? "text-red-500 hover:bg-red-50"
                    : "text-[#5F6368] hover:bg-gray-100"
                  }`}
              >
                <HeartIcon filled={saved} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* ── 3. Address line ───────────────────────────────────────── */}
          {/* Street address is bold; city/state/zip follows in normal weight.
              All on one line — truncate prevents overflow on narrow cards. */}
          <p className="text-sm truncate">
            <span className="font-semibold text-[#202124]">{listing.address}</span>
            {listing.address && (listing.city || listing.state) && (
              <span className="font-normal text-[#5F6368]">
                , {listing.city}, {listing.state} {listing.zip}
              </span>
            )}
          </p>

          {/* ── 4. Amenities inline with bullet separators ────────────── */}
          {/* truncate clips the line if it's wider than the card.
              This is how ApartmentGuide shows amenities — one scannable line. */}
          {amenitiesLine && (
            <p className="text-xs text-[#5F6368] truncate">
              {amenitiesLine}
            </p>
          )}

          {/* ── 5. Stats: Beds / Sqft / Price per month ──────────────── */}
          {/* Each on its own line as specified. Price repeated here in a
              lighter shade as a quick reference below the amenities. */}
          <div className="mt-1 space-y-0.5">
            {bedsLabel && (
              <p className="text-sm font-medium text-[#202124]">{bedsLabel}</p>
            )}
            {listing.sqft != null && (
              <p className="text-sm font-medium text-[#202124]">
                {listing.sqft.toLocaleString()} Sqft
              </p>
            )}
            {listing.price != null && (
              <p className="text-sm text-[#5F6368]">
                ${listing.price.toLocaleString()}/mo
              </p>
            )}
          </div>

          {/* ── 6. Send Message — full-width primary blue button ─────── */}
          {/* mt-auto pushes the button to the bottom of the card so all
              cards in a grid row have the button at the same vertical position
              regardless of how much content is above it. */}
          <button
            onClick={handleSendMessage}
            className="mt-auto w-full bg-[#1A73E8] hover:bg-blue-700
                       text-white font-semibold py-2.5 rounded-xl
                       transition-colors duration-150 text-sm"
          >
            Send Message
          </button>
        </div>
      </Link>

      {/* ── Send Message modal — rendered outside the Link ───────────────── */}
      {/* Even though it's inside the component JSX, position:fixed means it
          covers the viewport correctly regardless of its DOM position. */}
      <SendMessageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        listing={listing}
      />
    </>
  );
}
