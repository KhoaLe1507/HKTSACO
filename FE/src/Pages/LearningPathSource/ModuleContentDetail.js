import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const levelToSectionId = {
  bronze: 7,
  silver: 3,
  gold: 2,
  platinum: 8
};

const getLevelColor = (level) => {
  switch(level?.toLowerCase()) {
    case 'bronze': return 'from-amber-600 to-orange-600';
    case 'silver': return 'from-gray-500 to-gray-600';
    case 'gold': return 'from-yellow-400 to-yellow-600';
    case 'platinum': return 'from-blue-500 to-blue-600';
    default: return 'from-indigo-500 to-purple-600';
  }
};

const getLevelBorderColor = (level) => {
  switch(level?.toLowerCase()) {
    case 'bronze': return 'border-amber-200';
    case 'silver': return 'border-gray-200';
    case 'gold': return 'border-yellow-200';
    case 'platinum': return 'border-blue-200';
    default: return 'border-indigo-200';
  }
};

const ModuleContentDetail = () => {
  const { level, moduleId } = useParams();
  console.log("✅ Params:", { level, moduleId });
  console.log("✅ sectionId:", levelToSectionId[level?.toLowerCase()]);
  
  const [title, setTitle] = useState("Loading...");
  const [content, setContent] = useState("");
  const [sidebarData, setSidebarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sectionId = levelToSectionId[level?.toLowerCase()];
    if (!sectionId || !moduleId) return;

    const fetchContentAndSidebar = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://localhost:7157/api/roadmap/GetDetailModuleContent/${moduleId}`);
        const { title, htmlContentPath } = res.data;
        setTitle(title);

        const htmlRes = await axios.get(`https://localhost:7157${htmlContentPath}`);
        setContent(htmlRes.data);

        const sidebarRes = await axios.get(`https://localhost:7157/api/roadmap/ListAllModuleContentAndModuleBySectionId/${sectionId}`);
        setSidebarData(sidebarRes.data.modules);
      } catch (err) {
        console.error("❌ Lỗi khi tải nội dung hoặc sidebar:", err);
        setTitle("Module Not Found");
        setContent("<p>Không thể tải nội dung.</p>");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContentAndSidebar();
  }, [moduleId, level]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading module content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="flex max-w-8xl mx-auto">
        {/* SIDEBAR BÊN TRÁI */}
        <div className="w-[350px] bg-white/80 backdrop-blur-sm border-r-2 border-slate-200 min-h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            {/* Header Sidebar */}
            <div className={`bg-gradient-to-r ${getLevelColor(level)} rounded-2xl p-4 mb-6 text-white shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                </div>
                <div>
                  <h2 className="text-xl text-white font-bold capitalize">
                    {level} Path
                  </h2>
                  <p className="text-white/80 text-sm">Learning Journey</p>
                </div>
              </div>
            </div>

            {/* Module List */}
            <div className="space-y-4">
              {sidebarData.map((mod, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-300">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    {mod.moduleName}
                  </h4>
                  <ul className="space-y-2">
                    {mod.contents.map((mc) => (
                      <li key={mc.id}>
                        <a
                          href={`/learn/${level}/module/${mc.id}`}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm ${
                            parseInt(moduleId) === mc.id
                              ? `bg-gradient-to-r ${getLevelColor(level)} text-white shadow-md font-medium`
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            parseInt(moduleId) === mc.id 
                              ? "bg-white/80" 
                              : "bg-slate-400"
                          }`}></span>
                          {mc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHẦN NỘI DUNG CHÍNH */}
        <div className="flex-1 p-8">
          {/* Header Content */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 ${getLevelBorderColor(level)} p-6 mb-8`}>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getLevelColor(level)} rounded-full flex items-center justify-center text-2xl text-white shadow-lg`}>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-slate-600 capitalize">{level} Level Module</p>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 overflow-hidden">
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-slate-800 
                  prose-headings:font-bold
                  prose-h1:text-3xl prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-800 prose-strong:font-semibold
                  prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-slate-800
                  prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-4
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                  prose-ul:text-slate-700 prose-ol:text-slate-700
                  prose-li:mb-2
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Learning Progress</h4>
                  <p className="text-blue-700 text-sm">
                    Continue your journey through the {level} learning path. Use the sidebar to navigate between modules and track your progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom scrollbar for sidebar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Enhanced content styling */
        .prose h1 {
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        
        .prose h2 {
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 0.3rem;
        }
        
        .prose table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .prose th {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
        }
        
        .prose td {
          background: white;
          padding: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .prose tr:hover td {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default ModuleContentDetail;