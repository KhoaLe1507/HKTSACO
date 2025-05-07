import React, { useState } from "react";

const AddModuleContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm nội dung: ${title}`);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-xl mx-auto bg-[#1a2a47] p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Thêm nội dung vào Learning Path</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tiêu đề</label>
          <input
            className="w-full p-2 rounded bg-[#22335a] text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nội dung</label>
          <textarea
            className="w-full p-2 rounded bg-[#22335a] text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>
        <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">Thêm nội dung</button>
      </form>
    </div>
  );
};

export default AddModuleContent;
