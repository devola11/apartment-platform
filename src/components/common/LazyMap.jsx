// src/components/common/LazyMap.jsx
// Lazy-loads ListingsMap only when scrolled into view.
// Saves ~45KB (Leaflet vendor chunk) from the critical rendering path.

import { useState, useRef, useEffect, lazy, Suspense } from "react";

const ListingsMap = lazy(() => import("../maps/ListingsMap"));

export default function LazyMap({ listings, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <Suspense
          fallback={
            <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
              <span className="text-sm text-[#5F6368]">Loading map...</span>
            </div>
          }
        >
          <ListingsMap listings={listings} className="h-full w-full" />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-gray-100 rounded-xl" />
      )}
    </div>
  );
}
