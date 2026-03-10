// src/components/auth/AuthForm.jsx
// ------------------------------------------------------------------
// Shared form used by both /login and /register.
// The `mode` prop ("login" | "register") switches which fields appear
// and what happens on submit.
//
// KEY CONCEPTS:
//  - Controlled inputs: `value` + `onChange` keep React state in sync
//    with what the user types. React is always the "source of truth".
//  - show/hide password: we toggle `type="password"` ↔ `type="text"`.
//  - user_metadata: Supabase lets you attach arbitrary JSON to each user
//    at signup via `options.data`. We store full_name + role there so we
//    can display the name in the Navbar and gate landlord features.
//  - setTimeout redirect: after signup we show a success message for 2s
//    then push the user to /login automatically.
// ------------------------------------------------------------------
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── Inline eye icons for the show/hide password toggle ───────────
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function AuthForm({ mode = "login" }) {
  const { signIn, signUp } = useAuth();
  const navigate            = useNavigate();
  const location            = useLocation();

  // After login, go back to the page they were trying to reach, or homepage
  const from = location.state?.from?.pathname ?? "/";

  // ── Controlled form state ────────────────────────────────────────
  const [fullName,     setFullName]     = useState("");
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [role,         setRole]         = useState("renter");  // "renter" | "landlord"
  const [showPassword, setShowPassword] = useState(false);

  // ── UI state ────────────────────────────────────────────────────
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "register") {
      // Pass fullName and role as the 3rd and 4th args — see AuthContext.jsx
      const { error: authError } = await signUp(email, password, fullName, role);
      setLoading(false);

      if (authError) {
        setError(authError.message);
      } else {
        // Show confirmation message, then navigate to /login after 2.5s
        setSuccess("Check your email to confirm your account.");
        setTimeout(() => navigate("/login"), 2500);
      }
    } else {
      // signIn returns { data: { user, session }, error }
      const { data, error: authError } = await signIn(email, password);
      setLoading(false);

      if (authError) {
        setError(authError.message);
      } else {
        // Check the user's role stored in user_metadata.
        // Landlords go to their dashboard; everyone else goes back to where
        // they came from (or the homepage if they navigated directly to /login).
        const userRole = data?.user?.user_metadata?.role;
        if (userRole === "landlord") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    }
  }

  const isRegister = mode === "register";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">

      {/* ── Error banner ─────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* ── Success banner (shown after signup) ──────────────────── */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          {success} Redirecting to login…
        </div>
      )}

      {/* ── Full Name — only shown on register ───────────────────── */}
      {isRegister && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       placeholder:text-gray-400"
          />
        </div>
      )}

      {/* ── Email ────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                     placeholder:text-gray-400"
        />
      </div>

      {/* ── Password with show/hide toggle ───────────────────────── */}
      {/* The toggle button is absolutely positioned inside a relative wrapper.
          Clicking the eye icon flips `showPassword`, which changes the input
          `type` between "password" (masked) and "text" (visible). */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            autoComplete={isRegister ? "new-password" : "current-password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       placeholder:text-gray-400"
          />
          {/* type="button" prevents it from accidentally submitting the form */}
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-3
                       text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {/* ── Role dropdown — only shown on register ───────────────── */}
      {/* We store this in user_metadata at signup so we can use it
          for role-based redirects and feature gating later. */}
      {isRegister && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am a…
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       bg-white text-gray-800"
          >
            <option value="renter">Renter — looking for a place</option>
            <option value="landlord">Landlord — listing a property</option>
          </select>
        </div>
      )}

      {/* ── Submit button ─────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={loading || !!success}
        className="w-full bg-[#1A73E8] text-white py-2.5 rounded-lg font-semibold
                   hover:bg-[#1557b0] transition-colors duration-150
                   disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
      >
        {loading
          ? "Please wait…"
          : isRegister
          ? "Sign Up"
          : "Log In"}
      </button>
    </form>
  );
}
