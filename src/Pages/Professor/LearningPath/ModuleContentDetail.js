import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModuleContentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="max-w-xl mx-auto bg-[#1a2a47] p-8 rounded shadow mt-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Module Content Detail (ID: {id})</h2>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          onClick={() => navigate(`/professor/modules/content/${id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ModuleContentDetail; 