import React from "react";

const Navbar = ({ showPage }) => {
  return (
    <nav className="fixed top-0 w-full h-16 bg-[#000000] text-white px-6 py-4 flex justify-between items-center">
      <img src="/Image/Logo.jpg" alt="HKTOJ logo" className="h-16 object-contain absolute top-0 left-0" />
      <h1 className="text-xl font-semibold"></h1>
      
      <ul className="flex gap-4 font-semibold justify-center flex-1">
        <li>
          <button onClick={() => showPage("home")} className="hover:opacity-80 capitalize">
            Home
          </button>
        </li>

        <li>
          <select
            className="bg-black text-white px-2 py-1 rounded border border-white"
            defaultValue=""
            onChange={(e) => showPage(e.target.value)}
            >
            <option value="" disabled hidden>Learning Path</option>
            <option value="general">General</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="advanced">Advanced</option>
          </select>
        </li>

        {["problems", "blogs", "ranking", "contact us"].map((id) => (
          <li key={id}>
            <button onClick={() => showPage(id)} className="hover:opacity-80 capitalize">
              {id}
            </button>
          </li>
        ))}
      </ul>


      <div className="flex gap-2">
        <button className="text-white hover:underline">Login</button>
        <button className="text-white hover:underline">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
