import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockSections = [
  { id: 1, name: 'Bronze' },
  { id: 2, name: 'Silver' },
  { id: 3, name: 'Gold' },
  { id: 4, name: 'Platinum' },
];

const EditSection = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    position: '',
    referenceId: 0
  });
  const [allSections, setAllSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const res1 = await fetch(`https://localhost:7157/api/roadmap/GetSectionDetail/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data1 = await res1.json();

        const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllSectionsDetails`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data2 = await res2.json();

        setForm({
          name: data1.name,
          description: data1.description,
          position: "At the end", // default
          referenceId: 0
        });

        // Remove chính nó khỏi dropdown
        setAllSections(data2.filter(s => s.id !== parseInt(id)));
      } catch (err) {
        console.error("❌ Error loading section:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        name: form.name,
        description: form.description,
        position: form.position,
        referenceId: form.position === "At the end" ? -1 : parseInt(form.referenceId)
      };

      const res = await fetch(`https://localhost:7157/api/roadmap/EditSection/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Section updated!");
        navigate('/admin/learning-path/add-edit');
      } else {
        const msg = await res.text();
        alert("❌ Update failed: " + msg);
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("❌ Error submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getSectionTypeIcon = () => {
    const sectionTypes = ['🥉', '🥈', '🥇', '💎', '🚀', '⭐', '🏆', '🔥'];
    const name = form.name.toLowerCase();
    if (name.includes('bronze')) return '🥉';
    if (name.includes('silver')) return '🥈';
    if (name.includes('gold')) return '🥇';
    if (name.includes('platinum') || name.includes('diamond')) return '💎';
    return sectionTypes[Math.floor(Math.random() * sectionTypes.length)];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading section details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            {getSectionTypeIcon()} Edit Learning Section
          </h1>
          <p className="text-slate-600">Update and refine your learning section configuration</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Form Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Section Configuration</h2>
                <p className="text-slate-600 text-sm">Modify section details and repositioning settings</p>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <div className="text-sm">
                    <div className="font-semibold text-amber-800">Editing Mode</div>
                    <div className="text-amber-600">Section ID: {id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Name Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📚 Section Name
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter section name (e.g., Bronze, Silver, Gold)..."
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 placeholder-slate-400"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {/* Section Icon Preview */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl">{getSectionTypeIcon()}</span>
                <span className="text-sm text-slate-600">Section icon preview</span>
              </div>
            </div>

            {/* Description Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📝 Description
                </span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Update section description..."
                  rows="4"
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 placeholder-slate-400 resize-none"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Position Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📍 Position
                </span>
              </label>
              <div className="relative">
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="At the end">🔚 At the end</option>
                  <option value="Behind">⬅️ Behind of</option>
                  <option value="Front">➡️ Front of</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Reference Section Field - Conditional */}
            {(form.position === 'Behind' || form.position === 'Front') && (
              <div className="group animate-fade-in-up">
                <label className="block font-semibold text-slate-700 mb-3 text-lg">
                  <span className="flex items-center gap-2">
                    🔗 Reference Section
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="relative">
                  <select
                    name="referenceId"
                    value={form.referenceId}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Reference Section...</option>
                    {allSections.map((s) => (
                      <option key={s.id} value={s.id}>
                        📚 {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate('/admin/learning-path/add-edit')}
                className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>❌</span>
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-amber-200 flex items-center gap-2 hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <span className="text-lg">💾</span>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Current Section Info */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-amber-800">Current Section</h4>
              <span className="text-amber-600 font-medium">
                Available references: {allSections.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
                {getSectionTypeIcon()}
              </div>
              <div>
                <div className="text-amber-800 font-medium">{form.name}</div>
                <div className="text-amber-600 text-sm">{form.description || 'No description'}</div>
              </div>
            </div>
          </div>

          {/* Available Sections Preview */}
          {allSections.length > 0 && (
            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4">
              <h4 className="font-semibold text-indigo-800 mb-3">Available Reference Sections</h4>
              <div className="flex flex-wrap gap-2">
                {allSections.slice(0, 6).map((section) => (
                  <div 
                    key={section.id}
                    className="bg-white/60 border border-indigo-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="text-indigo-700 font-medium">📚 {section.name}</span>
                  </div>
                ))}
                {allSections.length > 6 && (
                  <div className="bg-white/60 border border-indigo-200 rounded-lg px-3 py-2 text-sm text-indigo-600">
                    +{allSections.length - 6} more
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Edit Guidelines</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Update section name to reflect learning progression changes</li>
                  <li>• Modify description to better explain section objectives</li>
                  <li>• Reposition strategically to maintain logical learning flow</li>
                  <li>• Reference sections help establish proper sequence ordering</li>
                </ul>
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
        select::-webkit-scrollbar {
          width: 8px;
        }
        
        select::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        select::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        select::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default EditSection;