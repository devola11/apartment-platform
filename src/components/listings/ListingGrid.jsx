// src/components/listings/ListingGrid.jsx
// Renders a responsive grid of ListingCards, or appropriate
// loading / empty states.
import ListingCard from "./ListingCard";

export default function ListingGrid({ listings, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skeleton cards while loading */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p className="text-xl font-semibold">Something went wrong</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl font-semibold">No listings found</p>
        <p className="text-sm mt-2">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
