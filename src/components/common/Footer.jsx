// src/components/common/Footer.jsx
import { Link } from "react-router-dom";

const AG_URL = "https://www.apartmentguide.com/";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function AppStoreBadge() {
  return (
    <a
      href={AG_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20
                 rounded-lg px-4 py-2.5 transition-colors duration-150 min-w-[140px]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div className="text-left">
        <p className="text-white/60 text-[9px] leading-none">Download on the</p>
        <p className="text-white font-semibold text-sm leading-tight">App Store</p>
      </div>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a
      href={AG_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20
                 rounded-lg px-4 py-2.5 transition-colors duration-150 min-w-[140px]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
      </svg>
      <div className="text-left">
        <p className="text-white/60 text-[9px] leading-none">Get it on</p>
        <p className="text-white font-semibold text-sm leading-tight">Google Play</p>
      </div>
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#202124" }} className="text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div>
            <p className="text-white font-bold text-lg mb-2">
              Apt<span className="text-brand-500">Guide</span>
            </p>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Find verified apartment listings across California and Florida. Real homes, real prices.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href={AG_URL} target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors duration-150 p-1.5">
                <FacebookIcon />
              </a>
              <a href={AG_URL} target="_blank" rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-gray-400 hover:text-white transition-colors duration-150 p-1.5">
                <TwitterIcon />
              </a>
              <a href={AG_URL} target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors duration-150 p-1.5">
                <InstagramIcon />
              </a>
            </div>
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

          {/* Download App column */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Download Our App</p>
            <div className="flex flex-col gap-3">
              <AppStoreBadge />
              <PlayStoreBadge />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AptGuide. All rights reserved.</p>
          <p>
            AptGuide is a branch site of{" "}
            <a href={AG_URL} target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline transition-colors duration-150">
              ApartmentGuide.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
