import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // Cập nhật path đúng theo thư mục dự án

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setRole } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);

  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

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

      if (role === "Admin") navigate("/admin/home");
      else if (role === "Professor") navigate("/professor");
      else navigate("/"); // Student → về Home
    } else {
      alert("Please enter username and password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-gray-800 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDE4NCAxODQiPjxwYXRoIGQ9Ik0wIDE4NGwxODQtMTg0TDE4NCAxODQgMCAwIiBmaWxsPSIjZjdmN2Y3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-gray-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side decorative panel */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-gray-50 to-blue-50 p-12 hidden md:flex flex-col justify-between relative overflow-hidden">
          <div className={`relative z-10 transform transition-all duration-700 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-6">Access your account using your credentials below.</p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Student, Professor, or Admin Access</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Secure Authentication System</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Role-based Dashboard Access</p>
              </div>
            </div>
          </div>
          
          {/* Abstract shapes for decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full opacity-60 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className={`relative z-10 transform transition-all duration-700 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-12 h-1 bg-gray-200 rounded"></div>
              <div className="text-sm text-gray-500">Secure Login</div>
              <div className="w-12 h-1 bg-gray-200 rounded"></div>
            </div>
            <div className="text-xs text-gray-500 text-center">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</div>
          </div>
        </div>
        
        {/* Right side login form */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          {/* Mobile header (visible only on small screens) */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Login to continue</p>
          </div>
          
          {/* Logo/Brand section */}
          <div className="flex justify-center mb-8">
            <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-500 ${mounted ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-8 opacity-0 -rotate-90"}`}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="w-10 h-10 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
          
          <form onSubmit={handleLogin}>
            {/* Username input with icon and animation */}
            <div className={`relative mb-6 transform transition-all duration-500 delay-100 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 w-5 h-5 ${focused === 'username' ? 'text-blue-400' : 'text-gray-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border ${focused === 'username' ? 'border-blue-300 ring-4 ring-blue-50' : 'border-gray-200'} outline-none transition-all duration-300 text-gray-700`}
                onFocus={() => setFocused('username')}
                onBlur={() => setFocused(null)}
              />
              <div className={`absolute w-full h-0.5 bottom-0 left-0 transition-all duration-300 ${focused === 'username' ? 'bg-blue-400 opacity-100' : 'bg-transparent opacity-0'}`}></div>
            </div>
            
            {/* Password input with icon and animation */}
            <div className={`relative mb-6 transform transition-all duration-500 delay-200 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 w-5 h-5 ${focused === 'password' ? 'text-blue-400' : 'text-gray-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border ${focused === 'password' ? 'border-blue-300 ring-4 ring-blue-50' : 'border-gray-200'} outline-none transition-all duration-300 text-gray-700`}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
              <div className={`absolute w-full h-0.5 bottom-0 left-0 transition-all duration-300 ${focused === 'password' ? 'bg-blue-400 opacity-100' : 'bg-transparent opacity-0'}`}></div>
            </div>
            
            {/* Login info */}
            <div className={`flex justify-between text-sm mb-8 transform transition-all duration-500 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <div className="text-gray-500 text-xs">
                <div className="mb-1"><strong>Admin:</strong> admin / admin</div>
                <div className="mb-1"><strong>Professor:</strong> professor / professor</div>
                <div><strong>Student:</strong> student / student</div>
              </div>
            </div>
            
            {/* Login button with animation */}
            <div className={`transform transition-all duration-500 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-4 rounded-xl font-semibold text-white shadow-md transform transition-all duration-300 hover:shadow-lg active:scale-98 outline-none focus:ring-4 focus:ring-blue-200 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Login</span>
                  <div className="w-4 h-4 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </span>
              </button>
            </div>
          </form>
          
          {/* Register link */}
          <div className={`text-center mt-8 text-gray-600 transform transition-all duration-500 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            Don't have an account? 
            <a href="#" className="text-blue-500 hover:text-blue-700 ml-1 transition-colors duration-300 font-medium">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;