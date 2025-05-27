import React, { useContext, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, role, setRole } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    axios.get("https://localhost:7157/api/roadmap/ListAllSectionsDropdown")
      .then(res => setSections(res.data))
      .catch(err => console.error("Failed to fetch sections:", err));
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleProfileMenu = (action) => {
    setDropdownOpen(false);
    if (action === "logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setRole("");
      navigate("/");
    }
    else if (action === "profile") {
      navigate("/profile");
    }
    else if (action === "my-blog") {
      navigate("/my-blog");
    }
    else {
      navigate(`/${action}`);
    }
  };

  return (
    <>
      {/* Backdrop for dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-300"
          onClick={() => setDropdownOpen(false)}
        />
      )}
      
      <nav className={`navbar w-full px-8 py-3 flex items-center justify-between fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}>
        {/* Logo Section */}
        <div className="flex items-center gap-2 h-16 group">
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src="/Image/Logo.jpg" 
              alt="HKTOJ logo" 
              className="h-14 object-contain ml-0 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
            />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>

        {/* Navigation Menu - Only for Student or not logged in */}
        {(!role || role === "0") && (
          <div className="flex gap-8 items-center">
            {/* Home Link */}
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative font-bold px-3 py-2 text-gray-700 transition-all duration-300 hover:text-blue-600 group ${
                  isActive ? 'text-blue-600' : ''
                }`
              }
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></div>
            </NavLink>

            {/* Learning Path Dropdown */}
            <div className="relative group">
              <select
                className="font-bold bg-transparent text-gray-700 px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer appearance-none pr-10 min-w-[180px] bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50"
                value=""
                onChange={e => navigate(`/learning-path/${e.target.value}`)}
              >
                <option value="" disabled hidden>Learning Path</option>
                {sections.length === 0 ? (
                  <option disabled>Loading...</option>
                ) : (
                  sections.map(sec => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))
                )}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Navigation Links */}
            {[
              { to: "/problems", label: "Problems" },
              { to: "/blogs", label: "Blogs" },
              { to: "/ranking", label: "Ranking" },
              { to: "/contact", label: "Contact Us" }
            ].map(({ to, label }) => (
              <NavLink 
                key={to}
                to={to} 
                className={({ isActive }) => 
                  `relative font-bold px-3 py-2 text-gray-700 transition-all duration-300 hover:text-blue-600 group ${
                    isActive ? 'text-blue-600' : ''
                  }`
                }
              >
                <span className="relative z-10">
                  {label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></div>
              </NavLink>
            ))}
          </div>
        )}

        {/* Auth Section */}
        <div className="flex gap-4 items-center relative">
          {isLoggedIn ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:rotate-12 relative overflow-hidden group ${
                  dropdownOpen ? 'scale-110 rotate-12 shadow-xl' : ''
                }`}
              >
                <span className="text-xl relative z-10">👤</span>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25"></div>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-md text-gray-800 rounded-2xl shadow-2xl border border-gray-100 z-50 transform transition-all duration-300 origin-top-right ${
                dropdownOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                {/* Dropdown Items */}
                <div className="py-2">
                  <div 
                    onClick={() => handleProfileMenu("profile")} 
                    className="px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer font-medium transition-all duration-200 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">My Profile</span>
                  </div>

                  {/* Student-only items */}
                  {role === "0" && (
                    <>
                      <div 
                        onClick={() => handleProfileMenu("my-blog")} 
                        className="px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer font-medium transition-all duration-200 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">My Blog</span>
                      </div>
                      <div 
                        onClick={() => handleProfileMenu("my-progress")} 
                        className="px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer font-medium transition-all duration-200 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">My Progress</span>
                      </div>
                      <div 
                        onClick={() => handleProfileMenu("my-submission")} 
                        className="px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer font-medium transition-all duration-200 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">My Submission</span>
                      </div>
                    </>
                  )}

                  {/* Divider */}
                  <div className="mx-4 my-2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Logout */}
                  <div 
                    onClick={() => handleProfileMenu("logout")} 
                    className="px-5 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 cursor-pointer font-medium text-red-600 transition-all duration-200 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Log Out</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink 
                to="/login" 
                className="group relative px-6 py-2.5 font-bold text-blue-600 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </NavLink>
              
              <NavLink 
                to="/register" 
                className="group relative px-6 py-2.5 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">
                  Register
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;