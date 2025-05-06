import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-10 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
