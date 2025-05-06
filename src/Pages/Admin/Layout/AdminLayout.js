import React, { useState } from "react";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
import AllRoadMap from '../AllRoadMap';
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

const Sidebar = () => {
  const [open, setOpen] = useState({
    module: true,
    roadmap: false,
    blog: false,
    account: false,
  });
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-[#14213d] h-screen flex flex-col py-6 px-4 shadow-lg text-sm fixed top-0 left-0 z-50 overflow-y-auto">
      <div className="mb-8 text-2xl font-extrabold text-center text-white tracking-wide uppercase">Admin Dashboard</div>
      <nav className="flex-1 space-y-4 text-white">
        {/* Module Problem */}
        <div>
          <div className="font-semibold mb-1 text-gray-300 cursor-pointer flex items-center" onClick={() => toggle('module')}>
            📘 Module Problem
            <span className="ml-2">{open.module ? '▼' : '▶'}</span>
          </div>
          {open.module && (
            <div className="ml-4 space-y-1">
              <button onClick={() => navigate('/admin/problems')} className="block hover:text-yellow-300">All Problem</button>
              <button onClick={() => navigate('/admin/problems/add')} className="block hover:text-yellow-300">Add Problem</button>
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
              <button onClick={() => navigate('/admin/roadmap')} className="block hover:text-yellow-300">All Roadmap</button>
              <button onClick={() => navigate('/admin/roadmap/add-edit')} className="block hover:text-yellow-300">Add and Edit Roadmap</button>
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
              <button onClick={() => navigate('/admin/blogs')} className="block hover:text-yellow-300">All Blog</button>
              <button onClick={() => navigate('/admin/blogs/add')} className="block hover:text-yellow-300">Add Blog</button>
            </div>
          )}
        </div>
        {/* Account */}
        <div>
          <div className="font-semibold mb-1 text-gray-300 cursor-pointer flex items-center" onClick={() => toggle('account')}>
            👤 Account
            <span className="ml-2">{open.account ? '▼' : '▶'}</span>
          </div>
          {open.account && (
            <div className="ml-4 space-y-1">
              <button onClick={() => navigate('/admin/accounts')} className="block hover:text-yellow-300">All Account</button>
              <button onClick={() => navigate('/admin/accounts/add')} className="block hover:text-yellow-300">Add Account</button>
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
    <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-black text-white px-6 py-4 flex justify-between items-center z-40">
      <div className="text-xl font-bold">Admin Panel</div>
      <div className="flex gap-5 items-center relative ml-auto">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center"
          >
            👤
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-10">
              <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileMenu("profile")}>My Profile</div>
              <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileMenu("edit")}>Edit Profile</div>
              <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileMenu("logout")}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex bg-[#0f1f3b] text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="pt-20 px-8">
          <Routes>
            <Route path="accounts" element={<AllAccount />} />
            <Route path="accounts/add" element={<AddAccount />} />
            <Route path="roadmap" element={<AllRoadMap />} />
            <Route path="roadmap/add-edit" element={<ListSection />} />
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
            <Route path="profile/:id" element={<ProfileDetail />} />
            <Route path="profile/:id/edit" element={<EditProfile />} />
            {/* Default: show nothing or a welcome message */}
            <Route path="*" element={<div className='text-center text-2xl mt-20'>Welcome to Admin Dashboard</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 