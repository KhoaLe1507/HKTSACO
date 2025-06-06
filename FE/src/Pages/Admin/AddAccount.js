import React, { useState } from 'react';

const AddAccount = () => {
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role: '',
    gender: '',
    birthDate: '',
    school: '',
    avatarFile: null,
    bio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("FullName", form.fullname);
      formData.append("UserName", form.username);
      formData.append("Password", form.password);
      formData.append("Email", form.email);
      formData.append("PhoneNumber", form.phone);
      formData.append("Role", roleToInt(form.role));
      formData.append("BirthDate", form.birthDate);
      formData.append("Gender", form.gender);
      formData.append("School", form.school || "");
      formData.append("Bio", form.bio || "");
      if (form.avatarFile) {
        formData.append("AvatarFile", form.avatarFile); // key cần trùng backend
      }

      const res = await fetch("https://localhost:7157/api/auth/register-by-admin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Tạo tài khoản thành công!");
        // Reset form after successful creation
        setForm({
          fullname: '',
          username: '',
          password: '',
          email: '',
          phone: '',
          role: '',
          gender: '',
          birthDate: '',
          school: '',
          avatarFile: null,
          bio: '',
        });
      } else {
        const text = await res.text();
        alert("Tạo tài khoản thất bại: " + text);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi dữ liệu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleToInt = (role) => {
    switch (role) {
      case "Student":
        return 0;
      case "Professor":
        return 1;
      case "Admin":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            ➕ Add Account
          </h1>
          <p className="text-slate-600">Create a new user account</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-slate-100 p-8 animate-fade-in-up hover:shadow-2xl transition-all duration-500">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-indigo-100 pb-3">
                👤 Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  >
                    <option value="">-- Select Role --</option>
                    <option value="Admin">👑 Admin</option>
                    <option value="Professor">👨‍🏫 Professor</option>
                    <option value="Student">🎓 Student</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-purple-100 pb-3">
                👨‍💼 Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Birth Date</label>
                  <input
                    name="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">👨 Male</option>
                    <option value="Female">👩 Female</option>
                    <option value="Other">🏳️‍🌈 Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Write a short description about yourself (max 500 characters)"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300 resize-none"
                  rows={4}
                  maxLength={500}
                />
                <div className="text-right text-xs text-slate-500 mt-1">
                  {form.bio.length}/500 characters
                </div>
              </div>
            </div>

            {/* School Information */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-blue-100 pb-3">
                🏫 School Information
              </h3>
              
              <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/60 rounded-2xl p-6 border border-blue-100">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">School</label>
                  <input
                    name="school"
                    value={form.school || ""}
                    onChange={handleChange}
                    placeholder="Enter school name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-green-100 pb-3">
                📷 Avatar Upload
              </h3>
              
              <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/60 rounded-2xl p-6 border border-green-100">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Choose Avatar Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, avatarFile: e.target.files[0] })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                  />
                  {form.avatarFile && (
                    <div className="mt-3 p-3 bg-green-100 rounded-lg">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        ✅ Selected: {form.avatarFile.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 hover:from-green-500 hover:via-teal-500 hover:to-emerald-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="text-lg">💾</span>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddAccount;