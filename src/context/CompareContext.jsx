// src/context/CompareContext.jsx
// Stores up to 3 listings for side-by-side comparison.
// State lives in React — no database needed. Persists across pages
// because the provider wraps the entire app in App.jsx.

import { createContext, useContext, useState, useCallback } from "react";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compared, setCompared] = useState([]);

  const isCompared = useCallback(
    (id) => compared.some((l) => l.id === id),
    [compared]
  );

  const toggleCompare = useCallback((listing) => {
    setCompared((prev) => {
      if (prev.some((l) => l.id === listing.id)) {
        return prev.filter((l) => l.id !== listing.id);
      }
      if (prev.length >= 3) return prev; // max 3
      return [...prev, listing];
    });
  }, []);

  const removeCompare = useCallback((id) => {
    setCompared((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCompare = useCallback(() => setCompared([]), []);

  return (
    <CompareContext.Provider
      value={{ compared, isCompared, toggleCompare, removeCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
