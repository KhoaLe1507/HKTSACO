import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-black">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Register</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="date"
            placeholder="Birthdate"
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
