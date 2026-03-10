// src/components/common/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-brand-600 font-semibold"
      : "text-[#5F6368] hover:text-brand-600 transition-colors duration-150";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo — left */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-brand-600" aria-hidden="true">
            {/* Simple building icon in SVG — no icon library needed */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9.5L12 3l9 6.5V21H3V9.5zm2 1.25V19h4v-4h6v4h4V10.75L12 5.3 5 10.75zM10 19h4v-3h-4v3z"/>
            </svg>
          </span>
          <span className="text-xl font-bold text-[#202124] tracking-tight">
            Apt<span className="text-brand-600">Guide</span>
          </span>
        </Link>

        {/* Center nav links */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/listings" className={linkClass}>Search</NavLink>
          <NavLink to="/listings/california" className={linkClass}>California</NavLink>
          <NavLink to="/listings/florida" className={linkClass}>Florida</NavLink>
        </div>

        {/* Right — auth actions */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <NavLink to="/favorites" className={linkClass + " hidden sm:block text-sm font-medium"}>
                Favorites
              </NavLink>
              <NavLink to="/profile" className={linkClass + " hidden sm:block text-sm font-medium"}>
                Profile
              </NavLink>

              {/* Show the user's name from user_metadata (set at signup).
                  Falls back to the part of their email before the @ sign.
                  truncate + max-w prevents long names from breaking the layout. */}
              <span className="hidden sm:block text-sm text-[#202124] font-medium truncate max-w-[120px]">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>

              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-[#5F6368] border border-gray-300 px-4 py-1.5 rounded-full hover:border-brand-600 hover:text-brand-600 transition-colors duration-150"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-medium text-[#5F6368] hover:text-brand-600 transition-colors duration-150"
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                className="text-sm font-semibold bg-brand-600 text-white px-5 py-2 rounded-full hover:bg-brand-700 transition-colors duration-150 shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
