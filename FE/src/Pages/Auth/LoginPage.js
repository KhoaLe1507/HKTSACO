import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // Cập nhật path đúng theo thư mục dự án

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setRole } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();

    const usernameLower = username.trim().toLowerCase();
    const passwordLower = password.trim().toLowerCase();

    if (
      (usernameLower === "admin" && passwordLower === "admin") ||
      (usernameLower === "professor" && passwordLower === "professor") ||
      (usernameLower === "student" && passwordLower === "student")
    ) {
      const role = usernameLower.charAt(0).toUpperCase() + usernameLower.slice(1); // viết hoa chữ đầu

      setIsLoggedIn(true);
      setRole(role);

      if (role === "Admin") navigate("/admin");
      else if (role === "Professor") navigate("/professor");
      else navigate("/"); // Student → về Home
    } else {
      alert("Please enter username and password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-black">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
