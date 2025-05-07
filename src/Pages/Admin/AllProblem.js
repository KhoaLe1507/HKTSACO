import React, { useState } from 'react';

const mockProblems = [
  { id: 1, title: 'Sum of Two Numbers', level: 'Easy', author: 'Khoa Le' },
  { id: 2, title: 'Binary Search', level: 'Medium', author: 'admin' },
  { id: 3, title: 'DFS', level: 'Medium', author: 'Khoano1' },
  { id: 4, title: 'Knapsack DP', level: 'Hard', author: 'admin2' },
  { id: 5, title: 'Prefix Sums', level: 'Easy', author: 'admin3' },
];

const AllProblem = () => {
  const [problems, setProblems] = useState(mockProblems);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Problems</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-all">Add Problem</button>
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
                  <button className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 transition-all">Details</button>
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all">Delete</button>
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