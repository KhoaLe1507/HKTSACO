import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditModuleContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="max-w-xl mx-auto bg-[#1a2a47] p-8 rounded shadow mt-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Edit Module Content (ID: {id})</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default EditModuleContent; 