import React, { useState, useContext } from "react";
import blogs from "../Data/BlogsData";
import { AuthContext } from "../Context/AuthContext";

const BlogsPage = () => { 
  const { isLoggedIn, role, username } = useContext(AuthContext);
  const currentUsername = username || "Guest"; // username chính là authorID

  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortBy, setSortBy] = useState("Top Views");

  const [showingCommentFor, setShowingCommentFor] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentsData, setCommentsData] = useState({}); // { blogId: [comments] }

  const filteredBlogs = blogs
    .filter((b) =>
      b.content.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((b) => !filterDate || b.date >= filterDate)
    .filter((b) => !filterRole || b.role === filterRole)
    .sort((a, b) => {
      if (sortBy === "Latest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "Top Views") return b.views - a.views;
      return 0;
    });

  return (
    <div className="text-black px-4 py-6 max-w-3xl mx-auto bg-white">

      {/* Header + Add Blog */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-indigo-600"></h1>
        {isLoggedIn && (
          <button
            onClick={() => window.location.href = "/blogs/add"}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all text-sm"
          >
            ➕ Add Blog
          </button>
        )}
      </div>


      {/* Search bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full border border-gray-300 text-lg px-4 py-3 mb-4 rounded"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-auto"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-auto"
        >
          <option value="">All Roles</option>
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Admin">Admin</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-auto"
        >
          <option value="Top Views">Top Views</option>
          <option value="Latest">Latest</option>
        </select>
      </div>

      {/* Blog list */}
      <div className="space-y-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-50 border border-gray-200 p-4 rounded shadow hover:shadow-md transition"
          >
            {/* Header: Avatar + Author */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {blog.author[0]}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{blog.author}</div>
                <div className="text-sm text-gray-600">
                  {blog.role} • {blog.date}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="mb-3">{blog.content}</p>

            {/* Image */}
            {blog.image && (
              <img
                src={blog.image}
                alt="Blog visual"
                className="rounded w-full object-cover mb-3"
              />
            )}

            {/* View + Comment Toggle */}
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              {blog.authorID === currentUsername && (
                <button
                  onClick={() => window.location.href = `/blogs/edit/${blog.id}`}
                  className="text-yellow-600 hover:underline ml-4"
                >
                  ✏️ Edit
                </button>
              )}
              <span>👁 {blog.views?.toLocaleString() ?? "0"} views</span>
              <button
                onClick={() =>
                  setShowingCommentFor(showingCommentFor === blog.id ? null : blog.id)
                }
                className="text-blue-600 hover:underline"
              >
                💬 Comment
              </button>
            </div>

            {/* Comment Section */}
            {showingCommentFor === blog.id && (
              <div className="mt-4 space-y-2">
                {/* Comment List */}
                <div className="space-y-2">
                  {(commentsData[blog.id] || []).map((c, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded px-3 py-2 flex justify-between items-start"
                    >
                      <div>
                        <p className="text-sm font-medium">👤 {c.user}</p>
                        <p className="text-sm">{c.text}</p>
                      </div>
                      {c.user === currentUsername && (
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this comment?")) {
                              setCommentsData((prev) => ({
                                ...prev,
                                [blog.id]: prev[blog.id].filter((_, idx) => idx !== i)
                              }));
                            }
                          }}
                          className="text-red-500 hover:underline text-xs ml-2"
                          title="Delete"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                {isLoggedIn && (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                      onClick={() => {
                        if (!commentText.trim()) return;

                        const newComment = {
                          user: currentUsername,
                          text: commentText.trim()
                        };

                        setCommentsData((prev) => ({
                          ...prev,
                          [blog.id]: [...(prev[blog.id] || []), newComment]
                        }));

                        setCommentText("");
                      }}
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
