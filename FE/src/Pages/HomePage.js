import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState({
    problems: 0,
    users: 0,
    submissions: 0
  });
  
  // Animation timing effect
  useEffect(() => {
    setLoaded(true);
    
    // Simulate stat loading with counting animation
    const targetStats = {
      problems: 530,
      users: 12845,
      submissions: 352691
    };
    
    const duration = 2000; // 2 seconds for the counting animation
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        problems: Math.floor(targetStats.problems * progress),
        users: Math.floor(targetStats.users * progress),
        submissions: Math.floor(targetStats.submissions * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  // Random code snippets for the background effect
  const codeSnippets = [
    "function binarySearch(arr, x) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    let m = l + Math.floor((r - l) / 2);\n    if (arr[m] === x) return m;\n    if (arr[m] < x) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n}",
    "bool isPrime(int n) {\n  if (n <= 1) return false;\n  if (n <= 3) return true;\n  if (n % 2 == 0 || n % 3 == 0) return false;\n  for (int i = 5; i * i <= n; i += 6)\n    if (n % i == 0 || n % (i + 2) == 0) return false;\n  return true;\n}",
    "def merge_sort(arr):\n  if len(arr) > 1:\n    mid = len(arr) // 2\n    L = arr[:mid]\n    R = arr[mid:]\n    merge_sort(L)\n    merge_sort(R)\n    i = j = k = 0\n    while i < len(L) and j < len(R):\n      if L[i] < R[j]:\n        arr[k] = L[i]\n        i += 1\n      else:\n        arr[k] = R[j]\n        j += 1\n      k += 1\n    while i < len(L):\n      arr[k] = L[i]\n      i += 1\n      k += 1\n    while j < len(R):\n      arr[k] = R[j]\n      j += 1\n      k += 1"
  ];

  return (
    <div className="relative min-h-screen bg-white text-gray-800 overflow-hidden">
      {/* Code background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 font-mono text-xs text-gray-500">
          {codeSnippets.map((snippet, i) => (
            <pre key={i} className="whitespace-pre-wrap" style={{ 
              animationDelay: `${i * 0.5}s`,
              opacity: 0.7,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.5}deg)`,
            }}>
              {snippet}
            </pre>
          ))}
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
              animation: `float ${Math.random() * 10 + 20}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 ${Math.random() * 5 + 5}px rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className={`flex flex-col items-center justify-center min-h-screen px-4 z-10 relative transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-6xl w-full">
          {/* Logo section with animated underline */}
          <div className="text-center mb-10">
            <h1 className={`text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              HKT ONLINE JUDGE
            </h1>
            <div className={`h-1 w-40 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full transition-all duration-1000 delay-300 ${loaded ? "opacity-100 w-40" : "opacity-0 w-0"}`}></div>
          </div>

          {/* Subtitle with clean typography */}
          <div className={`text-center mb-12 transition-all duration-1000 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              A modern platform to master algorithms and data structures.
            </p>
            <p className="text-lg text-gray-600">
              Solve challenges. Track progress. Become an exceptional coder.
            </p>
          </div>

          {/* Stats counter section */}
          <div className={`flex flex-wrap justify-center gap-8 mb-12 transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-center p-4 bg-white shadow-lg rounded-lg border border-gray-100 w-64 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.problems.toLocaleString()}</div>
              <div className="text-gray-600">Coding Problems</div>
              <div className="mt-2 text-xs text-gray-500">From basic to competitive level</div>
            </div>
            <div className="text-center p-4 bg-white shadow-lg rounded-lg border border-gray-100 w-64 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.users.toLocaleString()}</div>
              <div className="text-gray-600">Active Users</div>
              <div className="mt-2 text-xs text-gray-500">Join our growing community</div>
            </div>
            <div className="text-center p-4 bg-white shadow-lg rounded-lg border border-gray-100 w-64 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{stats.submissions.toLocaleString()}</div>
              <div className="text-gray-600">Submissions</div>
              <div className="mt-2 text-xs text-gray-500">With real-time feedback</div>
            </div>
          </div>

          {/* Features section */}
          <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-900 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:shadow-blue-100">
              <div className="text-blue-500 text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Practice</h3>
              <p className="text-gray-600">Solve hundreds of algorithm challenges with real-time feedback</p>
              {/* Code example */}
              <div className="mt-4 bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 border-l-4 border-blue-500">
                <pre>{'for(int i=0; i<n; i++) {\n  if(solve(arr[i])) count++;\n}'}</pre>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:shadow-purple-100">
              <div className="text-purple-500 text-3xl mb-3">🏆</div>
              <h3 className="text-xl font-bold mb-2">Compete</h3>
              <p className="text-gray-600">Join contests and see how you rank against others worldwide</p>
              {/* Leaderboard example */}
              <div className="mt-4 bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 border-l-4 border-purple-500">
                <div>1. codeMaster: 950 pts</div>
                <div>2. algorithm_guru: 920 pts</div>
                <div>3. byte_wizard: 890 pts</div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:shadow-indigo-100">
              <div className="text-indigo-500 text-3xl mb-3">📈</div>
              <h3 className="text-xl font-bold mb-2">Improve</h3>
              <p className="text-gray-600">Track your progress with detailed analytics and learning paths</p>
              {/* Progress example */}
              <div className="mt-4 bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 border-l-4 border-indigo-500">
                <div className="mb-1">Arrays: 90% ▓▓▓▓▓▓▓▓▓░</div>
                <div className="mb-1">Trees: 75% ▓▓▓▓▓▓▓░░░</div>
                <div>Graphs: 60% ▓▓▓▓▓▓░░░░</div>
              </div>
            </div>
          </div>

          {/* Code typing animation */}
          <div className={`max-w-2xl mx-auto mb-10 bg-gray-900 rounded-lg p-4 shadow-lg overflow-hidden transition-all duration-1000 delay-1100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs text-gray-400">problem.cpp</div>
            </div>
            <div className="font-mono text-sm text-green-500 animate-typing overflow-hidden whitespace-nowrap">
              <span className="text-blue-400">int</span> <span className="text-yellow-400">solve</span>(<span className="text-blue-400">vector</span>&lt;<span className="text-blue-400">int</span>&gt; arr) &#123;<br/>
              &nbsp;&nbsp;<span className="text-blue-400">int</span> n = arr.<span className="text-yellow-400">size</span>();<br/>
              &nbsp;&nbsp;<span className="text-purple-400">sort</span>(arr.<span className="text-yellow-400">begin</span>(), arr.<span className="text-yellow-400">end</span>());<br/>
              &nbsp;&nbsp;<span className="text-red-400">// Find the optimal solution</span><br/>
              &nbsp;&nbsp;<span className="text-orange-400">for</span>(<span className="text-blue-400">int</span> i = 0; i &lt; n; i++) &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">if</span>(arr[i] + arr[n-i-1] &gt; target)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">return</span> <span className="text-green-400">true</span>;<br/>
              &nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;<span className="text-orange-400">return</span> <span className="text-red-400">false</span>;<br/>
              &#125;
            </div>
          </div>

          {/* CTA button with gradient */}
          <div className={`text-center mb-16 transition-all duration-1000 delay-1200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <button
              onClick={handleGetStarted}
              className="relative px-8 py-4 rounded-full font-bold text-white overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transition-all duration-300 transform group-hover:scale-105"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-90"></span>
              <span className="absolute inset-0 w-full h-full border border-white opacity-10 rounded-full"></span>
              <span className="relative flex items-center justify-center">
                <span className="mr-2">Get Started</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Footer with live stats */}
          <div className={`text-center transition-all duration-1000 delay-1300 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="text-xs text-gray-400 mb-2">
              <span className="inline-flex items-center mr-4">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                <span>{Math.floor(Math.random() * 150) + 450} online now</span>
              </span>
              <span className="inline-flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-1"></span>
                <span>{Math.floor(Math.random() * 30) + 10} contests this month</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Created by the HKT Team &bull; Inspired by USACO Guide
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Copyright © {new Date().getFullYear()} HKT Online Judge. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        .animate-typing {
          display: inline-block;
          overflow: hidden;
          animation: typing 3s steps(40, end);
        }
      `}</style>
    </div>
  );
};

export default HomePage;