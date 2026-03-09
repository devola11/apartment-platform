// src/pages/NotFound.jsx — Shown for any unmatched route (the * route)
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <SEO title="Page Not Found" noindex />
      <p className="text-8xl font-extrabold text-brand-200">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Page not found</h1>
      <p className="text-gray-500 mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="mt-6 bg-brand-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
