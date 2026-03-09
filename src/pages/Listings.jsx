// src/pages/Listings.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingRow from "../components/listings/ListingRow";
import ListingsMap from "../components/maps/ListingsMap";
import FilterBar from "../components/filters/FilterBar";
import SEO from "../components/common/SEO";

const ITEMS_PER_PAGE = 10;

const SEO_CONFIG = {
  California: {
    title: "Apartments for Rent in California",
    description: "Find apartments for rent across California — Los Angeles, San Francisco, San Diego, and more.",
    canonical: "/listings/california",
  },
  Florida: {
    title: "Apartments for Rent in Florida",
    description: "Find apartments for rent across Florida — Miami, Orlando, Tampa, and more.",
    canonical: "/listings/florida",
  },
  default: {
    title: "All Apartments for Rent",
    description: "Browse all verified apartment listings across California and Florida.",
    canonical: "/listings",
  },
};

export default function Listings({ stateFilter }) {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    city:        searchParams.get("q") || "",
    bedrooms:    searchParams.get("bedrooms") || "",
    bathrooms:   "",
    minPrice:    "",
    maxPrice:    "",
    petFriendly: false,
  });
  const [sort, setSort]         = useState("newest");
  const [page, setPage]         = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  // Reset to page 1 when filters or sort change
  useEffect(() => { setPage(1); }, [filters, sort, stateFilter]);

  const { listings, loading } = useListings({
    state:     stateFilter || undefined,
    city:      filters.city,
    minPrice:  filters.minPrice,
    maxPrice:  filters.maxPrice,
    bedrooms:  filters.bedrooms,
    bathrooms: filters.bathrooms,
    sort,
  });

  // Client-side pet-friendly filter
  const filtered = useMemo(() => {
    if (!filters.petFriendly) return listings;
    return listings.filter(l =>
      l.amenities?.some(a => a.toLowerCase().includes("pet"))
    );
  }, [listings, filters.petFriendly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedListings = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const seo = SEO_CONFIG[stateFilter] || SEO_CONFIG.default;
  const locationLabel = stateFilter || "California & Florida";
  const countLabel = loading ? "Loading…" : `${filtered.length} Apartment${filtered.length !== 1 ? "s" : ""} for Rent in ${locationLabel}`;

  function handleFilter(f) {
    setFilters(f);
  }

  function goPage(p) {
    setPage(p);
  }

  // Pagination helper: generate page numbers with ellipsis
  function pageNumbers() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <>
      <SEO title={seo.title} description={seo.description} canonical={seo.canonical} />

      <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
        {/* ── Left: scrollable ──────────────────────────── */}
        <div className="overflow-y-auto flex-1 border-r border-[#E0E0E0]" style={{ minWidth: 0 }}>

          {/* Sticky inner header */}
          <div className="sticky top-0 z-10 bg-white border-b border-[#E0E0E0]">
            {/* Top bar */}
            <div className="px-5 py-3 flex items-center justify-between gap-4 border-b border-[#E0E0E0]">
              <p className="font-semibold text-[#202124] text-sm">
                {countLabel}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-xs text-[#5F6368]">Sort:</label>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-sm border border-[#E0E0E0] rounded-lg px-3 py-1.5 text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white"
                >
                  <option value="newest">Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            {/* Filter bar */}
            <div className="px-5 py-3 bg-[#F8F9FA]">
              <FilterBar onFilter={handleFilter} stateFilter={stateFilter} />
            </div>
          </div>

          {/* Listing rows */}
          <div className="px-5 py-4 space-y-3">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex bg-white rounded-xl border border-[#E0E0E0] overflow-hidden h-40 animate-pulse">
                  <div className="w-48 shrink-0 bg-gray-200" />
                  <div className="flex-1 p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : pagedListings.length === 0 ? (
              <div className="text-center py-20 text-[#5F6368]">
                <p className="text-xl font-semibold">No listings found</p>
                <p className="text-sm mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              pagedListings.map(l => (
                <ListingRow
                  key={l.id}
                  listing={l}
                  isActive={hoveredId === l.id}
                  onMouseEnter={() => setHoveredId(l.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="px-5 pb-8 flex justify-center items-center gap-1 flex-wrap">
              <button
                onClick={() => goPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-[#E0E0E0] text-[#202124] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              {pageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-[#5F6368]">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goPage(p)}
                    className={`w-9 h-9 text-sm rounded-lg border font-medium transition-colors ${
                      p === currentPage
                        ? "bg-[#1A73E8] text-white border-[#1A73E8]"
                        : "border-[#E0E0E0] text-[#202124] hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-[#E0E0E0] text-[#202124] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* ── Right: sticky map ─────────────────────────── */}
        <div style={{ width: "45%", flexShrink: 0 }}>
          <ListingsMap
            listings={filtered}
            hoveredId={hoveredId}
            className="h-full rounded-none"
          />
        </div>
      </div>
    </>
  );
}
