// src/pages/Listings.jsx
// All listings with live filtering. The stateFilter prop is passed
// from the route (see App.jsx) for the California/Florida sub-routes.
import { useState } from "react";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingsMap from "../components/maps/ListingsMap";
import FilterBar from "../components/filters/FilterBar";

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
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
