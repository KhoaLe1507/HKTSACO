import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// SVG icons as components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10l9-6 9 6" />
    <path d="M4 10v10h16V10" />
    <path d="M12 14v6" />
    <path d="M8 10v4" />
    <path d="M16 10v4" />
  </svg>
);;

const GenderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="4" />
    <line x1="12" y1="14" x2="12" y2="22" />
    <line x1="9" y1="19" x2="15" y2="19" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const RegisterPage = () => {
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  bio: "",
  username: "",
  password: "",
  gender: "",
  school: "",
  avatarFile: null
});

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const navigate = useNavigate();
  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("FullName", form.fullName);
      formData.append("UserName", form.username);
      formData.append("Email", form.email);
      formData.append("Password", form.password);
      formData.append("Role", 0); // luôn là Student
      formData.append("Gender", form.gender);
      formData.append("PhoneNumber", form.phone);
      formData.append("BirthDate", form.dob);
      formData.append("School", form.school);
      formData.append("Bio", form.bio || "");

      if (form.avatarFile) {
        formData.append("AvatarFile", form.avatarFile); // key trùng với backend
      }

      const res = await fetch("https://localhost:7157/api/auth/register", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        const text = await res.text();
        alert("Đăng ký thất bại: " + text);
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Có lỗi khi xử lý đăng ký.");
    }
  };



  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-gray-800 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDE4NCAxODQiPjxwYXRoIGQ9Ik0wIDE4NGwxODQtMTg0TDE4NCAxODQgMCAwIiBmaWxsPSIjZjdmN2Y3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-green-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-gray-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side decorative panel */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-gray-50 to-green-50 p-12 hidden md:flex flex-col justify-between relative overflow-hidden">
          <div className={`relative z-10 transform transition-all duration-700 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Our Community</h1>
            <p className="text-gray-600 mb-6">Create an account to access all features and begin your journey with us.</p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Access to all platform features</p>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Track your progress seamlessly</p>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Personalized recommendations</p>
              </div>
            </div>
          </div>

          {/* Abstract shapes for decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full opacity-60 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className={`relative z-10 transform transition-all duration-700 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-12 h-1 bg-gray-200 rounded"></div>
              <div className="text-sm text-gray-500">Secure Registration</div>
              <div className="w-12 h-1 bg-gray-200 rounded"></div>
            </div>
            <div className="text-xs text-gray-500 text-center">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</div>
          </div>
        </div>

        {/* Right side registration form */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          {/* Mobile header (visible only on small screens) */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600 text-sm">Join our community today</p>
          </div>

          {/* Logo/Brand section */}
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-500 ${mounted ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-8 opacity-0 -rotate-90"}`}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <div className="w-10 h-10 text-green-500">
                  <UserIcon />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

          <div className="mt-4 border border-gray-200 rounded-xl p-4 shadow-sm bg-white">

            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 text-green-500">
                <DocumentIcon />
              </div>
              <h3 className="text-base font-semibold text-gray-800 tracking-wide">Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Full Name */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleFormChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Phone Number */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                  <PhoneIcon />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700"
                />
              </div>

              {/* Birthdate */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                  <CalendarIcon />
                </div>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleFormChange}
                  placeholder="mm/dd/yyyy"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700"
                />
              </div>
            </div>
            {/* Bio input */}
            <div className={`relative mb-4 transform transition-all duration-500 delay-300 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-3 top-4 transition-colors duration-200 w-5 h-5 ${focused === "bio" ? "text-green-500" : "text-gray-400"}`}>
                <PencilIcon />
              </div>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleFormChange}
                placeholder="Tell us a bit about yourself..."
                rows={4}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border ${
                  focused === "bio"
                    ? "border-green-300 ring-4 ring-green-50"
                    : "border-gray-200"
                } outline-none transition-all duration-300 text-gray-700 resize-none`}
                onFocus={() => setFocused("bio")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Gender */}
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5`}>
                  <GenderIcon />
                </div>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* School */}
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5`}>
                  <SchoolIcon />
                </div>
                <input
                  type="text"
                  name="school"
                  placeholder="School"
                  value={form.school}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700"
                />
              </div>
              {/* Upload Avatar */}
              <div className="md:col-span-2 relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M12 12V4m0 0L8 8m4-4l4 4" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, avatarFile: e.target.files[0] })}
                  className="w-full pl-10 pr-4 py-3 h-[52px] rounded-xl bg-gray-50 border border-gray-200 outline-none transition-all duration-300 text-gray-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 border border-gray-200 rounded-xl p-4 shadow-sm bg-white">

            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 text-green-500">
                <UserIcon />
              </div>
              <h3 className="text-base font-semibold text-gray-800 tracking-wide">Account</h3>
            </div>

            {/* Username input */}
            <div className={`relative mb-4 transform transition-all duration-500 delay-300 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 w-5 h-5 ${focused === 'username' ? 'text-green-500' : 'text-gray-400'}`}>
                <TagIcon />
              </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleFormChange}
                  placeholder="Username"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border ${focused === 'username' ? 'border-green-300 ring-4 ring-green-50' : 'border-gray-200'} outline-none transition-all duration-300 text-gray-700`}
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                />
            </div>

            {/* Password input */}
            <div className={`relative mb-6 transform transition-all duration-500 delay-350 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 w-5 h-5 ${focused === 'password' ? 'text-green-500' : 'text-gray-400'}`}>
                <LockIcon />
              </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleFormChange}
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border ${focused === 'password' ? 'border-green-300 ring-4 ring-green-50' : 'border-gray-200'} outline-none transition-all duration-300 text-gray-700`}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
            </div>
          </div>

          <div className="mt-4">
            {/* Terms & conditions */}
            <div className={`flex items-start mb-6 transform transition-all duration-500 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-600">
                I agree to the <a href="#" className="text-green-500 hover:text-green-700">Terms and Conditions</a> and <a href="#" className="text-green-500 hover:text-green-700">Privacy Policy</a>
              </label>
            </div>

            {/* Register button with animation */}
            <div className={`transform transition-all duration-500 delay-450 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-3 rounded-xl font-semibold text-white shadow-md transform transition-all duration-300 hover:shadow-lg active:scale-98 outline-none focus:ring-4 focus:ring-green-200 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Create Account</span>
                  <div className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </div>
                </span>
              </button>
            </div>
          </div>

            {/* Sign in link */}
            <div className={`text-center mt-6 text-gray-600 transform transition-all duration-500 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              Already have an account?
              <button
                onClick={() => navigate("/login")}
                className="text-green-500 hover:text-green-700 ml-1 transition-colors duration-300 font-medium underline"
              >
                Sign in
              </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;