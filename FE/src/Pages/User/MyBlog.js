import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [myBlogs, setMyBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch("https://localhost:7157/api/blog/my-blogs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setMyBlogs(data);
        console.log("Data:", data);
      } catch (err) {
        console.error("Error fetching my blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);
  
  const filteredPosts = myBlogs.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterDate || post.createdAt.startsWith(filterDate))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading your blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            📚 My Blogs
          </h1>
          <p className="text-slate-600">Manage and view all your published content</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search blog title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </div>
            </div>

            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                📅
              </div>
            </div>

            {/* Add Blog Button */}
            <button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200 flex items-center gap-2 hover:shadow-xl whitespace-nowrap"
              onClick={() => navigate("/blogs/add")}
            >
              <span className="text-lg">➕</span>
              Add Blog
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Total Blogs: <span className="font-semibold text-indigo-600">{myBlogs.length}</span></span>
              <span>Filtered Results: <span className="font-semibold text-purple-600">{filteredPosts.length}</span></span>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-6">
          {filteredPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border-2 border-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{animationDelay: `${0.1 * idx}s`}}
            >
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {post.authorName?.[0] || "?"}
                </div>
                <div>
                  <p className="font-semibold text-lg text-slate-800">{post.authorName}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.role}
                    </span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.visibility === 'Public' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {post.visibility === 'Public' ? '🌍 Public' : '🔒 Private'}
                    </span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-indigo-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <div className="bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-xl p-4 border border-slate-100">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Blog Image */}
              {post.imageUrl && (
                <div className="mb-4 overflow-hidden rounded-xl shadow-md">
                  <img
                    src={`https://localhost:7157${post.imageUrl}`}
                    alt="blog visual"
                    className="w-full object-cover transition-transform duration-300 hover:scale-105 max-h-64"
                  />
                </div>
              )}

              {/* Interactions & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer">
                    <span>👍</span>
                    0 likes
                  </span>
                  <span className="flex items-center gap-1 hover:text-purple-600 transition-colors cursor-pointer">
                    <span>💬</span>
                    0 comments
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <span>👁</span>
                    0 views
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/blogs/edit/${post.postId}`)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>✏️</span>
                    Edit Blog
                  </button>
                  
                  <button className="text-slate-400 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !isLoading && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              {myBlogs.length === 0 ? "No blogs yet" : "No blogs match your search"}
            </h3>
            <p className="text-slate-500 mb-6">
              {myBlogs.length === 0 
                ? "Start sharing your thoughts by creating your first blog!"
                : "Try adjusting your search filters"
              }
            </p>
            {myBlogs.length === 0 && (
              <button
                onClick={() => navigate("/blogs/add")}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <span className="text-lg">✍️</span>
                Create Your First Blog
              </button>
            )}
          </div>
        )}
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MyBlog;