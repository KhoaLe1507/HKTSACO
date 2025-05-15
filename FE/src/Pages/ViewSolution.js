import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSolution = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(`https://localhost:7157/api/problem/solution/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to load solution");

        const data = await res.json();
        setSolution(data);
      } catch (err) {
        console.error("Lỗi khi tải lời giải:", err);
      }
    };

    fetchSolution();
  }, [id]);

  if (!solution) {
    return (
      <div className="p-6 text-center text-gray-600 font-semibold">
        Loading solution...
      </div>
    );
  }

  const { problemTitle, author, explanation, language, sourceCode } = solution;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold text-navy mb-6">📘 Official Solution</h2>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">🔖 Problem Title:</label>
        <p className="text-xl font-bold text-blue-600">{problemTitle}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">👤 Author:</label>
        <p className="text-base text-gray-800">{author}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">📖 Explanation:</label>
        <p className="text-base text-gray-800 whitespace-pre-line">{explanation}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">💻 Language:</label>
        <p className="text-base text-indigo-600">{language}</p>
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">🧠 Code:</label>
        <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-x-auto whitespace-pre-wrap text-sm text-black">
          {sourceCode}
        </pre>
      </div>
    </div>
  );
};

export default ViewSolution;
