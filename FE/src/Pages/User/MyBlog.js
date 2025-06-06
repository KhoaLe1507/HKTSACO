import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [myBlogs, setMyBlogs] = useState([]);

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
        console.error("Lỗi khi lấy blog của tôi:", err);
      }
    };

    fetchMyBlogs();
  }, []);
  
  const filteredPosts = myBlogs.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterDate || post.createdAt.startsWith(filterDate))
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-black mb-4">My Blogs</h2>

      {/* Thanh công cụ */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search blog title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/blogs/add")}
        >
          Add Blog
        </button>
      </div>

      {/* Danh sách bài viết */}
      <div className="space-y-6">
        {filteredPosts.map((post, idx) => (
          <div key={idx} className="bg-white p-4 shadow rounded">
            {/* Thông tin người đăng */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                {post.authorName?.[0] || "?"}
              </div>
              <div>
                <p className="font-bold text-black">{post.authorName}</p>
                <p className="text-sm text-gray-600">
                  {post.role} • {post.visibility} • {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Nội dung blog */}
            <h3 className="text-lg font-semibold text-black">{post.title}</h3>
            <p className="mb-3 whitespace-pre-line">{post.content}</p>


            {post.imageUrl && (
              <img
                src={`https://localhost:7157${post.imageUrl}`}
                alt="blog visual"
                className="w-full rounded my-2"
              />
            )}

            {/* Tương tác + Chỉnh sửa */}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
              <div>0 👍 • 0 💬</div>
              <button
                onClick={() => window.location.href = `/blogs/edit/${post.postId}`}
                className="text-blue-600 hover:underline"
              >
                Edit Blog
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;
