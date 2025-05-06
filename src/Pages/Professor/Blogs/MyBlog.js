import React from "react";

const mockMyBlogs = [
  { id: 1, title: "Tài liệu Graph Theory", date: "2025-05-03" },
  { id: 2, title: "Kinh nghiệm dạy học online", date: "2025-04-28" },
];

const MyBlog = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog của tôi</h2>
      <div className="space-y-4">
        {mockMyBlogs.map((blog) => (
          <div key={blog.id} className="bg-[#1a2a47] p-4 rounded shadow">
            <div className="font-semibold text-lg">{blog.title}</div>
            <div className="text-sm text-gray-400 mb-2">Ngày: {blog.date}</div>
            <button className="text-yellow-400 hover:underline mr-2">Edit</button>
            <button className="text-red-400 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;
