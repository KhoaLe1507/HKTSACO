import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Dữ liệu mẫu - sẽ thay bằng fetch từ API
  const blogPosts = [
    {
      id: 1,
      user: {
        avatar: "/Image/avatar-default.png",
        fullName: "Nguyễn Văn A",
        userName: "nguyenvana",
        role: "Student"
      },
      title: "Giải thuật DFS nâng cao",
      content: "DFS là giải thuật rất hay dùng trong bài toán tìm đường...",
      media: {
        image: "/Image/dfs.png",
        video: ""
      },
      createdAt: "2025-05-11T14:30",
      visibility: "Public",
      reacts: 20,
      comments: 5
    },
    {
      id: 2,
      user: {
        avatar: "/Image/avatar2.png",
        fullName: "Trần Thị B",
        userName: "tranb",
        role: "Student"
      },
      title: "Hướng dẫn QuickSort",
      content: "QuickSort là thuật toán sắp xếp nhanh và hiệu quả...",
      media: {
        image: "",
        video: "/videos/quicksort.mp4"
      },
      createdAt: "2025-05-10T10:00",
      visibility: "Private",
      reacts: 5,
      comments: 1
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
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
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white p-4 shadow rounded">
            {/* Thông tin người đăng */}
            <div className="flex items-center gap-3 mb-2">
              <img src={post.user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold text-black">{post.user.fullName} ({post.user.userName})</p>
                <p className="text-sm text-gray-600">{post.user.role} • {post.visibility} • {new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Nội dung blog */}
            <h3 className="text-lg font-semibold text-black">{post.title}</h3>
            <p className="text-gray-800 mt-1 mb-2">{post.content}</p>

            {post.media.image && <img src={post.media.image} alt="blog visual" className="w-full rounded my-2" />}
            {post.media.video && (
              <video controls className="w-full rounded my-2">
                <source src={post.media.video} type="video/mp4" />
              </video>
            )}

            {/* Tương tác + Chỉnh sửa */}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
              <div>{post.reacts} 👍 • {post.comments} 💬</div>
              <button
                onClick={() => navigate(`/blogs/edit/${post.id}`)}
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
