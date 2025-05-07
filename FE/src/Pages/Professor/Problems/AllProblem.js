import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockProblems = [
  { id: 1, title: "Sum of Two Numbers", level: "Easy", author: "me", authorId: 1 },
  { id: 2, title: "Binary Search", level: "Medium", author: "other", authorId: 2 },
  { id: 3, title: "DFS", level: "Medium", author: "me", authorId: 1 },
];
const myId = 1;

const AllProblem = () => {
  const navigate = useNavigate();
  const [showMine, setShowMine] = useState(false);
  const problems = showMine ? mockProblems.filter(p => p.authorId === myId) : mockProblems;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Problems</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-all" onClick={() => navigate("/professor/problems/add")}>Add Problem</button>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input type="checkbox" id="myproblem" checked={showMine} onChange={() => setShowMine(v => !v)} />
        <label htmlFor="myproblem" className="font-semibold">My Problem</label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id} className="text-center border-b hover:bg-gray-50">
                <td className="px-4 py-2 border">{problem.title}</td>
                <td className="px-4 py-2 border">{problem.level}</td>
                <td className="px-4 py-2 border">{problem.author}</td>
                <td className="px-4 py-2 border flex gap-2 justify-center">
                  <button className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 transition-all" onClick={() => navigate(`/professor/problems/${problem.id}`)}>Details</button>
                  {problem.authorId === myId && <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all" onClick={() => navigate(`/professor/problems/${problem.id}/edit`)}>Edit</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllProblem;
