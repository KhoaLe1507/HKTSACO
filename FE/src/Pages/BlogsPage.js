import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const BlogsPage = () => {
  // Mock auth context for demo purposes
  const { isLoggedIn, role, username } = useContext(AuthContext);
  const currentUsername = username || "Guest";

  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortBy, setSortBy] = useState("Top Views");

  const [showingCommentFor, setShowingCommentFor] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentsData, setCommentsData] = useState({});

  const [activeReply, setActiveReply] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://localhost:7157/api/blog/list-all");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Lỗi khi tải blog:", err);
      }
    };

    fetchBlogs();
  }, []);

const fetchComments = async (postId, idx) => {
  const res = await fetch(`https://localhost:7157/api/blog/comments/${postId}`);
    //console.log("Fetched comment data:", data);
    const raw = await res.json();

    const data = Array.isArray(raw) ? raw : raw.data || [];

  const buildTree = (parentId = null) =>
    data
      .filter((c) => c.parentCommentId === parentId)
      .map((c) => ({
        ...c,
        children: buildTree(c.blogCommentId)
      }));

  setCommentsData((prev) => ({
    ...prev,
    [idx]: buildTree()
  }));
};

const renderComments = (comments, idx, postId, level = 0) =>
  comments.map((c) => (
    <div key={c.blogCommentId} className={`ml-[${level * 20}px] border-l-2 border-gradient-to-b from-indigo-200 to-purple-200 pl-4 mt-3 animate-fade-in-up transition-all duration-300 hover:border-l-indigo-400`}>
      <div className="bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-slate-100">
        <p className="text-sm font-medium flex items-center">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-3 shadow-sm">
            {c.user?.[0] || "?"}
          </span>
          <span className="text-slate-800">{c.user}</span>
          <span className="text-slate-500 italic text-xs ml-2 bg-slate-200 px-2 py-1 rounded-full">
            {c.role } • {new Date(c.createdAt).toLocaleString()}
          </span>
        </p>
        <p className="text-sm mt-2 text-slate-700 leading-relaxed">{c.content}</p>

        {isLoggedIn && (
          <button
            className="text-indigo-500 text-xs mt-2 hover:text-indigo-700 transition-colors duration-200 flex items-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-md"
            onClick={() => {
              setActiveReply({ idx, parentId: c.blogCommentId });
              setCommentText("");
            }}
          >
            <span className="transform transition-transform hover:scale-110">↩️</span>
            Reply
          </button>
        )}
      </div>

      {/* Nếu đang reply comment này thì hiển thị input tại đây */}
      {activeReply?.idx === idx && activeReply.parentId === c.blogCommentId && (
        <div className="mt-3 space-y-3 animate-slide-down bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 shadow-sm">
          <div className="text-sm text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-indigo-500">↪️</span>
              Replying to <span className="font-medium text-slate-800">{c.user}</span>
            </span>
            <button
              onClick={() => setActiveReply(null)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 hover:bg-red-50 px-2 py-1 rounded-md text-xs"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Write a reply..."
              className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg text-sm hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              onClick={async () => {
                if (!commentText.trim()) return;

                const payload = {
                  postId: postId,
                  content: commentText.trim(),
                  parentCommentId: c.blogCommentId
                };

                await fetch("https://localhost:7157/api/blog/comment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                  },
                  body: JSON.stringify(payload)
                });

                await fetchComments(postId, idx);
                setCommentText("");
                setActiveReply(null);
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Đệ quy comment con */}
      {c.children && renderComments(c.children, idx, postId, level + 1)}
    </div>
  ));

  const filteredBlogs = blogs
    .filter((b) =>
      b.content.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((b) => !filterDate || new Date(b.createdAt) >= new Date(filterDate))
    .filter((b) => !filterRole || b.role === filterRole)
    .sort((a, b) => {
      if (sortBy === "Latest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0; // chưa có views nên để 0
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="text-black px-4 py-8 max-w-4xl mx-auto">
        {/* Header + Add Blog */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-down">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
              📚 Blogs
            </h1>
            <p className="text-slate-600">Discover and share amazing content</p>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => window.location.href = "/blogs/add"}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-emerald-200 transform hover:scale-105 flex items-center gap-2 hover:shadow-xl"
            >
              <span className="text-lg">➕</span>
              Add Blog
            </button>
          )}
        </div>

        {/* Search bar */}
        <div className="relative mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border-2 border-slate-200 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
            🔍
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border-2 border-slate-200 px-4 py-3 rounded-xl w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border-2 border-slate-200 px-4 py-3 rounded-xl w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <option value="">All Roles</option>
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-slate-200 px-4 py-3 rounded-xl w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <option value="Top Views">Top Views</option>
            <option value="Latest">Latest</option>
          </select>
        </div>

        {/* Blog list */}
        <div className="space-y-8">
          {filteredBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border-2 border-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up hover:shadow-indigo-100"
              style={{animationDelay: `${0.1 * idx}s`}}
            >
              {/* Header: Avatar + Author */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {blog.authorName?.[0] || "?"}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-lg text-slate-800">{blog.authorName}</div>
                  <div className="text-sm text-slate-600 flex items-center gap-2">
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
                        {blog.role}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                        Public
                      </span>
                    </div>
                    <span>•</span>
                    <span>{new Date(blog.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="text-xl font-bold text-indigo-700 mb-2">
                {blog.title}
              </div>
              <div className="mb-4 p-4 bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-xl border border-slate-100">
                <p className="whitespace-pre-line text-slate-800 leading-relaxed">{blog.content}</p>
              </div>

              {/* Image */}
              {blog.imageUrl && (
                <div className="mb-4 overflow-hidden rounded-xl shadow-md">
                  <img
                    src={`https://localhost:7157${blog.imageUrl}`}
                    alt="Blog visual"
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  {blog.authorName === currentUsername && (
                    <button
                      onClick={() => window.location.href = `/blogs/edit/${blog.id}`}
                      className="text-amber-600 hover:text-amber-700 transition-colors duration-200 flex items-center gap-1 hover:bg-amber-50 px-3 py-1 rounded-lg"
                    >
                      <span>✏️</span>
                      Edit
                    </button>
                  )}
                  <span className="flex items-center gap-1 text-slate-500">
                    <span>👁</span>
                    0 views
                  </span>
                </div>
                <button
                  onClick={() => {
                  console.log("Blog object:", blog.postId);
                    if (showingCommentFor !== idx) {
                      fetchComments(blog.postId, idx); // gọi API khi mở khối comment
                    }
                    setShowingCommentFor(showingCommentFor === idx ? null : idx);
                  }}
                  className="text-indigo-600 hover:text-indigo-700 transition-all duration-200 flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium"
                >
                  <span className="text-lg">💬</span>
                  Comment
                </button>
              </div>

              {/* Comment Section */}
              {showingCommentFor === idx && (
                <div className="mt-6 space-y-4 animate-slide-down bg-gradient-to-r from-indigo-50/60 to-purple-50/40 p-6 rounded-xl border border-indigo-100 backdrop-blur-sm">

                  {/* ✅ Bình luận gốc */}
                  {isLoggedIn && (
                    <div className="flex gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {currentUsername?.[0] || "?"}
                      </div>
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl text-sm hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
                        onClick={async () => {
                          if (!commentText.trim()) return;

                          const payload = {
                            postId: blog.postId,
                            content: commentText.trim(),
                            parentCommentId: null
                          };

                          await fetch("https://localhost:7157/api/blog/comment", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                            },
                            body: JSON.stringify(payload)
                          });

                          await fetchComments(blog.postId, idx);
                          setCommentText("");
                        }}
                      >
                        Post
                      </button>
                    </div>
                  )}

                  {/* ✅ Hiển thị danh sách comment phân cấp */}
                  <div className="space-y-3">
                    {commentsData[idx]
                      ? renderComments(commentsData[idx], idx, blog.postId)
                      : <div className="flex items-center justify-center py-8 text-slate-500">
                          <div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full mr-2"></div>
                          Loading comments...
                        </div>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No blogs found</h3>
            <p className="text-slate-500">Try adjusting your search filters</p>
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

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BlogsPage;