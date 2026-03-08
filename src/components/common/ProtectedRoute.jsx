// src/components/common/ProtectedRoute.jsx
// ------------------------------------------------------------------
// Wraps routes that require the user to be logged in.
// If they're not, it redirects them to /login and remembers where
// they were trying to go (via state.from) so we can send them back
// after they sign in.
// ------------------------------------------------------------------
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Pass current location as state so Login can redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
