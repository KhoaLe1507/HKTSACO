import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const BlogsPage = () => {
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
    <div key={c.blogCommentId} className={`ml-[${level * 20}px] border-l border-gray-300 pl-3 mt-2`}>
      <div className="bg-gray-100 rounded px-3 py-2">
        <p className="text-sm font-medium">
          👤 {c.user}{" "}
          <span className="text-gray-500 italic text-xs ml-1">
            • {c.role } • {new Date(c.createdAt).toLocaleString()}
          </span>
        </p>
        <p className="text-sm">{c.content}</p>

        {isLoggedIn && (
          <button
            className="text-blue-500 text-xs mt-1"
            onClick={() => {
              setActiveReply({ idx, parentId: c.blogCommentId });
              setCommentText("");
            }}
          >
            ↩️ Reply
          </button>
        )}
      </div>

      {/* Nếu đang reply comment này thì hiển thị input tại đây */}
      {activeReply?.idx === idx && activeReply.parentId === c.blogCommentId && (
        <div className="mt-2 space-y-2">
          <div className="text-sm text-gray-500">
            ↪️ Replying to comment of {c.user}
            <button
              onClick={() => setActiveReply(null)}
              className="text-red-500 ml-2 underline"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a reply..."
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
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
    <div className="text-black px-4 py-6 max-w-3xl mx-auto bg-white">
      {/* Header + Add Blog */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-indigo-600">📚 Blogs</h1>
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
        {filteredBlogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border border-gray-200 p-4 rounded shadow hover:shadow-md transition"
          >
            {/* Header: Avatar + Author */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {blog.authorName?.[0] || "?"}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{blog.authorName}</div>
                <div className="text-sm text-gray-600">
                  {blog.role} • {new Date(blog.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="mb-3 whitespace-pre-line">{blog.content}</p>

            {/* Image */}
            {blog.imageUrl && (
              <img
                src={`https://localhost:7157${blog.imageUrl}`}
                alt="Blog visual"
                className="rounded w-full object-cover mb-3"
              />

            )}

            {/* Actions */}
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              {blog.authorName === currentUsername && (
                <button
                  onClick={() => window.location.href = `/blogs/edit/${blog.id}`}
                  className="text-yellow-600 hover:underline ml-4"
                >
                  ✏️ Edit
                </button>
              )}
              <span>👁 0 views</span>
              <button
                onClick={() => {
                console.log("Blog object:", blog.postId);
                  if (showingCommentFor !== idx) {
                    fetchComments(blog.postId, idx); // gọi API khi mở khối comment
                  }
                  setShowingCommentFor(showingCommentFor === idx ? null : idx);
                }}
                className="text-blue-600 hover:underline"
              >
                💬 Comment
              </button>
            </div>

            {/* Comment Section */}
            {showingCommentFor === idx && (
              <div className="mt-4 space-y-2">

                {/* ✅ Bình luận gốc */}
                {isLoggedIn && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
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
                <div className="space-y-2">
                  {commentsData[idx]
                    ? renderComments(commentsData[idx], idx, blog.postId)
                    : null}
                </div>
              </div>
            )}



          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
