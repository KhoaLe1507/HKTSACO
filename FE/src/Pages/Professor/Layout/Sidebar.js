import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    module: false,
    roadmap: false,
    blog: false,
  });
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7157/api/roadmap/ListAllSectionsDropdown")
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Failed to fetch sections:", err));
  }, []);

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-blue-600 block transition-all duration-300"
      : "block hover:text-blue-500 transition-all duration-300";

  return (
    <aside className="w-64 h-screen flex flex-col fixed top-0 left-0 z-50 overflow-y-auto bg-white border-r border-gray-200 shadow-lg animate-slide-in-left">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-6 animate-bounce-in" style={{animationDelay: '0.3s'}}>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse-glow"></div>
            <div className="relative bg-white rounded-2xl p-4 shadow-xl border-2 border-green-100 group-hover:border-green-300 transition-all duration-300 transform group-hover:scale-105">
              <img src="/Image/Logo.jpg" alt="HKTOJ Logo" className="h-16 object-contain" />
            </div>
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{animationDelay: '0.5s'}}>
          <h1 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">PROFESSOR DASHBOARD</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        {/* Home Button */}
        <div
          onClick={() => navigate("/professor/home")}
          className="cursor-pointer flex items-center gap-4 px-4 py-4 mb-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-green-700 group animate-slide-up"
          style={{animationDelay: '0.6s'}}
        >
          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-lg group-hover:tracking-wide transition-all duration-300">Home</span>
          <div className="ml-auto w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 group-hover:scale-150 transition-all duration-300"></div>
        </div>

        <nav className="space-y-3 text-gray-800">
          {/* Module Problem */}
          <div className="animate-slide-up" style={{animationDelay: '0.7s'}}>
            <div 
              className="cursor-pointer flex items-center justify-between px-4 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 group" 
              onClick={() => toggle('module')}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all duration-300 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-lg font-black group-hover:text-blue-700 transition-all duration-300">Module Problem</span>
              </div>
              <div className={`transition-all duration-500 text-gray-400 group-hover:text-blue-500 ${open.module ? 'rotate-90 scale-110' : ''}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {open.module && (
              <div className="ml-6 mt-3 space-y-2 animate-accordion-down">
                <NavLink 
                  to="/professor/problems" 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    All Problems
                  </span>
                </NavLink>
                <NavLink 
                  to="/professor/problems/add" 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Problem
                  </span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Learning Path */}
          <div className="animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div 
              className="cursor-pointer flex items-center justify-between px-4 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 group"
              onClick={() => toggle('roadmap')}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-all duration-300 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-black group-hover:text-purple-700 transition-all duration-300">Learning Path</span>
              </div>
              <div className={`transition-all duration-500 text-gray-400 group-hover:text-purple-500 ${open.roadmap ? 'rotate-90 scale-110' : ''}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {open.roadmap && (
              <div className="ml-6 mt-3 space-y-3 animate-accordion-down">
                <div className="text-xs font-black text-purple-600 mb-2 px-4 uppercase tracking-widest animate-pulse">Sections</div>
                <select
                  title="Select a learning level to view its roadmap"
                  onChange={(e) => {
                    const selected = JSON.parse(e.target.value);
                    if (selected) navigate(`/professor/learning-path/${selected.id}/${selected.name.toLowerCase()}`);
                  }}
                  defaultValue=""
                  className="w-full p-4 rounded-lg bg-white border-2 border-purple-200 text-gray-800 font-bold cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 hover:shadow-lg transform hover:scale-102"
                >
                  <option value="" disabled>Choose Section</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={JSON.stringify({ id: sec.id, name: sec.name })}>
                      {sec.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => navigate('/professor/my-module-content')}
                  className="block w-full text-left px-4 py-3 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 hover:border-purple-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit My Module Content
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Blog */}
          <div className="animate-slide-up" style={{animationDelay: '0.9s'}}>
            <div 
              className="cursor-pointer flex items-center justify-between px-4 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-orange-200 hover:bg-orange-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 group" 
              onClick={() => toggle('blog')}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-all duration-300 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-black group-hover:text-orange-700 transition-all duration-300">Blog</span>
              </div>
              <div className={`transition-all duration-500 text-gray-400 group-hover:text-orange-500 ${open.blog ? 'rotate-90 scale-110' : ''}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {open.blog && (
              <div className="ml-6 mt-3 space-y-2 animate-accordion-down">
                <NavLink 
                  to="/professor/blogs" 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                    All Blogs
                  </span>
                </NavLink>
                <NavLink 
                  to="/professor/blogs/add" 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                    Add Blog
                  </span>
                </NavLink>
                <NavLink 
                  to="/professor/blogs/my" 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    My Blogs
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3) rotate(-5deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes expand-width {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes accordion-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-expand-width {
          animation: expand-width 1s ease-out;
          animation-delay: 0.8s;
          animation-fill-mode: both;
        }

        .animate-accordion-down {
          animation: accordion-down 0.5s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;