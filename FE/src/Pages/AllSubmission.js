import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "Wrong Answer": return "text-red-600 bg-red-50 border-red-200";
    case "Time Limit Exceeded": return "text-amber-600 bg-amber-50 border-amber-200";
    case "Memory Limit Exceeded": return "text-purple-600 bg-purple-50 border-purple-200";
    default: return "text-slate-600 bg-slate-50 border-slate-200";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Accepted": return "✅";
    case "Wrong Answer": return "❌";
    case "Time Limit Exceeded": return "⏰";
    case "Memory Limit Exceeded": return "💾";
    default: return "❓";
  }
};

const getLanguageIcon = (language) => {
  const lang = language.toLowerCase();
  if (lang.includes('python')) return '🐍';
  if (lang.includes('java')) return '☕';
  if (lang.includes('cpp') || lang.includes('c++')) return '⚡';
  if (lang.includes('javascript') || lang.includes('js')) return '🟨';
  if (lang.includes('csharp') || lang.includes('c#')) return '🔷';
  return '💻';
};

const AllSubmission = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // problemId from route
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("submittedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(`https://localhost:7157/api/problem/getallsubmission/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        const mapped = data.map((s) => ({
          id: s.submissionId,
          submittedAt: s.submitAtTime,
          username: s.userName,
          problemName: s.problemName,
          timeExec: `${s.timeExecuted} ms`,
          memory: `${s.memory} KB`,
          language: s.language,
          result: s.result,
          timeExecutedRaw: s.timeExecuted,
          memoryRaw: s.memory
        }));

        setSubmissions(mapped);
      } catch (err) {
        console.error("Error loading submissions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [id]);

  const filteredAndSortedSubmissions = submissions
    .filter(s => filterStatus === "all" || s.result === filterStatus)
    .sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'username':
          aValue = a.username.toLowerCase();
          bValue = b.username.toLowerCase();
          break;
        case 'timeExec':
          aValue = a.timeExecutedRaw;
          bValue = b.timeExecutedRaw;
          break;
        case 'memory':
          aValue = a.memoryRaw;
          bValue = b.memoryRaw;
          break;
        case 'result':
          aValue = a.result.toLowerCase();
          bValue = b.result.toLowerCase();
          break;
        case 'submittedAt':
          aValue = new Date(a.submittedAt);
          bValue = new Date(b.submittedAt);
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getPerformanceColor = (timeMs, memoryKB) => {
    if (timeMs < 100 && memoryKB < 1024) return "text-emerald-600";
    if (timeMs < 500 && memoryKB < 5120) return "text-amber-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading submissions...</p>
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
            📑 All Submissions
          </h1>
          <p className="text-slate-600">Review all problem submissions and their results</p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Stats and Filters */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700">{submissions.length}</div>
                  <div className="text-indigo-600 text-sm">Total Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {submissions.filter(s => s.result === "Accepted").length}
                  </div>
                  <div className="text-emerald-600 text-sm">Accepted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-700">
                    {submissions.filter(s => s.result === "Wrong Answer").length}
                  </div>
                  <div className="text-red-600 text-sm">Wrong Answer</div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-slate-800"
                >
                  <option value="all">All Status</option>
                  <option value="Accepted">✅ Accepted</option>
                  <option value="Wrong Answer">❌ Wrong Answer</option>
                  <option value="Time Limit Exceeded">⏰ Time Limit</option>
                  <option value="Memory Limit Exceeded">💾 Memory Limit</option>
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-slate-800"
                >
                  <option value="submittedAt-desc">🕐 Newest First</option>
                  <option value="submittedAt-asc">🕐 Oldest First</option>
                  <option value="username-asc">👤 Username A-Z</option>
                  <option value="username-desc">👤 Username Z-A</option>
                  <option value="timeExec-asc">⚡ Fastest First</option>
                  <option value="timeExec-desc">⚡ Slowest First</option>
                  <option value="memory-asc">💾 Least Memory</option>
                  <option value="memory-desc">💾 Most Memory</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="overflow-hidden rounded-xl border-2 border-slate-200 shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-4 font-semibold">🆔 ID</th>
                    <th 
                      className="text-left px-4 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('submittedAt')}
                    >
                      <div className="flex items-center gap-2">
                        🕐 Submitted At
                        {sortBy === 'submittedAt' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left px-4 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('username')}
                    >
                      <div className="flex items-center gap-2">
                        👤 Username
                        {sortBy === 'username' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-left px-4 py-4 font-semibold">📝 Problem</th>
                    <th 
                      className="text-left px-4 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('timeExec')}
                    >
                      <div className="flex items-center gap-2">
                        ⚡ Time
                        {sortBy === 'timeExec' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left px-4 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('memory')}
                    >
                      <div className="flex items-center gap-2">
                        💾 Memory
                        {sortBy === 'memory' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-left px-4 py-4 font-semibold">💻 Language</th>
                    <th 
                      className="text-left px-4 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('result')}
                    >
                      <div className="flex items-center gap-2">
                        🎯 Result
                        {sortBy === 'result' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-left px-4 py-4 font-semibold">🔍 Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 backdrop-blur-sm">
                  {filteredAndSortedSubmissions.map((s, index) => (
                    <tr 
                      key={s.id} 
                      className="hover:bg-white/80 transition-all duration-200 border-b border-slate-100 group"
                    >
                      <td className="px-4 py-3 font-mono text-sm text-slate-600">#{s.id}</td>
                      <td className="px-4 py-3 text-slate-800">
                        <div className="text-sm">
                          {new Date(s.submittedAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {s.username.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{s.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        <span className="max-w-xs truncate block" title={s.problemName}>
                          {s.problemName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-sm ${getPerformanceColor(s.timeExecutedRaw, s.memoryRaw)}`}>
                          {s.timeExec}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-sm ${getPerformanceColor(s.timeExecutedRaw, s.memoryRaw)}`}>
                          {s.memory}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getLanguageIcon(s.language)}</span>
                          <span className="text-sm">{s.language}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(s.result)}`}>
                          <span>{getStatusIcon(s.result)}</span>
                          {s.result}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/submission/${s.id}`)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 group"
                        >
                          <span className="group-hover:scale-110 transition-transform duration-300">🔍</span>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredAndSortedSubmissions.length === 0 && !isLoading && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {submissions.length === 0 ? "No submissions yet" : "No submissions match your filters"}
              </h3>
              <p className="text-slate-500 mb-6">
                {submissions.length === 0 
                  ? "Be the first to submit a solution to this problem!"
                  : "Try adjusting your status filter or search criteria"
                }
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 text-xl">💡</div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Submission Guide</h4>
                  <p className="text-blue-700 text-sm">
                    Click on any submission to view detailed code and execution results. Use filters to find specific submissions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/problems')}
                className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>📚</span>
                Browse Problems
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
};

export default AllSubmission;