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
  // signUp now accepts fullName and role so they're stored in user_metadata —
  // a JSON object attached to every Supabase auth user. We read it later via
  // user.user_metadata.full_name and user.user_metadata.role
  const signUp = (email, password, fullName, role) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
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

// 3. Custom hook — components call useAuth() instead of useContext(AuthContext)
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
