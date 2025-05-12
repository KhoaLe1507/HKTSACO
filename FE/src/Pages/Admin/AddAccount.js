import React, { useState } from 'react';

const AddAccount = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    role: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Account created (UI only).");
    console.log(form);
  };

  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold text-navy mb-6">➕ Add Account</h2>

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
