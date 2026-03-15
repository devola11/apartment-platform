// src/pages/AuthCallback.jsx
// ------------------------------------------------------------------
// WHY THIS PAGE EXISTS
// --------------------
// When a user clicks the confirmation link in their email, Supabase
// redirects them to:
//
//   <emailRedirectTo>#access_token=...&refresh_token=...&type=signup
//
// The tokens are in the URL *hash* (the # part), not the query string.
// Browsers never send the hash to the server, so it's only visible to
// JavaScript running on the page.
//
// Supabase JS v2 detects these hash tokens automatically when you call
// supabase.auth.getSession() — it reads window.location.hash, exchanges
// the tokens, stores the session in localStorage, and fires
// onAuthStateChange. After that the user is fully logged in.
//
// HOW IT WORKS
// ------------
// 1. User clicks link → browser loads /auth/callback with hash tokens.
// 2. This component renders a "Confirming your email…" spinner.
// 3. useEffect calls getSession(). Supabase reads the hash and creates
//    the session internally.
// 4. onAuthStateChange in AuthContext fires → user state is set.
// 5. We navigate to "/" after a short delay so the user lands on Home
//    already logged in.
//
// FALLBACK
// --------
// If there's no hash (e.g. someone navigates here directly), getSession()
// returns null and we redirect to /login.
// ------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming"); // "confirming" | "error"

  useEffect(() => {
    // getSession() is the key call here.
    // When Supabase JS v2 sees an access_token in the URL hash it
    // automatically exchanges it for a real session and clears the hash.
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        // No valid tokens in the URL — send to login
        setStatus("error");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        // Session established — go home. AuthContext's onAuthStateChange
        // will have already updated the user state by this point.
        navigate("/", { replace: true });
      }
    });
  // navigate is stable (never changes), so this runs exactly once on mount
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="text-center px-4">
        {status === "confirming" ? (
          <>
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-[#E0E0E0] border-t-[#1A73E8]
                            rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#202124] font-semibold text-lg">Confirming your email…</p>
            <p className="text-[#5F6368] text-sm mt-1">You&apos;ll be redirected in a moment.</p>
          </>
        ) : (
          <>
            <p className="text-[#202124] font-semibold text-lg">Something went wrong</p>
            <p className="text-[#5F6368] text-sm mt-1">Redirecting you to login…</p>
          </>
        )}
      </div>
    </div>
  );
}
