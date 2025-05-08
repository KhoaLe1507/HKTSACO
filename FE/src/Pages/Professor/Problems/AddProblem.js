import React, { useState } from "react";

const AddProblem = () => {
  const [form, setForm] = useState({
    name: "",
    frequency: "Frequent",
    section: "Math",
    module: "Module 1",
    moduleContent: "Content 1",
    difficulty: "Easy",
    timelimit: "",
    memorylimit: "",
    statement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: [],
    solutionLanguage: "cpp",
    solutionExplanation: "",
    solutionCode: "",
    numTest: 1
  });

  const [constraintInput, setConstraintInput] = useState({ variable: "", min: "", max: "" });
  const [testcases, setTestcases] = useState([]);
  const [sampleInput, setSampleInput] = useState({ input: "", output: "", expected: "" });
  const [showConstraintForm, setShowConstraintForm] = useState(false);
  const [showSampleForm, setShowSampleForm] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addConstraint = () => {
    if (!constraintInput.variable || !constraintInput.min || !constraintInput.max) {
      alert("Please fill all constraint fields");
      return;
    }
    setForm({ ...form, constraints: [...form.constraints, constraintInput] });
    setConstraintInput({ variable: "", min: "", max: "" });
    setShowConstraintForm(false);
  };

  const removeConstraint = (index) => {
    const newConstraints = [...form.constraints];
    newConstraints.splice(index, 1);
    setForm({ ...form, constraints: newConstraints });
  };

  const addSample = () => {
    if (!sampleInput.input || !sampleInput.expected) {
      alert("Please fill all sample fields");
      return;
    }
    setTestcases([...testcases, { ...sampleInput, isSample: true }]);
    setSampleInput({ input: "", output: "", expected: "" });
    setShowSampleForm(false);
  };

  const removeSample = (index) => {
    const newTestcases = [...testcases];
    newTestcases.splice(index, 1);
    setTestcases(newTestcases);
  };

  const buildTestcases = () => {
    alert(`Generating ${form.numTest} testcases with ${form.solutionLanguage}...`);
  };

  const FormInput = ({ label, type = "text", name, value, onChange, placeholder, className = "", ...props }) => (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        {...props}
      />
    </div>
  );

  const FormSelect = ({ label, name, value, onChange, options, className = "" }) => (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      >
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'string' ? option : option.value}>
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 4, className = "" }) => (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
    </div>
  );

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-5 py-3 font-medium rounded-t-lg transition-colors duration-200 ${
        active 
          ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="bg-white text-black rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Problem Details</h2>

            <FormInput 
              label="Problem Name" 
              name="name" 
              value={form.name} 
              onChange={handleFormChange} 
              placeholder="Enter a descriptive name for the problem"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect 
                label="Frequency" 
                name="frequency" 
                value={form.frequency} 
                onChange={handleFormChange} 
                options={["Very Frequent", "Frequent", "Rare"]}
              />
              <FormSelect 
                label="Difficulty" 
                name="difficulty" 
                value={form.difficulty} 
                onChange={handleFormChange} 
                options={["Easy", "Medium", "Hard"]}
              />
              <FormSelect 
                label="Section" 
                name="section" 
                value={form.section} 
                onChange={handleFormChange} 
                options={["Math", "Graph", "DP"]}
              />
              <FormSelect 
                label="Module" 
                name="module" 
                value={form.module} 
                onChange={handleFormChange} 
                options={["Module 1", "Module 2"]}
              />
            </div>

            <FormSelect 
              label="Module Content" 
              name="moduleContent" 
              value={form.moduleContent} 
              onChange={handleFormChange} 
              options={["Content 1", "Content 2"]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput 
                label="Time Limit (s)" 
                name="timelimit" 
                value={form.timelimit} 
                onChange={handleFormChange} 
                placeholder="e.g., 1.0"
              />
              <FormInput 
                label="Memory Limit (KB)" 
                name="memorylimit" 
                value={form.memorylimit} 
                onChange={handleFormChange} 
                placeholder="e.g., 256000"
              />
            </div>
          </div>
        );

      case "description":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Problem Description</h2>
            
            <FormTextarea 
              label="Problem Statement" 
              name="statement" 
              value={form.statement} 
              onChange={handleFormChange} 
              placeholder="Describe the problem requirements clearly..."
              rows={6}
            />
            
            <FormTextarea 
              label="Input Format" 
              name="inputFormat" 
              value={form.inputFormat} 
              onChange={handleFormChange} 
              placeholder="e.g., Line 1: number of tests..."
            />
            
            <FormTextarea 
              label="Output Format" 
              name="outputFormat" 
              value={form.outputFormat} 
              onChange={handleFormChange} 
              placeholder="e.g., Line 1: number of outputs..."
            />
          </div>
        );

      case "constraints":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Constraints</h2>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
                onClick={() => setShowConstraintForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Constraint
              </button>
            </div>

            {showConstraintForm && (
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3">New Constraint</h3>
                
                <div className="mb-3">
                  <label className="block text-gray-700 mb-1">Variable Name</label>
                  <input
                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="e.g., n, k, arr[i]"
                    value={constraintInput.variable}
                    onChange={(e) => setConstraintInput({ ...constraintInput, variable: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-gray-700 mb-1">Min Value</label>
                    <input
                      className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="e.g., 1"
                      value={constraintInput.min}
                      onChange={(e) => setConstraintInput({ ...constraintInput, min: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Max Value</label>
                    <input
                      className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="e.g., 10^5"
                      value={constraintInput.max}
                      onChange={(e) => setConstraintInput({ ...constraintInput, max: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center transition duration-200"
                    onClick={addConstraint}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded transition duration-200"
                    onClick={() => setShowConstraintForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {form.constraints.length > 0 ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variable</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Range</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {form.constraints.map((constraint, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{constraint.variable}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{constraint.min} ≤ {constraint.variable} ≤ {constraint.max}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => removeConstraint(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500">No constraints added yet</p>
              </div>
            )}
          </div>
        );

      case "samples":
        return (
          <div className="bg-white text-black rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Sample Testcases</h2>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
                onClick={() => setShowSampleForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Sample
              </button>
            </div>

            {showSampleForm && (
              <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">New Sample Testcase</h3>
                
                <div className="mb-3">
                  <label className="block text-gray-700 mb-1">Input</label>
                  <textarea
                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-300 font-mono"
                    rows={3}
                    placeholder="Sample input"
                    value={sampleInput.input}
                    onChange={(e) => setSampleInput({ ...sampleInput, input: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 mb-1">Expected Output</label>
                  <textarea
                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-300 font-mono"
                    rows={3}
                    placeholder="Expected output"
                    value={sampleInput.expected}
                    onChange={(e) => setSampleInput({ ...sampleInput, expected: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded flex items-center transition duration-200"
                    onClick={addSample}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded transition duration-200"
                    onClick={() => setShowSampleForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {testcases.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {testcases.map((testcase, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium text-gray-700">Sample Testcase #{index + 1}</h3>
                      <button 
                        onClick={() => removeSample(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                      <div className="p-4">
                        <h4 className="font-medium text-gray-700 mb-2">Input:</h4>
                        <pre className="bg-gray-50 p-3 rounded font-mono text-sm overflow-auto max-h-40">{testcase.input}</pre>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-700 mb-2">Expected Output:</h4>
                        <pre className="bg-gray-50 p-3 rounded font-mono text-sm overflow-auto max-h-40">{testcase.expected}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-500">No sample testcases added yet</p>
              </div>
            )}
          </div>
        );

      case "solution":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Solution & Testcase Generation</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Solution Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormSelect 
                  label="Solution Language" 
                  name="solutionLanguage" 
                  value={form.solutionLanguage} 
                  onChange={handleFormChange} 
                  options={[
                    { value: "cpp", label: "C++" },
                    { value: "python", label: "Python" },
                    { value: "java", label: "Java" }
                  ]}
                />
                <FormInput 
                  label="Number of Test Cases" 
                  type="number"
                  name="numTest" 
                  value={form.numTest} 
                  onChange={handleFormChange} 
                  placeholder="e.g., 10"
                  min="1"
                />
              </div>
              
              <FormTextarea 
                label="Solution Explanation" 
                name="solutionExplanation" 
                value={form.solutionExplanation} 
                onChange={handleFormChange} 
                placeholder="Explain your solution approach, complexity analysis, etc."
                rows={4}
              />
              
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Solution Code</label>
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 bg-gray-100 px-4 py-2 border-b border-gray-300 rounded-t-lg flex items-center">
                    <span className="mr-2 font-medium text-sm">
                      {form.solutionLanguage === "cpp" ? "C++" : 
                       form.solutionLanguage === "python" ? "Python" : "Java"}
                    </span>
                  </div>
                  <textarea
                    name="solutionCode"
                    value={form.solutionCode}
                    onChange={handleFormChange}
                    placeholder={`Enter your ${form.solutionLanguage === "cpp" ? "C++" : form.solutionLanguage === "python" ? "Python" : "Java"} solution here...`}
                    rows={10}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 font-mono pt-12"
                  />
                </div>
              </div>
              
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg flex items-center font-medium shadow-md transition duration-200"
                onClick={buildTestcases}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Generate Testcases
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">Add New Problem</h1>
          </div>
          <p className="text-gray-600 mb-6">Create a new programming problem with details, constraints, and test cases</p>
          
          <div className="border-b border-gray-200 mb-4">
            <div className="flex flex-wrap gap-1">
              <TabButton id="details" label="Details" active={activeTab === "details"} onClick={setActiveTab} />
              <TabButton id="description" label="Description" active={activeTab === "description"} onClick={setActiveTab} />
              <TabButton id="constraints" label="Constraints" active={activeTab === "constraints"} onClick={setActiveTab} />
              <TabButton id="samples" label="Samples" active={activeTab === "samples"} onClick={setActiveTab} />
              <TabButton id="solution" label="Solution" active={activeTab === "solution"} onClick={setActiveTab} />
            </div>
          </div>
          
          {renderTabContent()}
          
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
              onClick={() => {
                const tabs = ["details", "description", "constraints", "samples", "solution"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                }
              }}
            >
              Previous
            </button>
            
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
              onClick={() => {
                const tabs = ["details", "description", "constraints", "samples", "solution"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1]);
                } else {
                  // Submit the form
                  alert("Problem added successfully!");
                }
              }}
            >
              {activeTab === "solution" ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProblem;