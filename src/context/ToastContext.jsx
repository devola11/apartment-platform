// src/context/ToastContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Lightweight toast notification system.
//
// Wrap your app in <ToastProvider> (done in main.jsx) then call:
//   const { showToast } = useToast();
//   showToast("Your message here");
//
// The toast renders at z-[99999] — above every modal and the Leaflet map.
// It uses the `slideUp` keyframe defined in tailwind.config.js.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  // Each toast has a unique id so the key prop forces a re-mount (re-animates)
  // if showToast is called while a previous one is still visible.
  const [toast, setToast] = useState(null); // { message, id } | null

  const showToast = useCallback((message, duration = 4000) => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => {
      // Only clear this specific toast; a newer one may have replaced it.
      setToast((t) => (t?.id === id ? null : t));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Fixed toast — mounted outside all modals so it survives modal unmounts */}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999]
                     bg-[#202124] text-white text-sm font-medium px-5 py-3
                     rounded-xl shadow-xl animate-slideUp whitespace-nowrap
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
