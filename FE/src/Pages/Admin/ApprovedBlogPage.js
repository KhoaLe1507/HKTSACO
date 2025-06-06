import React, { useEffect, useState } from "react";

const ApprovedBlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchPendingBlogs = async () => {
    try {
      const res = await fetch("https://localhost:7157/api/blog/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Lỗi khi tải bài blog chờ duyệt:", err);
    }
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  const handleApproval = async (postId, newStatus) => {
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
      } else {
        console.error("Duyệt bài thất bại");
      }
    } catch (err) {
      console.error("Lỗi khi duyệt bài:", err);
    }
  };

  return (
    <div className="text-black px-4 py-6 max-w-4xl mx-auto bg-white">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">📝 Pending Blog Posts</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">Không có bài viết nào đang chờ duyệt.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.postId}
              className="bg-gray-50 border border-gray-200 p-4 rounded shadow hover:shadow-md transition"
            >
              {/* Header: Tên + Thời gian + Trạng thái */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-lg">{blog.title}</p>
                  <p className="text-sm text-gray-600">
                    ✍️ {blog.authorName} • {blog.role} •{" "}
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                  {blog.approvalStatus}
                </span>
              </div>

              {/* Nội dung */}
              <p className="text-sm mb-2 whitespace-pre-line">{blog.content}</p>

              {/* Hình ảnh nếu có */}
              {blog.imageUrl && (
                <img
                  src={`https://localhost:7157${blog.imageUrl}`}
                  alt="Blog visual"
                  className="rounded w-full object-cover mb-2"
                />
              )}

              {/* Nút duyệt / từ chối */}
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleApproval(blog.postId, "Approved")}
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleApproval(blog.postId, "Rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedBlogPage;
