import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAndEditLearningPath = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("https://localhost:7157/api/roadmap/ListAllSectionsDetails", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch sections");
        const data = await res.json();
        setSections(data);
        const colorMap = {
          Bronze: 'from-yellow-500 to-amber-600',
          Silver: 'from-gray-300 to-gray-400',
          Gold: 'from-yellow-400 to-yellow-500',
          Platinum: 'from-blue-300 to-blue-500',
        };

        const enhanced = data.map(s => ({
          ...s,
          color: colorMap[s.name] || 'from-gray-200 to-gray-300' // fallback nếu không khớp
        }));
        setSections(enhanced);
      } catch (error) {
        console.error("❌ Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://localhost:7157/api/roadmap/DeleteSection/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSections(prev => prev.filter(sec => sec.id !== id));
        alert("✅ Section deleted successfully!");
      } else {
        const errorText = await res.text();
        alert("❌ Failed to delete section: " + errorText);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Error deleting section.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            📚 Learning Sections
          </h1>
          <p className="text-slate-600">Manage your learning path sections</p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Section Management</h2>
              <p className="text-slate-600 text-sm">Total sections: <span className="font-semibold text-indigo-600">{sections.length}</span></p>
            </div>
            <button
              onClick={() => navigate('/admin/section/add')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl"
            >
              <span className="text-lg">➕</span>
              Add Section
            </button>
          </div>

          {/* Sections List */}
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div 
                key={section.id} 
                className="group animate-fade-in-up hover:scale-[1.02] transition-all duration-300"
                style={{animationDelay: `${0.1 * idx}s`}}
              >
                <div className="bg-white/60 backdrop-blur-sm border-2 border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex items-center">
                    {/* Section Color Badge */}
                    <div className={`bg-gradient-to-r ${section.color} px-8 py-6 flex-1 relative overflow-hidden`}>
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/30"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-white/20"></div>
                        <div className="absolute top-1/2 right-8 w-6 h-6 rounded-full bg-white/25"></div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white drop-shadow-lg relative z-10 group-hover:scale-105 transition-transform duration-300">
                        {section.name}
                      </h3>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 flex gap-3">
                      <button
                        onClick={() => navigate(`/admin/section/${section.id}/edit`)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:rotate-12 transition-transform duration-300">📝</span>
                        Edit
                      </button>
                      
                      <button
                        onClick={() => navigate(`/admin/section/${section.id}/modules`)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">🔍</span>
                        Detail
                      </button>
                      
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 group"
                      >
                        <span className="group-hover:rotate-12 transition-transform duration-300">🗑️</span>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sections.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No sections yet</h3>
              <p className="text-slate-500 mb-6">Start building your learning path by creating your first section!</p>
              <button
                onClick={() => navigate('/admin/section/add')}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <span className="text-lg">✨</span>
                Create Your First Section
              </button>
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

export default AddAndEditLearningPath;