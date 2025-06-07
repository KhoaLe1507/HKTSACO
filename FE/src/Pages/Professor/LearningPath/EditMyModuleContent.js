import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const EditMyModuleContent = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");
  const [myContents, setMyContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("https://localhost:7157/api/roadmap/ListMyModuleContents", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setMyContents(data);
      } catch (err) {
        console.error("Failed to fetch module contents:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSectionIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('bronze')) return '';
    if (lowerName.includes('silver')) return '';
    if (lowerName.includes('gold')) return '';
    if (lowerName.includes('platinum') || lowerName.includes('diamond')) return '';
    if (lowerName.includes('beginner') || lowerName.includes('basic')) return '';
    if (lowerName.includes('advanced') || lowerName.includes('expert')) return '';
    return '📚';
  };

  const getFrequencyColor = (frequent) => {
    switch(frequent) {
      case 'Very Frequent': return 'bg-red-500';
      case 'Frequent': return 'bg-amber-500';
      case 'Rare': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredAndSortedContents = myContents
    .filter((item) => {
      const combined = `${item.sectionName} ${item.moduleName} ${item.content}`.toLowerCase();
      const matchText = combined.includes(searchText.toLowerCase());

      const matchDate = createdAfter
        ? new Date(item.createdAt) >= new Date(createdAfter)
        : true;

      return matchText && matchDate;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'sectionName':
          aValue = a.sectionName.toLowerCase();
          bValue = b.sectionName.toLowerCase();
          break;
        case 'moduleName':
          aValue = a.moduleName.toLowerCase();
          bValue = b.moduleName.toLowerCase();
          break;
        case 'content':
          aValue = a.content.toLowerCase();
          bValue = b.content.toLowerCase();
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading your contents...</p>
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
            📝 My Module Contents
          </h1>
          <p className="text-slate-600">Manage all your created learning content</p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700">{myContents.length}</div>
                  <div className="text-indigo-600 text-sm">Total Contents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700">
                    {new Set(myContents.map(item => item.sectionName)).size}
                  </div>
                  <div className="text-indigo-600 text-sm">Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700">
                    {new Set(myContents.map(item => item.moduleId)).size}
                  </div>
                  <div className="text-indigo-600 text-sm">Modules</div>
                </div>
              </div>
              <div className="text-indigo-600 text-sm">
                Filtered Results: <span className="font-semibold text-purple-600">{filteredAndSortedContents.length}</span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">🔍 Filters & Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-2">Search Content</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by section, module, or content..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 placeholder-slate-400"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                    
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Date Filter */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-2">Created After</label>
                <div className="relative">
                  <input
                    type="date"
                    value={createdAfter}
                    onChange={(e) => setCreatedAfter(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                    
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                <div className="relative">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="createdAt-desc">📅 Newest First</option>
                    <option value="createdAt-asc">📅 Oldest First</option>
                    <option value="sectionName-asc">📚 Section A-Z</option>
                    <option value="sectionName-desc">📚 Section Z-A</option>
                    <option value="moduleName-asc">📖 Module A-Z</option>
                    <option value="moduleName-desc">📖 Module Z-A</option>
                    <option value="content-asc">📝 Content A-Z</option>
                    <option value="content-desc">📝 Content Z-A</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-hidden rounded-xl border-2 border-slate-200 shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <tr>
                    <th 
                      className="text-left px-6 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('sectionName')}
                    >
                      <div className="flex items-center gap-2">
                        📚 Section
                        {sortBy === 'sectionName' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left px-6 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('moduleName')}
                    >
                      <div className="flex items-center gap-2">
                        📖 Module
                        {sortBy === 'moduleName' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left px-6 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('content')}
                    >
                      <div className="flex items-center gap-2">
                        📝 Content
                        {sortBy === 'content' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left px-6 py-4 font-semibold cursor-pointer hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-2">
                        📅 Created At
                        {sortBy === 'createdAt' && (
                          <span className="text-indigo-300">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      ⚡ Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 backdrop-blur-sm">
                  {filteredAndSortedContents.map((item, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-white/80 transition-all duration-200 border-b border-slate-100 group"
                    >
                      <td className="px-6 py-4 text-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getSectionIcon(item.sectionName)}</span>
                          <span className="font-medium">{item.sectionName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">📖</span>
                          <span>{item.moduleName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-800">
                        <div className="flex items-center gap-2">
                          {item.frequent && (
                            <div className={`w-2 h-2 rounded-full ${getFrequencyColor(item.frequent)}`}></div>
                          )}
                          <span className="max-w-xs truncate" title={item.content}>
                            {item.content}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="text-sm">
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/professor/section/${item.sectionName.toLowerCase()}/module-content/${item.id}/detail`)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 group"
                          >
                            <span className="group-hover:scale-110 transition-transform duration-300">🔍</span>
                            Detail
                          </button>
                          <button
                            onClick={() => navigate(`/professor/module/${item.moduleId}/module-content/${item.id}/edit`)}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 group"
                          >
                            <span className="group-hover:rotate-12 transition-transform duration-300">✏️</span>
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredAndSortedContents.length === 0 && !isLoading && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {myContents.length === 0 ? "No content created yet" : "No content matches your filters"}
              </h3>
              <p className="text-slate-500 mb-6">
                {myContents.length === 0 
                  ? "Start creating engaging learning materials for your students!"
                  : "Try adjusting your search criteria or date filters"
                }
              </p>
              {myContents.length === 0 && (
                <button
                  onClick={() => navigate('/admin/learning-path/add-edit')}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <span className="text-lg">🚀</span>
                  Explore Sections
                </button>
              )}
            </div>
          )}
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

export default EditMyModuleContent;