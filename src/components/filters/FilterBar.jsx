// src/components/filters/FilterBar.jsx
import { useState } from "react";

const PRICE_RANGES = [
  { label: "Any Price",       min: "",     max: ""     },
  { label: "Under $1,500",   min: "",     max: "1500" },
  { label: "$1,500–$2,000",  min: "1500", max: "2000" },
  { label: "$2,000–$3,000",  min: "2000", max: "3000" },
  { label: "$3,000–$5,000",  min: "3000", max: "5000" },
  { label: "$5,000+",        min: "5000", max: ""     },
];

const PROPERTY_TYPES = ["Apartment", "Condo", "House", "Townhouse"];

const inputCls = "border border-[#E0E0E0] rounded-lg px-3 py-2 text-sm text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white";

export default function FilterBar({ onFilter, stateFilter }) {
  const [city, setCity]           = useState("");
  const [bedrooms, setBedrooms]   = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceKey, setPriceKey]   = useState("0"); // index into PRICE_RANGES
  const [petFriendly, setPetFriendly] = useState(false);
  const [propTypes, setPropTypes] = useState([]);

  function emit(overrides = {}) {
    const pr = PRICE_RANGES[Number(overrides.priceKey ?? priceKey)];
    onFilter({
      city:       overrides.city       ?? city,
      bedrooms:   overrides.bedrooms   ?? bedrooms,
      bathrooms:  overrides.bathrooms  ?? bathrooms,
      minPrice:   pr.min,
      maxPrice:   pr.max,
      petFriendly: overrides.petFriendly ?? petFriendly,
    });
  }

  function handleCity(v)       { setCity(v);       emit({ city: v }); }
  function handleBeds(v)       { setBedrooms(v);   emit({ bedrooms: v }); }
  function handleBaths(v)      { setBathrooms(v);  emit({ bathrooms: v }); }
  function handlePrice(idx)    { setPriceKey(idx); emit({ priceKey: idx }); }
  function handlePet(v)        { setPetFriendly(v); emit({ petFriendly: v }); }

  function handleReset() {
    setCity(""); setBedrooms(""); setBathrooms("");
    setPriceKey("0"); setPetFriendly(false); setPropTypes([]);
    onFilter({ city: "", bedrooms: "", bathrooms: "", minPrice: "", maxPrice: "", petFriendly: false });
  }

  function togglePropType(t) {
    setPropTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
    // property_type column does not exist in DB — visual filter only
  }

  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* City / Zip */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">City or Zip</label>
        <input
          type="text"
          value={city}
          onChange={e => handleCity(e.target.value)}
          placeholder="e.g. Miami"
          className={`${inputCls} w-36`}
        />
      </div>

      {/* Beds */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Beds</label>
        <select value={bedrooms} onChange={e => handleBeds(e.target.value)} className={inputCls}>
          <option value="">Any</option>
          <option value="0">Studio</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
      </div>

      {/* Baths */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Baths</label>
        <select value={bathrooms} onChange={e => handleBaths(e.target.value)} className={inputCls}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Price Range</label>
        <select value={priceKey} onChange={e => handlePrice(e.target.value)} className={`${inputCls} w-44`}>
          {PRICE_RANGES.map((r, i) => (
            <option key={i} value={i}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Property Type (visual only — no DB column) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Type</label>
        <div className="flex gap-2 flex-wrap">
          {PROPERTY_TYPES.map(t => (
            <label key={t} className="flex items-center gap-1 text-sm text-[#202124] cursor-pointer">
              <input
                type="checkbox"
                checked={propTypes.includes(t)}
                onChange={() => togglePropType(t)}
                className="accent-[#1A73E8]"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      {/* Pet Friendly */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Pet Friendly</label>
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => handlePet(!petFriendly)}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${petFriendly ? "bg-[#1A73E8]" : "bg-gray-300"}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${petFriendly ? "translate-x-5" : ""}`} />
          </div>
          <span className="text-sm text-[#202124]">{petFriendly ? "Yes" : "Any"}</span>
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="text-sm text-[#5F6368] hover:text-[#1A73E8] underline self-end pb-2 ml-2"
      >
        Reset
      </button>
    </div>
  );
}
