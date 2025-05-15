import React, { useContext, useState ,useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, role, setRole } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7157/api/roadmap/ListAllSectionsDropdown")
      .then(res => setSections(res.data))
      .catch(err => console.error("Failed to fetch sections:", err));
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
    <nav className="navbar w-full px-8 py-3 flex items-center justify-between shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2 h-16">
        <img src="/Image/Logo.jpg" alt="HKTOJ logo" className="h-14 object-contain ml-0" />
      </div>
      {/* Chỉ hiển thị menu cho Student hoặc chưa login */}
      {(!role || role === "0") && (
        <div className="flex gap-6 items-center">
          <NavLink to="/" className={({ isActive }) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600'}`}>Home</NavLink>
          <div className="relative">
            <select
              className="font-bold bg-white text-black px-2 py-1 rounded border border-gray-300"
              value=""
              onChange={e => navigate(`/learning-path/${e.target.value}`)}
              style={{ minWidth: 160 }}
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
          </div>
          <NavLink to="/problems" className={({ isActive }) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600'}`}>Problems</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600'}`}>Blogs</NavLink>
          <NavLink to="/ranking" className={({ isActive }) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600'}`}>Ranking</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `font-bold px-2 text-black ${isActive ? 'underline' : 'hover:text-blue-600'}`}>Contact Us</NavLink>
        </div>
      )}

      <div className="flex gap-4 items-center relative">
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center border border-gray-300"
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-20">
                <div onClick={() => handleProfileMenu("profile")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold">My Profile</div>

                {/* Chỉ Student mới có các mục sau */}
                {role === "0" && (
                  <>
                    <div onClick={() => handleProfileMenu("my-blog")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold">My Blog</div>
                    <div onClick={() => handleProfileMenu("my-progress")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold">My Progress</div>
                    <div onClick={() => handleProfileMenu("my-submission")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-bold">My Submission</div>
                  </>
                )}

                <div onClick={() => handleProfileMenu("logout")} className="px-4 py-2 hover:bg-red-100 cursor-pointer font-bold text-red-600">Log Out</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login" className="btn font-bold bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">Login</NavLink>
            <NavLink to="/register" className="btn font-bold bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
