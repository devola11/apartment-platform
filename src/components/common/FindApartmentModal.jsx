// src/components/common/FindApartmentModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// "Tell Us What You're Looking For" popup form.
//
// Triggered from the "Can't Find What You're Looking For?" CTA on Listings
// and the "Email Us" button on Home. Collects structured apartment-search
// preferences and submits them to the `inquiries` table as a formatted message.
//
// MODAL SHELL is identical to SendMessageModal:
//  • Fixed full-viewport overlay with bg-black/50
//  • White rounded card, max-w-lg, max-h-90vh with overflow-y-auto
//  • Sticky header with X button
//  • Close on: X click, click-outside overlay, Escape key
//  • Body scroll locked while open
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

// ── Icon helpers ─────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── City options ─────────────────────────────────────────────────────────────
// Grouped by state so the <select> uses <optgroup> for clarity.

const CA_CITIES = [
  "Los Angeles",
  "San Francisco",
  "San Diego",
  "Sacramento",
  "Oakland",
  "San Jose",
  "Fresno",
  "Long Beach",
  "Anaheim",
  "Bakersfield",
];

const FL_CITIES = [
  "Miami",
  "Orlando",
  "Tampa",
  "Jacksonville",
  "Fort Lauderdale",
  "St. Petersburg",
  "Tallahassee",
  "Cape Coral",
  "Hialeah",
  "Fort Myers",
];

// ── Shared input class (mirrors SendMessageModal for visual consistency) ─────
const inputCls =
  "w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm text-[#202124] " +
  "placeholder-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white";

// ── Default message pre-fill ──────────────────────────────────────────────────
const DEFAULT_MESSAGE =
  "Hi, I'm looking for an apartment and would love some help finding the right match.";

// ── Component ─────────────────────────────────────────────────────────────────

export default function FindApartmentModal({ isOpen, onClose }) {
  const { user } = useAuth();

  // Form state — all fields reset when modal opens (see useEffect below)
  const [form, setForm] = useState({
    fullName:   "",
    email:      "",
    phone:      "",
    city:       "",
    bedrooms:   "",
    budget:     "",
    moveIn:     "",
    message:    DEFAULT_MESSAGE,
  });

  const [sent,        setSent]        = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Used for click-outside detection — only close when clicking the dark
  // backdrop itself, not the white card inside it.
  const overlayRef = useRef(null);

  // ── Reset & pre-fill when modal opens ────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setSubmitError(null);
      setForm({
        fullName:  "",
        email:     user?.email ?? "",
        phone:     "",
        city:      "",
        bedrooms:  "",
        budget:    "",
        moveIn:    "",
        message:   DEFAULT_MESSAGE,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Lock body scroll while open ───────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Don't render when closed — keeps the DOM clean.
  if (!isOpen) return null;

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    // Build a structured message so all preferences are captured in the
    // `message` column without needing extra schema columns.
    const structured = [
      form.message,
      "",
      `Preferred city: ${form.city || "—"}`,
      `Bedrooms: ${form.bedrooms || "—"}`,
      `Budget: ${form.budget || "—"}`,
      `Move-in: ${form.moveIn || "—"}`,
      `Phone: ${form.phone || "—"}`,
    ].join("\n");

    const { error } = await supabase.from("inquiries").insert({
      listing_id:   null,
      user_id:      user?.id ?? null,
      first_name:   form.fullName.split(" ")[0] || form.fullName,
      last_name:    form.fullName.split(" ").slice(1).join(" ") || "",
      email:        form.email,
      phone:        form.phone || null,
      move_in_date: form.moveIn || null,
      message:      structured,
      opt_in_tips:  false,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    // Fixed overlay — identical z-index and backdrop style as SendMessageModal
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 py-8"
    >
      {/* White modal card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* ── Sticky header ──────────────────────────────────────────── */}
        {/* sticky top-0 keeps the title + X visible while scrolling the form */}
        <div className="sticky top-0 bg-white flex items-center justify-between
                        px-6 py-4 border-b border-[#E0E0E0] rounded-t-2xl z-10">
          <div>
            <h2 className="font-bold text-lg text-[#202124] leading-tight">
              Tell Us What You&apos;re Looking For
            </h2>
            {/* Subtitle sits directly below the title in the header */}
            <p className="text-xs text-[#5F6368] mt-0.5">
              We&apos;ll help match you with the right apartment.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 text-[#5F6368] hover:text-[#202124] transition-colors
                       p-1 rounded-full hover:bg-gray-100 ml-3"
          >
            <XIcon />
          </button>
        </div>

        {/* ── Form / Success state ────────────────────────────────────── */}
        {sent ? (
          // Auto-closes 1.5 s after submission — same UX as SendMessageModal
          <div className="px-6 py-12 text-center">
            <div className="text-green-500 text-5xl mb-3">✓</div>
            <p className="font-bold text-lg text-[#202124]">Request Sent!</p>
            <p className="text-sm text-[#5F6368] mt-1">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5 space-y-4">

            {/* 1 — Full Name ─────────────────────────────────────────── */}
            {/* Single full-name field instead of first/last split because
                the CTA is informal and one field feels lighter. */}
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className={inputCls}
            />

            {/* 2 — Email ─────────────────────────────────────────────── */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputCls}
            />

            {/* 3 — Phone (optional) ──────────────────────────────────── */}
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className={inputCls}
            />

            {/* 4 — Preferred City ────────────────────────────────────── */}
            {/* optgroup separates California / Florida cities visually */}
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Preferred City</option>
              <optgroup label="California">
                {CA_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
              <optgroup label="Florida">
                {FL_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
            </select>

            {/* 5 + 6 — Bedrooms & Budget — side by side on sm+ screens ─ */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* 5 — Preferred Bedrooms */}
              <select
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="">Preferred Bedrooms</option>
                <option value="Studio">Studio</option>
                <option value="1 Bed">1 Bed</option>
                <option value="2 Beds">2 Beds</option>
                <option value="3+ Beds">3+ Beds</option>
              </select>

              {/* 6 — Budget Range */}
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="">Budget Range</option>
                <option value="Under $1,500">Under $1,500</option>
                <option value="$1,500–$2,000">$1,500–$2,000</option>
                <option value="$2,000–$3,000">$2,000–$3,000</option>
                <option value="$3,000–$5,000">$3,000–$5,000</option>
                <option value="$5,000+">$5,000+</option>
              </select>
            </div>

            {/* 7 — Move-in Date with calendar icon ──────────────────── */}
            {/* The icon is pointer-events:none so clicks pass through to
                the input, which opens the native date picker. */}
            <div>
              <label className="text-xs text-[#5F6368] mb-1 block font-medium">
                Move-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="moveIn"
                  value={form.moveIn}
                  onChange={handleChange}
                  className={inputCls + " pr-10"}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2
                                 text-[#5F6368] pointer-events-none">
                  <CalendarIcon />
                </span>
              </div>
            </div>

            {/* 8 — Message textarea — pre-filled with friendly opener ── */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Message"
              className={inputCls + " resize-none"}
            />

            {/* Error banner */}
            {submitError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200
                            rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}

            {/* 9 — Submit button — full-width primary blue ──────────── */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1A73E8] hover:bg-blue-700 disabled:opacity-60
                         disabled:cursor-not-allowed text-white font-semibold py-3
                         rounded-xl transition-colors text-sm"
            >
              {submitting ? "Submitting…" : "Submit Request"}
            </button>

            {/* 10 — Disclaimer ───────────────────────────────────────── */}
            <p className="text-xs text-[#5F6368] text-center">
              We&apos;ll get back to you within 24 hours.
            </p>

          </form>
        )}
      </div>
    </div>
  );
}
