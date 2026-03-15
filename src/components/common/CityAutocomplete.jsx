// src/components/common/CityAutocomplete.jsx
// Reusable city search input with a suggestion dropdown.
//
// Props:
//   value           - controlled input value (string)
//   onChange        - called with the new string on every keystroke or selection
//   placeholder     - input placeholder text
//   wrapperClassName - classes applied to the outer <div> (e.g. sizing, flex-1)
//   inputClassName   - classes applied to the <input> itself (styling only)
//
// Behaviour:
//   - Filters CITIES by city or state substring match (case-insensitive)
//   - Shows max 5 suggestions in a dropdown below the input
//   - Dropdown shows "City, State" - clicking fills input with just the city name
//   - Escape or click-outside closes the dropdown
//   - onMouseDown + e.preventDefault() on each suggestion prevents the input's
//     onBlur from firing before the click registers (a common focus-race pitfall)

import { useState, useRef, useEffect } from "react";

const CITIES = [
  { city: "Los Angeles",     state: "California" },
  { city: "San Francisco",   state: "California" },
  { city: "San Diego",       state: "California" },
  { city: "Sacramento",      state: "California" },
  { city: "Oakland",         state: "California" },
  { city: "Fresno",          state: "California" },
  { city: "Irvine",          state: "California" },
  { city: "Santa Monica",    state: "California" },
  { city: "Long Beach",      state: "California" },
  { city: "Pasadena",        state: "California" },
  { city: "Anaheim",         state: "California" },
  { city: "Beverly Hills",   state: "California" },
  { city: "Miami",           state: "Florida"    },
  { city: "Orlando",         state: "Florida"    },
  { city: "Tampa",           state: "Florida"    },
  { city: "Jacksonville",    state: "Florida"    },
  { city: "Fort Lauderdale", state: "Florida"    },
  { city: "St. Petersburg",  state: "Florida"    },
  { city: "Boca Raton",      state: "Florida"    },
  { city: "Clearwater",      state: "Florida"    },
  { city: "Gainesville",     state: "Florida"    },
  { city: "Sarasota",        state: "Florida"    },
];

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#9AA0A6]">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  );
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder,
  wrapperClassName = "",
  inputClassName = "",
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen]               = useState(false);
  const wrapRef = useRef(null);

  // Close when the user clicks anywhere outside this component
  useEffect(() => {
    function onMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function handleChange(v) {
    onChange(v);
    const trimmed = v.trim();
    if (!trimmed) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const lower   = trimmed.toLowerCase();
    const matches = CITIES.filter(
      ({ city, state }) =>
        city.toLowerCase().includes(lower) ||
        state.toLowerCase().includes(lower)
    ).slice(0, 5);
    setSuggestions(matches);
    setOpen(matches.length > 0);
  }

  function handleSelect({ city }) {
    onChange(city);
    setSuggestions([]);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div ref={wrapRef} className={`relative ${wrapperClassName}`}>
      <input
        type="text"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className={inputClassName}
      />

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200
                     rounded-xl shadow-lg z-[150] overflow-hidden py-1"
        >
          {suggestions.map(({ city, state }) => (
            <li
              key={`${city}-${state}`}
              role="option"
              // onMouseDown + preventDefault keeps input focused while registering the click
              onMouseDown={e => { e.preventDefault(); handleSelect({ city }); }}
              className="flex items-center gap-2.5 px-4 py-3 text-sm min-h-[44px]
                         text-[#202124] cursor-pointer
                         hover:bg-blue-50 hover:text-[#1A73E8]
                         transition-colors duration-100"
            >
              <PinIcon />
              <span>
                <span className="font-medium">{city}</span>
                <span className="text-[#5F6368]">, {state}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
