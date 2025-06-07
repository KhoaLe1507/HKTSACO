import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockModules = [
  { id: 1, name: 'Introduction' },
  { id: 2, name: 'Basic Math' },
  { id: 3, name: 'Sorting' },
  { id: 4, name: 'Graph Theory' },
];

const AddModule = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    position: 'At the end',
    referenceId: 0
  });

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`https://localhost:7157/api/roadmap/ListAllModulesBySectionIdDetails/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setAllModules(data);
      } catch (err) {
        console.error("❌ Failed to load modules:", err);
      }
    };

    fetchModules();
  }, [sectionId]);

  const [allModules, setAllModules] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "referenceId" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        name: form.name,
        sectionId: parseInt(sectionId),
        position: form.position,
        referenceId: form.position === "At the end" ? -1 : parseInt(form.referenceId)
      };

      const res = await fetch("https://localhost:7157/api/roadmap/AddModule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Module added successfully!");
        navigate(`/admin/section/${sectionId}/modules`);
      } else {
        const msg = await res.text();
        alert("❌ Failed to add module: " + msg);
      }
    } catch (err) {
      console.error("❌ Add module error:", err);
      alert("❌ Unexpected error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            ➕ Add New Module
          </h1>
          <p className="text-slate-600">Create a new module for your learning section</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Module Information</h2>
            <p className="text-slate-600 text-sm">Fill in the details for your new module</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Module Name Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📝 Module Name
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter module name..."
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 placeholder-slate-400"
                  required
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

            {/* Reference Module Field - Conditional */}
            {(form.position === 'Behind' || form.position === 'Front') && (
              <div className="group animate-fade-in-up">
                <label className="block font-semibold text-slate-700 mb-3 text-lg">
                  <span className="flex items-center gap-2">
                    🔗 Reference Module
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
                    <option value="">Choose module...</option>
                    {allModules.map((m) => (
                      <option key={m.id} value={m.id}>
                        📚 {m.name}
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
                onClick={() => navigate(`/admin/section/${sectionId}/modules`)}
                className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>❌</span>
                Cancel
              </button>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl"
              >
                <span className="text-lg">✅</span>
                Confirm
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Quick Tips</h4>
                <p className="text-blue-700 text-sm">
                  Choose "At the end" to add the module as the last item, or select a reference module to position it relative to existing modules.
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

        /* Custom scrollbar for select */
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

export default AddModule;