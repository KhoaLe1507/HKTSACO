import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProblem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [form, setForm] = useState({
    name: "",
    frequency: "",
    difficulty: "",
    section: "",
    module: "",
    moduleContent: "",
    timelimit: "",
    memorylimit: "",
    statement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
    explanation: "",
    solution: ""
  });

  useEffect(() => {
    // Load problem data from localStorage
    const problemData = JSON.parse(localStorage.getItem("selectedProblem"));
    if (problemData) {
      setForm({
        name: problemData.title || "",
        frequency: problemData.frequency || "",
        difficulty: problemData.difficulty || "",
        section: problemData.section || "",
        module: problemData.module || "",
        moduleContent: problemData.moduleContent || "",
        timelimit: problemData.timelimit || "",
        memorylimit: problemData.memorylimit || "",
        statement: problemData.statement || "",
        inputFormat: problemData.inputFormat || "",
        outputFormat: problemData.outputFormat || "",
        constraints: problemData.constraints || "",
        sampleInput: problemData.sampleInput || "",
        sampleOutput: problemData.sampleOutput || "",
        explanation: problemData.explanation || "",
        solution: problemData.solution || ""
      });
    }
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the problem
    console.log("Updated problem data:", form);
    navigate("/professor/problems");
  };

  const FormInput = ({ label, name, value, onChange, placeholder, type = "text", className = "" }) => (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
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
                type="number"
              />
              <FormInput 
                label="Memory Limit (KB)" 
                name="memorylimit" 
                value={form.memorylimit} 
                onChange={handleFormChange} 
                placeholder="e.g., 256000"
                type="number"
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
            <h2 className="text-xl font-bold mb-4 text-gray-800">Constraints</h2>
            
            <FormTextarea 
              label="Problem Constraints" 
              name="constraints" 
              value={form.constraints} 
              onChange={handleFormChange} 
              placeholder="List all constraints for the problem..."
              rows={6}
            />
          </div>
        );

      case "samples":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Sample Test Cases</h2>
            
            <FormTextarea 
              label="Sample Input" 
              name="sampleInput" 
              value={form.sampleInput} 
              onChange={handleFormChange} 
              placeholder="Enter sample input..."
              rows={4}
            />
            
            <FormTextarea 
              label="Sample Output" 
              name="sampleOutput" 
              value={form.sampleOutput} 
              onChange={handleFormChange} 
              placeholder="Enter sample output..."
              rows={4}
            />
            
            <FormTextarea 
              label="Explanation" 
              name="explanation" 
              value={form.explanation} 
              onChange={handleFormChange} 
              placeholder="Explain how the sample input leads to the output..."
              rows={4}
            />
          </div>
        );

      case "solution":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Solution</h2>
            
            <FormTextarea 
              label="Solution Code" 
              name="solution" 
              value={form.solution} 
              onChange={handleFormChange} 
              placeholder="Enter the solution code..."
              rows={10}
            />
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">Edit Problem</h1>
          </div>
          <p className="text-gray-600 mb-6">Edit the problem details, description, constraints, and test cases</p>
          
          <div className="border-b border-gray-200 mb-4">
            <div className="flex flex-wrap gap-1">
              <TabButton id="details" label="Details" active={activeTab === "details"} onClick={setActiveTab} />
              <TabButton id="description" label="Description" active={activeTab === "description"} onClick={setActiveTab} />
              <TabButton id="constraints" label="Constraints" active={activeTab === "constraints"} onClick={setActiveTab} />
              <TabButton id="samples" label="Samples" active={activeTab === "samples"} onClick={setActiveTab} />
              <TabButton id="solution" label="Solution" active={activeTab === "solution"} onClick={setActiveTab} />
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderTabContent()}
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProblem;
