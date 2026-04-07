// src/components/listings/NeighborhoodInfo.jsx
// Neighborhood section for the listing detail page — walk score, schools, transit, dining.

import { getNeighborhoodData, getWalkScoreColor } from "../../lib/neighborhoodData";

function GradCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  );
}
function TrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );
}
function UtensilsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>
  );
}

export default function NeighborhoodInfo({ city }) {
  const data = getNeighborhoodData(city);
  const colors = getWalkScoreColor(data.walkScore);

  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-[#202124] mb-4">Neighborhood</h2>

      <div className="bg-white border border-[#E0E0E0] rounded-xl p-5">
        {/* Walk Score */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#E0E0E0]">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: colors.bg, border: `3px solid ${colors.ring}` }}
          >
            <span className="text-xl font-extrabold" style={{ color: colors.text }}>
              {data.walkScore}
            </span>
          </div>
          <div>
            <p className="font-bold text-[#202124] text-sm">Walk Score</p>
            <p className="text-sm text-[#5F6368]">{data.walkLabel}</p>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Schools */}
          <div>
            <div className="flex items-center gap-2 text-[#1A73E8] mb-2">
              <GradCapIcon />
              <p className="font-semibold text-sm text-[#202124]">Schools</p>
            </div>
            <ul className="space-y-1">
              {data.schools.map((s) => (
                <li key={s} className="text-xs text-[#5F6368] leading-relaxed">{s}</li>
              ))}
            </ul>
          </div>

          {/* Transit */}
          <div>
            <div className="flex items-center gap-2 text-[#1A73E8] mb-2">
              <TrainIcon />
              <p className="font-semibold text-sm text-[#202124]">Transit</p>
            </div>
            <ul className="space-y-1">
              {data.transit.map((t) => (
                <li key={t} className="text-xs text-[#5F6368] leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>

          {/* Dining */}
          <div>
            <div className="flex items-center gap-2 text-[#1A73E8] mb-2">
              <UtensilsIcon />
              <p className="font-semibold text-sm text-[#202124]">Dining</p>
            </div>
            <ul className="space-y-1">
              {data.dining.map((d) => (
                <li key={d} className="text-xs text-[#5F6368] leading-relaxed">{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
