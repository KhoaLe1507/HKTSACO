import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn">
      <div className="card max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">HKT ONLINE JUDGE</h1>
        <p className="mb-8 text-lg text-gray-700">
          A modern platform to learn algorithms and compete with real challenges.<br />
          Join HKTOJ to solve problems, track your progress, and become a better coder.
        </p>
        <button
          onClick={handleGetStarted}
          className="btn text-lg px-8 py-3 bg-white text-black text-lg font-semibold rounded-lg shadow-md hover:shadow-purple-500 hover:scale-105 transition transform duration-300"
        >
          Get Started
        </button>
        <div className="mt-8 text-xs text-gray-400">
          Created by the HKT Team &bull; Inspired by USACO Guide
        </div>
      </div>
    </div>
  );
};

export default HomePage;