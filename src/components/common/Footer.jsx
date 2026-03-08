// src/components/common/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">AptGuide</p>
          <p className="text-sm">Find apartments across California and Florida.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Browse</p>
          <ul className="space-y-1 text-sm">
            <li><Link to="/listings/california" className="hover:text-white">California</Link></li>
            <li><Link to="/listings/florida" className="hover:text-white">Florida</Link></li>
            <li><Link to="/listings" className="hover:text-white">All Listings</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Account</p>
          <ul className="space-y-1 text-sm">
            <li><Link to="/login" className="hover:text-white">Log in</Link></li>
            <li><Link to="/register" className="hover:text-white">Sign up</Link></li>
            <li><Link to="/favorites" className="hover:text-white">Favorites</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} AptGuide. All rights reserved.
      </p>
    </footer>
  );
}
