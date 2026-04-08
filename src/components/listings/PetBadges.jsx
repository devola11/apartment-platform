// src/components/listings/PetBadges.jsx
// Shows "Dogs OK" + "Cats OK" green badges or "No Pets" gray badge.

function DogIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4c-1 0-2 .5-2.84 1H14c-.55 0-1 .45-1 1v2c0 .55.22 1.05.59 1.41L14 10v5.17C13.4 15.06 12.72 15 12 15s-1.4.06-2 .17V10l.41-.59C10.78 9.05 11 8.55 11 8V6c0-.55-.45-1-1-1H8.84C8 4.5 7 4 6 4 4.34 4 3 5.34 3 7c0 1.1.6 2.05 1.48 2.58C4.18 10.36 4 11.16 4 12c0 4.41 3.59 8 8 8s8-3.59 8-8c0-.84-.18-1.64-.48-2.42C20.4 9.05 21 8.1 21 7c0-1.66-1.34-3-3-3z"/>
    </svg>
  );
}
function CatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1 6.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.96.17-1.88.48-2.73L7.6 11.4c.22.22.5.33.78.33.13 0 .26-.02.39-.08.32-.14.53-.44.55-.8L9.63 7.2l1.42-.57c.28-.11.49-.35.57-.63.08-.29.03-.59-.14-.83L10.2 3.46C10.78 3.16 11.37 3 12 3c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
    </svg>
  );
}
function NoPetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1-5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.5 1.5c-2.33 0-7 1.17-7 3.5V18h14v-2c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  );
}

export function isPetFriendly(amenities) {
  if (!amenities) return false;
  return amenities.some((a) => a.toLowerCase().includes("pet"));
}

// Compact badges for cards
export function PetBadgesSmall({ amenities }) {
  const petOk = isPetFriendly(amenities);

  if (petOk) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold
                         bg-emerald-50 text-emerald-700 border border-emerald-200
                         px-1.5 py-0.5 rounded-full">
          <DogIcon /> Dogs OK
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold
                         bg-emerald-50 text-emerald-700 border border-emerald-200
                         px-1.5 py-0.5 rounded-full">
          <CatIcon /> Cats OK
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold
                     bg-gray-200 text-gray-700 border border-gray-300
                     px-1.5 py-0.5 rounded-full">
      <NoPetIcon /> No Pets
    </span>
  );
}

// Prominent display for detail page
export function PetPolicySection({ amenities }) {
  const petOk = isPetFriendly(amenities);

  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-[#202124] mb-3">Pet Policy</h2>
      <div className="bg-white border border-[#E0E0E0] rounded-xl p-4">
        {petOk ? (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200
                            rounded-lg px-4 py-2.5">
              <span className="text-emerald-600"><DogIcon /></span>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Dogs Welcome</p>
                <p className="text-xs text-emerald-600">Breed restrictions may apply</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200
                            rounded-lg px-4 py-2.5">
              <span className="text-emerald-600"><CatIcon /></span>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Cats Welcome</p>
                <p className="text-xs text-emerald-600">Pet deposit may be required</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <NoPetIcon />
            <p className="text-sm text-[#5F6368]">This property does not allow pets.</p>
          </div>
        )}
      </div>
    </section>
  );
}
