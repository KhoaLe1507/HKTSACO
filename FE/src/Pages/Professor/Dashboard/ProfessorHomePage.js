import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../../../Components/ui/card";
import { FaBookOpen, FaCode, FaPenNib } from "react-icons/fa";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"];
const MEDAL_ICONS = ["🥇", "🥈", "🥉"];

const getDifficultyIcon = (difficulty) => {
  switch(difficulty?.toLowerCase()) {
    case 'easy': return '🟢';
    case 'medium': return '🟡';
    case 'hard': return '🔴';
    default: return '⚪';
  }
};

const getFrequencyIcon = (frequent) => {
  switch(frequent) {
    case 'Very Frequent': return '🔥';
    case 'Frequent': return '⭐';
    case 'Rare': return '💎';
    default: return '📝';
  }
};

const getVisibilityIcon = (visibility) => {
  switch(visibility?.toLowerCase()) {
    case 'public': return '🌍';
    case 'private': return '🔒';
    default: return '📄';
  }
};

export default function ProfessorHomePage() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const startStr = startDate.toISOString();
      const endStr = endDate.toISOString();
      const res = await fetch(`https://localhost:7157/api/statistics/professor-dashboard?startDate=${startStr}&endDate=${endStr}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch professor stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading dashboard...</p>
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
            📊 Professor Dashboard
          </h1>
          <p className="text-slate-600">Monitor your teaching activities and content performance</p>
        </div>

        {/* Date Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 mb-8 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">📅 Date Range Filter</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="group">
              <label className="block font-medium text-slate-700 mb-2">Start Date</label>
              <div className="relative">
                <DatePicker 
                  selected={startDate} 
                  onChange={(date) => setStartDate(date)} 
                  className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            <div className="group">
              <label className="block font-medium text-slate-700 mb-2">End Date</label>
              <div className="relative">
                <DatePicker 
                  selected={endDate} 
                  onChange={(date) => setEndDate(date)} 
                  className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <p className="text-blue-100 font-medium">Module Contents</p>
                <h2 className="text-3xl font-bold">{data.moduleContent?.total ?? 0}</h2>
                <p className="text-blue-200 text-sm">Total created</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                💻
              </div>
              <div>
                <p className="text-emerald-100 font-medium">Problems</p>
                <h2 className="text-3xl font-bold">{data.problem?.total ?? 0}</h2>
                <p className="text-emerald-200 text-sm">Coding challenges</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                ✍️
              </div>
              <div>
                <p className="text-amber-100 font-medium">Blog Posts</p>
                <h2 className="text-3xl font-bold">{data.blog?.total ?? 0}</h2>
                <p className="text-amber-200 text-sm">Published articles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Module Content by Section - Updated with Bronze/Silver/Gold/Platinum */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up overflow-hidden relative" style={{animationDelay: '0.4s'}}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full transform translate-x-16 -translate-y-16 opacity-30"></div>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
              📊 Module Content by Section
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={data.moduleContent?.bySection ?? []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  {/* Bronze Gradient */}
                  <linearGradient id="bronzeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#cd7f32" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#b8860b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b4513" stopOpacity={0.7} />
                  </linearGradient>
                  
                  {/* Silver Gradient - Xám */}
                  <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9ca3af" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#6b7280" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#4b5563" stopOpacity={0.7} />
                  </linearGradient>
                  
                  {/* Gold Gradient - Vàng */}
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
                  </linearGradient>
                  
                  {/* Platinum Gradient - Xanh dương */}
                  <linearGradient id="platinumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7} />
                  </linearGradient>
                  
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <XAxis 
                  dataKey="section" 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  allowDecimals={false} 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(16px)'
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)', radius: 4 }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]}
                  filter="url(#shadow)"
                >
                  {(data.moduleContent?.bySection ?? []).map((entry, index) => {
                    // Cycle through bronze, silver, gold, platinum colors
                    const gradients = ['url(#bronzeGradient)', 'url(#silverGradient)', 'url(#goldGradient)', 'url(#platinumGradient)'];
                    const fillColor = gradients[index % gradients.length];
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={fillColor}
                      />
                    );
                  })}
                  <LabelList 
                    dataKey="count" 
                    position="top" 
                    style={{ 
                      fill: '#1e293b', 
                      fontSize: '12px', 
                      fontWeight: '600' 
                    }} 
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Module Content by Frequency */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up overflow-hidden relative" style={{animationDelay: '0.5s'}}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full transform translate-x-16 -translate-y-16 opacity-30"></div>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
              📈 Content by Frequency
            </h3>
            <ResponsiveContainer width="100%" height={320}>
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
                  data={data.moduleContent?.byFrequent ?? []}
                  dataKey="count"
                  nameKey="frequent"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={110}
                  paddingAngle={2}
                  label={({ frequent, percent }) => 
                    `${getFrequencyIcon(frequent)} ${(percent * 100).toFixed(1)}%`
                  }
                  labelLine={false}
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth={2}
                >
                  {(data.moduleContent?.byFrequent ?? []).map((entry, index) => {
                    const gradientColors = [
                      "url(#frequentGradient1)",
                      "url(#frequentGradient2)", 
                      "url(#frequentGradient3)"
                    ];
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={gradientColors[index % gradientColors.length]}
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                      />
                    );
                  })}
                </Pie>
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => (
                    <span style={{ color: '#334155', fontWeight: '500' }}>
                      {getFrequencyIcon(value)} {value}
                    </span>
                  )}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(16px)'
                  }}
                  formatter={(value, name) => [
                    `${value} items`,
                    `${getFrequencyIcon(name)} ${name}`
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Problems by Difficulty */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up overflow-hidden relative" style={{animationDelay: '0.6s'}}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full transform translate-x-16 -translate-y-16 opacity-30"></div>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
              🎯 Problems by Difficulty
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={data.problem?.byDifficulty ?? []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="easyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="hardGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="difficulty" 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${getDifficultyIcon(value)} ${value}`}
                />
                <YAxis 
                  allowDecimals={false} 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(16px)'
                  }}
                  cursor={{ fill: 'rgba(16, 185, 129, 0.1)', radius: 4 }}
                  formatter={(value, name, props) => [
                    `${value} problems`,
                    `${getDifficultyIcon(props.payload.difficulty)} ${props.payload.difficulty}`
                  ]}
                />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]}
                  fill={(entry) => {
                    const difficulty = entry?.difficulty?.toLowerCase();
                    if (difficulty === 'easy') return 'url(#easyGradient)';
                    if (difficulty === 'medium') return 'url(#mediumGradient)';
                    if (difficulty === 'hard') return 'url(#hardGradient)';
                    return 'url(#easyGradient)';
                  }}
                >
                  {(data.problem?.byDifficulty ?? []).map((entry, index) => {
                    const difficulty = entry.difficulty?.toLowerCase();
                    let fillColor = 'url(#easyGradient)';
                    if (difficulty === 'medium') fillColor = 'url(#mediumGradient)';
                    if (difficulty === 'hard') fillColor = 'url(#hardGradient)';
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={fillColor}
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                      />
                    );
                  })}
                  <LabelList 
                    dataKey="count" 
                    position="top" 
                    style={{ 
                      fill: '#1e293b', 
                      fontSize: '12px', 
                      fontWeight: '600' 
                    }} 
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Blog Status Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up overflow-hidden relative" style={{animationDelay: '0.7s'}}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full transform translate-x-16 -translate-y-16 opacity-30"></div>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
              📰 Blog Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <defs>
                  <linearGradient id="publicGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="privateGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                  </radialGradient>
                </defs>
                <Pie
                  data={data.blog?.byStatus ?? []}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={110}
                  paddingAngle={3}
                  label={({ status, percent }) => 
                    `${getVisibilityIcon(status)} ${(percent * 100).toFixed(1)}%`
                  }
                  labelLine={false}
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth={3}
                >
                  {(data.blog?.byStatus ?? []).map((entry, index) => {
                    const status = entry.status?.toLowerCase();
                    let fillColor = 'url(#publicGradient)';
                    if (status === 'private') fillColor = 'url(#privateGradient)';
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={fillColor}
                        style={{ 
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15))',
                          transformOrigin: 'center'
                        }}
                      />
                    );
                  })}
                </Pie>
                {/* Center decoration */}
                <circle cx="50%" cy="50%" r="35" fill="url(#centerGradient)" />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => (
                    <span style={{ color: '#334155', fontWeight: '500' }}>
                      {getVisibilityIcon(value)} {value}
                    </span>
                  )}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(16px)'
                  }}
                  formatter={(value, name) => [
                    `${value} blogs`,
                    `${getVisibilityIcon(name)} ${name}`
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performance Tables */}
        <div className="space-y-8">
          {/* Top Problems */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              🏆 Top Problems by Submissions
            </h3>
            <div className="overflow-hidden rounded-xl border-2 border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">🏅 Rank</th>
                    <th className="text-left px-4 py-3 font-semibold">💻 Problem Name</th>
                    <th className="text-left px-4 py-3 font-semibold">📚 Module Content</th>
                    <th className="text-left px-4 py-3 font-semibold">📖 Section</th>
                    <th className="text-left px-4 py-3 font-semibold">⚡ Difficulty</th>
                    <th className="text-left px-4 py-3 font-semibold">📊 Submissions</th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 backdrop-blur-sm">
                  {(data.problem?.topProblemsBySubmission ?? []).map((item, index) => (
                    <tr key={item.problemId} className="hover:bg-white/80 transition-all duration-200 border-b border-slate-100">
                      <td className="px-4 py-3 text-center text-lg">{MEDAL_ICONS[index] ?? `#${index + 1}`}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.problemName}</td>
                      <td className="px-4 py-3 text-slate-600">{item.moduleContentTitle}</td>
                      <td className="px-4 py-3 text-slate-600">{item.sectionName}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          {getDifficultyIcon(item.difficulty)}
                          <span className="text-slate-700">{item.difficulty}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                          {item.submissionCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Module Contents */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              📚 Recent Module Contents
            </h3>
            <div className="overflow-hidden rounded-xl border-2 border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">🏅 Rank</th>
                    <th className="text-left px-4 py-3 font-semibold">📝 Title</th>
                    <th className="text-left px-4 py-3 font-semibold">📖 Module</th>
                    <th className="text-left px-4 py-3 font-semibold">📚 Section</th>
                    <th className="text-left px-4 py-3 font-semibold">📅 Created Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 backdrop-blur-sm">
                  {(data.moduleContent?.recentModuleContents ?? []).map((item, index) => (
                    <tr key={item.id} className="hover:bg-white/80 transition-all duration-200 border-b border-slate-100">
                      <td className="px-4 py-3 text-center text-lg">{MEDAL_ICONS[index] ?? `#${index + 1}`}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.title}</td>
                      <td className="px-4 py-3 text-slate-600">{item.moduleName}</td>
                      <td className="px-4 py-3 text-slate-600">{item.sectionName}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Blogs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              ✍️ Top Blogs by Comments
            </h3>
            <div className="overflow-hidden rounded-xl border-2 border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">🏅 Rank</th>
                    <th className="text-left px-4 py-3 font-semibold">📰 Title</th>
                    <th className="text-left px-4 py-3 font-semibold">👁️ Visibility</th>
                    <th className="text-left px-4 py-3 font-semibold">📅 Created Date</th>
                    <th className="text-left px-4 py-3 font-semibold">💬 Comments</th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 backdrop-blur-sm">
                  {(data.blog?.topBlogsByComment ?? []).map((item, index) => (
                    <tr key={item.blogPostId} className="hover:bg-white/80 transition-all duration-200 border-b border-slate-100">
                      <td className="px-4 py-3 text-center text-lg">{MEDAL_ICONS[index] ?? `#${index + 1}`}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.title}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          {getVisibilityIcon(item.visibility)}
                          <span className="text-slate-700">{item.visibility}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                          {item.commentCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Dashboard Insights</h4>
                <p className="text-blue-700 text-sm">
                  Monitor your teaching impact with comprehensive analytics. Use date filters to analyze specific periods and track your progress over time.
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

        /* Custom scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}