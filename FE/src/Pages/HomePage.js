import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white py-28 px-4 md:px-10 flex flex-col items-center text-center space-y-10">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        HKT ONLINE JUDGE
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
        A modern platform to learn algorithms and compete with real challenges.
        Join HKTOJ to solve problems, track your progress, and become a better coder.
      </p>

      <button
        onClick={handleGetStarted}
        className="mt-6 px-6 py-3 bg-white text-black text-lg font-semibold rounded-lg shadow-md hover:shadow-purple-500 hover:scale-105 transition transform duration-300"
      >
        Get Started
      </button>

      <p className="text-sm text-gray-500 mt-20">
        Created by the HKT Team • Inspired by USACO Guide
      </p>
    </div>
  );
};

export default HomePage;