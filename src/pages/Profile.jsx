// src/pages/Profile.jsx — Protected page (requires login)
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Your Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</p>
            <p className="text-gray-900 mt-1">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">User ID</p>
            <p className="text-gray-500 text-sm font-mono mt-1">{user?.id}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Joined</p>
            <p className="text-gray-900 mt-1">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
