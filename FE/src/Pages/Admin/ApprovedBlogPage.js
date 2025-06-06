import React, { useEffect, useState } from "react";

const ApprovedBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchPendingBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://localhost:7157/api/blog/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Lỗi khi tải bài blog chờ duyệt:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  const handleApproval = async (postId, newStatus) => {
    setProcessingId(postId);
    try {
      const res = await fetch(`https://localhost:7157/api/blog/approve/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ newStatus }),
      });

      if (res.ok) {
        await fetchPendingBlogs(); // reload danh sách
        alert(`Blog ${newStatus.toLowerCase()} successfully!`);
      } else {
        console.error("Duyệt bài thất bại");
        alert("Action failed!");
      }
    } catch (err) {
      console.error("Lỗi khi duyệt bài:", err);
      alert("An error occurred!");
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading pending blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            📝 Pending Blog Posts
          </h1>
          <p className="text-slate-600">Review and moderate blog posts awaiting approval</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                ⏳
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Pending Reviews</p>
                <p className="text-2xl font-bold text-slate-800">{blogs.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Status</p>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                🔍 Review Required
              </span>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {blogs.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No pending blog posts</h3>
            <p className="text-slate-500">All blog posts have been reviewed!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog, index) => (
              <div
                key={blog.postId}
                className="bg-white/80 backdrop-blur-sm border-2 border-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {blog.authorName?.[0] || "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-slate-800">{blog.authorName}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                          {blog.role}
                        </span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    ⏳ {blog.approvalStatus}
                  </span>
                </div>

                {/* Blog Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-indigo-600 transition-colors duration-200">
                    {blog.title}
                  </h3>
                  <div className="bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-xl p-4 border border-slate-100">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {blog.content}
                    </p>
                  </div>
                </div>

                {/* Blog Image */}
                {blog.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-xl shadow-md">
                    <img
                      src={`https://localhost:7157${blog.imageUrl}`}
                      alt="Blog visual"
                      className="w-full object-cover transition-transform duration-300 hover:scale-105 max-h-64"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-sm text-slate-500">
                    Awaiting moderation decision
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleApproval(blog.postId, "Approved")}
                      disabled={processingId === blog.postId}
                      className={`bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 ${
                        processingId === blog.postId ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {processingId === blog.postId ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>✅</span>
                          Approve
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleApproval(blog.postId, "Rejected")}
                      disabled={processingId === blog.postId}
                      className={`bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 ${
                        processingId === blog.postId ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {processingId === blog.postId ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>❌</span>
                          Reject
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
      `}</style>
    </div>
  );
};

export default ApprovedBlogPage;