import React from "react";
import { useNavigate } from "react-router-dom";
import ProblemsPage from "../../ProblemsPage";

const AllProblem = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={() => navigate("/professor/problems/add")}
          className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500"
        >
          + Add Problem
        </button>
      </div>
      <ProblemsPage />
    </div>
  );
};

export default AllProblem;
