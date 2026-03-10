// src/pages/Login.jsx
// ------------------------------------------------------------------
// The /login route.
//
// Layout: full-screen #F8F9FA background (a very light warm gray,
// just off-white — softer than pure white for large areas) with a
// centered white card.
//
// The card holds:
//  1. Heading + subtext  (spec: "Welcome Back" / "Log in to manage…")
//  2. <AuthForm mode="login"> — handles all logic and navigation
//  3. "Don't have an account?" link to /register
// ------------------------------------------------------------------
import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import SEO from "../components/common/SEO";

export default function Login() {
  return (
    // bg-[#F8F9FA] uses Tailwind's arbitrary-value syntax to set a
    // custom hex color that exactly matches the spec background.
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4 py-12">
      <SEO title="Log In" noindex />

      {/* White card — subtle border + shadow + rounded corners */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 w-full max-w-sm">

        {/* Heading + subtext */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Log in to manage your favorites and listings.
          </p>
        </div>

        <AuthForm mode="login" />

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-brand-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
