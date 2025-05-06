import React from "react";
import { Link } from "react-router-dom";

const mockProblems = [
  { id: 1, title: "Sum of Two Numbers", level: "Bronze", section: "Math" },
  { id: 2, title: "Binary Search", level: "Silver", section: "Algorithm" },
  { id: 3, title: "Graph Traversal", level: "Gold", section: "Graph" },
];

const AllProblem = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tất cả bài tập</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProblems.map((problem) => (
          <div key={problem.id} className="bg-[#1a2a47] p-4 rounded shadow">
            <div className="font-semibold text-lg">{problem.title}</div>
            <div className="text-sm text-gray-400 mb-2">Level: {problem.level} | Section: {problem.section}</div>
            <Link to={`/professor/problems/${problem.id}`} className="text-blue-400 hover:underline">Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProblem;
