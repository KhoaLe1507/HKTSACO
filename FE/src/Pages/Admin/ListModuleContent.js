import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockContents = [
  { id: 1, title: 'What is a Graph?', moduleId: 4 },
  { id: 2, title: 'DFS & BFS', moduleId: 4 },
  { id: 3, title: 'Sorting Numbers', moduleId: 3 },
];

const ListModuleContent = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const [contents, setContents] = useState([]);
  const [moduleName, setModuleName] = useState('');
  const [sectionName, setSectionName] = useState("");
  const [sectionId, setSectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Lấy thông tin Module (bao gồm cả SectionId)
        const res1 = await fetch(`https://localhost:7157/api/roadmap/GetModuleDetail/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data1 = await res1.json();
        setModuleName(data1.name);
        setSectionId(data1.sectionId);

        // 👉 Gọi thêm để lấy Section Name từ SectionId
        const resSec = await fetch(`https://localhost:7157/api/roadmap/GetSectionDetail/${data1.sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataSec = await resSec.json();
        setSectionName(dataSec.name); // cần khai báo useState sectionName

        // Lấy danh sách ModuleContent
        const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllModuleContentsByModuleIdDetails/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data2 = await res2.json();
        setContents(data2);
      } catch (err) {
        console.error("❌ Failed to load module or contents:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moduleId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module content?")) return;

    setIsDeleting(id);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://localhost:7157/api/roadmap/DeleteModuleContent/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setContents(prev => prev.filter(c => c.id !== id));
        alert("✅ Deleted successfully.");
      } else {
        const msg = await res.text();
        alert("❌ Failed to delete: " + msg);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Error deleting content.");
    } finally {
      setIsDeleting(null);
    }
  };

  const getSectionIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('bronze')) return '🥉';
    if (lowerName.includes('silver')) return '🥈';
    if (lowerName.includes('gold')) return '🥇';
    if (lowerName.includes('platinum') || lowerName.includes('diamond')) return '💎';
    if (lowerName.includes('beginner') || lowerName.includes('basic')) return '🌱';
    if (lowerName.includes('advanced') || lowerName.includes('expert')) return '🚀';
    return '📚';
  };

  const getContentIcon = (index) => {
    const icons = ['📝', '🎯', '💡', '🔬', '📊', '🎨', '⚡', '🎪'];
    return icons[index % icons.length];
  };

  const getContentColor = (index) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-rose-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-cyan-500 to-blue-500',
      'from-teal-500 to-emerald-500'
    ];
    return colors[index % colors.length];
  };

  const getFrequencyColor = (frequent) => {
    switch(frequent) {
      case 'Very Frequent': return 'bg-red-500';
      case 'Frequent': return 'bg-amber-500';
      case 'Rare': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading module contents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            📚 {moduleName} Contents
          </h1>
          <p className="text-slate-600">Manage learning materials in your module</p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Module Info Bar */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  📚
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800">Module: {moduleName}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-purple-600">Section: {getSectionIcon(sectionName)} {sectionName}</span>
                    <span className="text-purple-500">•</span>
                    <span className="text-purple-600">Contents: {contents.length}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/admin/module-content/${moduleId}/add`)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl"
              >
                <span className="text-lg">➕</span>
                Add Content
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-6">
            {contents.map((content, idx) => (
              <div 
                key={content.id} 
                className="group hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{animationDelay: `${0.1 * idx}s`}}
              >
                <div className="bg-white/60 backdrop-blur-sm border-2 border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex items-center">
                    {/* Content Info Section */}
                    <div className={`bg-gradient-to-r ${getContentColor(idx)} px-8 py-6 flex-1 relative overflow-hidden`}>
                      {/* Decorative Elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/30"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-white/20"></div>
                        <div className="absolute top-1/2 right-8 w-6 h-6 rounded-full bg-white/25"></div>
                      </div>
                      
                      {/* Content Details */}
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl">
                          {getContentIcon(idx)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                            {content.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                              Content #{content.id}
                            </span>
                            {content.frequent && (
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getFrequencyColor(content.frequent)}`}></div>
                                <span className="text-white/90 text-xs">{content.frequent}</span>
                              </div>
                            )}
                            {content.authorName && (
                              <span className="text-white/80 text-xs">
                                👤 {content.authorName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 flex gap-3">
                      <button
                        onClick={() => navigate(`/admin/module/${moduleId}/module-content/${content.id}/edit`)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:rotate-12 transition-transform duration-300">📝</span>
                        Edit
                      </button>
                      
                      <button
                        onClick={() => navigate(`/admin/section/${sectionName.toLowerCase()}/module-content/${content.id}/detail`)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">🔍</span>
                        Detail
                      </button>
                      
                      <button
                        onClick={() => handleDelete(content.id)}
                        disabled={isDeleting === content.id}
                        className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-600 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-500 transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-lg flex items-center gap-2 group disabled:cursor-not-allowed"
                      >
                        {isDeleting === content.id ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <span className="group-hover:rotate-12 transition-transform duration-300">🗑️</span>
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
          {contents.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No content in this module yet</h3>
              <p className="text-slate-500 mb-6">Start creating engaging learning materials for your students!</p>
              <button
                onClick={() => navigate(`/admin/module-content/${moduleId}/add`)}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <span className="text-lg">🚀</span>
                Create Your First Content
              </button>
            </div>
          )}

          {/* Breadcrumb Navigation */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <button 
                  onClick={() => navigate('/admin/learning-path/add-edit')}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  📚 Sections
                </button>
                <span className="text-blue-400">›</span>
                <button 
                  onClick={() => navigate(`/admin/section/${sectionId}/modules`)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {getSectionIcon(sectionName)} {sectionName} Modules
                </button>
                <span className="text-blue-400">›</span>
                <span className="text-blue-800 font-medium">📚 {moduleName} Contents</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/section/${sectionId}/modules`)}
                  className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>↩️</span>
                  Back to Modules
                </button>
              </div>
            </div>
          </div>

          {/* Content Statistics */}
          {contents.length > 0 && (
            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-800 mb-3">Content Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">{contents.length}</div>
                  <div className="text-emerald-600 text-sm">Total Contents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {contents.filter(c => c.frequent === 'Very Frequent').length}
                  </div>
                  <div className="text-emerald-600 text-sm">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {contents.filter(c => c.authorName).length}
                  </div>
                  <div className="text-emerald-600 text-sm">With Authors</div>
                </div>
              </div>
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
      `}</style>
    </div>
  );
};

export default ListModuleContent;