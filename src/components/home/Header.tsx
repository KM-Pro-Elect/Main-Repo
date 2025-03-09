import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../SupabaseClient"; // Adjusted the import path
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react"; // Import icons

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/f559f5b5469f122ba5ac3cc86b241e2d5ee59aacf2762f8f04be06dedbc42300?placeholderIfAbsent=true"
  );
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserName(session.user.user_metadata?.full_name || session.user.email);
        setUserEmail(session.user.email);
        if (session.user.user_metadata?.avatar_url) {
          setProfilePicture(session.user.user_metadata.avatar_url);
        }
      }
    };

    fetchUserInfo();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUserName(session.user.user_metadata?.full_name || session.user.email);
          setUserEmail(session.user.email);
          if (session.user.user_metadata?.avatar_url) {
            setProfilePicture(session.user.user_metadata.avatar_url);
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <header className="flex w-full items-center justify-between gap-5 py-4 px-5 bg-white border-b border-gray-200">
      <div className="max-w-[1374px] w-full mx-auto flex items-center justify-between">
        <nav className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            <a href="https://neuvle.neu.edu.ph/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a15453eaca75974dc02d292e7448c7126333252cba35c6000812ad07e30db737?placeholderIfAbsent=true"
                alt="NEUPoliSeek Logo"
                className="aspect-[1] object-contain w-[101px] shrink-0"
              />
            </a>

            <div className="flex items-center gap-5 ml-10">
              <button 
                onClick={handleHomeClick} 
                className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200"
              >
                Home
              </button>
              <button className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200">
                About Us
              </button>
              <button className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200">
                Contact
              </button>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 relative">
            <button onClick={toggleDropdown} className="p-1 border-2 border-black rounded-full">
              <img
                src={profilePicture}
                alt="Profile Picture"
                className="aspect-[1.05] object-contain w-20 shrink-0 rounded-full"
              />
            </button>

            {/* Modern Dropdown Icon */}
            <button onClick={toggleDropdown} className="transition-transform duration-200 ease-in-out">
              <ChevronDown 
                className={`w-6 h-6 text-black transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`} 
              />
            </button>

            {/* Dropdown Menu with Animation */}
            <div
              className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-200 ease-in-out ${
                isDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="flex flex-col p-2">
                {/* User Info */}
                <div className="px-4 py-3 bg-gray-100 rounded-t-lg flex items-center gap-2">
                  <div>
                    <div className="text-sm font-semibold text-black truncate">{userName}</div>
                    <div className="text-xs text-gray-600 truncate">{userEmail}</div>
                  </div>
                </div>
                {/* Grey Separator Line */}
                <div className="w-full h-px bg-gray-200 my-1"></div>
                <Link
                  to="/admin"
                  className="w-full px-4 py-2 text-left bg-yellow-500 text-white hover:bg-yellow-600 rounded-lg transition-colors duration-200 font-semibold flex items-center gap-2"
                >
                  <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                </Link>
                {/* Grey Separator Line */}
                <div className="w-full h-px bg-gray-200 my-1"></div>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors duration-200 font-semibold flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
