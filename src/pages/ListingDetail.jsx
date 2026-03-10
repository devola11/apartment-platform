// src/pages/ListingDetail.jsx
//
// RESPONSIVE CHANGES:
//
//   Breadcrumb:
//     Mobile:  Show only "← Back to listings" (simple back link).
//     md+:     Full breadcrumb trail (Home > State > City > Title).
//
//   Photo gallery:
//     Mobile:  Main image full width, auto height (aspect ratio preserved).
//              Thumbnail 2×2 grid hidden.
//              "View All Photos" button overlaid on the main image.
//     md+:     Original side-by-side gallery (65% main + 35% thumbnails), fixed 420px height.
//
//   Two-column layout (info + contact card):
//     Mobile:  flex-col — everything stacks vertically. Contact card flows
//              below the property info (not sticky).
//     lg+:     flex-row — 63% info column on the left, 37% sticky contact
//              card on the right.
//     We use lg (1024px) rather than md (768px) because at 768px the side-by-side
//     columns are too narrow for the contact card to display comfortably.
//
//   Stats row (Price / Beds / Baths / Sqft):
//     Mobile:  2×2 grid (grid-cols-2) instead of 4-in-a-row, so each cell
//              has room to breathe on narrow screens.
//     md+:     Original 4-column row (flex with divide-x).
//
//   Contact card:
//     Mobile:  Not sticky — flows naturally after the property info.
//     lg+:     sticky top-20 (original behaviour).

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useListing } from "../hooks/useListing";
import { useListings } from "../hooks/useListings";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import ListingsMap from "../components/maps/ListingsMap";
import ListingCard from "../components/listings/ListingCard";
import SEO from "../components/common/SEO";
import SendMessageModal from "../components/common/SendMessageModal";

function fakePhone(id) {
  const n = parseInt((id || "0").replace(/-/g, "").slice(0, 8), 16);
  const a = (n % 900) + 100;
  const b = ((n >> 8) % 9000) + 1000;
  return `(800) ${a}-${b}`;
}

function PinIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>; }
function BedIcon()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>; }
function BathIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-2h-4V9h4zm-4 7H4V5h11v4h3v7z"/></svg>; }
function SqftIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>; }
function ChevronIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function HeartIcon({ filled }) {
  return filled
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}

export default function ListingDetail() {
  const { id } = useParams();
  const { listing, loading, error } = useListing(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const { listings: similar } = useListings({
    state: listing?.state,
    limit: 4,
    skip: !listing,
  });
  const similarListings = similar.filter(l => l.id !== id).slice(0, 3);

  const [showModal, setShowModal] = useState(false);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-[260px] md:h-[420px] bg-gray-200 rounded-2xl" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
            <div className="w-full lg:w-[37%] h-64 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold text-[#202124]">Listing not found</p>
        <Link to="/listings" className="text-[#1A73E8] underline mt-4 inline-block">← Back to listings</Link>
      </div>
    );
  }

  const saved    = isFavorite(listing.id);
  const imageUrl = listing.image_url || "https://placehold.co/800x450?text=No+Image";
  const phone    = fakePhone(listing.id);

  const parts = [
    listing.bedrooms  != null && `${listing.bedrooms}-bedroom`,
    listing.bathrooms != null && `${listing.bathrooms}-bath`,
    "apartment",
    listing.city  && `in ${listing.city}`,
    listing.state,
  ].filter(Boolean);
  const pricePart   = listing.price  != null ? `$${listing.price.toLocaleString()}/mo` : null;
  const sqftPart    = listing.sqft   != null ? `${listing.sqft.toLocaleString()} sq ft` : null;
  const amenityPart = listing.amenities?.length > 0 ? listing.amenities.slice(0, 3).join(", ") : null;
  const seoDescription = (
    parts.join(" ") +
    (pricePart  ? ` — ${pricePart}` : "") +
    (sqftPart   ? `, ${sqftPart}`   : "") +
    (amenityPart ? `. ${amenityPart}.` : ".")
  ) || listing.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description || seoDescription,
    url: `https://aptguide.com/listings/${listing.id}`,
    image: imageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: "US",
    },
    ...(listing.price != null && {
      offers: {
        "@type": "Offer",
        price: listing.price,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: listing.price,
          priceCurrency: "USD",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      },
    }),
    ...(listing.latitude && listing.longitude && {
      geo: { "@type": "GeoCoordinates", latitude: listing.latitude, longitude: listing.longitude },
    }),
    numberOfRooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    floorSize: listing.sqft ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" } : undefined,
    amenityFeature: listing.amenities?.map(a => ({
      "@type": "LocationFeatureSpecification", name: a, value: true,
    })),
  };

  const stateSlug = listing.state?.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <SEO
        title={`${listing.title} — ${listing.city}, ${listing.state}`}
        description={seoDescription}
        canonical={`/listings/${listing.id}`}
        image={listing.image_url || undefined}
        imageAlt={`${listing.title} in ${listing.city}, ${listing.state}`}
        ogType="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-7xl mx-auto px-4">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        {/*
          Mobile: show only a simple "← Back" link (hidden md:flex hides the full trail).
          md+:    show the full breadcrumb (flex items-center gap-1.5 ...).
          This avoids long multi-item breadcrumbs wrapping awkwardly on small screens.
        */}

        {/* Simple back link — mobile only */}
        <div className="md:hidden py-4">
          <Link
            to="/listings"
            className="inline-flex items-center gap-1 text-sm text-[#1A73E8] font-medium"
          >
            ← Back to listings
          </Link>
        </div>

        {/* Full breadcrumb — tablet/desktop only */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs text-[#5F6368] py-4 flex-wrap">
          <Link to="/" className="hover:text-[#1A73E8]">Home</Link>
          <ChevronIcon />
          <Link to={`/listings/${stateSlug}`} className="hover:text-[#1A73E8]">{listing.state}</Link>
          <ChevronIcon />
          <span className="text-[#5F6368]">{listing.city}</span>
          <ChevronIcon />
          <span className="text-[#202124] font-medium truncate max-w-[200px]">{listing.title}</span>
        </nav>

        {/* ── Photo gallery ────────────────────────────────────────────── */}
        {/*
          MOBILE layout:
            Single full-width image with an aspect-ratio of 4/3 (good for apartments).
            The thumbnail 2×2 grid is hidden (hidden md:grid on the grid div).
            A "View All Photos" button is shown as an overlay on the main image.

          DESKTOP layout (md+):
            flex side-by-side: main image (65%) + 2×2 thumbnail grid (35%).
            Fixed height of 420px (original behaviour).

          We switch between the two with:
            - Container: `flex-col md:flex-row` removes fixed height on mobile
            - Main image: natural height on mobile, full parent height on md+
            - Thumbnail grid: `hidden md:grid`
        */}
        {/* No inline height here — height is controlled by Tailwind classes on children */}
        <div className="mb-6 md:mb-8 rounded-2xl overflow-hidden flex flex-col md:flex-row md:gap-2">
          {/* Main image — full width on mobile, 65% on md+ */}
          <div className="relative overflow-hidden w-full md:w-[65%] md:shrink-0">
            {/*
              Mobile:  aspect-[4/3] — maintains a nice rectangle without a fixed px height.
              md+:     h-[420px] — original fixed gallery height.
            */}
            <img
              src={imageUrl}
              alt={listing.title}
              className="w-full aspect-[4/3] md:aspect-auto md:h-[420px] object-cover"
            />

            {/* Favorite button overlay (logged-in users) */}
            {user && (
              <button
                onClick={() => toggleFavorite(listing.id)}
                aria-label={saved ? "Remove from favorites" : "Save to favorites"}
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-colors
                  ${saved ? "bg-red-500 text-white" : "bg-white text-[#5F6368] hover:text-red-500"}`}
              >
                <HeartIcon filled={saved} />
              </button>
            )}

            {/* "View All Photos" button — shown on mobile where the grid is hidden */}
            <button
              className="md:hidden absolute bottom-4 right-4 text-white text-xs font-semibold
                         bg-black/50 border border-white/60 px-3 py-2 rounded-lg
                         hover:bg-black/70 transition-colors min-h-[44px]"
            >
              View All Photos
            </button>
          </div>

          {/* 2×2 Thumbnail grid — hidden on mobile, visible on md+; takes the remaining 35% */}
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 md:flex-1">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`${listing.title} photo ${i + 1}`}
                  className="w-full h-[205px] object-cover"
                />
                {i === 3 && (
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                    <button className="text-white text-xs font-semibold bg-black/30 border border-white/60 px-3 py-2 rounded-lg hover:bg-black/50 transition-colors">
                      View All Photos
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-column layout: info (left) + contact card (right) ────── */}
        {/*
          Mobile:  flex-col — everything stacks. Contact card flows below info.
          lg+:     flex-row — original two-column side-by-side layout.
          We use lg (1024px) because at md (768px) the columns are too narrow.
          gap-6 on mobile, gap-8 on lg+.
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start pb-16">

          {/* ── LEFT column — property info ─────────────────────────── */}
          {/* w-full on mobile; on lg+ flex takes it to 63% (the remaining after right col) */}
          <div className="w-full lg:flex-1 min-w-0">

            {/* Title & address */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#202124] mb-2 leading-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-1.5 text-[#5F6368] text-sm mb-5 flex-wrap">
              <PinIcon />
              <span>{listing.address}, {listing.city}, {listing.state} {listing.zip}</span>
            </div>

            {/* ── Stats row: Price / Beds / Baths / Sqft ──────────── */}
            {/*
              Mobile:  grid-cols-2 — 2×2 grid so each cell is wide enough.
              md+:     flex with divide-x — original 4-in-a-row layout.
              We achieve this by having two separate elements with responsive visibility:
                - Grid version:  block md:hidden
                - Flex version:  hidden md:flex
            */}

            {/* Mobile: 2×2 grid */}
            <div className="grid grid-cols-2 md:hidden border border-[#E0E0E0] rounded-xl overflow-hidden mb-8 bg-white divide-y divide-[#E0E0E0]">
              <div className="flex flex-col items-center px-4 py-4 border-r border-[#E0E0E0]">
                <p className="text-xl font-extrabold text-[#1A73E8]">${listing.price?.toLocaleString()}</p>
                <p className="text-xs text-[#5F6368] mt-0.5">per month</p>
              </div>
              <div className="flex flex-col items-center px-4 py-4">
                <div className="text-[#202124] mb-1"><BedIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bedrooms ?? "—"}</p>
                <p className="text-xs text-[#5F6368]">Bedrooms</p>
              </div>
              <div className="flex flex-col items-center px-4 py-4 border-r border-[#E0E0E0]">
                <div className="text-[#202124] mb-1"><BathIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bathrooms ?? "—"}</p>
                <p className="text-xs text-[#5F6368]">Bathrooms</p>
              </div>
              <div className="flex flex-col items-center px-4 py-4">
                <div className="text-[#202124] mb-1"><SqftIcon /></div>
                <p className="font-bold text-[#202124]">{listing.sqft?.toLocaleString() ?? "—"}</p>
                <p className="text-xs text-[#5F6368]">Sq Ft</p>
              </div>
            </div>

            {/* Desktop: 4-in-a-row flex (original layout) */}
            <div className="hidden md:flex items-center gap-0 border border-[#E0E0E0] rounded-xl overflow-hidden mb-8 bg-white divide-x divide-[#E0E0E0]">
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <p className="text-2xl font-extrabold text-[#1A73E8]">${listing.price?.toLocaleString()}</p>
                <p className="text-xs text-[#5F6368] mt-0.5">per month</p>
              </div>
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <div className="text-[#202124] mb-1"><BedIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bedrooms ?? "—"}</p>
                <p className="text-xs text-[#5F6368]">Bedrooms</p>
              </div>
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <div className="text-[#202124] mb-1"><BathIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bathrooms ?? "—"}</p>
                <p className="text-xs text-[#5F6368]">Bathrooms</p>
              </div>
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <div className="text-[#202124] mb-1"><SqftIcon /></div>
                <p className="font-bold text-[#202124]">{listing.sqft?.toLocaleString() ?? "—"}</p>
                <p className="text-xs text-[#5F6368]">Sq Ft</p>
              </div>
            </div>

            {/* About This Property */}
            {listing.description && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-3">About This Property</h2>
                <p className="text-[#5F6368] leading-relaxed">{listing.description}</p>
              </section>
            )}

            {/* Amenities & Features */}
            {listing.amenities?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-4">Amenities &amp; Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                  {listing.amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 text-sm text-[#202124]">
                      <CheckIcon />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location map */}
            {listing.latitude && listing.longitude && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-3">Location</h2>
                <ListingsMap listings={[listing]} className="h-[200px] sm:h-[260px] rounded-xl" />
                <p className="text-sm text-[#5F6368] mt-2 flex items-center gap-1.5 flex-wrap">
                  <PinIcon />
                  {listing.address}, {listing.city}, {listing.state} {listing.zip}
                </p>
              </section>
            )}

            {/* Similar Listings */}
            {similarListings.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-4">Similar Listings</h2>
                {/*
                  Mobile:  1 column (grid-cols-1) — cards are full width.
                  sm+:     up to 3 columns (sm:grid-cols-3).
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similarListings.map(l => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT column — contact card ──────────────────────────── */}
          {/*
            Mobile:  w-full, not sticky — flows naturally below the info column.
            lg+:     fixed width (lg:w-[37%]), sticky top-20 (original behaviour).

            sticky top-20 = 80px from the top of the viewport when scrolling.
            This keeps the contact card visible as the user reads long descriptions.
            On mobile, sticky is removed (the card just sits at the bottom of content).
          */}
          <div className="w-full lg:w-[37%] lg:sticky lg:top-20 shrink-0">
            <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-lg p-5 sm:p-6">

              <h3 className="font-bold text-[#202124] text-base leading-snug mb-1 line-clamp-2">
                {listing.title}
              </h3>
              <p className="text-2xl font-extrabold text-[#1A73E8] mb-6">
                ${listing.price?.toLocaleString()}
                <span className="text-sm font-normal text-[#5F6368]">/mo</span>
              </p>

              {/* CTA buttons — min-h-[44px] for touch targets */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-[#1A73E8] hover:bg-blue-700 text-white font-semibold
                           py-3 rounded-lg mb-3 transition-colors min-h-[44px]"
              >
                Request Info
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="w-full border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-blue-50
                           font-semibold py-3 rounded-lg mb-2 transition-colors min-h-[44px]"
              >
                Schedule Tour
              </button>

              <div className="mt-5 pt-4 border-t border-[#E0E0E0] flex items-center gap-2 text-[#1A73E8] font-semibold text-sm">
                <PhoneIcon />
                <span>{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SendMessageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        listing={listing}
      />
    </div>
  );
}
