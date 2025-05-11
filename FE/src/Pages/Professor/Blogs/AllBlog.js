import React from "react";

const mockBlogs = [
  { id: 1, author: "Prof. An", title: "Giới thiệu Graph Theory", date: "2025-05-03" },
  { id: 2, author: "Prof. Binh", title: "Thông báo kiểm tra giữa kỳ", date: "2025-05-02" },
];

const AllBlog = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tất cả Blog</h2>
      <div className="space-y-4">
        {mockBlogs.map((blog) => (
          <div key={blog.id} className="bg-gray text-black p-4 rounded shadow">
            <div className="font-semibold text-lg">{blog.title}</div>
            <div className="text-sm text-gray-500 mb-2">Tác giả: {blog.author} | Ngày: {blog.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
