import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState({
    module: true,
    roadmap: false,
    blog: false,
  });
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  const linkClass = ({ isActive }) =>
    isActive ? "font-bold text-yellow-400 block" : "block hover:text-yellow-300";

  return (
    <aside className="w-64 bg-[#14213d] h-screen flex flex-col py-6 px-4 shadow-lg text-sm fixed top-0 left-0 z-50 overflow-y-auto">
      <div className="mb-8 text-2xl font-extrabold text-center text-white tracking-wide uppercase">Professor Dashboard</div>
      <nav className="flex-1 space-y-4 text-white">
        {/* Module Problem */}
        <div>
          <div className="font-semibold mb-1 text-gray-300 cursor-pointer flex items-center" onClick={() => toggle('module')}>
            📘 Module Problem
            <span className="ml-2">{open.module ? '▼' : '▶'}</span>
          </div>
          {open.module && (
            <div className="ml-4 space-y-1">
              <NavLink to="/professor/problems" className={linkClass}>All Problem</NavLink>
              <NavLink to="/professor/problems/add" className={linkClass}>Add Problem</NavLink>
            </div>
          )}
        </div>
        {/* Roadmap */}
        <div>
          <div className="font-semibold mb-1 text-gray-300 cursor-pointer flex items-center" onClick={() => toggle('roadmap')}>
            🗺️ Roadmap
            <span className="ml-2">{open.roadmap ? '▼' : '▶'}</span>
          </div>
          {open.roadmap && (
            <div className="ml-4 space-y-1">
              <NavLink to="/professor/sections" className={linkClass}>All Roadmap</NavLink>
              <NavLink to="/professor/my-module-content" className={linkClass}>Edit MyModuleContent</NavLink>
            </div>
          )}
        </div>
        {/* Blog */}
        <div>
          <div className="font-semibold mb-1 text-gray-300 cursor-pointer flex items-center" onClick={() => toggle('blog')}>
            📝 Blog
            <span className="ml-2">{open.blog ? '▼' : '▶'}</span>
          </div>
          {open.blog && (
            <div className="ml-4 space-y-1">
              <NavLink to="/professor/blogs" className={linkClass}>All Blog</NavLink>
              <NavLink to="/professor/blogs/add" className={linkClass}>Add Blog</NavLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
