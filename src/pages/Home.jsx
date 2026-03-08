// src/pages/Home.jsx
// Hero section + featured listings + map preview
import { Link } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingsMap from "../components/maps/ListingsMap";

export default function Home() {
  // Fetch 6 featured listings for the home page
  const { listings, loading, error } = useListings({ limit: 6 });

  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Find Your Next Home in<br />
            <span className="text-brand-100">California & Florida</span>
          </h1>
          <p className="text-brand-200 text-lg mb-8">
            Browse 50+ verified apartment listings. Filter by city, price, and size.
          </p>

          {/* Quick-browse buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/listings/california"
              className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Browse California
            </Link>
            <Link
              to="/listings/florida"
              className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Browse Florida
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured listings ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Listings</h2>
        <ListingGrid listings={listings} loading={loading} error={error} />

        <div className="text-center mt-10">
          <Link
            to="/listings"
            className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors"
          >
            View all listings →
          </Link>
        </div>
      </section>

      {/* ── Map preview ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore the Map</h2>
        <ListingsMap listings={listings} className="h-[400px]" />
      </section>
    </div>
  );
}
