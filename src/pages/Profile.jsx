// src/pages/Profile.jsx - Protected page (requires login)
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/common/SEO";

function UserIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-[#1A73E8]">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>
  );
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const fullName  = user?.user_metadata?.full_name;
  const role      = user?.user_metadata?.role;
  const joinedAt  = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "-";

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FA" }}>
      <SEO title="Your Profile" noindex />

      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header band */}
          <div className="bg-[#1A73E8] px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserIcon />
            </div>
            <h1 className="text-xl font-extrabold text-white">
              {fullName || user?.email?.split("@")[0] || "Your Profile"}
            </h1>
            {role && (
              <span className="mt-2 inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {role}
              </span>
            )}
          </div>

          {/* Info fields */}
          <div className="px-8 py-6 space-y-5">
            {fullName && (
              <div>
                <p className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide mb-1">Full Name</p>
                <p className="text-[#202124] font-medium">{fullName}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide mb-1">Email</p>
              <p className="text-[#202124]">{user?.email}</p>
            </div>
            {role && (
              <div>
                <p className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide mb-1">Account Type</p>
                <p className="text-[#202124] capitalize">{role}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide mb-1">Member Since</p>
              <p className="text-[#202124]">{joinedAt}</p>
            </div>
          </div>

          {/* Sign out */}
          <div className="px-8 pb-8">
            <button
              onClick={handleSignOut}
              className="w-full border-2 border-red-400 text-red-500 font-semibold py-3 rounded-xl
                         hover:bg-red-50 transition-colors duration-150 min-h-[44px]"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
