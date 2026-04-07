// src/components/listings/RecentlyViewed.jsx
// Horizontal scroll of recently viewed listing cards.
// Used on Home page (full row) and ListingDetail sidebar (compact).

import { Link } from "react-router-dom";
import { getRecentlyViewed } from "../../lib/recentlyViewed";
import { useState, useEffect } from "react";

function SmallCard({ item }) {
  const bedsLabel = item.bedrooms === 0 ? "Studio" : item.bedrooms != null ? `${item.bedrooms} Bed` : null;

  return (
    <Link
      to={`/listings/${item.id}`}
      className="shrink-0 w-44 sm:w-48 bg-white rounded-lg border border-[#E0E0E0]
                 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <img
        src={item.image_url || "https://placehold.co/200x130?text=No+Image"}
        alt={item.title}
        loading="lazy"
        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-2.5">
        <p className="text-sm font-bold text-[#202124] truncate">${item.price?.toLocaleString()}</p>
        <p className="text-xs text-[#5F6368] truncate">{item.title}</p>
        <p className="text-xs text-[#5F6368]">
          {bedsLabel && <>{bedsLabel} · </>}{item.city}, {item.state}
        </p>
      </div>
    </Link>
  );
}

// Full-width horizontal scroll — for Home page
export function RecentlyViewedRow() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-10">
      <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-4">Recently Viewed</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map((item) => (
          <SmallCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

// Compact sidebar version — for ListingDetail right column
export function RecentlyViewedSidebar({ excludeId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const all = getRecentlyViewed().filter((l) => l.id !== excludeId);
    setItems(all.slice(0, 3));
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <div className="mt-5 pt-5 border-t border-[#E0E0E0]">
      <p className="font-semibold text-sm text-[#202124] mb-3">You Recently Viewed</p>
      <div className="space-y-2.5">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/listings/${item.id}`}
            className="flex gap-2.5 group"
          >
            <img
              src={item.image_url || "https://placehold.co/60x45?text=No+Image"}
              alt={item.title}
              loading="lazy"
              className="w-14 h-10 object-cover rounded shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#202124] truncate group-hover:text-[#1A73E8] transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-[#5F6368]">${item.price?.toLocaleString()}/mo</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
