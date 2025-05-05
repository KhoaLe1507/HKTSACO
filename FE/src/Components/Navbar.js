import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#000000] text-white px-6 py-4 flex justify-between items-center">
      <img src="/Image/Logo.jpg" alt="HKTOJ logo" className="h-16 object-contain absolute top-0 left-0" />

      <ul className="flex gap-4 font-semibold justify-center flex-1 ml-12">
        <li>
          <button 
            onClick={() => navigate("/")} 
            className="text-white hover:underline decoration-[#616978] underline-offset-4 decoration-4 hover:font-semibold capitalize">
            Home
          </button>
        </li>

        <li>
          <select
            className="bg-black text-white px-2 py-1 rounded border border-white"
            defaultValue=""
            onChange={(e) => navigate(`/${e.target.value}`)}
          >
            <option value="" disabled hidden>Learning Path</option>
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
              className="text-white hover:underline decoration-[#616978] underline-offset-4 decoration-4 hover:font-semibold capitalize"
            >
              {id}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-5">
        <button
          onClick={() => navigate("/login")}
          className="text-white hover:underline decoration-[#616978] underline-offset-4 decoration-4 hover:font-semibold capitalize"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="text-white hover:underline decoration-[#616978] underline-offset-4 decoration-4 hover:font-semibold capitalize"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
