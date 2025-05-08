import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper function for status color
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-600 text-white";
    case "IN PROGRESS":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-500 text-white";
  }
};

const ProblemDetails = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load problem data
    const loadedProblem = JSON.parse(localStorage.getItem("selectedProblem"));
    setProblem(loadedProblem);
    
    // Animation delay for content appearance
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  if (!problem) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-700">No problem selected</h2>
        <p className="mt-2 text-gray-500">Please select a problem from the problem list to view its details.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const sample = problem.samples?.find((s) => s.isSample) || problem.samples?.[0];

  return (
    <div className="min-h-screen bg-white py-6 px-4 transition-all duration-300 ease-in-out">
      {/* Main content container */}
      <div className="max-w-4xl mx-auto" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
        
        {/* Header Card with problem info */}
        <div className="bg-blue-500 rounded-lg shadow-lg mb-6 p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                Frequency: {problem.frequency || "N/A"}
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Time Limit: {problem.timelimit || "undefined"} s
              </div>
              
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Memory Limit: {problem.memorylimit || "undefined"} KB
              </div>
            </div>
            
            {/* Status badge */}
            <div className={`${getStatusColor(problem.status || "Not Started")} px-4 py-1 rounded-full text-sm font-semibold`}>
              {problem.status || "Not Started"}
            </div>
          </div>
          
          <div className="flex mt-3 space-x-2">
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
              {problem.sectionName || "General"}
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">
              {problem.moduleContentName || "Core Module"}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs ${
              problem.difficulty === "Easy" ? "bg-green-100 text-green-800" :
              problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {problem.difficulty || "Easy"}
            </span>
          </div>
        </div>
        
        {/* Content Sections - All in one block with visual separation */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Problem Statement */}
          <div className="border-b border-gray-200">
            <div className="flex items-center p-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Problem Statement</h2>
            </div>
            <div className="px-4 pb-4">
              <p className="text-gray-700 whitespace-pre-line">
                {problem.description}
              </p>
            </div>
          </div>
          
          {/* Constraints */}
          <div className="border-b border-gray-200">
            <div className="flex items-center p-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Constraints</h2>
            </div>
            <div className="px-4 pb-4">
              {problem.constraints && problem.constraints.length > 0 ? (
                <ul className="space-y-1">
                  {problem.constraints.map((c, idx) => (
                    <li key={idx} className="text-gray-700">
                      {c.variable} ∈ [{c.min} .. {c.max}]
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No constraints specified for this problem.</p>
              )}
            </div>
          </div>
          
          {/* Input Format */}
          <div className="border-b border-gray-200">
            <div className="flex items-center p-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Input Format</h2>
            </div>
            <div className="px-4 pb-4">
              <p className="text-gray-700 whitespace-pre-line">
                {problem.inputFormat || "No input format specified."}
              </p>
            </div>
          </div>
          
          {/* Output Format */}
          <div className="border-b border-gray-200">
            <div className="flex items-center p-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Output Format</h2>
            </div>
            <div className="px-4 pb-4">
              <p className="text-gray-700 whitespace-pre-line">
                {problem.outputFormat || "No output format specified."}
              </p>
            </div>
          </div>
          
          {/* Sample Testcases */}
          <div>
            <div className="flex items-center p-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Sample Testcases</h2>
            </div>
            <div className="px-4 pb-4">
              {sample ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Input:</div>
                    <pre className="bg-gray-50 p-3 rounded text-sm font-mono whitespace-pre-wrap text-gray-700 border border-gray-200">{sample.input}</pre>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Output:</div>
                    <pre className="bg-gray-50 p-3 rounded text-sm font-mono whitespace-pre-wrap text-gray-700 border border-gray-200">{sample.output}</pre>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No sample testcases available for this problem.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center"
              onClick={() => navigate("/submit")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Submit Solution
            </button>
            
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center"
              onClick={() => window.navigator.clipboard.writeText(window.location.href)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Share
            </button>
          </div>
          
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center"
            onClick={() => navigate(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;