import React from "react";
import { Link } from "react-router-dom";

const mockMyProblems = [
  { id: 1, title: "Sum of Two Numbers", level: "Bronze", section: "Math", submissions: 10, accepted: 7 },
  { id: 2, title: "Binary Search", level: "Silver", section: "Algorithm", submissions: 8, accepted: 3 },
];

const MyProblem = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bài tập của tôi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMyProblems.map((problem) => (
          <div key={problem.id} className="bg-[#1a2a47] p-4 rounded shadow">
            <div className="font-semibold text-lg">{problem.title}</div>
            <div className="text-sm text-gray-400 mb-2">Level: {problem.level} | Section: {problem.section}</div>
            <div className="text-xs mb-2">Nộp: {problem.submissions} | AC: {problem.accepted}</div>
            <div className="flex gap-2">
              <Link to={`/professor/problems/${problem.id}`} className="text-blue-400 hover:underline">Chi tiết</Link>
              <Link to={`/professor/problems/${problem.id}/edit`} className="text-yellow-400 hover:underline">Edit</Link>
              <button className="text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProblem;
