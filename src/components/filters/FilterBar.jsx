// src/components/filters/FilterBar.jsx
// ------------------------------------------------------------------
// A controlled form that emits a `filters` object whenever the user
// changes any input. The parent page passes `onFilter` as a prop
// and stores the resulting filter state.
// ------------------------------------------------------------------
import { useState } from "react";

const CA_CITIES = ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "Fresno"];
const FL_CITIES = ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "St. Petersburg"];

export default function FilterBar({ onFilter, stateFilter }) {
  const [form, setForm] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  function handleChange(e) {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    // Emit immediately on every change so results update in real time
    onFilter(updated);
  }

  function handleReset() {
    const cleared = { city: "", minPrice: "", maxPrice: "", bedrooms: "" };
    setForm(cleared);
    onFilter(cleared);
  }

  const cities = stateFilter === "California" ? CA_CITIES
    : stateFilter === "Florida" ? FL_CITIES
    : [...CA_CITIES, ...FL_CITIES];

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-wrap gap-4 items-end">
      {/* City */}
      <div className="flex flex-col gap-1 min-w-[150px]">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">City</label>
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Min price */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Min $</label>
        <input
          type="number"
          name="minPrice"
          value={form.minPrice}
          onChange={handleChange}
          placeholder="0"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Max price */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Max $</label>
        <input
          type="number"
          name="maxPrice"
          value={form.maxPrice}
          onChange={handleChange}
          placeholder="10000"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Bedrooms */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Beds</label>
        <select
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} bed{n > 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="text-sm text-gray-500 hover:text-brand-600 underline self-end pb-2"
      >
        Reset
      </button>
    </div>
  );
}
