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

  // NavLink is like <Link> but adds an "active" class when the URL matches
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-brand-600 font-semibold"
      : "text-gray-600 hover:text-brand-600 transition-colors";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-600">AptGuide</span>
          <span className="text-xs text-gray-400 hidden sm:block">CA & FL</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <NavLink to="/listings" className={linkClass}>Listings</NavLink>
          <NavLink to="/listings/california" className={linkClass}>California</NavLink>
          <NavLink to="/listings/florida" className={linkClass}>Florida</NavLink>

          {user ? (
            <>
              <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              <button
                onClick={handleSignOut}
                className="bg-brand-600 text-white px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors text-sm"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Log in</NavLink>
              <Link
                to="/register"
                className="bg-brand-600 text-white px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors text-sm"
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
