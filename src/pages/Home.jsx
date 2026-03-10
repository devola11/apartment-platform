// src/pages/Home.jsx
//
// RESPONSIVE CHANGES:
//  Hero height:   min-h-[400px] on mobile → min-h-[580px] on md+
//  Hero heading:  text-3xl (mobile) → text-5xl (md) → text-7xl (lg)
//  Search bar:    flex-col on mobile (stacked) → flex-row on sm+ (pill)
//                 Input is full width on both sizes.
//                 Button is full width below input on mobile, inline on sm+.
//  Listing grid:  Handled by ListingGrid — 1 col mobile, 2 tablet, 3 desktop.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingsMap from "../components/maps/ListingsMap";
import SEO from "../components/common/SEO";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AptGuide",
  url: "https://aptguide.com",
  description: "Browse verified apartments for rent across California and Florida.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://aptguide.com/listings?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  const { listings, loading, error } = useListings({ limit: 6 });
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    navigate(`/listings?${params.toString()}`);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FA" }}>
      <SEO
        title="Apartments for Rent in California & Florida"
        description="Browse 50+ verified apartments for rent across California and Florida. Filter by city, price, and bedrooms. Find your perfect home with AptGuide."
        canonical="/"
        jsonLd={HOME_JSON_LD}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      {/*
        min-h-[400px]: mobile hero is shorter (400px) — less wasted space on small screens.
        md:min-h-[580px]: tablet/desktop gets the full-height hero.
        Both use min-height so the content can grow if text wraps.
      */}
      <section
        className="relative flex items-center justify-center text-white overflow-hidden
                   min-h-[400px] md:min-h-[580px]"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />

        {/* Hero content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-12 md:py-20 w-full">

          {/*
            Heading size progression:
              text-3xl  = 30px — readable on a 375px phone, nothing feels cramped.
              md:text-5xl = 48px — tablet gets a bigger, bolder headline.
              lg:text-7xl = 72px — desktop gets the dramatic full-size heading.
            mb-6 md:mb-10 tightens the gap on mobile so the search bar
            doesn't feel too far away.
          */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight mb-6 md:mb-10 drop-shadow-lg">
            Find the Perfect Apartment.
          </h1>

          {/* ── Pill search bar ────────────────────────────────────── */}
          {/*
            On mobile: flex-col — input is full width, button goes below it.
            On sm (640px)+: flex-row — pill shape is restored with input + button side by side.

            We also change the shape:
              Mobile:  rounded-2xl on the container, rounded-xl on each child
                       so they look like separate rounded boxes stacked.
              sm+:     rounded-full on the container, rounded-full on the button
                       restoring the pill look.

            overflow-hidden on the container clips the children to the container shape.
          */}
          <form
            onSubmit={handleSearch}
            className="bg-white shadow-xl overflow-hidden
                       flex flex-col sm:flex-row
                       rounded-2xl sm:rounded-full"
          >
            {/*
              flex-1 + w-full: input fills all available width in both layouts.
              On mobile, it's a block. On sm+, it shares space with the button.
              text-base (16px) prevents iOS from auto-zooming the input on focus
              (iOS zooms if font-size < 16px).
            */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, Neighborhood, or ZIP"
              className="flex-1 w-full text-[#202124] text-base placeholder-[#5F6368]
                         focus:outline-none px-5 py-4 sm:px-7 sm:py-5 bg-transparent"
            />

            {/*
              Mobile: w-full button fills the full row below the input.
              sm+: auto width, floats to the right of the input.
              min-h-[44px]: satisfies the 44px minimum touch target requirement.
              mr-0 sm:mr-1 + rounded-xl sm:rounded-full: matches shape of container.
            */}
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl sm:rounded-full text-white font-bold
                         px-8 py-4 sm:px-10 sm:py-4 sm:mr-1
                         text-base whitespace-nowrap transition-colors duration-150
                         min-h-[44px]"
              style={{ backgroundColor: "#1A73E8" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1669D3")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A73E8")}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Featured listings ──────────────────────────────────────────── */}
      {/*
        px-4 gives 16px side padding on mobile so cards don't touch screen edges.
        py-10 md:py-14 reduces vertical breathing room slightly on mobile.
      */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124]">Featured Listings</h2>
          <Link
            to="/listings"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        {/*
          ListingGrid already uses:
            grid-cols-1           (mobile:  1 card per row)
            sm:grid-cols-2        (tablet:  2 cards per row)
            lg:grid-cols-3        (desktop: 3 cards per row)
          No changes needed there.
        */}
        <ListingGrid listings={listings} loading={loading} error={error} />

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/listings"
            className="inline-block bg-brand-600 text-white font-semibold
                       px-8 py-3 rounded-full hover:bg-brand-700
                       transition-colors duration-150 shadow-sm text-sm
                       min-h-[44px] flex items-center justify-center w-fit mx-auto"
          >
            View all listings
          </Link>
        </div>
      </section>

      {/* ── Map preview ────────────────────────────────────────────────── */}
      {/*
        The map is decorative/supplemental on the homepage. On mobile it's
        still visible but at a shorter height (h-[260px] vs h-[400px] on md+).
        This saves vertical space without removing the feature entirely.
      */}
      <section className="max-w-7xl mx-auto px-4 pb-12 md:pb-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-6">Explore the Map</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <ListingsMap listings={listings} className="h-[260px] md:h-[400px]" />
        </div>
      </section>
    </div>
  );
}
