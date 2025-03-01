
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here (e.g., clear user session, tokens, etc.)
    console.log("User signed out");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <header className="flex w-full max-w-[1374px] items-center justify-between gap-5 flex-wrap max-md:max-w-full">
      <nav className="flex items-center gap-5 max-md:flex-col max-md:items-stretch">
        <div className="flex items-center gap-5 max-md:w-full max-md:justify-between">
          {/* NEU Logo with Redirect */}
          <a href="https://neuvle.neu.edu.ph/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a15453eaca75974dc02d292e7448c7126333252cba35c6000812ad07e30db737?placeholderIfAbsent=true"
              alt="NEUPoliSeek Logo"
              className="aspect-[1] object-contain w-[101px] shrink-0 max-w-full"
            />
          </a>

          <div className="flex items-center gap-5 ml-10">
            <button className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200">
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
          <button onClick={toggleDropdown}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/f559f5b5469f122ba5ac3cc86b241e2d5ee59aacf2762f8f04be06dedbc42300?placeholderIfAbsent=true"
              alt="Profile Picture"
              className="aspect-[1.05] object-contain w-20 shrink-0"
            />
          </button>

          {/* Dropdown Arrow */}
          <button onClick={toggleDropdown}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a173d29bb6ba64cd7034e49a4aa0e670371f0ca6d331a87a20afdb8ab45c065c?placeholderIfAbsent=true"
              alt="Menu"
              className="aspect-[1] object-contain w-[50px] shrink-0"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex flex-col gap-2">
              <Link
                to="/admin"
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100 border border-black rounded-lg transition-colors duration-200 font-semibold"
              >
                Admin Management File
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100 border border-black rounded-lg transition-colors duration-200 font-semibold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
