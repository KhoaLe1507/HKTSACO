import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllAccount = () => {
  const [filters, setFilters] = useState({ keyword: '', role: '' });
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("https://localhost:7157/api/auth/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this account?");
    if (!confirm) return;

    setDeletingId(id);
    try {
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
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
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

  const getRoleColor = (role) => {
    switch (role) {
      case 0: return "bg-blue-100 text-blue-700";
      case 1: return "bg-green-100 text-green-700";
      case 2: return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 0: return "🎓";
      case 1: return "👨‍🏫";
      case 2: return "👑";
      default: return "❓";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            📋 All Accounts
          </h1>
          <p className="text-slate-600">Manage all user accounts in the system</p>
        </div>

        {/* Filters Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by username, email or phone..."
                value={filters.keyword}
                onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </div>
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={filters.role}
                onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                className="pl-12 pr-8 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md appearance-none"
              >
                <option value="">All Roles</option>
                <option value="0">🎓 Student</option>
                <option value="1">👨‍🏫 Professor</option>
                <option value="2">👑 Admin</option>
              </select>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                🏷️
              </div>
            </div>

            {/* Add Account Button */}
            <button
              onClick={() => navigate('/admin/accounts/add')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl whitespace-nowrap"
            >
              <span className="text-lg">➕</span>
              Add Account
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Total Accounts: <span className="font-semibold text-indigo-600">{accounts.length}</span></span>
              <span>Filtered Results: <span className="font-semibold text-purple-600">{filteredAccounts.length}</span></span>
            </div>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="space-y-4">
          {filteredAccounts.map((acc, index) => (
            <div
              key={acc.userId}
              className="bg-white/80 backdrop-blur-sm border-2 border-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{animationDelay: `${0.1 * (index % 10)}s`}}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                {/* Index Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                  {/* Username & Full Name */}
                  <div className="md:col-span-1">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-800 text-lg">{acc.userName}</p>
                      <p className="text-slate-600 text-sm">{acc.fullName}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="md:col-span-1">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 font-medium">Email</p>
                      <p className="text-slate-700 text-sm truncate">{acc.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-1">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 font-medium">Phone</p>
                      <p className="text-slate-700 text-sm">{acc.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="md:col-span-1">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(acc.role)}`}>
                      <span>{getRoleIcon(acc.role)}</span>
                      {renderRole(acc.role)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-1 flex items-center gap-2 justify-end">
                    <button
                      onClick={() => navigate(`/profile/${acc.userId}`)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1"
                    >
                      <span>👁️</span>
                      Detail
                    </button>
                    
                    <button
                      onClick={() => navigate(`/profile/${acc.userId}/edit`)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1"
                    >
                      <span>✏️</span>
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(acc.userId)}
                      disabled={deletingId === acc.userId}
                      className={`bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 ${
                        deletingId === acc.userId ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {deletingId === acc.userId ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <span>🗑️</span>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAccounts.length === 0 && !isLoading && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              {accounts.length === 0 ? "No accounts found" : "No accounts match your search"}
            </h3>
            <p className="text-slate-500 mb-6">
              {accounts.length === 0 
                ? "Start by creating your first account!"
                : "Try adjusting your search filters"
              }
            </p>
            {accounts.length === 0 && (
              <button
                onClick={() => navigate('/add-account')}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <span className="text-lg">➕</span>
                Create First Account
              </button>
            )}
          </div>
        )}
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

export default AllAccount;