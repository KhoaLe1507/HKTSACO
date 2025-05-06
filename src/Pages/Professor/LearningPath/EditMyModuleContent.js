import React from "react";
import { useNavigate } from "react-router-dom";

const currentAuthorID = "profA";
const mockData = [
  { id: 1, section: "Bronze", module: "Getting Started", content: "Time Complexity", createdAt: "2024-05-01", authorID: "profA" },
  { id: 2, section: "Silver", module: "Prefix Sums", content: "1D Prefix Sums", createdAt: "2024-05-02", authorID: "profA" },
  { id: 3, section: "Gold", module: "Dynamic Programming", content: "Introduction to DP", createdAt: "2024-05-03", authorID: "profA" },
];

const EditMyModuleContent = () => {
  const navigate = useNavigate();
  const myContents = mockData.filter(item => item.authorID === currentAuthorID);

  return (
    <div className="max-w-5xl mx-auto bg-[#1a2a47] p-8 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">My Module Contents</h2>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-[#22345c] text-white">
            <th className="py-2 px-2">#</th>
            <th className="py-2 px-2">Section</th>
            <th className="py-2 px-2">Module</th>
            <th className="py-2 px-2">Module Content</th>
            <th className="py-2 px-2">Created at</th>
            <th className="py-2 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myContents.map((item, idx) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="py-2 px-2">{idx + 1}</td>
              <td className="py-2 px-2">{item.section}</td>
              <td className="py-2 px-2">{item.module}</td>
              <td className="py-2 px-2">{item.content}</td>
              <td className="py-2 px-2">{item.createdAt}</td>
              <td className="py-2 px-2 flex gap-2 justify-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => navigate(`/professor/modules/content/${item.id}`)}
                >
                  Details
                </button>
                <button
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  onClick={() => navigate(`/professor/modules/content/${item.id}/edit`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditMyModuleContent; 