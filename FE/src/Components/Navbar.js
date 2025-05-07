import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setDropdownOpen(false);
    if (selectedRole === "Professor") {
      navigate("/professor");
    } else if (selectedRole === "Student") {
      navigate("/");
    } else if (selectedRole === "Admin") {
      navigate("/admin");
    }
  };

  const handleProfileMenu = (action) => {
    setDropdownOpen(false);
    if (action === "profile") navigate("/profile");
    else if (action === "edit") navigate("/profile/edit");
    else if (action === "logout") navigate("/logout");
  };

  return (
    <nav className="navbar w-full px-8 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2 h-16">
        {/* Logo sát trái, căn giữa dọc */}
        <img src="/Image/Logo.jpg" alt="HKTOJ logo" className="h-14 object-contain ml-0" style={{marginLeft: 0}} />
      </div>
      <div className="flex gap-6 items-center">
        {/* Menu */}
        <NavLink to="/" className={({isActive}) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600 transition-colors duration-200'}`}>Home</NavLink>
        <div className="relative">
          <select
            className="font-bold bg-white text-black px-2 py-1 rounded border border-gray-300 focus:outline-none"
            defaultValue=""
            onChange={e => navigate(`/${e.target.value}`)}
            style={{minWidth: 120}}
          >
            <option value="" disabled hidden>Learning Path</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
        <NavLink to="/problems" className={({isActive}) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600 transition-colors duration-200'}`}>Problems</NavLink>
        <NavLink to="/blogs" className={({isActive}) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600 transition-colors duration-200'}`}>Blogs</NavLink>
        <NavLink to="/ranking" className={({isActive}) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600 transition-colors duration-200'}`}>Ranking</NavLink>
      </div>
      <div className="flex gap-4 items-center relative">
        {/* Avatar chọn quyền */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center border border-gray-300 shadow-sm"
          >
            👤
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow z-20">
              {["Student", "Professor", "Admin"].map(r => (
                <div
                  key={r}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold text-black"
                  onClick={() => handleRoleChange(r)}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Login/Register */}
        <NavLink to="/login" className="btn font-bold bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">Login</NavLink>
        <NavLink to="/register" className="btn font-bold bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">Register</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
