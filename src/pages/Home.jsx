// src/pages/Home.jsx
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

const PRICE_RANGES = [
  { label: "Any Price", value: "" },
  { label: "Under $1,000", value: "0-1000" },
  { label: "$1,000 – $2,000", value: "1000-2000" },
  { label: "$2,000 – $3,000", value: "2000-3000" },
  { label: "$3,000 – $5,000", value: "3000-5000" },
  { label: "$5,000+", value: "5000-" },
];

const BED_OPTIONS = [
  { label: "Any Beds", value: "" },
  { label: "Studio", value: "0" },
  { label: "1 Bed", value: "1" },
  { label: "2 Beds", value: "2" },
  { label: "3 Beds", value: "3" },
  { label: "4+ Beds", value: "4" },
];

export default function Home() {
  const { listings, loading, error } = useListings({ limit: 6 });
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [beds, setBeds] = useState("");
  const [priceRange, setPriceRange] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (beds) params.set("bedrooms", beds);
    if (priceRange) params.set("price", priceRange);
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

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center text-white overflow-hidden"
        style={{ minHeight: "520px" }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3 drop-shadow-lg">
            Find Your Perfect Apartment
          </h1>
          <p className="text-white/80 text-lg mb-10">
            Browse 50+ verified listings across California &amp; Florida.
          </p>

          {/* ── Search bar ──────────────────────────────────── */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-2 flex flex-wrap gap-2 items-stretch"
          >
            {/* City / Zip input */}
            <div className="flex items-center flex-1 min-w-[180px] gap-2 px-3 py-2 border border-gray-200 rounded-xl">
              <svg className="text-[#5F6368] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City or zip code"
                className="flex-1 text-[#202124] text-sm placeholder-[#5F6368] focus:outline-none bg-transparent"
              />
            </div>

            {/* Beds dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl min-w-[130px]">
              <svg className="text-[#5F6368] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
              </svg>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="flex-1 text-sm text-[#202124] focus:outline-none bg-transparent cursor-pointer"
              >
                {BED_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Price range dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl min-w-[150px]">
              <svg className="text-[#5F6368] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="flex-1 text-sm text-[#202124] focus:outline-none bg-transparent cursor-pointer"
              >
                {PRICE_RANGES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-2.5 rounded-xl transition-colors duration-150 shadow-sm text-sm whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* Quick browse links */}
          <div className="flex justify-center gap-4 mt-6 flex-wrap text-sm">
            <Link to="/listings/california" className="text-white/80 hover:text-white underline underline-offset-2 transition-colors">
              Browse California →
            </Link>
            <Link to="/listings/florida" className="text-white/80 hover:text-white underline underline-offset-2 transition-colors">
              Browse Florida →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured listings ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#202124]">Featured Listings</h2>
          <Link
            to="/listings"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        <ListingGrid listings={listings} loading={loading} error={error} />

        <div className="text-center mt-10">
          <Link
            to="/listings"
            className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-700 transition-colors duration-150 shadow-sm text-sm"
          >
            View all listings
          </Link>
        </div>
      </section>

      {/* ── Map preview ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-[#202124] mb-6">Explore the Map</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <ListingsMap listings={listings} className="h-[400px]" />
        </div>
      </section>
    </div>
  );
}
