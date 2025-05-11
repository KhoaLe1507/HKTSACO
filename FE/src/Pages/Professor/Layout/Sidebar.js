import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    module: true,
    roadmap: false,
    blog: false,
  });

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-blue-600 block transition-all duration-300"
      : "block hover:text-blue-500 transition-all duration-300";

  return (
    <aside className="sidebar w-64 h-screen flex flex-col py-6 px-4 shadow-lg text-sm fixed top-0 left-0 z-50 overflow-y-auto animate-slideIn">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/Image/Logo.jpg"
          alt="HKTOJ Logo"
          className="h-14 object-contain"
        />
      </div>

      {/* Tiêu đề */}
      <div className="mb-6 text-2xl font-extrabold text-center text-navy tracking-wide uppercase">
        PROFESSOR DASHBOARD
      </div>

      {/* Nút Home */}
      <div
        onClick={() => navigate("/professor/home")}
        className="cursor-pointer flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-100 text-navy font-semibold mb-3"
      >
        <span className="text-lg">🏠</span>
        <span>Home</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4 text-navy">
        {/* Module Problem */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div
            className="font-semibold mb-1 text-navy cursor-pointer flex items-center"
            onClick={() => toggle("module")}
          >
            <span className="text-blue-600">📘</span>
            <span className="ml-2">Module Problem</span>
            <span className="ml-2 transition-transform duration-300">
              {open.module ? "▼" : "▶"}
            </span>
          </div>
          {open.module && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <NavLink to="/professor/problems" className={linkClass}>
                All Problem
              </NavLink>
              <NavLink to="/professor/problems/add" className={linkClass}>
                Add Problem
              </NavLink>
            </div>
          )}
        </div>

        {/* Learning Path */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div
            className="font-semibold mb-1 text-navy cursor-pointer flex items-center"
            onClick={() => toggle("roadmap")}
          >
            <span className="text-blue-600">🗺️</span>
            <span className="ml-2">Learning Path</span>
            <span className="ml-2 transition-transform duration-300">
              {open.roadmap ? "▼" : "▶"}
            </span>
          </div>
          {open.roadmap && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <NavLink to="/professor/learning-path" className={linkClass}>
                All Learning Path
              </NavLink>
            </div>
          )}
        </div>

        {/* Blog */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div
            className="font-semibold mb-1 text-navy cursor-pointer flex items-center"
            onClick={() => toggle("blog")}
          >
            <span className="text-blue-600">📝</span>
            <span className="ml-2">Blog</span>
            <span className="ml-2 transition-transform duration-300">
              {open.blog ? "▼" : "▶"}
            </span>
          </div>
          {open.blog && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <NavLink to="/professor/blogs" className={linkClass}>
                All Blog
              </NavLink>
              <NavLink to="/professor/blogs/add" className={linkClass}>
                Add Blog
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
