import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <nav className="fixed top-0 w-full h-16 bg-black text-white px-6 py-4 flex justify-between items-center z-50">
      {/* Logo */}
      <img
        src="/Image/Logo.jpg"
        alt="HKTOJ logo"
        className="h-16 object-contain absolute top-0 left-0"
      />

      {/* Nút Home cho Professor */}
      {role === "Professor" && (
        <button
          onClick={() => navigate("/professor")}
          className="ml-20 px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600"
        >
          Home
        </button>
      )}

      {/* Content ẩn nếu là Professor */}
      {role !== "Professor" && (
        <ul className="flex gap-4 font-semibold justify-center flex-1 ml-20">
          <li>
            <button
              onClick={() => navigate("/")}
              className="text-white hover:underline"
            >
              Home
            </button>
          </li>
          <li>
            <select
              className="bg-black text-white px-2 py-1 rounded border border-white"
              defaultValue=""
              onChange={(e) => navigate(`/${e.target.value}`)}
            >
              <option value="" disabled hidden>
                Learning Path
              </option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </li>
          {["problems", "blogs", "ranking"].map((id) => (
            <li key={id}>
              <button
                onClick={() => navigate(`/${id}`)}
                className="text-white hover:underline capitalize"
              >
                {id}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Avatar + Login/Register */}
      <div className="flex gap-5 items-center relative ml-auto">
        {/* Avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center"
          >
            👤
          </button>
          {dropdownOpen && (
            <>
              {/* Menu chọn role */}
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow z-20">
                { ["Student", "Professor", "Admin"].map((r) => (
                  <div
                    key={r}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleRoleChange(r)}
                  >
                    {r}
                  </div>
                ))}
              </div>
              {/* Nếu là Professor thì hiện thêm menu profile */}
              {role === "Professor" && (
                <div className="absolute right-36 mt-2 w-40 bg-white text-black rounded shadow z-10">
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileMenu("profile")}>My Profile</div>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileMenu("edit")}>Edit Profile</div>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileMenu("logout")}>Logout</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Login/Register */}
        {role !== "Professor" && (
          <>
            <button onClick={() => navigate("/login")} className="hover:underline">
              Login
            </button>
            <button onClick={() => navigate("/register")} className="hover:underline">
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
