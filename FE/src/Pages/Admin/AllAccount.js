import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllAccount = () => {
  const [filters, setFilters] = useState({ keyword: '', role: '' });
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("https://localhost:7157/api/auth/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this account?");
    if (!confirm) return;

    const token = localStorage.getItem("accessToken");
    const res = await fetch(`https://localhost:7157/api/auth/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      alert("Deleted successfully");
      setAccounts(accounts.filter(a => a.userId !== id));
    } else {
      alert("Delete failed");
    }
  };

  const renderRole = (role) => {
    switch (role) {
      case 0: return "Student";
      case 1: return "Professor";
      case 2: return "Admin";
      default: return "Unknown";
    }
  };

  const filteredAccounts = accounts.filter(acc => {
    const keyword = filters.keyword.toLowerCase();
    const matchKeyword = acc.userName.toLowerCase().includes(keyword)
      || acc.email.toLowerCase().includes(keyword)
      || acc.phoneNumber.toLowerCase().includes(keyword);
    const matchRole = filters.role === '' || acc.role.toString() === filters.role;
    return matchKeyword && matchRole;
  });

  return (
    <div className="w-full p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-navy">📋 All Accounts</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by username, email or phone..."
          className="border px-3 py-2 rounded w-64"
          value={filters.keyword}
          onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
        />
        <select
          className="border px-3 py-2 rounded"
          value={filters.role}
          onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
        >
          <option value="">All Roles</option>
          <option value="0">Student</option>
          <option value="1">Professor</option>
          <option value="2">Admin</option>
        </select>
      </div>

      <div className="min-w-[1000px]">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Full Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc, index) => (
              <tr key={acc.userId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{acc.userName}</td>
                <td className="py-2 px-4 border">{acc.fullName}</td>
                <td className="py-2 px-4 border">{acc.email}</td>
                <td className="py-2 px-4 border">{acc.phoneNumber}</td>
                <td className="py-2 px-4 border text-center">{renderRole(acc.role)}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => navigate(`/profile/${acc.userId}`)}
                      className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 transition-all"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${acc.userId}/edit`)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(acc.userId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAccount;
