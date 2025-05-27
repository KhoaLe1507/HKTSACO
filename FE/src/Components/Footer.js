import React from "react";

const Footer = () => (
  <footer className="footer bottom-0 left-0 w-full py-3 px-6 text-center rounded-t-xl bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-lg border-t border-slate-200/60 backdrop-blur-sm relative overflow-hidden">
    {/* Enhanced background elements */}
    <div className="absolute inset-0 opacity-40">
      <div className="absolute top-1/2 left-1/6 w-20 h-20 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-gradient-to-br from-purple-500/25 to-pink-500/25 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1500"></div>
    </div>
    
    {/* Main content */}
    <div className="relative z-10">
      {/* Single line text */}
      <div className="flex items-center justify-center space-x-3 text-sm group">
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold text-base bg-size-200 animate-gradient">
          HKT Online Judge
        </span>
        <span className="text-slate-400 font-light">|</span>
        <span className="text-slate-600 font-medium transition-all duration-300 group-hover:text-blue-600 group-hover:font-semibold">
          A platform for students and programming enthusiasts to practice algorithms.
        </span>
      </div>
      
      {/* Animated accent line */}
      <div className="mt-2 mx-auto w-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-32 transition-all duration-700"></div>
    </div>
    
    {/* Subtle corner accents */}
    <div className="absolute top-2 left-4 w-1 h-1 bg-blue-400/50 rounded-full animate-ping"></div>
    <div className="absolute top-2 right-4 w-1 h-1 bg-purple-400/50 rounded-full animate-ping delay-1000"></div>
    
    <style jsx>{`
      @keyframes gradient {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
      .bg-size-200 {
        background-size: 200% 200%;
      }
    `}</style>
  </footer>
);

export default Footer;