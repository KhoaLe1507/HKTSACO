import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Section from "../Components/Section";
import Submit from "./Submit";

const problems = [
  { id: 1, title: "Sum of Two Numbers", description: "Given two integers a and b, return their sum.", difficulty: "Easy", tag: "Math", input: "The first line contains two integers a and b.", output: "Print the sum of a and b.", samples: [{input: "1 2", output: "3"}] },
  { id: 2, title: "Binary Search", description: "Implement binary search on a sorted array.", difficulty: "Normal", tag: "Binary Search", input: "First line n, then n sorted integers, then integer x.", output: "Print index of x or -1.", samples: [{input: "5\n1 3 5 7 9\n5", output: "2"}] },
  { id: 3, title: "Factorial", description: "Compute the factorial of a given number n.", difficulty: "Easy", tag: "Math", input: "One integer n.", output: "Print n!.", samples: [{input: "5", output: "120"}] },
  { id: 4, title: "Fibonacci", description: "Print the nth Fibonacci number.", difficulty: "Normal", tag: "String", input: "One integer n.", output: "Print the nth Fibonacci number.", samples: [{input: "7", output: "13"}] },
  { id: 5, title: "Palindrome Check", description: "Check if a given string is a palindrome.", difficulty: "Easy", tag: "String", input: "A string s.", output: "Print YES if s is palindrome, else NO.", samples: [{input: "abba", output: "YES"}] },
  { id: 6, title: "Maximum Subarray", description: "Find the subarray with the largest sum.", difficulty: "Hard", tag: "String", input: "First line n, then n integers.", output: "Print the largest sum.", samples: [{input: "5\n-2 1 -3 4 -1", output: "4"}] },
  { id: 7, title: "GCD", description: "Find the greatest common divisor.", difficulty: "Normal", tag: "String", input: "Two integers a and b.", output: "Print gcd(a, b).", samples: [{input: "12 18", output: "6"}] },
  { id: 8, title: "Reverse String", description: "Reverse a given string.", difficulty: "Easy", tag: "String", input: "A string s.", output: "Print reversed s.", samples: [{input: "hello", output: "olleh"}] },
  { id: 9, title: "Anagram Check", description: "Check if two strings are anagrams.", difficulty: "Normal", tag: "String", input: "Two strings a and b.", output: "Print YES if a and b are anagrams, else NO.", samples: [{input: "listen silent", output: "YES"}] },
  { id: 10, title: "Matrix Multiplication", description: "Multiply two matrices.", difficulty: "Hard", tag: "Matrix", input: "First line n m, then n rows of m integers, then m p, then m rows of p integers.", output: "Print the resulting n x p matrix.", samples: [{input: "2 2\n1 2\n3 4\n2 2\n5 6\n7 8", output: "19 22\n43 50"}] }
];

const tags = [...new Set(problems.map(p => p.tag))]; // Lấy các tag duy nhất

const ProblemsPage = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedTestcase, setExpandedTestcase] = useState(null);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Count problems by tag
  const tagCounts = problems.reduce((acc, p) => {
    acc[p.tag] = (acc[p.tag] || 0) + 1;
    return acc;
  }, {});
  
  const allTags = Object.keys(tagCounts);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-gradient-to-r from-emerald-400 to-green-500 text-white";
      case "Normal":
        return "bg-gradient-to-r from-blue-400 to-indigo-500 text-white";
      case "Hard":
        return "bg-gradient-to-r from-orange-400 to-red-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };
  
  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "✓";
      case "Normal":
        return "✧";
      case "Hard":
        return "★";
      default:
        return "";
    }
  };

  const filteredProblems = problems.filter(p => {
    const matchTag = selectedTag === "All" || p.tag === selectedTag;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDifficulty = difficultyFilter === "" || p.difficulty === difficultyFilter;
    return matchTag && matchSearch && matchDifficulty;
  });
  
  useEffect(() => {
    setResult({
      status: { description: "Accepted" },
      stdout: "3\n",
      stderr: null,
      compile_output: null,
    });
    
    // Add staggered animation effect when component mounts
    const timer = setTimeout(() => {
      document.querySelectorAll('.problem-card').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 100);
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);
    try {
      const response = await fetch("/mock_result.json");
      const data = await response.json();
      const allAccepted = data.testcases.every(tc => tc.status === "Accepted");
      data.status = { description: allAccepted ? "Accepted" : "Wrong Answer" };
      setResult(data);
    } catch (err) {
      setResult({
        status: { description: "Error" },
        testcases: [],
      });
    }
    setIsSubmitting(false);
  };
  
  const getColorClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Wrong Answer":
        return "bg-red-100 text-red-800";
      case "Time Limit Exceeded":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Memory":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleProblemClick = (problem) => {
    localStorage.setItem("selectedProblem", JSON.stringify(problem));
    navigate("/problem-details");
  };
  
  return (
    selectedProblem ? (
      <Submit problem={selectedProblem} onBack={() => setSelectedProblem(null)} />
    ) : (
      <div className="text-gray-800 min-h-screen bg-gray-50 p-6 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 animate-slideDown">
          Problems
        </h1>
        
        {/* Filter Section */}
        <div className="bg-white py-8 px-6 rounded-xl mb-10 w-full shadow-md animate-slideUp border border-gray-100">
          <div className="max-w-2xl mx-auto mb-6 relative animate-scaleIn">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="🔍 Search problems by title or description"
                className="w-full p-4 rounded-lg text-gray-700 border-2 border-gray-200 focus:border-indigo-400 transition-all duration-300 shadow-sm focus:shadow-md outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slideUp" style={{animationDelay: "0.2s"}}>
            <div className="relative hover:scale-103 transition duration-300">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full p-3 rounded-lg bg-white text-gray-700 appearance-none cursor-pointer shadow-sm transition-all hover:shadow-md border-2 border-gray-200 focus:border-indigo-400 outline-none"
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-600">
                ▼
              </div>
            </div>

            <div className="relative hover:scale-103 transition duration-300">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full p-3 rounded-lg bg-white text-gray-700 appearance-none cursor-pointer shadow-sm transition-all hover:shadow-md border-2 border-gray-200 focus:border-indigo-400 outline-none"
              >
                <option value="All">All Modules</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-600">
                ▼
              </div>
            </div>

            <div className="relative hover:scale-103 transition duration-300">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-3 rounded-lg bg-white text-gray-700 appearance-none cursor-pointer shadow-sm transition-all hover:shadow-md border-2 border-gray-200 focus:border-indigo-400 outline-none"
              >
                <option value="">All Status</option>
                <option value="Accepted">Accepted</option>
                <option value="Wrong Answer">Wrong Answer</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-600">
                ▼
              </div>
            </div>

            <div className="relative hover:scale-103 transition duration-300">
              <select
                disabled
                className="w-full p-3 rounded-lg bg-gray-100 text-gray-400 appearance-none cursor-not-allowed shadow-sm border-2 border-gray-200 outline-none"
              >
                <option>Section (coming soon)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Left Sidebar: Tags */}
          <div className="md:w-[220px] mb-6 md:mb-0 bg-white p-4 rounded-xl shadow-md animate-slideRight border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-indigo-600">Categories</h3>
            <button 
              onClick={() => setSelectedTag("All")} 
              className={`block w-full text-left py-2 px-3 rounded-lg mb-2 transition-all duration-300 hover:translate-x-1 ${selectedTag === "All" ? 'bg-indigo-600 text-white font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              All Problems
              <span className="float-right bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {problems.length}
              </span>
            </button>
            
            {tags.map(tag => (
              <button 
                key={tag} 
                onClick={() => setSelectedTag(tag)} 
                className={`block w-full text-left py-2 px-3 rounded-lg mb-2 transition-all duration-300 hover:translate-x-1 ${selectedTag === tag ? 'bg-indigo-600 text-white font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
              >
                {tag}
                <span className={`float-right text-xs px-2 py-1 rounded-full ${selectedTag === tag ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-700'}`}>
                  {tagCounts[tag]}
                </span>
              </button>
            ))}
          </div>

          {/* Main content: Problems */}
          <div className="flex-1 animate-fadeIn" style={{animationDelay: "0.3s"}}>
            {filteredProblems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProblems.map((p, index) => (
                  <div
                    key={p.id}
                    onClick={() => handleProblemClick(p)}
                    className="bg-white p-5 rounded-xl cursor-pointer shadow-sm overflow-hidden problem-card animate-fadeIn hover:scale-105 hover:shadow-md transition-all duration-300 border border-gray-100 relative"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                      <span
                        className={`${getDifficultyColor(p.difficulty)} px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center`}
                      >
                        {getDifficultyIcon(p.difficulty)} {p.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 h-12 overflow-hidden">{p.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="bg-gray-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
                        {p.tag}
                      </span>
                      <span className="text-xs text-indigo-600 font-medium hover:underline group">
                        Solve Challenge <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-xl animate-fadeIn border border-gray-100">
                <div className="animate-scaleIn" style={{animationDelay: "0.3s"}}>
                  <span className="text-5xl mb-6 block">🔍</span>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">No problems found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search query</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

/* Add these CSS animations to your global CSS file */
const cssAnimations = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out forwards;
}

.animate-slideDown {
  animation: slideDown 0.7s ease-in-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.5s ease-in-out forwards;
}

.animate-slideRight {
  animation: slideRight 0.5s ease-in-out forwards;
}

.animate-scaleIn {
  animation: scaleIn 0.5s ease-in-out forwards;
}

.hover\\:scale-103:hover {
  transform: scale(1.03);
}

.problem-card {
  opacity: 0;
  transition: all 0.3s;
}

.problem-card.visible {
  opacity: 1;
}

.group:hover .group-hover\\:translate-x-1 {
  transform: translateX(4px);
}

.group:hover .group-hover\\:scale-x-100 {
  transform: scaleX(1);
}
`;

export default ProblemsPage;