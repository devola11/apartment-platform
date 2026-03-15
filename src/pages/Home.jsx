// src/pages/Home.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingsMap from "../components/maps/ListingsMap";
import SEO from "../components/common/SEO";
import CityAutocomplete from "../components/common/CityAutocomplete";

const CITIES = [
  { name: "Los Angeles",   state: "California", count: 12, img: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=600&q=70" },
  { name: "Miami",         state: "Florida",    count: 10, img: "https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?auto=format&fit=crop&w=600&q=70" },
  { name: "San Francisco", state: "California", count: 8,  img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=70" },
  { name: "Tampa",         state: "Florida",    count: 7,  img: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=600&q=70" },
  { name: "San Diego",     state: "California", count: 8,  img: "https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=600&q=70" },
  { name: "Orlando",       state: "Florida",    count: 6,  img: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=600&q=70" },
];

const HOW_IT_WORKS = [
  {
    title: "Search",
    desc: "Find apartments by city, price, and amenities",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Compare",
    desc: "View photos, floor plans, and details side by side",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Connect",
    desc: "Contact landlords directly and schedule tours",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

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
      <section
        className="relative flex items-center justify-center text-white
                   min-h-[380px] md:min-h-[540px]"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')",
          }}
          role="img"
          aria-label="Modern apartment building exterior"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/25" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-xl mx-auto text-center px-4 py-10 md:py-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 md:mb-8 drop-shadow-lg">
            Find the Perfect Apartment.
          </h1>

          {/*
            DESKTOP (sm+): one unified white pill - input flex-1, button compact inside on the right.
            MOBILE: two separate elements stacked - input is its own white rounded-xl card,
                    button is full-width below it.
          */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2.5
                       sm:flex-row sm:items-center sm:gap-0
                       sm:bg-white sm:rounded-full sm:shadow-xl sm:p-1.5"
          >
            <CityAutocomplete
              value={query}
              onChange={setQuery}
              placeholder="City, neighborhood, or ZIP"
              wrapperClassName="sm:flex-1"
              inputClassName="w-full text-[#202124] text-base placeholder-[#9AA0A6]
                              focus:outline-none
                              bg-white rounded-xl px-4 py-3 shadow-lg
                              sm:bg-transparent sm:rounded-none sm:px-5 sm:py-2.5 sm:shadow-none"
            />
            <button
              type="submit"
              className="w-full bg-[#1A73E8] hover:bg-[#1669D3] text-white font-semibold
                         rounded-full py-3 text-base
                         transition-colors duration-150 min-h-[44px]
                         sm:w-auto sm:shrink-0 sm:py-2.5 sm:px-7 sm:text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 sm:gap-8 text-xs text-[#5F6368] flex-wrap">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#1A73E8">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            50+ Verified Listings
          </span>
          <span className="text-gray-300 hidden sm:block">|</span>
          <span>California &amp; Florida</span>
          <span className="text-gray-300 hidden sm:block">|</span>
          <span>Updated Daily</span>
        </div>
      </div>

      {/* ── Popular Cities ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-4 md:pt-14 md:pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124]">Popular Cities</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CITIES.map(({ name, state, count, img }) => (
            <Link
              key={name}
              to={`/listings?q=${encodeURIComponent(name)}`}
              className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-200
                         hover:shadow-md transition-shadow duration-200 aspect-[4/3]"
            >
              <img
                src={img}
                alt={`${name} apartments`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{name}</p>
                <p className="text-white/80 text-xs">{state}</p>
                <p className="text-white/70 text-xs">{count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured listings ──────────────────────────────────────────── */}
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
        <ListingGrid listings={listings} loading={loading} error={error} />

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/listings"
            className="inline-flex items-center justify-center bg-brand-600 text-white font-semibold
                       px-8 py-3 rounded-full hover:bg-brand-700
                       transition-colors duration-150 shadow-sm text-sm min-h-[44px]"
          >
            View all listings
          </Link>
        </div>
      </section>

      {/* ── Renting Made Easy ──────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124] text-center mb-10">
            Renting Made Easy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ title, desc, icon }) => (
              <div key={title} className="flex flex-col items-center text-center p-6
                                          bg-[#F8F9FA] rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center
                                text-[#1A73E8] mb-4">
                  {icon}
                </div>
                <p className="font-bold text-[#202124] text-base mb-2">{title}</p>
                <p className="text-sm text-[#5F6368] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map preview ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-6">Explore the Map</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <ListingsMap listings={listings} className="h-[260px] md:h-[400px]" />
        </div>
      </section>
    </div>
  );
}
