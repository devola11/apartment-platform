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

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center text-white overflow-hidden"
        style={{ minHeight: "520px" }}
      >
        {/* Background image — bright, modern apartment building */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Light overlay — just enough to make white text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />

        {/* Hero content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-10 drop-shadow-md">
            Find the Perfect Apartment.
          </h1>

          {/* ── Pill search bar ──────────────────────────────── */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-full shadow-xl flex items-center overflow-hidden"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, Neighborhood, or ZIP"
              className="flex-1 w-3/4 text-[#202124] text-sm placeholder-[#5F6368] focus:outline-none px-6 py-4 bg-transparent"
            />
            <button
              type="submit"
              className="rounded-full text-white font-semibold px-7 py-3 mr-1 text-sm whitespace-nowrap transition-colors duration-150"
              style={{ backgroundColor: "#1A73E8" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1669D3")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A73E8")}
            >
              Search
            </button>
          </form>
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
