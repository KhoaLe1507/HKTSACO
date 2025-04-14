import React from "react";

const Problem = ({ title, onClick }) => (
  <div className="flex justify-between items-center bg-[#0f1f3b] text-white p-4 rounded shadow mb-2">
    <span>{title}</span>
    <button onClick={onClick} className="bg-[#4a78a6] text-white px-4 py-1 rounded">
      Solve
    </button>
  </div>
);

export default Problem;
