import React, { useState } from "react";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
import AllProblem from '../AllProblem';
import AddProblem from '../AddProblem';
import AllLearningPath from '../AllLearningPath';
import AddAndEditLearningPath from '../AddAndEditLearningPath';
import ListSection from '../ListSection';
import AddSection from '../AddSection';
import EditSection from '../EditSection';
import ListModule from '../ListModule';
import AddModule from '../AddModule';
import EditModule from '../EditModule';
import ListModuleContent from '../ListModuleContent';
import AddModuleContent from '../AddModuleContent';
import EditModuleContent from '../EditModuleContent';
import AllBlog from '../AllBlog';
import AddBlog from '../AddBlog';
import AllAccount from '../AllAccount';
import AddAccount from '../AddAccount';
import ProfileDetail from '../ProfileDetail';
import EditProfile from '../EditProfile';
import AdminHome from '../Home';

const Sidebar = () => {
  const [open, setOpen] = useState({
    module: true,
    learningPath: false,
    blog: false,
    account: false,
  });
  const [learningPathDropdown, setLearningPathDropdown] = useState(false);
  const navigate = useNavigate();
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <aside className="sidebar w-64 h-screen flex flex-col py-6 px-4 shadow-lg text-sm fixed top-0 left-0 z-50 overflow-y-auto animate-slideIn">
      <div className="mb-8 text-2xl font-extrabold text-center text-navy tracking-wide uppercase">ADMIN DASHBOARD</div>
      <nav className="flex-1 space-y-4 text-navy">
        {/* Module Problem */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div className="font-semibold mb-1 text-navy cursor-pointer flex items-center" onClick={() => toggle('module')}>
            <span className="text-blue-600">📘</span> <span className="ml-2">Module Problem</span>
            <span className="ml-2 transition-transform duration-300">{open.module ? '▼' : '▶'}</span>
          </div>
          {open.module && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <button onClick={() => navigate('/admin/problems')} className="block hover:text-blue-500 transition-all duration-300">All Problem</button>
              <button onClick={() => navigate('/admin/problems/add')} className="block hover:text-blue-500 transition-all duration-300">Add Problem</button>
            </div>
          )}
        </div>
        {/* Learning Path */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div className="font-semibold mb-1 text-navy cursor-pointer flex items-center" onClick={() => setLearningPathDropdown((v) => !v)}>
            <span className="text-blue-600">🗺️</span> <span className="ml-2">Learning Path</span>
            <span className="ml-2 transition-transform duration-300">{learningPathDropdown ? '▼' : '▶'}</span>
          </div>
          {learningPathDropdown && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <button onClick={() => navigate('/admin/learning-path/bronze')} className="block hover:text-blue-500 transition-all duration-300">Bronze</button>
              <button onClick={() => navigate('/admin/learning-path/silver')} className="block hover:text-blue-500 transition-all duration-300">Silver</button>
              <button onClick={() => navigate('/admin/learning-path/gold')} className="block hover:text-blue-500 transition-all duration-300">Gold</button>
              <button onClick={() => navigate('/admin/learning-path/platinum')} className="block hover:text-blue-500 transition-all duration-300">Platinum</button>
              <button onClick={() => navigate('/admin/learning-path/add-edit')} className="block hover:text-blue-500 transition-all duration-300 mt-2">Add and Edit Learning Path</button>
            </div>
          )}
        </div>
        {/* Blog */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div className="font-semibold mb-1 text-navy cursor-pointer flex items-center" onClick={() => toggle('blog')}>
            <span className="text-blue-600">📝</span> <span className="ml-2">Blog</span>
            <span className="ml-2 transition-transform duration-300">{open.blog ? '▼' : '▶'}</span>
          </div>
          {open.blog && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <button onClick={() => navigate('/admin/blogs')} className="block hover:text-blue-500 transition-all duration-300">All Blog</button>
              <button onClick={() => navigate('/admin/blogs/add')} className="block hover:text-blue-500 transition-all duration-300">Add Blog</button>
            </div>
          )}
        </div>
        {/* Account */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div className="font-semibold mb-1 text-navy cursor-pointer flex items-center" onClick={() => toggle('account')}>
            <span className="text-blue-600">👤</span> <span className="ml-2">Account</span>
            <span className="ml-2 transition-transform duration-300">{open.account ? '▼' : '▶'}</span>
          </div>
          {open.account && (
            <div className="ml-4 space-y-1 animate-fadeIn">
              <button onClick={() => navigate('/admin/accounts')} className="block hover:text-blue-500 transition-all duration-300">All Account</button>
              <button onClick={() => navigate('/admin/accounts/add')} className="block hover:text-blue-500 transition-all duration-300">Add Account</button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleProfileMenu = (action) => {
    setDropdownOpen(false);
    if (action === "profile") navigate("/admin/profile");
    else if (action === "edit") navigate("/admin/profile/edit");
    else if (action === "logout") navigate("/logout");
  };
  return (
    <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white text-navy px-6 py-4 flex justify-end items-center z-40 border-b border-gray-200 shadow-sm">
      <div className="flex gap-5 items-center relative ml-auto">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
          >
            👤
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-navy rounded shadow-lg animate-fadeIn border border-gray-200">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={() => handleProfileMenu("profile")}>My Profile</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={() => handleProfileMenu("edit")}>Edit Profile</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={() => handleProfileMenu("logout")}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 text-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="pt-20 px-8">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="problems" element={<AllProblem />} />
            <Route path="problems/add" element={<AddProblem />} />
            <Route path="learning-path/bronze" element={<AllLearningPath section='bronze' />} />
            <Route path="learning-path/silver" element={<AllLearningPath section='silver' />} />
            <Route path="learning-path/gold" element={<AllLearningPath section='gold' />} />
            <Route path="learning-path/platinum" element={<AllLearningPath section='platinum' />} />
            <Route path="learning-path/add-edit" element={<AddAndEditLearningPath />} />
            <Route path="section/add" element={<AddSection />} />
            <Route path="section/:id/edit" element={<EditSection />} />
            <Route path="section/:sectionId/modules" element={<ListModule />} />
            <Route path="module/add" element={<AddModule />} />
            <Route path="module/:id/edit" element={<EditModule />} />
            <Route path="module/:moduleId/contents" element={<ListModuleContent />} />
            <Route path="module-content/add" element={<AddModuleContent />} />
            <Route path="module-content/:id/edit" element={<EditModuleContent />} />
            <Route path="blogs" element={<AllBlog />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="accounts" element={<AllAccount />} />
            <Route path="accounts/add" element={<AddAccount />} />
            <Route path="profile/:id" element={<ProfileDetail />} />
            <Route path="profile/:id/edit" element={<EditProfile />} />
            <Route path="*" element={<div className='text-center text-2xl mt-20'>Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 