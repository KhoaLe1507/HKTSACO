import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Helper functions for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "text-green-600";
    case "Wrong Answer": return "text-red-600";
    case "Time Limit Exceeded": return "text-orange-500";
    case "Memory Limit Exceeded": return "text-purple-600";
    default: return "text-gray-600";
  }
};

const getBgStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "bg-green-200";
    case "Wrong Answer": return "bg-red-200";
    case "Time Limit Exceeded": return "bg-orange-200";
    case "Memory Limit Exceeded": return "bg-purple-200";
    default: return "bg-gray-100";
  }
};

const getStatusTextColor = (status) => {
  switch (status) {
    case "Accepted": return "text-green-600";
    case "Wrong Answer": return "text-red-600";
    case "Time Limit Exceeded": return "text-orange-600";
    default: return "text-gray-600";
  }
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "bg-green-500";
    case "Wrong Answer": return "bg-red-500";
    case "Time Limit Exceeded": return "bg-orange-500";
    case "Memory Limit Exceeded": return "bg-purple-500";
    default: return "bg-gray-500";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Accepted":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case "Wrong Answer":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    case "Time Limit Exceeded":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    case "Memory Limit Exceeded":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
  }
};

// Mock user constant
const USERNAME = "student01";

const Submission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [testcases, setTestcases] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load submission data from localStorage
    const submissionData = JSON.parse(localStorage.getItem("lastSubmission"));
    if (submissionData && submissionData.id === Number(id)) {
      setSubmission(submissionData);
    }

    // Animation delay
    setTimeout(() => {
      setIsLoaded(true);
      fetch('/mock_result.json')
        .then(res => res.json())
        .then(data => setTestcases(data.testcases))
        .catch(err => console.error('Failed to load testcases:', err));
    }, 100);
  }, [id]);

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700">No submission found</h2>
          <p className="mt-2 text-gray-500">Please submit a solution first to see the results.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get submission count (mock)
  const submitCount = parseInt(localStorage.getItem("submitCount") || "1");

  // Function to get language icon
  const getLanguageIcon = () => {
    switch (submission.language) {
      case "C++":
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" fill="currentColor">
            <path d="M10.5 15.97L10.91 18.41C10.65 18.55 10.23 18.68 9.67 18.8C9.1 18.93 8.43 19 7.66 19C5.45 18.96 3.79 18.3 2.68 17.04C1.56 15.77 1 14.16 1 12.21C1.05 9.9 1.72 8.13 3 6.89C4.32 5.64 5.96 5 7.94 5C8.69 5 9.34 5.07 9.88 5.19C10.42 5.31 10.82 5.44 11.08 5.59L10.5 8.08L9.44 7.74C9.04 7.64 8.58 7.59 8.05 7.59C6.89 7.58 5.93 7.95 5.18 8.69C4.42 9.42 4.03 10.54 4 12.03C4 13.39 4.37 14.45 5.08 15.23C5.79 16 6.79 16.4 8.07 16.41L9.4 16.29C9.83 16.21 10.19 16.1 10.5 15.97M11 11H13V9H15V11H17V13H15V15H13V13H11V11M18 11H20V9H22V11H24V13H22V15H20V13H18V11Z" />
          </svg>
        );
      case "Java":
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-600" fill="currentColor">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.093-1.013-.714-9.317 1.991-3.999 2.851 14.927 2.619 27.577-1.03 16.333-2.784M9.292 13.21s-6.028 1.435-2.156 1.962c1.66.226 4.942.175 8.127-.222 1.835-.233 3.595-.524 3.595-.524s-.823.352-1.366.675c-6.982 1.437-20.401.766-16.531-.7 3.254-1.31 8.731-1.291 8.731-1.291M17.127 17.962c4.957-2.565 2.631-5.024 1.054-4.732-.387.071-.555.132-.555.132s.143-.222.415-.318c3.104-1.085 5.546 3.29-.729 5.025 0 .001.444-.395-.185-.107M13.789 0s2.843 2.844-2.325 7.222c-4.855 3.278-1.064 5.13-.001 7.259-2.763-2.452-4.748-4.617-3.397-6.634 1.964-2.947 7.311-4.47 5.723-7.847M9.597 23.844c4.59.419 11.903-.213 12.019-3.333 0 0-.327 1.178-3.836 2.11-3.949 1.049-9.379 1.16-12.394.238-.001.001.582.488 4.211.985" />
          </svg>
        );
      case "Python":
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-yellow-600" fill="currentColor">
            <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,2A10,10,0,1,1,2,12,10.012,10.012,0,0,1,12,2Zm0,2a2,2,0,1,0,2,2A2,2,0,0,0,12,4Zm0,12a2,2,0,1,0,2,2A2,2,0,0,0,12,16Zm6-6a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-12,0a2,2,0,1,0,2,2A2,2,0,0,0,6,10Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <div
        className="max-w-5xl mx-auto"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}
      >
        {/* Header section */}
        <div className="bg-blue-500 rounded-lg shadow-lg mb-6 p-6 text-white">
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold">Submission Results</h1>

            <div className={`ml-auto ${getBadgeStatusColor(submission.result)} text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center`}>
              {getStatusIcon(submission.result)}
              <span className="ml-1">{submission.result}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <div className="text-blue-100 mb-1">Problem</div>
              <div className="font-semibold">{submission.problemName}</div>
            </div>

            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <div className="text-blue-100 mb-1">Submission Info</div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{USERNAME}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.642-.08-1.264-.226-1.86A5.001 5.001 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  <span>#{submitCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white bg-opacity-20 p-3 rounded-lg">
            <div className="text-blue-100 mb-1">Performance</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{submission.timeExec}</span>
              </div>
              <div className="flex items-center">
                {getLanguageIcon()}
                <span className="ml-1">{submission.language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source code section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200 p-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">Source Code</h2>
          </div>
          <div className="p-4">
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto font-mono text-sm">
              {submission.code || "No code available"}
            </pre>
          </div>
        </div>

        {/* Testcase Results (with toggle) */}
        {/* Testcase Results (with animations and better styling) */}
{testcases.length > 0 && (
  <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        <h2 className="text-lg font-semibold">Testcase Results</h2>
        <span className="ml-2 bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
          {testcases.length} cases
        </span>
      </div>
    </div>
    
    <div className="divide-y divide-gray-100">
      {testcases.map((tc, index) => (
        <div 
          key={tc.id} 
          className={`p-4 ${getBgStatusColor(tc.status)} transition-all duration-300 hover:bg-opacity-50`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(tc.status)}
              <div className="ml-2">
                <h3 className="font-semibold text-gray-800">Testcase #{tc.id}</h3>
                <p className={`${getStatusTextColor(tc.status)} font-medium text-sm`}>
                  {tc.status}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                const updated = [...testcases];
                updated[index]._show = !updated[index]._show;
                setTestcases([...updated]);
              }}
              className={`px-3 py-1 text-white text-sm rounded transition-all duration-200 flex items-center
                ${tc._show ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {tc._show ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Hide
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  View
                </>
              )}
            </button>
          </div>

          {tc._show && (
            <div 
              className="mt-3 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300"
              style={{
                maxHeight: tc._show ? '500px' : '0',
                opacity: tc._show ? 1 : 0,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-3">
                  <div className="text-xs uppercase font-semibold text-gray-500 mb-1">Input</div>
                  <div className="font-mono text-sm bg-gray-50 p-2 rounded overflow-x-auto">
                    {tc.input}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs uppercase font-semibold text-gray-500 mb-1">Expected Output</div>
                  <div className="font-mono text-sm bg-gray-50 p-2 rounded overflow-x-auto">
                    {tc.expected_output}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs uppercase font-semibold text-gray-500 mb-1">Your Output</div>
                  <div className={`font-mono text-sm p-2 rounded overflow-x-auto `}>
                    {tc.actual_output || '(no output)'}
                  </div>
                </div>
              </div>
              
              {tc.status !== 'Accepted' && (
                <div className="bg-yellow-50 p-3 border-t border-yellow-100">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-yellow-700">
                      <strong>Hint:</strong> {tc.status === 'Wrong Answer' ? 'Check your algorithm logic and edge cases.' : tc.status === 'Time Limit Exceeded' ? 'Try to optimize your solution to run more efficiently.' : 'Review your memory usage and algorithm efficiency.'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
    
    <div className="bg-gray-50 p-4 border-t border-gray-100">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing all {testcases.length} testcases
        </div>
        <button 
          onClick={() => {
            const allExpanded = testcases.every(tc => tc._show);
            const updated = testcases.map(tc => ({...tc, _show: !allExpanded}));
            setTestcases(updated);
          }}
          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition"
        >
          {testcases.every(tc => tc._show) ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default Submission;