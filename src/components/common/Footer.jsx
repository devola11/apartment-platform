// src/components/common/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#202124" }} className="text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand column */}
          <div>
            <p className="text-white font-bold text-lg mb-2">
              Apt<span className="text-brand-500">Guide</span>
            </p>
            <p className="text-sm leading-relaxed text-gray-400">
              Find verified apartment listings across California and Florida. Real homes, real prices.
            </p>
          </div>

          {/* Browse column */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Browse</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/listings/california" className="hover:text-white transition-colors duration-150">
                  California
                </Link>
              </li>
              <li>
                <Link to="/listings/florida" className="hover:text-white transition-colors duration-150">
                  Florida
                </Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-white transition-colors duration-150">
                  All Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Account column */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Account</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-white transition-colors duration-150">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors duration-150">
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors duration-150">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AptGuide. All rights reserved.</p>
          <p>California &amp; Florida Rentals</p>
        </div>
      </div>
    </footer>
  );
}
