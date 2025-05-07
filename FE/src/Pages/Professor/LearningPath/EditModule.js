import React, { useState } from "react";

const EditModule = () => {
  const [moduleName, setModuleName] = useState("Bronze");
  const [topics, setTopics] = useState(["Math", "Brute Force"]);
  const [newTopic, setNewTopic] = useState("");

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic]);
      setNewTopic("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã lưu module: ${moduleName}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-[#1a2a47] p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa Learning Path</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên Module</label>
          <input
            className="w-full p-2 rounded bg-[#22335a] text-white"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Topics</label>
          <ul className="list-disc ml-6 mb-2">
            {topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 rounded bg-[#22335a] text-white"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Thêm topic mới"
            />
            <button type="button" onClick={handleAddTopic} className="bg-yellow-400 text-black px-3 py-2 rounded font-bold">Thêm</button>
          </div>
        </div>
        <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">Lưu Module</button>
      </form>
    </div>
  );
};

export default EditModule;
