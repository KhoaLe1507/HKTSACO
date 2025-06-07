import React, { useState } from "react";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
// import AllProblem from '../AllProblem';
import ProblemsPage from '../../ProblemsPage';
import ProblemDetail from '../../ProblemDetail';

import ModuleContentDetail from '../../LearningPathSource/ModuleContentDetail';

// import AddProblem from '../AddProblem';
import AddProblem from '../../Professor/Problems/AddProblem';

import LearningPathPage from "../../LearningPathSource/LearningPathPage";
import AddAndEditLearningPath from '../AddAndEditLearningPath';

import AddSection from '../AddSection';
import EditSection from '../EditSection';
import ListModule from '../ListModule';
import AddModule from '../AddModule';
import EditModule from '../EditModule';
import ListModuleContent from '../ListModuleContent';
import AddModuleContent from '../AddModuleContent';
import EditModuleContent from '../EditModuleContent';

import BlogsPage from '../../BlogsPage';
// import AddBlog from '../AddBlog';
import AddBlog from '../../Professor/Blogs/AddBlog';

import ApprovedBlogPage from '../ApprovedBlogPage';

import AllAccount from '../AllAccount';
import AddAccount from '../AddAccount';
import ProfileDetail from '../ProfileDetail';
import EditProfile from '../EditProfile';
import AdminHome from '../Home';

import axios from "axios";
import { useEffect } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState({
    module: false,
    learningPath: false,
    blog: false,
    account: false,
  });
  const [sections, setSections] = useState([]);
  const [learningPathDropdown, setLearningPathDropdown] = useState(false);
  const navigate = useNavigate();
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  
  useEffect(() => {
    axios.get("https://localhost:7157/api/roadmap/ListAllSectionsDropdown")
      .then(res => setSections(res.data))
      .catch(err => console.error("Failed to fetch sections:", err));
  }, []);

  return (
    <aside className="w-64 h-screen flex flex-col fixed top-0 left-0 z-50 overflow-y-auto bg-white border-r border-gray-200 shadow-lg animate-slide-in-left">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-6 animate-bounce-in" style={{animationDelay: '0.3s'}}>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse-glow"></div>
            <div className="relative bg-white rounded-2xl p-4 shadow-xl border-2 border-blue-100 group-hover:border-blue-300 transition-all duration-300 transform group-hover:scale-105">
              <img src="/Image/Logo.jpg" alt="HKTOJ Logo" className="h-16 object-contain" />
            </div>
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{animationDelay: '0.5s'}}>
          <h1 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">ADMIN DASHBOARD</h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-8 animate-expand-width"></div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        {/* Home Button */}
        <div
          onClick={() => navigate("/admin/home")}
          className="cursor-pointer flex items-center gap-4 px-4 py-4 mb-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-blue-700 group animate-slide-up"
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
              className="cursor-pointer flex items-center justify-between px-4 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 group" 
              onClick={() => toggle('module')}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-all duration-300 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-lg font-black group-hover:text-emerald-700 transition-all duration-300">Module Problem</span>
              </div>
              <div className={`transition-all duration-500 text-gray-400 group-hover:text-emerald-500 ${open.module ? 'rotate-90 scale-110' : ''}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {open.module && (
              <div className="ml-6 mt-3 space-y-2 animate-accordion-down">
                <button 
                  onClick={() => navigate('/admin/problems')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    All Problems
                  </span>
                </button>
                <button 
                  onClick={() => navigate('/admin/problems/add')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Problem
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Learning Path */}
          <div className="animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div 
              className="cursor-pointer flex items-center justify-between px-4 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 group"
              onClick={() => toggle('learningPath')}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-all duration-300 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-black group-hover:text-purple-700 transition-all duration-300">Learning Path</span>
              </div>
              <div className={`transition-all duration-500 text-gray-400 group-hover:text-purple-500 ${open.learningPath ? 'rotate-90 scale-110' : ''}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {open.learningPath && (
              <div className="ml-6 mt-3 space-y-3 animate-accordion-down">
                <div className="text-xs font-black text-purple-600 mb-2 px-4 uppercase tracking-widest animate-pulse">Sections</div>
                <select
                  onChange={(e) => {
                    const selected = JSON.parse(e.target.value);
                    navigate(`/admin/learning-path/${selected.id}/${selected.level}`);
                  }}
                  defaultValue=""
                  className="w-full p-4 rounded-lg bg-white border-2 border-purple-200 text-gray-800 font-bold cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 hover:shadow-lg transform hover:scale-102"
                >
                  <option value="" disabled>Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={JSON.stringify({ id: sec.id, level: sec.name.toLowerCase() })}>
                      {sec.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => navigate('/admin/learning-path/add-edit')}
                  className="block w-full text-left px-4 py-3 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 hover:border-purple-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Add & Edit Learning Path
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
                <button 
                  onClick={() => navigate('/admin/blogs')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                    All Blogs
                  </span>
                </button>
                <button 
                  onClick={() => navigate('/admin/blogs/add')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                    Add Blog
                  </span>
                </button>
                <button 
                  onClick={() => navigate('/admin/blogs/pending')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Approved Blog
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Account */}
          <div className="animate-slide-up" style={{animationDelay: '1s'}}>
            <div 
              className="cursor-pointer flex items-center justify-between px-4 py-4 rounded-xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 group" 
              onClick={() => toggle('account')}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all duration-300 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-black group-hover:text-blue-700 transition-all duration-300">Account</span>
              </div>
              <div className={`transition-all duration-500 text-gray-400 group-hover:text-blue-500 ${open.account ? 'rotate-90 scale-110' : ''}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {open.account && (
              <div className="ml-6 mt-3 space-y-2 animate-accordion-down">
                <button 
                  onClick={() => navigate('/admin/accounts')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    All Accounts
                  </span>
                </button>
                <button 
                  onClick={() => navigate('/admin/accounts/add')} 
                  className="block w-full text-left px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md text-sm font-bold group"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Add Account
                  </span>
                </button>
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

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleProfileMenu = (action) => {
    setDropdownOpen(false);
    if (action === "profile") {
      const userId = localStorage.getItem("userId");
      navigate(`/admin/profile/${userId}`);
    }
    else if (action === "edit") {
      const userId = localStorage.getItem("userId");
      navigate(`/admin/profile/${userId}/edit`);
    }
    else if (action === "logout") navigate("/logout");
  };

  return (
    <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white border-b-2 border-gray-100 px-6 py-3 flex justify-between items-center z-40 shadow-lg animate-slide-down">
      {/* Left side */}
      <div className="flex items-center gap-4 animate-slide-right">
        <div className="flex items-center gap-3 text-gray-700 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-full border border-green-200">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-black uppercase tracking-wider">System Online</span>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>
        <span className="text-lg font-black text-gray-800">Admin Panel</span>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center relative animate-slide-left">
        {/* Search */}
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="w-64 px-4 py-2 pl-10 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-all duration-300 font-semibold text-sm group-hover:shadow-md"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-200 hover:from-yellow-200 hover:to-orange-200 hover:border-yellow-300 transition-all duration-300 transform hover:scale-110 group">
          <svg className="w-5 h-5 text-orange-600 group-hover:text-orange-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">3</div>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-black group-hover:bg-white/30 transition-all duration-300">
              A
            </div>
            <div className="text-left">
              <p className="text-sm font-black">Admin</p>
              <p className="text-xs opacity-80">Super User</p>
            </div>
            <svg className={`w-4 h-4 transition-all duration-500 ${dropdownOpen ? 'rotate-180 scale-110' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl animate-dropdown-bounce overflow-hidden">
              <div className="p-3">
                <div 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-300 rounded-xl group transform hover:scale-105" 
                  onClick={() => handleProfileMenu("profile")}
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all duration-300 group-hover:rotate-12">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 group-hover:text-blue-700">My Profile</p>
                    <p className="text-xs text-gray-500 font-semibold">View profile details</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all duration-300 rounded-xl group transform hover:scale-105" 
                  onClick={() => handleProfileMenu("edit")}
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-all duration-300 group-hover:rotate-12">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 group-hover:text-purple-700">Edit Profile</p>
                    <p className="text-xs text-gray-500 font-semibold">Update information</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2"></div>
                
                <div 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 cursor-pointer transition-all duration-300 rounded-xl group transform hover:scale-105" 
                  onClick={() => handleProfileMenu("logout")}
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-all duration-300 group-hover:rotate-12">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 group-hover:text-red-700">Logout</p>
                    <p className="text-xs text-gray-500 font-semibold">Sign out safely</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-right {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-left {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes dropdown-bounce {
          0% {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-right {
          animation: slide-right 0.8s ease-out 0.3s both;
        }

        .animate-slide-left {
          animation: slide-left 0.8s ease-out 0.5s both;
        }

        .animate-dropdown-bounce {
          animation: dropdown-bounce 0.4s ease-out;
        }
      `}</style>
    </nav>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 animate-page-fade-in">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="pt-20 px-8 pb-8 bg-white min-h-screen animate-content-slide-up">
          <Routes>
            <Route path="home" element={<AdminHome />} />
            {/* <Route path="problems" element={<AllProblem />} /> */}
            <Route path="problems" element={<ProblemsPage />} />
            <Route path="problem/:id/details" element={<ProblemDetail />} />

            {/* <Route path="problems/add" element={<AddProblem />} /> */}
            <Route path="problems/add" element={<AddProblem />} />
            <Route path="learning-path/:sectionId/:level" element={<LearningPathPage />} />

            <Route path="learning-path/add-edit" element={<AddAndEditLearningPath />} />
            <Route path="section/add" element={<AddSection />} />
            <Route path="section/:id/edit" element={<EditSection />} />
            <Route path="section/:sectionId/modules" element={<ListModule />} />
            <Route path="section/:sectionId/module/add" element={<AddModule />} />

            <Route path="section/:sectionId/module/:moduleId/edit" element={<EditModule />} />
            <Route path="module/:moduleId/contents" element={<ListModuleContent />} />
            <Route path="module-content/:moduleId/add" element={<AddModuleContent />} />
            <Route path="module/:moduleId/module-content/:modulecontentId/edit" element={<EditModuleContent />} />

            <Route path="section/:level/module-content/:moduleId/detail" element={<ModuleContentDetail />} />

            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/add" element={<AddBlog />} />

            <Route path="blogs/pending" element={<ApprovedBlogPage />} />
            <Route path="accounts" element={<AllAccount />} />
            <Route path="accounts/add" element={<AddAccount />} />
            <Route path="profile/:id" element={<ProfileDetail />} />
            <Route path="profile/:id/edit" element={<EditProfile />} />
            <Route path="*" element={<div className='text-center text-2xl mt-20'>Not Found</div>} />
          </Routes>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes page-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes content-slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-page-fade-in {
          animation: page-fade-in 0.8s ease-out;
        }

        .animate-content-slide-up {
          animation: content-slide-up 1s ease-out 0.8s both;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;