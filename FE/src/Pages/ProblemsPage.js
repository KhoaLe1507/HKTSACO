import React, { useState } from "react";
import Section from "../Components/Section";
import Problem from "../Components/Problem";

const problems = [
  { id: 1, title: "Sum of Two Numbers", description: "Given two integers a and b, return their sum.", difficulty: "Easy", tag: "Math" },
  { id: 2, title: "Binary Search", description: "Implement binary search on a sorted array.", difficulty: "Normal", tag: "Binary Search" },
  { id: 3, title: "Factorial", description: "Compute the factorial of a given number n.", difficulty: "Easy", tag: "Math" },
  { id: 4, title: "Fibonacci", description: "Print the nth Fibonacci number.", difficulty: "Normal", tag: "String" },
  { id: 5, title: "Palindrome Check", description: "Check if a given string is a palindrome.", difficulty: "Easy", tag: "String" },
  { id: 6, title: "Maximum Subarray", description: "Find the subarray with the largest sum.", difficulty: "Hard", tag: "String" },
  { id: 7, title: "GCD", description: "Find the greatest common divisor.", difficulty: "Normal", tag: "String" },
  { id: 8, title: "Reverse String", description: "Reverse a given string.", difficulty: "Easy", tag: "String" },
  { id: 9, title: "Anagram Check", description: "Check if two strings are anagrams.", difficulty: "Normal", tag: "String" },
  { id: 10, title: "Matrix Multiplication", description: "Multiply two matrices.", difficulty: "Hard", tag: "Matrix" },
  { id: 11, title: "Matrix Transpose", description: "Transpose a matrix.", difficulty: "Hard", tag: "Matrix" },
];

const tags = [...new Set(problems.map(p => p.tag))]; // Lấy các tag duy nhất

const ProblemsPage = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedProblem, setSelectedProblem] = useState(null);

  const filteredProblems = selectedTag === "All"
    ? problems
    : problems.filter(p => p.tag === selectedTag);

  // Hàm trả về màu tương ứng với mức độ
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

  return (
    selectedProblem ? (
      <Section title={selectedProblem.title}>
        <p className="mb-4 text-white whitespace-pre-line">{selectedProblem.description}</p>
        <textarea className="text-[#0f1f3b] w-full p-4 rounded border border-gray-300" rows="10" placeholder="Write your code here..." />
        <div className="my-4">
          <label className="text-white block mb-1 font-medium">Language</label>
          <select className="p-2 rounded border border-gray-300 text-[#0f1f3b]">
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <button className="bg-[#4a78a6] text-white px-6 py-2 rounded">Submit</button>
        <button className="ml-4 underline text-sm" onClick={() => setSelectedProblem(null)}>← Back</button>
      </Section>
    ) : (
      <div className="text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Problems</h1>
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
                onClick={() => setSelectedProblem(p)}
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
