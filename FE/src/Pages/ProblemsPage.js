import React, { useState } from "react";
import Section from "../Components/Section";
import Problem from "../Components/Problem";

const problems = [
    { id: 1, title: "Sum of Two Numbers", description: "Given two integers a and b, return their sum." },
    { id: 2, title: "Binary Search", description: "Implement binary search on a sorted array." },
    { id: 3, title: "Factorial", description: "Compute the factorial of a given number n." },
    { id: 4, title: "Fibonacci", description: "Print the nth Fibonacci number." },
    { id: 5, title: "Palindrome Check", description: "Check if a given string is a palindrome." },
    { id: 6, title: "Maximum Subarray", description: "Find the contiguous subarray with the largest sum." },
    { id: 7, title: "GCD", description: "Find the greatest common divisor of two numbers." },
    { id: 8, title: "Reverse String", description: "Reverse a given string." },
    { id: 9, title: "Anagram Check", description: "Check if two strings are anagrams." },
    { id: 10, title: "Matrix Transpose", description: "Transpose a given matrix." }
  ];

const ProblemsPage = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");

  return (
    selectedProblem ? (
      <Section title={selectedProblem.title}>
        <p className="mb-4 text-white whitespace-pre-line">{selectedProblem.description}</p>

        <textarea
          rows="10"
          className="text-[#0f1f3b] w-full p-4 rounded border border-gray-300"
          placeholder="Write your code here..."
        ></textarea>

        <div className="my-4">
          <label htmlFor="lang" className="text-white block mb-1 font-medium">Language</label>
          <select
            id="lang"
            className="p-2 rounded border border-gray-300 text-[#0f1f3b]"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <button onClick={() => alert("Code submitted!")} className="bg-[#4a78a6] text-white px-6 py-2 rounded">
          Submit
        </button>
        <button onClick={() => setSelectedProblem(null)} className="ml-4 underline text-sm">← Back to problems</button>
      </Section>
    ) : (
      <Section title="Practice Problems">
        {problems.map((p) => (
          <Problem key={p.id} title={p.title} onClick={() => setSelectedProblem(p)} />
        ))}
      </Section>
    )
  );
};

export default ProblemsPage;
