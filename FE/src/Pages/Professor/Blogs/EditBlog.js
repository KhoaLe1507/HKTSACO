import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("Tiêu đề blog mẫu");
  const [content, setContent] = useState("Nội dung blog mẫu...");
  const [visibility, setVisibility] = useState("Private");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã lưu blog: ${title}`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow text-black mt-8">
      <h2 className="text-2xl font-bold mb-6">Chỉnh sửa Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Chế độ hiển thị</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tiêu đề</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nội dung</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
          >
            Lưu Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
