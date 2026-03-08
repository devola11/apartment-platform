// src/pages/Register.jsx
import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">Create your account</h1>
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
