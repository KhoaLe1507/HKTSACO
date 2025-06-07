import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddModuleContent = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    frequent: 'Very Frequent',
    description: '',
    htmlFile: null,
    authorId: '',
    position: 'At the end',
    referenceId: 0,
  });

  const [authors, setAuthors] = useState([]);
  const [moduleContents, setModuleContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Get all professors
        const res1 = await fetch("https://localhost:7157/api/roadmap/GetAllProfessors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data1 = await res1.json();
        setAuthors(data1);

        // Get contents in the same module (for Front/Behind)
        const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllModuleContentsByModuleIdDetails/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data2 = await res2.json();
        setModuleContents(data2);
      } catch (err) {
        console.error("❌ Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "referenceId" ? parseInt(value) : value
    }));
  };

  const handleFile = (e) => {
    setForm(prev => ({
      ...prev,
      htmlFile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.htmlFile) {
      alert("❗ Please upload a .html file.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("Title", form.title);
      formData.append("Frequent", form.frequent);
      formData.append("Description", form.description);
      formData.append("file", form.htmlFile);
      formData.append("AuthorId", form.authorId);
      formData.append("ModuleId", moduleId);
      formData.append("Position", form.position);
      formData.append("ReferenceId", form.position === "At the end" ? -1 : form.referenceId);

      const res = await fetch("https://localhost:7157/api/roadmap/AddModuleContent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        alert("✅ Module content added successfully!");
        navigate(`/admin/module/${moduleId}/contents`);
      } else {
        const msg = await res.text();
        alert("❌ Failed to add: " + msg);
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("❌ Unexpected error occurred.");
    }
  };

  const getFrequentIcon = (freq) => {
    switch(freq) {
      case 'Very Frequent': return '🔥';
      case 'Frequent': return '⭐';
      case 'Rare': return '💎';
      default: return '📝';
    }
  };

  const getFrequentColor = (freq) => {
    switch(freq) {
      case 'Very Frequent': return 'from-red-500 to-orange-500';
      case 'Frequent': return 'from-amber-500 to-yellow-500';
      case 'Rare': return 'from-cyan-500 to-blue-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading content form...</p>
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
            📚 Add Module Content
          </h1>
          <p className="text-slate-600">Create engaging content for your learning module</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Content Details</h2>
            <p className="text-slate-600 text-sm">Fill in all the information to create your module content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📝 Content Title
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  placeholder="Enter content title..." 
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 placeholder-slate-400" 
                  required 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Frequency Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  🎯 Frequency Level
                </span>
              </label>
              <div className="relative">
                <select 
                  name="frequent" 
                  value={form.frequent} 
                  onChange={handleChange} 
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="Very Frequent">🔥 Very Frequent</option>
                  <option value="Frequent">⭐ Frequent</option>
                  <option value="Rare">💎 Rare</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Description Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📄 Description
                </span>
              </label>
              <div className="relative">
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder="Describe your content..." 
                  rows="4"
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 placeholder-slate-400 resize-none" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* File Upload Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  📎 HTML File
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:bg-white/80">
                  <input 
                    type="file" 
                    accept=".html" 
                    onChange={handleFile} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    required 
                  />
                  <div className="text-4xl mb-4">📁</div>
                  <div className="text-slate-600">
                    {form.htmlFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span className="font-medium">{form.htmlFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-1">Click to upload HTML file</p>
                        <p className="text-sm text-slate-500">or drag and drop your .html file here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Author Field */}
            <div className="group">
              <label className="block font-semibold text-slate-700 mb-3 text-lg">
                <span className="flex items-center gap-2">
                  👨‍🏫 Author
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <select 
                  name="authorId" 
                  value={form.authorId} 
                  onChange={handleChange} 
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 appearance-none cursor-pointer" 
                  required
                >
                  <option value="">Select Author...</option>
                  {authors.map(a => (
                    <option key={a.userId} value={a.userId}>
                      👤 {a.fullName}
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

            {/* Reference Content Field - Conditional */}
            {(form.position === 'Front' || form.position === 'Behind') && (
              <div className="group animate-fade-in-up">
                <label className="block font-semibold text-slate-700 mb-3 text-lg">
                  <span className="flex items-center gap-2">
                    🔗 Reference Content
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="relative">
                  <select 
                    name="referenceId" 
                    value={form.referenceId} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="">Select Content...</option>
                    {moduleContents.map(c => (
                      <option key={c.id} value={c.id}>
                        📚 {c.title}
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
                onClick={() => navigate(`/admin/module/${moduleId}/contents`)}
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
                Add Module Content
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Content Guidelines</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Upload only valid HTML files for your content</li>
                  <li>• Choose frequency based on how often students should review this content</li>
                  <li>• Select position carefully to maintain logical content flow</li>
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

        /* File upload hover effect */
        .group:hover .border-dashed {
          border-color: #6366f1;
          background-color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};

export default AddModuleContent;