// src/pages/Login.jsx
import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import SEO from "../components/common/SEO";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SEO title="Log In" noindex />
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">Welcome back</h1>
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
