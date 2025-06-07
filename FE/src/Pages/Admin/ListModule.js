import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const initialModules = [
  { id: 1, name: 'Introduction', sectionId: 1 },
  { id: 2, name: 'Basic Math', sectionId: 1 },
  { id: 3, name: 'Sorting', sectionId: 1 },
  { id: 4, name: 'Graph Theory', sectionId: 2 },
];

const ListModule = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const [modules, setModules] = useState([]);
  const [sectionName, setSectionName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    const fetchModulesAndSection = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // 1. Get Section Info
        const secRes = await fetch(`https://localhost:7157/api/roadmap/GetSectionDetail/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const sectionData = await secRes.json();
        setSectionName(sectionData.name);

        // 2. Get Modules
        const modRes = await fetch(`https://localhost:7157/api/roadmap/ListAllModulesBySectionIdDetails/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const modulesData = await modRes.json();
        setModules(modulesData);
      } catch (err) {
        console.error("❌ Error loading section or modules:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModulesAndSection();
  }, [sectionId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;

    setIsDeleting(id);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://localhost:7157/api/roadmap/DeleteModule/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setModules(prev => prev.filter(m => m.id !== id));
        alert("✅ Module deleted successfully.");
      } else {
        const msg = await res.text();
        alert("❌ Failed to delete module: " + msg);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Error deleting module.");
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

  const getModuleColor = (index) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading modules...</p>
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
            {getSectionIcon(sectionName)} {sectionName} Modules
          </h1>
          <p className="text-slate-600">Manage modules in your learning section</p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Section Info Bar */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  {getSectionIcon(sectionName)}
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-800">Section: {sectionName}</h3>
                  <p className="text-indigo-600 text-sm">Total modules: {modules.length}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/admin/section/${sectionId}/module/add`)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl"
              >
                <span className="text-lg">➕</span>
                Add Module
              </button>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-6">
            {modules.map((module, idx) => (
              <div 
                key={module.id} 
                className="group hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{animationDelay: `${0.1 * idx}s`}}
              >
                <div className="bg-white/60 backdrop-blur-sm border-2 border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex items-center">
                    {/* Module Info Section */}
                    <div className={`bg-gradient-to-r ${getModuleColor(idx)} px-8 py-6 flex-1 relative overflow-hidden`}>
                      {/* Decorative Elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/30"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-white/20"></div>
                        <div className="absolute top-1/2 right-8 w-6 h-6 rounded-full bg-white/25"></div>
                      </div>
                      
                      {/* Module Content */}
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                            {module.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                              Module #{module.id}
                            </span>
                            <span className="text-white/80 text-sm">
                              Section: {sectionName}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 flex gap-3">
                      <button
                        onClick={() => navigate(`/admin/section/${sectionId}/module/${module.id}/edit`)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:rotate-12 transition-transform duration-300">📝</span>
                        Edit
                      </button>
                      
                      <button
                        onClick={() => navigate(`/admin/module/${module.id}/contents`)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">🔍</span>
                        Details
                      </button>
                      
                      <button
                        onClick={() => handleDelete(module.id)}
                        disabled={isDeleting === module.id}
                        className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-600 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-500 transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-lg flex items-center gap-2 group disabled:cursor-not-allowed"
                      >
                        {isDeleting === module.id ? (
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
          {modules.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No modules in this section yet</h3>
              <p className="text-slate-500 mb-6">Start building your learning content by adding your first module!</p>
              <button
                onClick={() => navigate(`/admin/section/${sectionId}/module/add`)}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <span className="text-lg">🚀</span>
                Create Your First Module
              </button>
            </div>
          )}

          {/* Navigation Helper */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 text-xl">💡</div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Quick Actions</h4>
                  <p className="text-blue-700 text-sm">
                    Edit modules to update names and positions, or view contents to manage learning materials
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin/learning-path/add-edit')}
                className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>↩️</span>
                Back to Sections
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
      `}</style>
    </div>
  );
};

export default ListModule;