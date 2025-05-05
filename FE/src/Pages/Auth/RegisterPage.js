import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-10 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="date"
            placeholder="Birthdate"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />
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
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
