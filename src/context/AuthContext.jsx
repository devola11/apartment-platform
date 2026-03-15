// src/context/AuthContext.jsx
// ------------------------------------------------------------------
// React Context lets you share state across many components without
// passing props through every level ("prop drilling").
//
// AuthContext holds the logged-in user object and exposes signIn /
// signUp / signOut helpers that any component can call.
// ------------------------------------------------------------------
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// 1. Create the context with a default value of null.
const AuthContext = createContext(null);

// 2. The Provider wraps your whole app (see App.jsx).
//    It manages the `user` state and listens for Supabase auth events.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we fetch the session

  useEffect(() => {
    // On mount, check if there's already a session (e.g. user refreshed the page)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // onAuthStateChange fires whenever the user signs in or out
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup: unsubscribe when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  // Helper functions so components don't import supabase directly
  //
  // signUp stores fullName and role in user_metadata — a JSON object
  // attached to every Supabase auth user. Read later via:
  //   user.user_metadata.full_name
  //   user.user_metadata.role
  //
  // ── EMAIL CONFIRMATION NOTE ──────────────────────────────────────────
  // "autoconfirm" is NOT a Supabase JS client option. It is a server-side
  // toggle only, found in:
  //   Supabase Dashboard → Authentication → Settings
  //     → "Enable email confirmations" (toggle OFF for dev)
  //
  // When that toggle is OFF:
  //   signUp() returns { data: { user, session } } — session is non-null.
  //   The user is immediately logged in. No email is sent.
  //
  // When that toggle is ON (re-enable for production):
  //   signUp() returns { data: { user, session: null } } — no session yet.
  //   A confirmation email is sent. AuthForm detects the null session and
  //   shows a "check your email" fallback instead of crashing.
  //
  // emailRedirectTo is kept here so it works correctly once email
  // confirmation is re-enabled in production without any code changes.
  // ─────────────────────────────────────────────────────────────────────
  const signUp = (email, password, fullName, role) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          role: role,           // 'renter' or 'landlord'
        },
      },
    });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  const value = { user, loading, signUp, signIn, signOut };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until we know whether the user is logged in */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook - components call useAuth() instead of useContext(AuthContext)
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
