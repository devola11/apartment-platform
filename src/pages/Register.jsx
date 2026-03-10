// src/pages/Register.jsx
// ------------------------------------------------------------------
// The /register route.
//
// Mirrors the Login page layout: same #F8F9FA background and white card.
// The <AuthForm mode="register"> adds the extra fields (Full Name,
// role dropdown) and the email-confirmation flow.
// ------------------------------------------------------------------
import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import SEO from "../components/common/SEO";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4 py-12">
      <SEO title="Create Account" noindex />

      {/* w-full + max-w-md: full width on mobile (px-4 outer padding gives gutters),
          capped at 448px on desktop. p-6 sm:p-8 reduces padding on small phones. */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 w-full max-w-md">

        {/* Heading + subtext (spec: "Create Your Account" / "Find and save…") */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Find and save your favorite apartments.
          </p>
        </div>

        <AuthForm mode="register" />

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
