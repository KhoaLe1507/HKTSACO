import React, { useState, useEffect } from "react";

// SVG icons as components to replace lucide-react
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LoginPage = () => {
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);

  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-gray-800 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDE4NCAxODQiPjxwYXRoIGQ9Ik0wIDE4NGwxODQtMTg0TDE4NCAxODQgMCAwIiBmaWxsPSIjZjdmN2Y3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-gray-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side decorative panel */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-gray-50 to-blue-50 p-12 hidden md:flex flex-col justify-between relative overflow-hidden">
          <div className={`relative z-10 transform transition-all duration-700 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-6">We're excited to see you again! Access your account with your credentials.</p>
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
                  <UserIcon />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            {/* Username input with icon and animation */}
            <div className={`relative mb-6 transform transition-all duration-500 delay-100 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 w-5 h-5 ${focused === 'email' ? 'text-blue-400' : 'text-gray-400'}`}>
                <MailIcon />
              </div>
              <input
                type="text"
                placeholder="Username or Email"
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border ${focused === 'email' ? 'border-blue-300 ring-4 ring-blue-50' : 'border-gray-200'} outline-none transition-all duration-300 text-gray-700`}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              <div className={`absolute w-full h-0.5 bottom-0 left-0 transition-all duration-300 ${focused === 'email' ? 'bg-blue-400 opacity-100' : 'bg-transparent opacity-0'}`}></div>
            </div>
            
            {/* Password input with icon and animation */}
            <div className={`relative mb-6 transform transition-all duration-500 delay-200 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 w-5 h-5 ${focused === 'password' ? 'text-blue-400' : 'text-gray-400'}`}>
                <LockIcon />
              </div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border ${focused === 'password' ? 'border-blue-300 ring-4 ring-blue-50' : 'border-gray-200'} outline-none transition-all duration-300 text-gray-700`}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
              <div className={`absolute w-full h-0.5 bottom-0 left-0 transition-all duration-300 ${focused === 'password' ? 'bg-blue-400 opacity-100' : 'bg-transparent opacity-0'}`}></div>
            </div>
            
            {/* Remember me & forgot password */}
            <div className={`flex justify-between text-sm mb-8 transform transition-all duration-500 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <label className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 cursor-pointer group">
                <div className="w-5 h-5 mr-2 rounded border border-gray-300 flex items-center justify-center group-hover:border-blue-400 transition-colors duration-300">
                  <div className="w-3 h-3 bg-blue-400 rounded-sm transform scale-0 group-hover:scale-75 transition-transform duration-200"></div>
                </div>
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors duration-300">Forgot password?</a>
            </div>
            
            {/* Login button with animation */}
            <div className={`transform transition-all duration-500 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <button
                onClick={handleSubmit}
                className="w-full bg-white hover:bg-gray-50 py-4 rounded-xl font-semibold text-blue-500 shadow-md border border-blue-100 transform transition-all duration-300 hover:shadow-lg active:scale-98 outline-none focus:ring-4 focus:ring-blue-50 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Sign In</span>
                  <div className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </div>
                </span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            </div>

            {/* Social login divider */}
            <div className={`flex items-center my-8 transform transition-all duration-500 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="px-4 text-gray-400 text-sm">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>
            
            {/* Social login options */}
            <div className={`grid grid-cols-2 gap-4 transform transition-all duration-500 delay-600 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <button 
                type="button" 
                className="flex items-center justify-center bg-white hover:bg-gray-50 py-3 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow group"
              >
                <div className="w-5 h-5 text-gray-700 mr-2 group-hover:text-blue-500 transition-colors duration-300">
                  <GithubIcon />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">GitHub</span>
              </button>
              <button 
                type="button" 
                className="flex items-center justify-center bg-white hover:bg-gray-50 py-3 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow group"
              >
                <div className="w-5 h-5 text-gray-700 mr-2 group-hover:text-blue-500 transition-colors duration-300">
                  <MailIcon />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">Email</span>
              </button>
            </div>
          </div>
          
          {/* Sign up link */}
          <div className={`text-center mt-8 text-gray-600 transform transition-all duration-500 delay-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            Don't have an account? 
            <a href="#" className="text-blue-500 hover:text-blue-700 ml-1 transition-colors duration-300 font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;