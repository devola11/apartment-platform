// src/components/common/SendMessageModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// A reusable modal dialog for contacting a property.
//
// HOW IT WORKS:
//  • The caller manages a boolean `isOpen` state and passes `onClose` as a
//    callback. This keeps the modal stateless about *when* to show - the parent
//    decides that; the modal only handles *what* to show.
//  • `position: fixed` makes the overlay cover the entire viewport regardless
//    of where in the DOM tree the modal is rendered.
//  • Three UX patterns for closing: X button, click-outside, Escape key.
//  • Body scroll is locked while open so the page behind doesn't scroll.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";

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

const inputCls =
  "w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm text-[#202124] " +
  "placeholder-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white";

export default function SendMessageModal({ isOpen, onClose, listing }) {
  // ── Local state ──────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    moveIn: "",
    message: "",
  });
  const [tips, setTips]   = useState(false);
  const [sent, setSent]   = useState(false);

  // The overlay <div> ref lets us detect "click outside" reliably.
  // We compare e.target with the overlay element itself - if they match,
  // the user clicked the dark backdrop (not the white card), so we close.
  const overlayRef = useRef(null);

  // ── Build address string for display + pre-fill ─────────────────────────
  const address = [listing?.address, listing?.city, listing?.state, listing?.zip]
    .filter(Boolean)
    .join(", ");

  // ── Reset form & pre-fill message every time modal opens ────────────────
  // useEffect with [isOpen] runs whenever isOpen changes. When it becomes
  // true we reset all fields so old data doesn't bleed between opens.
  useEffect(() => {
    if (isOpen && listing) {
      setSent(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        moveIn: "",
        message: `Hello, I'd like more information about ${address}.`,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Lock body scroll while open ──────────────────────────────────────────
  // Prevents the page behind the overlay from scrolling, which would look
  // broken. The cleanup function (return) restores scroll when modal closes.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Close on Escape key ──────────────────────────────────────────────────
  // window.addEventListener is used (not a React event) because keyboard
  // events on the document don't bubble through React's synthetic event system
  // unless a focusable element is focused. The cleanup removes the listener.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ── Don't render anything when closed ───────────────────────────────────
  // Early return keeps the DOM clean - no hidden elements taking up space.
  if (!isOpen) return null;

  // ── Event handlers ───────────────────────────────────────────────────────
  function handleOverlayClick(e) {
    // e.target is the element the user actually clicked.
    // overlayRef.current is the dark backdrop div.
    // Only close if they clicked the backdrop itself, not the white card.
    if (e.target === overlayRef.current) onClose();
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In a real app: POST to your API here.
    // For now, show a success state then auto-close after 1.5 s.
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    // Fixed overlay - covers 100vw × 100vh, z-50 sits above everything.
    // bg-black/50 = semi-transparent black (Tailwind JIT arbitrary value).
    // flex items-center justify-center centres the white card.
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4 py-8"
    >
      {/* White modal card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* ── Header ────────────────────────────────────────── */}
        {/* sticky top-0 keeps header visible while scrolling long forms */}
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

        {/* ── Property address ──────────────────────────────── */}
        <div className="px-6 pt-4 pb-1">
          <p className="text-sm text-[#5F6368]">{address}</p>
        </div>

        {/* ── Form / Success state ──────────────────────────── */}
        {sent ? (
          // Success state shown briefly before auto-close
          <div className="px-6 py-12 text-center">
            <div className="text-green-500 text-5xl mb-3">✓</div>
            <p className="font-bold text-lg text-[#202124]">Message Sent!</p>
            <p className="text-sm text-[#5F6368] mt-1">We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">

            {/* First Name + Last Name - stacked on mobile, side by side on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className={inputCls}
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className={inputCls}
              />
            </div>

            {/* Email - full width */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputCls}
            />

            {/* Phone - full width, optional */}
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className={inputCls}
            />

            {/* Move-in date - relative wrapper positions the calendar icon */}
            <div className="relative">
              <label className="text-xs text-[#5F6368] mb-1 block font-medium">
                Move-in Date
              </label>
              {/* The calendar icon is purely decorative - pointer-events:none
                  ensures it doesn't block clicks on the input beneath it */}
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

            {/* Message textarea - pre-filled in useEffect above */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className={inputCls + " resize-none"}
            />

            {/* Send button - full width, primary blue */}
            <button
              type="submit"
              className="w-full bg-[#1A73E8] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Send
            </button>

            {/* Tips opt-in checkbox - matches ApartmentGuide's newsletter opt-in */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={tips}
                onChange={(e) => setTips(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#1A73E8] shrink-0"
              />
              <span className="text-sm text-[#5F6368] leading-snug">
                Simplify my search with helpful tips and rental recommendations.
              </span>
            </label>

            {/* Legal disclaimer - small print at bottom */}
            <p className="text-xs text-[#5F6368] text-center leading-relaxed">
              By submitting this form, you agree to our{" "}
              <span className="text-[#1A73E8] cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#1A73E8] cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>

          </form>
        )}
      </div>
    </div>
  );
}
