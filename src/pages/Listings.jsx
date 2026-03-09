// src/pages/Listings.jsx
// All listings with live filtering. The stateFilter prop is passed
// from the route (see App.jsx) for the California/Florida sub-routes.
import { useState } from "react";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingsMap from "../components/maps/ListingsMap";
import FilterBar from "../components/filters/FilterBar";
import SEO from "../components/common/SEO";

const SEO_MAP = {
  California: {
    title: "Apartments for Rent in California",
    description:
      "Find apartments for rent across California — Los Angeles, San Francisco, San Diego, and more. Filter by price and bedrooms on AptGuide.",
    canonical: "/listings/california",
  },
  Florida: {
    title: "Apartments for Rent in Florida",
    description:
      "Find apartments for rent across Florida — Miami, Orlando, Tampa, and more. Filter by price and bedrooms on AptGuide.",
    canonical: "/listings/florida",
  },
  default: {
    title: "All Apartments for Rent",
    description:
      "Browse all verified apartment listings across California and Florida. Filter by state, city, price, and bedrooms on AptGuide.",
    canonical: "/listings",
  },
};

export default function Listings({ stateFilter }) {
  const [filters, setFilters] = useState({});

  const { listings, loading, error } = useListings({
    state: stateFilter || filters.state,
    city: filters.city,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    bedrooms: filters.bedrooms,
  });

  const title = stateFilter
    ? `${stateFilter} Apartments`
    : "All Apartments";

  const seo = SEO_MAP[stateFilter] || SEO_MAP.default;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
      />

      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">
          {loading ? "Loading…" : `${listings.length} listing${listings.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Filter bar */}
      <div className="mb-8">
        <FilterBar onFilter={setFilters} stateFilter={stateFilter} />
      </div>

      {/* Map */}
      <div className="mb-10">
        <ListingsMap listings={listings} className="h-[320px]" />
      </div>

      {/* Grid */}
      <ListingGrid listings={listings} loading={loading} error={error} />
    </div>
  );
}
