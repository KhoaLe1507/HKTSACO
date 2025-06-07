import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, ResponsiveContainer, Legend, LabelList
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../../Components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"];

export default function AdminHomePage() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const startStr = startDate.toISOString();
        const endStr = endDate.toISOString();
        const res = await fetch(`https://localhost:7157/api/statistics/admin-dashboard?startDate=${startStr}&endDate=${endStr}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch admin dashboard stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No data available</h3>
          <p className="text-slate-500">Unable to load dashboard statistics at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">Comprehensive platform analytics and system overview</p>
        </div>

        {/* Date Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 mb-8 animate-fade-in-up relative z-50">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Analytics Date Range</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="group relative z-50">
              <label className="block font-medium text-slate-700 mb-2">Start Date</label>
              <div className="relative z-50">
                <DatePicker 
                  selected={startDate} 
                  onChange={(date) => setStartDate(date)} 
                  className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800" 
                  popperClassName="date-picker-popper"
                  popperPlacement="bottom-start"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            <div className="group relative z-50">
              <label className="block font-medium text-slate-700 mb-2">End Date</label>
              <div className="relative z-50">
                <DatePicker 
                  selected={endDate} 
                  onChange={(date) => setEndDate(date)} 
                  className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800" 
                  popperClassName="date-picker-popper"
                  popperPlacement="bottom-start"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                <div className="w-8 h-8 bg-white/40 rounded-lg"></div>
              </div>
              <div>
                <p className="text-blue-100 font-medium">Total Users</p>
                <h2 className="text-3xl font-bold">{data.user?.byRole?.reduce((sum, role) => sum + role.count, 0) ?? 0}</h2>
                <p className="text-blue-200 text-sm">Platform members</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                <div className="w-8 h-8 bg-white/40 rounded-lg"></div>
              </div>
              <div>
                <p className="text-emerald-100 font-medium">Total Blogs</p>
                <h2 className="text-3xl font-bold">{data.blog?.blogByStatus?.reduce((sum, status) => sum + status.count, 0) ?? 0}</h2>
                <p className="text-emerald-200 text-sm">Published articles</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                <div className="w-8 h-8 bg-white/40 rounded-lg"></div>
              </div>
              <div>
                <p className="text-purple-100 font-medium">Total Problems</p>
                <h2 className="text-3xl font-bold">{data.problem?.problemByDifficulty?.reduce((sum, diff) => sum + diff.count, 0) ?? 0}</h2>
                <p className="text-purple-200 text-sm">Coding challenges</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                <div className="w-8 h-8 bg-white/40 rounded-lg"></div>
              </div>
              <div>
                <p className="text-amber-100 font-medium">Total Lessons</p>
                <h2 className="text-3xl font-bold">{data.learning?.totalModuleContents ?? 0}</h2>
                <p className="text-amber-200 text-sm">Learning materials</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            User Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* User Role Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">User Role Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    <linearGradient id="userRoleGradient1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="userRoleGradient2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="userRoleGradient3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <Pie 
                    data={data.user?.byRole ?? []} 
                    dataKey="count" 
                    nameKey="role" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth={2}
                  >
                    {(data.user?.byRole ?? []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#userRoleGradient${(index % 3) + 1})`} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(16px)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* New Users Over Time */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">New Users Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.user?.usersOverTime ?? []}>
                  <defs>
                    <linearGradient id="userLineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(16px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fill="url(#userLineGradient)"
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Users Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Students by Problem Solved</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={data.user?.topStudents ?? []}>
                  <defs>
                    <linearGradient id="studentGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis dataKey="fullName" type="category" stroke="#64748b" fontSize={12} width={100} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="problemSolved" fill="url(#studentGradient)" radius={[0, 8, 8, 0]}>
                    <LabelList dataKey="problemSolved" position="right" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Professors by Problem Created</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={data.user?.topProfessors ?? []}>
                  <defs>
                    <linearGradient id="professorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis dataKey="fullName" type="category" stroke="#64748b" fontSize={12} width={100} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="problemCreated" fill="url(#professorGradient)" radius={[0, 8, 8, 0]}>
                    <LabelList dataKey="problemCreated" position="right" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Blog Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            Blog Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Blog Status Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Blog Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    <linearGradient id="blogGradient1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="blogGradient2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <Pie 
                    data={data.blog?.blogByStatus ?? []} 
                    dataKey="count" 
                    nameKey="status" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    paddingAngle={3}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth={3}
                  >
                    {(data.blog?.blogByStatus ?? []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#blogGradient${(index % 2) + 1})`} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Blog Authors */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Blog Authors</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.blog?.topBloggers ?? []}>
                  <defs>
                    <linearGradient id="bloggerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="url(#bloggerGradient)" radius={[8, 8, 0, 0]}>
                    <LabelList dataKey="count" position="top" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Blogs by Comments */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Blogs by Comment Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.blog?.commentByBlog ?? []}>
                <defs>
                  <linearGradient id="commentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="blogTitle" stroke="#64748b" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="url(#commentGradient)" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="count" position="top" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Problem Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            Problem Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Problem Difficulty Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Problem Difficulty Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    <linearGradient id="difficultyGradient1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="difficultyGradient2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="difficultyGradient3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                  <Pie 
                    data={data.problem?.problemByDifficulty ?? []} 
                    dataKey="count" 
                    nameKey="difficulty" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth={2}
                  >
                    {(data.problem?.problemByDifficulty ?? []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#difficultyGradient${(index % 3) + 1})`} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Problems by Submission */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.3s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Problems by Submission Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.problem?.topProblems ?? []}>
                  <defs>
                    <linearGradient id="problemGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a4de6c" />
                      <stop offset="100%" stopColor="#82ca9d" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="problemName" stroke="#64748b" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="url(#problemGradient)" radius={[8, 8, 0, 0]}>
                    <LabelList dataKey="count" position="top" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Problem Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submission Result Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Submission Result Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    <linearGradient id="judgeGradient1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="judgeGradient2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="judgeGradient3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <Pie 
                    data={data.problem?.judgeDistribution ?? []} 
                    dataKey="count" 
                    nameKey="result" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth={2}
                  >
                    {(data.problem?.judgeDistribution ?? []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#judgeGradient${(index % 3) + 1})`} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Submissions Over Time */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Submissions Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.problem?.submissionOverTime ?? []}>
                  <defs>
                    <linearGradient id="submissionLineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d88484" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#d88484" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(16px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#d88484" 
                    strokeWidth={3}
                    fill="url(#submissionLineGradient)"
                    dot={{ fill: '#d88484', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#d88484', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Learning Path Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            Learning Path Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Lessons by Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.6s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Lessons by Section</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.learning?.lessonBySection ?? []}>
                  <defs>
                    <linearGradient id="sectionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8884d8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="section" stroke="#64748b" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="url(#sectionGradient)" radius={[8, 8, 0, 0]}>
                    <LabelList dataKey="count" position="top" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lessons by Frequent Level */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.7s'}}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Lessons by Frequent Level</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    <linearGradient id="frequentGradient1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="frequentGradient2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="frequentGradient3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                  <Pie 
                    data={data.learning?.lessonByFrequent ?? []} 
                    dataKey="count" 
                    nameKey="frequent" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth={2}
                  >
                    {(data.learning?.lessonByFrequent ?? []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#frequentGradient${(index % 3) + 1})`} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Authors by Lesson Created */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.8s'}}>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Authors by Lesson Created</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.learning?.topAuthors ?? []}>
                <defs>
                  <linearGradient id="authorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d0ed57" />
                    <stop offset="100%" stopColor="#a4de6c" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="author" stroke="#64748b" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="url(#authorGradient)" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="count" position="top" style={{ fill: '#1e293b', fontSize: '12px', fontWeight: '600' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 animate-fade-in-up" style={{animationDelay: '1.9s'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl"></div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Admin Dashboard Overview</h4>
                <p className="text-blue-700 text-sm">
                  Monitor platform performance with comprehensive analytics. Use date filters to analyze specific periods and track system growth over time.
                </p>
              </div>
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

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        /* DatePicker z-index fix */
        :global(.date-picker-popper) {
          z-index: 9999 !important;
        }
        
        :global(.react-datepicker-popper) {
          z-index: 9999 !important;
        }
        
        :global(.react-datepicker) {
          z-index: 9999 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          border: none !important;
          border-radius: 16px !important;
          background-color: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(16px) !important;
        }
      `}</style>
    </div>
  );
}