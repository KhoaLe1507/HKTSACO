import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? "font-bold text-yellow-400 block" : "block hover:text-yellow-300";

  return (
    <aside className="w-64 bg-[#14213d] h-screen flex flex-col py-6 px-4 shadow-lg text-sm fixed top-0 left-0 z-50 overflow-y-auto">
      <div className="mb-8 text-2xl font-extrabold text-center text-white tracking-wide uppercase">Professor Dashboard</div>
      <nav className="flex-1 space-y-4 text-white">
        <div>
          <NavLink to="/professor" className={linkClass}>🏠 Dashboard</NavLink>
        </div>

        <div>
          <div className="font-semibold mb-1 text-gray-300">📘 Module Problem</div>
          <NavLink to="/professor/problems" className={linkClass}>All Problem</NavLink>
          <NavLink to="/professor/problems/add" className={linkClass}>Add Problem</NavLink>
          <NavLink to="/professor/my-problems" className={linkClass}>My Problem</NavLink>
        </div>

        <div>
          <div className="font-semibold mb-1 text-gray-300">🧭 Learning Path</div>
          <NavLink to="/professor/sections" className={linkClass}>All Learning Path</NavLink>
        </div>

        <div>
          <div className="font-semibold mb-1 text-gray-300">📝 Module Blog</div>
          <NavLink to="/professor/blogs" className={linkClass}>All Blog</NavLink>
          <NavLink to="/professor/blogs/add" className={linkClass}>Add Blog</NavLink>
          <NavLink to="/professor/my-blogs" className={linkClass}>My Blog</NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
