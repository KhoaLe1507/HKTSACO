import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const getLanguageIcon = (language) => {
  if (!language) return '💻';
  const lang = language.toLowerCase();
  switch (lang) {
    case 'javascript':
    case 'js':
      return '🟨';
    case 'python':
    case 'py':
      return '🐍';
    case 'java':
      return '☕';
    case 'cpp':
    case 'c++':
      return '⚡';
    case 'c':
      return '🔧';
    case 'csharp':
    case 'c#':
      return '🔷';
    case 'go':
      return '🐹';
    case 'rust':
      return '🦀';
    case 'typescript':
    case 'ts':
      return '🔷';
    case 'php':
      return '🐘';
    case 'ruby':
      return '💎';
    case 'swift':
      return '🦉';
    case 'kotlin':
      return '🎯';
    default:
      return '💻';
  }
};

const getLanguageColor = (language) => {
  if (!language) return 'from-gray-500 to-gray-600';
  const lang = language.toLowerCase();
  switch (lang) {
    case 'javascript':
    case 'js':
      return 'from-yellow-500 to-yellow-600';
    case 'python':
    case 'py':
      return 'from-blue-500 to-blue-600';
    case 'java':
      return 'from-orange-500 to-red-500';
    case 'cpp':
    case 'c++':
      return 'from-blue-600 to-indigo-600';
    case 'c':
      return 'from-gray-600 to-gray-700';
    case 'csharp':
    case 'c#':
      return 'from-purple-500 to-purple-600';
    case 'go':
      return 'from-cyan-500 to-blue-500';
    case 'rust':
      return 'from-orange-600 to-red-600';
    case 'typescript':
    case 'ts':
      return 'from-blue-500 to-blue-600';
    case 'php':
      return 'from-indigo-500 to-purple-500';
    case 'ruby':
      return 'from-red-500 to-red-600';
    case 'swift':
      return 'from-orange-500 to-orange-600';
    case 'kotlin':
      return 'from-purple-600 to-indigo-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const ViewSolution = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(`https://localhost:7157/api/problem/solution/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to load solution");

        const data = await res.json();
        setSolution(data);
      } catch (err) {
        console.error("Lỗi khi tải lời giải:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolution();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading solution...</p>
        </div>
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-slate-600 mb-2">Solution not found</h3>
          <p className="text-slate-500">Unable to load the solution at this time.</p>
        </div>
      </div>
    );
  }

  const { problemTitle, author, explanation, language, sourceCode } = solution;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Official Solution
          </h1>
          <p className="text-slate-600">Detailed explanation and implementation</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Problem Title Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                P
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Problem Title</h2>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {problemTitle}
            </h3>
          </div>

          {/* Author Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                A
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Solution Author</h2>
            </div>
            <p className="text-xl font-medium text-slate-800">{author}</p>
          </div>

          {/* Language Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getLanguageColor(language)} rounded-full flex items-center justify-center text-white text-lg`}>
                {getLanguageIcon(language)}
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Programming Language</h2>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getLanguageColor(language)} text-white rounded-full font-medium shadow-lg`}>
              <span className="text-lg">{getLanguageIcon(language)}</span>
              <span>{language}</span>
            </div>
          </div>

          {/* Explanation Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                E
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Explanation</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <div className="text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-xl border border-slate-200">
                {explanation}
              </div>
            </div>
          </div>

          {/* Source Code Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white text-lg font-bold">
                C
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Source Code</h2>
            </div>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getLanguageColor(language)} text-white rounded-full text-sm font-medium shadow-lg`}>
                  <span>{getLanguageIcon(language)}</span>
                  <span>{language}</span>
                </div>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-6 rounded-xl border-2 border-slate-700 overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed shadow-inner">
                <code className="language-javascript">{sourceCode}</code>
              </pre>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Solution Details</h4>
                  <p className="text-blue-700 text-sm">
                    This is the official solution provided by the problem author. Study the approach and implementation to improve your problem-solving skills.
                  </p>
                </div>
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

        /* Code syntax highlighting */
        pre code {
          font-family: 'Fira Code', 'Monaco', 'Consolas', 'Ubuntu Mono', monospace;
        }

        /* Custom scrollbar for code */
        pre::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        
        pre::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        
        pre::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        
        pre::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default ViewSolution;