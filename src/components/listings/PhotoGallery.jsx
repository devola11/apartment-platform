// src/components/listings/PhotoGallery.jsx
// ApartmentGuide-style photo gallery with full-screen lightbox carousel.
//
// LAYOUT:
//   Desktop (md+): 70% main image (left) + 30% 2×2 thumbnail grid (right).
//                  Last thumbnail has dark overlay "View All Photos (N)".
//   Mobile:        Single full-width image with "View All Photos" overlay button.
//
// THUMBNAIL STRIP:
//   Horizontal scrollable strip below the gallery showing all images with room labels.
//
// LIGHTBOX:
//   Full-screen carousel with left/right arrows, image counter, room label,
//   keyboard nav (←/→/Esc), and mobile swipe support.

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

// ── Lightbox carousel ─────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, title, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const touchStartX = useRef(null);

  const prev = useCallback(() => setIdx((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setIdx((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  const img = images[idx];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-label="Photo viewer"
      aria-modal="true"
    >
      {/* Top bar: counter + close */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-20">
        <span className="text-white/90 text-sm font-medium">
          {idx + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Left arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
                     bg-white/10 hover:bg-white/25 text-white rounded-full p-2.5
                     transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next photo"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
                     bg-white/10 hover:bg-white/25 text-white rounded-full p-2.5
                     transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Main image + room label */}
      <div
        className="flex flex-col items-center max-w-[92vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diff = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(diff) > 50) {
            if (diff > 0) prev(); else next();
          }
          touchStartX.current = null;
        }}
      >
        <img
          src={img.image_url}
          alt={`${title} - ${img.roomType}`}
          className="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        <p className="text-white/80 text-sm mt-3 font-medium">{img.roomType}</p>
      </div>
    </div>,
    document.body
  );
}

// ── Main gallery component ────────────────────────────────────────────────────
export default function PhotoGallery({ images, title, fallbackUrl }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // If no property_images, show the fallback single-image view
  if (!images || images.length === 0) {
    const src = fallbackUrl || "https://placehold.co/800x450?text=No+Image";
    return (
      <div className="mb-6 md:mb-8 rounded-2xl overflow-hidden">
        <img
          src={src}
          alt={title}
          className="w-full aspect-[4/3] md:aspect-[16/9] md:max-h-[420px] object-cover"
        />
      </div>
    );
  }

  const mainImg = images[0];
  const thumbs = images.slice(1, 5); // Next 4 for the 2×2 grid

  return (
    <>
      {/* ── Gallery grid ──────────────────────────────────────────────── */}
      <div className="mb-2 md:mb-3 rounded-2xl overflow-hidden flex flex-col md:flex-row md:gap-1.5"
           style={{ maxHeight: "420px" }}>

        {/* Main image — full width on mobile, 70% on md+ */}
        <div
          className="relative overflow-hidden w-full md:w-[70%] md:shrink-0 cursor-pointer"
          onClick={() => setLightboxIndex(0)}
        >
          <img
            src={mainImg.image_url}
            alt={`${title} - ${mainImg.roomType}`}
            className="w-full aspect-[4/3] md:aspect-auto md:h-[420px] object-cover
                       hover:scale-[1.02] transition-transform duration-300"
          />
          {/* Mobile "View All Photos" overlay */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(0); }}
            className="md:hidden absolute bottom-3 right-3 text-white text-xs font-semibold
                       bg-black/60 backdrop-blur-sm border border-white/40 px-3 py-2 rounded-lg
                       hover:bg-black/80 transition-colors min-h-[44px]"
          >
            View All Photos ({images.length})
          </button>
        </div>

        {/* 2×2 Thumbnail grid — hidden on mobile, 30% on md+ */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-1.5 md:flex-1">
          {[0, 1, 2, 3].map((i) => {
            const img = thumbs[i];
            if (!img) return <div key={i} className="bg-gray-100" />;

            const isLast = i === 3;
            return (
              <div
                key={img.id}
                className="relative overflow-hidden cursor-pointer group/thumb"
                onClick={() => setLightboxIndex(i + 1)}
              >
                <img
                  src={img.image_url}
                  alt={`${title} - ${img.roomType}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover/thumb:scale-105
                             transition-transform duration-300"
                />
                {isLast && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center
                                  group-hover/thumb:bg-black/60 transition-colors">
                    <span className="text-white text-sm font-semibold bg-black/30 backdrop-blur-sm
                                     border border-white/40 px-4 py-2 rounded-lg">
                      View All Photos ({images.length})
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Thumbnail strip — horizontal scroll, all images with room labels ── */}
      <div className="mb-6 md:mb-8 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={`shrink-0 flex flex-col items-center gap-1 group
                          ${lightboxIndex === i ? "ring-2 ring-[#1A73E8] rounded-lg" : ""}`}
            >
              <img
                src={img.image_url}
                alt={`${title} - ${img.roomType}`}
                loading="lazy"
                className="w-20 h-14 sm:w-24 sm:h-16 object-cover rounded-lg
                           group-hover:ring-2 group-hover:ring-[#1A73E8] transition-all"
              />
              <span className="text-[10px] sm:text-xs text-[#5F6368] font-medium leading-tight">
                {img.roomType}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightboxIndex >= 0 && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </>
  );
}
