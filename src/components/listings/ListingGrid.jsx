// src/components/listings/ListingGrid.jsx
import ListingCard from "./ListingCard";

function EmptyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      className="text-gray-300 mx-auto mb-4">
      <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" className="text-red-300 mx-auto mb-4">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function ListingGrid({ listings, loading, error, emptyMessage }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="text-center py-20">
        <ErrorIcon />
        <p className="text-lg font-semibold text-[#202124]">Something went wrong</p>
        <p className="text-sm text-[#5F6368] mt-2">
          We couldn't load listings right now. Please refresh and try again.
        </p>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="text-center py-20">
        <EmptyIcon />
        <p className="text-lg font-semibold text-[#202124]">No apartments found</p>
        <p className="text-sm text-[#5F6368] mt-2">
          {emptyMessage || "Try adjusting your filters or search in a different city."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
