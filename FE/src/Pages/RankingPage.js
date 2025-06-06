import React, { useState, useEffect } from "react";
import Section from "../Components/Section";
import { useNavigate } from "react-router-dom";
const RankingPage = () => {
  const [activeTab, setActiveTab] = useState("Student");
  const [searchUser, setSearchUser] = useState("");
  const [searchSchool, setSearchSchool] = useState("");
  const [rankingData, setRankingData] = useState([]);
  
  const navigate = useNavigate();

  // Mock data for demo purposes
  const currentUserId = parseInt(localStorage.getItem("userId"));
  const currentUserRole = parseInt(localStorage.getItem("role"));


  useEffect(() => {
    const fetchRanking = async () => {
      const token = localStorage.getItem("accessToken");
      const apiUrl =
        activeTab === "Student"
          ? "https://localhost:7157/api/auth/ranking/students"
          : "https://localhost:7157/api/auth/ranking/professors";

      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRankingData(data);
    };

    fetchRanking();
  }, [activeTab]);

  const filteredData = rankingData
    .filter(
      (r) =>
        r.userName.toLowerCase().includes(searchUser.toLowerCase()) ||
        r.fullName.toLowerCase().includes(searchUser.toLowerCase())
    )
    .filter((r) =>
      (r.school || "").toLowerCase().includes(searchSchool.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="px-4 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            🏆 Ranking
          </h1>
          <p className="text-slate-600">Compete and see where you stand among the best</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {["Student", "Professor"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200 hover:bg-slate-50 hover:border-indigo-300 shadow-sm hover:shadow-md"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="flex items-center gap-2">
                {tab === "Student" ? "🎓" : "👨‍🏫"}
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Username or Full Name"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="w-full border-2 border-slate-200 px-4 py-3 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
              👤
            </div>
          </div>
          
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search School"
              value={searchSchool}
              onChange={(e) => setSearchSchool(e.target.value)}
              className="w-full border-2 border-slate-200 px-4 py-3 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
              🏫
            </div>
          </div>

          {[0, 1].includes(currentUserRole) && (
            <button
              onClick={() => {
                const el = document.getElementById("my-rank");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl whitespace-nowrap"
            >
              <span className="text-lg">📍</span>
              View My Rank
            </button>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-slate-100 overflow-hidden animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-slate-200">
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      🏅 Rank
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      👤 Username
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      📝 Full Name
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      🏫 School
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      {activeTab === "Student" ? "✅ Problem Solved" : "➕ Problem Created"}
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      ⚡ Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((user, index) => {
                  const isCurrentUser = user.userId === currentUserId;
                  const rankIcon =
                    index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `#${index + 1}`;

                  return (
                    <tr
                      key={user.userId}
                      id={isCurrentUser ? "my-rank" : undefined}
                      className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 animate-fade-in-up ${
                        isCurrentUser 
                          ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-amber-400 font-medium shadow-sm" 
                          : "hover:shadow-sm"
                      }`}
                      style={{animationDelay: `${0.1 * index}s`}}
                    >
                      <td className="px-6 py-4">
                        <div className={`text-2xl font-bold ${
                          index < 3 ? "animate-bounce" : ""
                        } ${isCurrentUser ? "text-amber-600" : "text-slate-700"}`}>
                          {rankIcon}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                            isCurrentUser 
                              ? "bg-gradient-to-r from-amber-400 to-orange-400"
                              : index < 3
                              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                              : "bg-gradient-to-r from-slate-400 to-slate-500"
                          }`}>
                            {user.userName?.[0] || "?"}
                          </div>
                          <span className={`font-medium ${isCurrentUser ? "text-amber-800" : "text-slate-800"}`}>
                            {user.userName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${isCurrentUser ? "text-amber-800" : "text-slate-700"}`}>
                          {user.fullName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.school 
                            ? isCurrentUser 
                              ? "bg-amber-100 text-amber-700" 
                              : "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {user.school || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 font-bold text-lg ${
                          isCurrentUser ? "text-amber-600" : "text-slate-700"
                        }`}>
                          <span className="text-2xl">
                            {activeTab === "Student" ? "🎯" : "🛠️"}
                          </span>
                          {activeTab === "Student"
                            ? user.problemSolved
                            : user.problemCreated}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/profile/${user.userId}`)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <span>👁️</span>
                          View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No rankings found</h3>
            <p className="text-slate-500">Try adjusting your search filters</p>
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

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
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

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default RankingPage;