// src/context/ToastContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Lightweight toast notification system.
//
// Usage:
//   const { showToast } = useToast();
//   showToast("Thank you! We'll get back to you within 24 hours.");
//
// Design:
//   • Fixed top-center position, z-[99999] — above every modal and Leaflet map.
//   • Green background (bg-green-600) with white text.
//   • Single self-contained `toastShow` animation (tailwind.config.js):
//       0%  → slides down from above, opacity 0
//       8%  → settled in place, opacity 1
//       78% → still visible
//       100%→ opacity 0 (smooth fade-out)
//     Animation duration = 5 s, fill-mode = both (invisible before start,
//     stays invisible after end while React unmounts the element).
//   • JS timer fires at 5 s to remove the element from the DOM; it's already
//     invisible by then so there's no visual pop.
//   • `key={toast.id}` forces a remount (restarting the animation) when
//     showToast() is called while a previous toast is still on screen.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // { message, id } | null

  const showToast = useCallback((message) => {
    const id = crypto.randomUUID();
    setToast({ message, id });
    // Remove from DOM after the full 5 s animation completes.
    // The element is already opacity-0 at this point (animation fill forwards).
    setTimeout(() => {
      setToast((t) => (t?.id === id ? null : t));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          // left-1/2 positions the left edge at 50 % of the viewport.
          // The keyframe handles translateX(-50 %) to truly centre the element,
          // keeping the transform stable throughout the slide-in and fade-out.
          className="fixed top-6 left-1/2 z-[99999]
                     bg-green-600 text-white text-sm font-semibold
                     px-5 py-3 rounded-xl shadow-xl
                     animate-toastShow whitespace-nowrap
                     pointer-events-none"
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
