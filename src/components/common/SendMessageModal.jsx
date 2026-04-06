// src/components/common/SendMessageModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable contact modal for messaging about a specific property.
//
// Props:
//   isOpen     — boolean controlling visibility (parent manages this)
//   onClose    — callback to close the modal
//   listing    — optional listing object ({ id, address, city, state, zip })
//   formSource — 'listing' (card) | 'contact' (detail page). Default: 'listing'
//
// On submit:
//   1. Calls submitInquiry() which saves to Supabase AND Web3Forms in parallel,
//      each in its own try/catch so one failure never blocks the other.
//   2. Shows an in-modal success state for 3 seconds, then closes automatically.
//
// Three close mechanisms: X button, click-outside overlay, Escape key.
// Body scroll is locked while open; scroll position is restored on close.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { submitInquiry } from "../../lib/submitInquiry";

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const inputCls =
  "w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm text-[#202124] " +
  "placeholder-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white";

export default function SendMessageModal({ isOpen, onClose, listing, formSource = "listing" }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    phone:     "",
    moveIn:    "",
    message:   "",
  });
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(null);
  // true = form was submitted successfully; triggers the in-modal success view
  const [submitted,   setSubmitted]   = useState(false);

  const overlayRef  = useRef(null);
  // Keep a stable ref to onClose so the auto-close timer never goes stale
  const onCloseRef  = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  const address = [listing?.address, listing?.city, listing?.state, listing?.zip]
    .filter(Boolean)
    .join(", ");

  // ── Reset & pre-fill when modal opens ────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setSubmitError(null);
      setSubmitted(false);
      setForm({
        firstName: "",
        lastName:  "",
        email:     "",
        phone:     "",
        moveIn:    "",
        message:   address
          ? `Hello, I'd like more information about ${address}.`
          : "Hello, I'd like help finding an apartment.",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Lock body scroll while open; restore exact scroll position on close ──
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      // Restore the scroll position the user was at before opening the modal
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // ── Close on Escape ──────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ── Auto-close 3 seconds after a successful submission ───────────────────
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => onCloseRef.current(), 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

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

    const { ok } = await submitInquiry({
      name:        `${form.firstName} ${form.lastName}`.trim(),
      email:       form.email,
      phone:       form.phone    || null,
      move_in_date: form.moveIn  || null,
      message:     form.message  || null,
      listing_id:  listing?.id   || null,
      form_source: formSource,
    });

    setSubmitting(false);

    if (!ok) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

    // Show success state inside the modal; auto-close fires after 3 s (see effect above)
    setSubmitted(true);
  }

  // ── Render — portal guarantees the overlay is always a direct child of
  // document.body, outside every stacking context in the app tree.
  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 animate-overlayShow"
    >
      {/* White modal card — mx-4 gives 16px breathing room on mobile edges.
          stopPropagation prevents card clicks from bubbling to the overlay
          and accidentally triggering the click-outside-to-close logic. */}
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-fadeIn"
      >

        {/* ── Header ────────────────────────────────────────── */}
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0] rounded-t-2xl z-10">
          <h2 className="font-bold text-lg text-[#202124]">Send Message</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#5F6368] hover:text-[#202124] transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <XIcon />
          </button>
        </div>

        {/* ── Success state — shown after form is submitted ──── */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <CheckIcon />
            </div>
            <h3 className="text-xl font-bold text-[#202124] mb-2">Thank you!</h3>
            <p className="text-sm text-[#5F6368]">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* ── Property address ──────────────────────────── */}
            {address && (
              <div className="px-6 pt-4 pb-1">
                <p className="text-sm text-[#5F6368]">{address}</p>
              </div>
            )}

            {/* ── Form ──────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">

              {/* First Name + Last Name */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  aria-label="First Name"
                  required
                  className={inputCls}
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  aria-label="Last Name"
                  required
                  className={inputCls}
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                aria-label="Email"
                required
                className={inputCls}
              />

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                aria-label="Phone (optional)"
                className={inputCls}
              />

              {/* Move-in date */}
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
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F6368] pointer-events-none">
                    <CalendarIcon />
                  </span>
                </div>
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                aria-label="Message"
                className={inputCls + " resize-none"}
              />

              {/* Error banner */}
              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {submitError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1A73E8] hover:bg-blue-700 disabled:opacity-60
                           disabled:cursor-not-allowed text-white font-semibold py-3
                           rounded-xl transition-colors text-sm"
              >
                {submitting ? "Sending…" : "Send"}
              </button>

              {/* Legal disclaimer */}
              <p className="text-xs text-[#5F6368] text-center leading-relaxed">
                By submitting this form, you agree to our{" "}
                <a href="https://www.apartmentguide.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="https://www.apartmentguide.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">Privacy Policy</a>.
              </p>

            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
