// src/App.jsx
// ------------------------------------------------------------------
// This is the ROOT of the component tree. It:
//  1. Wraps everything in AuthProvider so any component can call useAuth()
//  2. Wraps in FavoritesProvider so any component can call useFavorites()
//  3. Declares ALL routes using React Router v6's <Routes> / <Route>
//
// React Router v6 key concepts:
//  - <BrowserRouter>  - enables URL-based routing (in main.jsx)
//  - <Routes>         - container that matches the current URL to a route
//  - <Route>          - maps a path to a component
//  - <Outlet>         - placeholder where child routes render (in layouts)
// ------------------------------------------------------------------
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Layout components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";

// Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Leaflet CSS - must be imported globally so map tiles render correctly
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    // AuthProvider must be the outermost wrapper so FavoritesProvider
    // (which calls useAuth) can access the auth context
    <AuthProvider>
      <FavoritesProvider>
        {/* flex flex-col min-h-screen makes the footer stick to the bottom */}
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />

          {/* flex-1 makes this area take up all remaining vertical space */}
          <main className="flex-1">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/california" element={<Listings stateFilter="California" />} />
              <Route path="/listings/florida" element={<Listings stateFilter="Florida" />} />
              {/* Dynamic route - :id is a URL parameter read with useParams() */}
              <Route path="/listings/:id" element={<ListingDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes - redirect to /login if not authenticated */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <BackToTop />
        </div>
      </FavoritesProvider>
    </AuthProvider>
  );
}
