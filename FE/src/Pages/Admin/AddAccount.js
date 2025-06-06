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


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
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
      } else {
        const text = await res.text();
        alert("Tạo tài khoản thất bại: " + text);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi dữ liệu.");
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
    <div className="bg-white max-w-xl mx-auto p-6 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold text-navy mb-6">➕ Add Account</h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Full Name</label>
        <input
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Enter Full Name"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>


      {/* Username */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter username"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>

      {/* Avatar Upload */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, avatarFile: e.target.files[0] })}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>


      {/* Bio */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Write a short description about yourself (max 500 characters)"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm resize-none"
          rows={4}
          maxLength={500}
        />
      </div>

      {/* Birth Date */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Birth Date</label>
        <input
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        >
          <option value="">-- Select Role --</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
        </select>
      </div>
      {/* School */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">School</label>
        <input
          name="school"
          value={form.school || ""}
          onChange={handleChange}
          placeholder="Enter school name"
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
        />
      </div>
      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddAccount;
