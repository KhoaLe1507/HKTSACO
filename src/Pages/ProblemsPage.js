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
  const tagCounts = problems.reduce((acc, p) => {
    acc[p.tag] = (acc[p.tag] || 0) + 1;
    return acc;
  }, {});

  const allTags = Object.keys(tagCounts);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600";
      case "Normal":
        return "bg-blue-500";
      case "Hard":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // chưa dùng status thực, để sau
  const [expandedTestcase, setExpandedTestcase] = useState(null);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const filteredProblems = problems.filter(p => {
    const matchTag = selectedTag === "All" || p.tag === selectedTag;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
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
        return "bg-green-900 text-green-200";
      case "Wrong Answer":
        return "bg-red-900 text-red-200";
      case "Time Limit Exceeded":
        return "bg-[#43464a] text-[#7b818a]";
      case "Out of Memory":
        return "bg-purple-900 text-purple-200";
      default:
        return "bg-gray-800 text-white";
    }
  };

  const handleProblemClick = (problem) => {
    localStorage.setItem("selectedProblem", JSON.stringify(problem));
    navigate("/submit");
  };

  return (
    selectedProblem ? (
      <Submit problem={selectedProblem} onBack={() => setSelectedProblem(null)} />
    ) : (
      <div className="text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Problems</h1>
        {/* Filter Section */}
        <div className="bg-[#1e3a8a] py-8 px-6 rounded-lg mb-10 w-full">
          <h2 className="text-3xl text-white font-bold text-center mb-6">Problems</h2>
          <div className="max-w-2xl mx-auto mb-4">
            <input
              type="text"
              placeholder="🔍 Search"
              className="w-full p-3 rounded-md text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="p-2 rounded bg-white text-black"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Normal">Normal</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="p-2 rounded bg-white text-black"
            >
              <option value="All">All Modules</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded bg-white text-black"
            >
              <option value="">All Status</option>
              <option value="Accepted">Accepted</option>
              <option value="Wrong Answer">Wrong Answer</option>
            </select>

            {/* Future: Section/Source filter */}
            <select
              disabled
              className="p-2 rounded bg-gray-300 text-black cursor-not-allowed"
            >
              <option>Section (coming soon)</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-6">

          {/* Left Sidebar: Tags */}
          <div className="w-[200px] space-y-2">
            <button onClick={() => setSelectedTag("All")} className="block w-full text-left hover:underline">All</button>
            {tags.map(tag => (
              <button key={tag} onClick={() => setSelectedTag(tag)} className="block w-full text-left hover:underline">
                {tag}
              </button>
            ))}
          </div>

          {/* Main content: Problems */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            {filteredProblems.map((p) => (
              <div
                key={p.id}
                onClick={() => handleProblemClick(p)}
                className="bg-[#1a2330] p-4 rounded cursor-pointer hover:bg-[#2a3340]"
              >
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-300">{p.description}</p>
                <span
                  className={`mt-2 inline-block ${getDifficultyColor(p.difficulty)} px-2 py-1 rounded text-xs`}
                >
                  {p.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ProblemsPage;
