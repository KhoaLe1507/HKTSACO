import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem("selectedProblem");
  const problem = stored ? JSON.parse(stored) : null;

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python"); // Default to Python as shown in your screenshot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Languages configuration with icons and styles
  const languages = [
    {
      id: "cpp",
      name: "C++",
      icon: (
        <span className="text-blue-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M10.5 15.97L10.91 18.41C10.65 18.55 10.23 18.68 9.67 18.8C9.1 18.93 8.43 19 7.66 19C5.45 18.96 3.79 18.3 2.68 17.04C1.56 15.77 1 14.16 1 12.21C1.05 9.9 1.72 8.13 3 6.89C4.32 5.64 5.96 5 7.94 5C8.69 5 9.34 5.07 9.88 5.19C10.42 5.31 10.82 5.44 11.08 5.59L10.5 8.08L9.44 7.74C9.04 7.64 8.58 7.59 8.05 7.59C6.89 7.58 5.93 7.95 5.18 8.69C4.42 9.42 4.03 10.54 4 12.03C4 13.39 4.37 14.45 5.08 15.23C5.79 16 6.79 16.4 8.07 16.41L9.4 16.29C9.83 16.21 10.19 16.1 10.5 15.97M11 11H13V9H15V11H17V13H15V15H13V13H11V11M18 11H20V9H22V11H24V13H22V15H20V13H18V11Z" />
          </svg>
        </span>
      ),
      bgColor: "bg-gray-100",
      selectedBgColor: "bg-blue-50",
      borderColor: "border-blue-500"
    },
    {
      id: "java",
      name: "Java",
      icon: (
        <span className="text-red-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.093-1.013-.714-9.317 1.991-3.999 2.851 14.927 2.619 27.577-1.03 16.333-2.784M9.292 13.21s-6.028 1.435-2.156 1.962c1.66.226 4.942.175 8.127-.222 1.835-.233 3.595-.524 3.595-.524s-.823.352-1.366.675c-6.982 1.437-20.401.766-16.531-.7 3.254-1.31 8.731-1.291 8.731-1.291M17.127 17.962c4.957-2.565 2.631-5.024 1.054-4.732-.387.071-.555.132-.555.132s.143-.222.415-.318c3.104-1.085 5.546 3.29-.729 5.025 0 .001.444-.395-.185-.107M13.789 0s2.843 2.844-2.325 7.222c-4.855 3.278-1.064 5.13-.001 7.259-2.763-2.452-4.748-4.617-3.397-6.634 1.964-2.947 7.311-4.47 5.723-7.847M9.597 23.844c4.59.419 11.903-.213 12.019-3.333 0 0-.327 1.178-3.836 2.11-3.949 1.049-9.379 1.16-12.394.238-.001.001.582.488 4.211.985" />
          </svg>
        </span>
      ),
      bgColor: "bg-gray-100",
      selectedBgColor: "bg-red-50",
      borderColor: "border-red-500"
    },
    {
        id: "python",
        name: "Python",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 255" className="h-6 w-6" fill="none">
            <path fill="#3776AB" d="M127.9 0c-10.3.1-20.2.9-29.3 2.3-25.9 3.8-30.6 11.7-30.6 26.3v19.3h61.2v7.3H47c-14.8 0-27.8 8.9-31.9 26.1-4.7 19.5-4.9 31.7 0 52.2 3.6 15.4 12.3 26.1 27.1 26.1h17.6v-23.3c0-16.8 14.6-31.5 31.4-31.5h62.5c14.1 0 25.7-11.6 25.7-25.7V30.6c0-13.5-11-24.7-25.7-26.4-10.1-1.1-20.5-1.8-30.8-1.7zM92.2 20.8c5.2 0 9.5 4.3 9.5 9.6s-4.3 9.6-9.5 9.6-9.5-4.3-9.5-9.6 4.2-9.6 9.5-9.6z"/>
            <path fill="#FFC331" d="M128.1 255c10.3-.1 20.2-.9 29.3-2.3 25.9-3.8 30.6-11.7 30.6-26.3v-19.3h-61.2v-7.3H209c14.8 0 27.8-8.9 31.9-26.1 4.7-19.5 4.9-31.7 0-52.2-3.6-15.4-12.3-26.1-27.1-26.1h-17.6v23.3c0 16.8-14.6 31.5-31.4 31.5h-62.5c-14.1 0-25.7 11.6-25.7 25.7v66.3c0 13.5 11 24.7 25.7 26.4 10.1 1.1 20.5 1.8 30.8 1.7zM163.8 234.2c-5.2 0-9.5-4.3-9.5-9.6s4.3-9.6 9.5-9.6 9.5 4.3 9.5 9.6-4.2 9.6-9.5 9.6z"/>
          </svg>
        ),
        bgColor: "bg-yellow-50",
        selectedBgColor: "bg-yellow-100",
        borderColor: "border-yellow-500"
      }
  ];

  // Default starter code templates
  const getStarterCode = (language) => {
    switch (language) {
      case "cpp":
        return `#include <iostream>
using namespace std;

int main() {
  // Your solution here
  
  return 0;
}`;
      case "java":
        return `import java.util.*;

public class Solution {
  public static void main(String[] args) {
    // Your solution here
    
  }
}`;
      case "python":
        return `# Your solution here

def solve():
    # Implement your solution
    pass

if __name__ == "__main__":
    solve()`;
      default:
        return "";
    }
  };
  
  // Set initial code and handle clicks outside the dropdown
  useEffect(() => {
    setCode(getStarterCode(language));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Update code when language changes
  useEffect(() => {
    if (code === getStarterCode("cpp") || code === getStarterCode("java") || code === getStarterCode("python") || code === "") {
      setCode(getStarterCode(language));
    }
  }, [language]);

  if (!problem) {
    return <div className="text-black p-4">No problem selected.</div>;
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      // Navigate to the submission page
      navigate("/submission");
    }, 1000);
  };

  // Get the selected language object
  const selectedLang = languages.find(lang => lang.id === language);

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-blue-500 rounded-lg shadow-lg mb-6 p-4 text-white">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <h1 className="text-2xl font-bold">Submit Solution</h1>
          </div>
          <div className="mt-2 text-blue-100">
            Problem: <span className="font-semibold">{problem.name}</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Language Dropdown */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Select Language</h2>
            </div>
            
            {/* Dropdown language selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="flex items-center">
                  {selectedLang.icon}
                  <span className="ml-3 block truncate">{selectedLang.name}</span>
                  <span className="ml-auto">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </button>
              
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className={`
                        cursor-pointer select-none relative py-2 pl-3 pr-9
                        ${lang.id === language ? `${lang.selectedBgColor} border-l-2 ${lang.borderColor}` : 'hover:bg-gray-100'}
                      `}
                      onClick={() => {
                        setLanguage(lang.id);
                        setDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        {lang.icon}
                        <span className={`block ml-3 truncate ${lang.id === language ? 'font-medium' : 'font-normal'}`}>
                          {lang.name}
                        </span>
                      </div>
                      
                      {lang.id === language && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Code Editor */}
          <div>
            <div className="p-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Source Code</h2>
              <div className="ml-auto text-right">
                <span className="font-medium text-gray-600">
                  {language === "cpp" ? "C++" : language === "java" ? "Java" : "Python"}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="h-[500px] border border-gray-300 rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value)}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition-all duration-200 flex items-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Submit
                </>
              )}
            </button>
            
          </div>
          
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg transition-colors flex items-center"
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

export default Submit;