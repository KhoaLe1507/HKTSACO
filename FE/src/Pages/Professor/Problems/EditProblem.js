import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditProblem = () => {
  const { id: problemId } = useParams();
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
    generateInputCode: "",
    numTest: 1
  });

  const [sections, setSections] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleContents, setModuleContents] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState(null);


  const [constraintInput, setConstraintInput] = useState({ variable: "", min: "", max: "" });

  const [sampleInput, setSampleInput] = useState({ input: "", output: "", expected: "" });
  const [showConstraintForm, setShowConstraintForm] = useState(false);
  const [showSampleForm, setShowSampleForm] = useState(false);
  const [activeTab, setActiveTab] = useState("details");


  const [testcases, setTestcases] = useState([]); // Tất cả testcase đang hiển thị
  const [deletedTestcaseIds, setDeletedTestcaseIds] = useState([]); // các testcase bị xóa

  const [nonSampleTestcases, setNonSampleTestcases] = useState([]);
  const [deletedNonSampleIds, setDeletedNonSampleIds] = useState([]);

  const [enableRandomTest, setEnableRandomTest] = useState(false);

  const location = useLocation();

  const fetchModulesBySection = (sectionId) => {
    const token = localStorage.getItem("accessToken");
    fetch(`https://localhost:7157/api/Roadmap/GetModulesBySection/${sectionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => console.error("Error loading modules:", err));

    setSelectedModuleId(null);
    setModuleContents([]);
  };

  const loadSections = () => {
    const token = localStorage.getItem("accessToken");
    console.log("🔑 Token being sent:", token);

    fetch("https://localhost:7157/api/Roadmap/GetAllSections", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("📦 Sections from API:", data);
        setSections(data);
        // ❌ Đừng setSelectedSectionId(data[0].id);
        // ✅ Để selectedSectionId là "" để ép người dùng chọn
      })
      .catch(err => console.error("❌ Error loading sections:", err));
  };

  const fetchModuleContentsByModule = async (moduleId) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`https://localhost:7157/api/Roadmap/GetModuleContentsByModule/${moduleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setModuleContents(data);
  };


useEffect(() => {
  loadSections();
  window.addEventListener("focus", loadSections);
  return () => window.removeEventListener("focus", loadSections);
}, []);

useEffect(() => {
  if (sections.length > 0 && !selectedSectionId) {
    const defaultSectionId = sections[0].id || sections[0].sectionId;
    setSelectedSectionId(defaultSectionId);
    setForm(prev => ({ ...prev, section: defaultSectionId }));
    fetchModulesBySection(defaultSectionId);
  }
}, [sections]);

const handleFormChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSectionChange = (e) => {
  const sectionId = e.target.value;
  console.log("🟦 Section selected:", sectionId);

  if (!sectionId) {
    console.log("⚠️ Invalid section selected. Skipping.");
    setModules([]);
    setModuleContents([]);
    setSelectedSectionId("");
    setSelectedModuleId("");
    setForm(prev => ({ ...prev, section: "", module: "", moduleContent: "" }));
    return;
  }

  setSelectedSectionId(sectionId);
  setForm(prev => ({ ...prev, section: sectionId, module: "", moduleContent: "" }));
  setModules([]);
  setModuleContents([]);
  setSelectedModuleId("");

  const token = localStorage.getItem("accessToken");
  console.log("🔑 Token being sent for GetModulesBySection:", token);

  const url = `https://localhost:7157/api/Roadmap/GetModulesBySection/${sectionId}`;
  console.log("🌐 Calling API:", url);

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log("📡 Module API Status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("📦 Modules returned from API:", data);
      setModules(data);
    })
    .catch(err => console.error("❌ Error loading modules:", err));
};

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`https://localhost:7157/api/Problem/details/${problemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch problem");
        const data = await res.json();

        // Load Modules & ModuleContents
        await fetchModulesBySection(data.sectionId);
        setSelectedModuleId(data.moduleId);
        await fetchModuleContentsByModule(data.moduleId);

        // Set form values

        console.log("📋 Constraints from API:", data.constraints);
        console.log("🧪 Sample Testcases from API:", data.sampleTestcases);

        setForm(prev => ({
          ...prev,
          name: data.name,
          frequency: data.frequent,
          section: data.sectionId,
          module: data.moduleId,
          moduleContent: data.moduleContentId,
          difficulty: data.difficulty,
          timelimit: data.timeLimit,
          memorylimit: data.memoryLimit,
          statement: data.problemStatement,
          inputFormat: data.formatInput,
          outputFormat: data.formatOutput,
          solutionLanguage: data.solution?.language || "cpp",
          solutionExplanation: data.solution?.explanation || "",
          solutionCode: data.solution?.source || "",
          generateInputCode: data.testGeneratorSource || "",
          numTest: data.numberOfGeneratedTestcases || 1,
          constraints: data.constraints.map(c => ({
            variable: c.variable,
            min: c.minValue,
            max: c.maxValue
          }))
        }));

        console.log("✅ Form state after setting:", form);

        // Set sample testcases
        setTestcases(
          data.sampleTestcases.map(t => ({
            testcaseId: t.testcaseId, 
            input: t.input,
            expected: t.output,
            explanation: t.explanation || "",
            isSample: true
          }))
        );

        setNonSampleTestcases(
          data.testcases.map(t => ({
            testcaseId: t.testcaseId,
            input: t.input,
            expected: t.output,
            explanation: t.explanation,
            isSample: false
          }))
        );


        console.log("🧪 Testcases state set:", testcases);


        setSelectedSectionId(data.sectionId);

      } catch (err) {
        console.error("❌ Error fetching problem:", err);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);



const handleModuleChange = (e) => {
  const moduleId = e.target.value;
  console.log("🔹 Module selected:", moduleId);

  if (!moduleId) {
    console.log("⚠️ Invalid module selected. Skipping.");
    setModuleContents([]);
    setSelectedModuleId("");
    setForm(prev => ({ ...prev, module: "", moduleContent: "" }));
    return;
  }

  setSelectedModuleId(moduleId);
  setForm(prev => ({ ...prev, module: moduleId, moduleContent: "" }));
  setModuleContents([]);

  const token = localStorage.getItem("accessToken");
  console.log("🔑 Token being sent:", token);

  const url = `https://localhost:7157/api/Roadmap/GetModuleContentsByModule/${moduleId}`;
  console.log("🌐 API URL:", url);

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log("📡 Status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("📦 ModuleContents returned from API:", data);
      setModuleContents(data);
    })
    .catch(err => console.error("❌ Error loading module contents:", err));
};



const handleModuleContentChange = (e) => {
  const moduleContentId = e.target.value;
  console.log("📘 ModuleContent selected:", moduleContentId);

  if (!moduleContentId) {
    setForm(prev => ({ ...prev, moduleContent: "" }));
    return;
  }

  setForm(prev => ({ ...prev, moduleContent: moduleContentId }));
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

  const handleConstraintChange = (index, field, value) => {
    const updated = [...form.constraints];
    updated[index][field] = value;
    setForm({ ...form, constraints: updated });
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


  const handleTestcaseChange = (index, field, value) => {
    const updated = [...testcases];
    updated[index][field] = value;
    setTestcases(updated);
  };

  const removeTestcase = (index) => {
    const updated = [...testcases];
    const removed = updated.splice(index, 1)[0];
    
    // Nếu testcase có id => đưa vào danh sách cần xóa
    if (removed.testcaseId) {
      setDeletedTestcaseIds(prev => [...prev, removed.testcaseId]);
    }

    setTestcases(updated);
  };

  const addTestcase = () => {
    setTestcases([...testcases, {
      input: "",
      expected: "",
      explanation: "",
      isSample: true
    }]);
  };

  const handleNonSampleChange = (index, field, value) => {
    const updated = [...nonSampleTestcases];
    updated[index][field] = value;
    setNonSampleTestcases(updated);
  };

  const removeNonSample = (index) => {
    const updated = [...nonSampleTestcases];
    const removed = updated.splice(index, 1)[0];

    if (removed.testcaseId) {
      setDeletedNonSampleIds(prev => [...prev, removed.testcaseId]);
    }

    setNonSampleTestcases(updated);
  };

  const addNonSampleTestcase = () => {
    setNonSampleTestcases([...nonSampleTestcases, {
      input: "",
      expected: "",
      explanation: "",
      isSample: false
    }]);
  };




  const buildTestcases = () => {
    alert(`Generating ${form.numTest} testcases with ${form.solutionLanguage}...`);
  };

const submitSampleTestcases = async () => {
  const toAdd = testcases.filter(t => !t.testcaseId);
  const toUpdate = testcases.filter(t => t.testcaseId);
  const toDelete = deletedTestcaseIds;

  const payload = {
    toAdd: toAdd.map(t => ({
      input: t.input,
      expectedOutput: t.expected,
      explanation: t.explanation
    })),
    toUpdate: toUpdate.map(t => ({
      testcaseId: t.testcaseId,
      input: t.input,
      expectedOutput: t.expected,
      explanation: t.explanation
    })),
    toDelete
  };

  try {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`https://localhost:7157/api/Problem/update-sample-testcases/${problemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) alert("✅ Sample testcases updated!");
    else alert("❌ Failed to update sample testcases");
  } catch (err) {
    console.error("Submit sample error:", err);
    alert("❌ Error submitting sample testcases");
  }
};


const handleSubmit = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    // 1. Update Problem Info + Constraints + Solution
    await fetch(`https://localhost:7157/api/Problem/update/${problemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: form.name,
        frequent: form.frequency,
        moduleContentId: parseInt(form.moduleContent),
        difficulty: form.difficulty,
        timeLimit: parseInt(form.timelimit),
        memoryLimit: parseInt(form.memorylimit),
        problemStatement: form.statement,
        formatInput: form.inputFormat,
        formatOutput: form.outputFormat,
        solutionLanguage: form.solutionLanguage,
        solutionExplanation: form.solutionExplanation,
        solutionSource: form.solutionCode,
        constraints: form.constraints.map(c => ({
          variable: c.variable,
          minValue: parseInt(c.min),
          maxValue: parseInt(c.max)
        }))
      })
    });

    // 2. Update Sample Testcases
    const samplePayload = {
      toAdd: testcases.filter(t => !t.testcaseId).map(t => ({ input: t.input, expectedOutput: t.expected, explanation: t.explanation })),
      toUpdate: testcases.filter(t => t.testcaseId).map(t => ({ testcaseId: t.testcaseId, input: t.input, expectedOutput: t.expected, explanation: t.explanation })),
      toDelete: deletedTestcaseIds
    };

    await fetch(`https://localhost:7157/api/Problem/update-sample-testcases/${problemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(samplePayload)
    });

    // 3. Update Non-Sample Testcases
    const nonSamplePayload = {
      toAdd: nonSampleTestcases.filter(t => !t.testcaseId).map(t => ({ input: t.input, expectedOutput: t.expected, explanation: t.explanation })),
      toUpdate: nonSampleTestcases.filter(t => t.testcaseId).map(t => ({ testcaseId: t.testcaseId, input: t.input, expectedOutput: t.expected, explanation: t.explanation })),
      toDelete: deletedNonSampleIds
    };

    await fetch(`https://localhost:7157/api/Problem/update-non-sample-testcases/${problemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(nonSamplePayload)
    });

    // 4. Optional: Generate Random Testcases
    if (
      enableRandomTest &&
      form.numTest > 0 &&
      form.generateInputCode.trim() &&
      form.solutionCode.trim()
    ) {
      await fetch(`https://localhost:7157/api/Problem/generate-random-testcases/${problemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          numberOfTestcases: form.numTest,
          testGeneratorSource: form.generateInputCode,
          testGeneratorLanguage: form.solutionLanguage,
          solutionSource: form.solutionCode,
          solutionLanguage: form.solutionLanguage
        })
      });
    }

    alert("✅ All changes submitted successfully!");
  } catch (err) {
    console.error("❌ Submit error:", err);
    alert("❌ An error occurred while submitting.");
  }
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
      className={`px-5 py-3 font-medium rounded-t-lg transition-colors duration-200 ${active
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

            {/* <FormInput 
              label="Problem Name" 
              name="name" 
              value={form.name} 
              onChange={handleFormChange} 
              placeholder="Enter a descriptive name for the problem"
            /> */}
            <div className="mb-4 text-black">
              <label className="block text-gray-700 font-semibold mb-2">Problem Name</label>
              <textarea
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Enter a descriptive name for the problem"
                rows={1}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

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
                value={form.difficulty || ""}
                onChange={handleFormChange}
                options={[
                  { value: "", label: "-- Select Difficulty --" },
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" }
                ]}
              />

              <FormSelect
                label="Section"
                name="section"
                value={selectedSectionId || ""}
                onChange={handleSectionChange}
                options={[
                  { value: "", label: "-- Select Section --" },   
                  ...sections.map(s => ({ value: s.id, label: s.name }))
                ]}
              />

              <FormSelect
                label="Module"
                name="module"
                value={selectedModuleId || ""}
                onChange={handleModuleChange}
                options={[
                  { value: "", label: "-- Select Module --" },
                  ...modules.map(m => ({ value: m.id, label: m.name }))
                ]}
              />

              <FormSelect
                label="Module Content"
                name="moduleContent"
                value={form.moduleContent || ""}
                onChange={handleModuleContentChange}
                options={[
                  { value: "", label: "-- Select Module Content --" },
                  ...moduleContents.map(mc => ({ value: mc.id, label: mc.title }))
                ]}
              />


            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Time Limit (s)</label>
                <textarea
                  name="timelimit"
                  value={form.timelimit}
                  onChange={handleFormChange}
                  placeholder="e.g., 1.0"
                  rows={1}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Memory Limit (KB)</label>
                <textarea
                  name="memorylimit"
                  value={form.memorylimit}
                  onChange={handleFormChange}
                  placeholder="e.g., 256000"
                  rows={1}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

          </div>
        );

      case "description":
        return (
          <div className="bg-white text-black rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Problem Description</h2>

            <div className="mb-4 text-black">
              <label className="block text-gray-700 font-semibold mb-2">Problem Statement</label>
              <textarea
                name="statement"
                value={form.statement}
                onChange={handleFormChange}
                placeholder="Describe the problem requirements clearly..."
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-4 text-black">
              <label className="block text-gray-700 font-semibold mb-2">Input Format</label>
              <textarea
                name="inputFormat"
                value={form.inputFormat}
                onChange={handleFormChange}
                placeholder="e.g., Line 1: number of tests..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-4 text-black">
              <label className="block text-gray-700 font-semibold mb-2">Output Format</label>
              <textarea
                name="outputFormat"
                value={form.outputFormat}
                onChange={handleFormChange}
                placeholder="e.g., Line 1: number of outputs..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

          </div>
        );

      case "constraints":
        return (
          <div className="bg-white text-black rounded-lg shadow-lg p-6">
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
              <div className="mb-6 bg-white p-4 rounded-lg border border-blue-200">
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
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={constraint.variable}
                            onChange={(e) => handleConstraintChange(index, "variable", e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={constraint.min}
                              onChange={(e) => handleConstraintChange(index, "min", e.target.value)}
                              className="w-full border rounded px-2 py-1"
                            />
                            <span>≤</span>
                            <input
                              type="number"
                              value={constraint.max}
                              onChange={(e) => handleConstraintChange(index, "max", e.target.value)}
                              className="w-full border rounded px-2 py-1"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
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
              <h2 className="text-xl font-bold mb-4 text-gray-800">Sample Testcases</h2>

              {testcases.map((t, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4 shadow bg-white">
                  <div className="mb-2">
                    <label className="font-semibold">Input:</label>
                    <textarea
                      value={t.input}
                      onChange={(e) => handleTestcaseChange(index, "input", e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold">Expected Output:</label>
                    <textarea
                      value={t.expected}
                      onChange={(e) => handleTestcaseChange(index, "expected", e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold">Explanation (optional):</label>
                    <textarea
                      value={t.explanation}
                      onChange={(e) => handleTestcaseChange(index, "explanation", e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => removeTestcase(index)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addTestcase}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Add Sample Testcase
              </button>
            </div>
          );

          case "testcases":
            return (
              <div className="bg-white text-black rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Testcases (non-sample)</h2>

                {nonSampleTestcases.map((t, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4 shadow bg-white">
                    <div className="mb-2">
                      <label className="font-semibold">Input:</label>
                      <textarea
                        value={t.input}
                        onChange={(e) => handleNonSampleChange(index, "input", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-semibold">Expected Output:</label>
                      <textarea
                        value={t.expected}
                        onChange={(e) => handleNonSampleChange(index, "expected", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-semibold">Explanation (optional):</label>
                      <textarea
                        value={t.explanation}
                        onChange={(e) => handleNonSampleChange(index, "explanation", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeNonSample(index)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addNonSampleTestcase}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Testcase
                </button>
              </div>
            );


            case "solution":
              return (
                <div className="bg-white text-black rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Solution & Testcase Generation</h2>

                  {/* Toggle Add More Random Test */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={enableRandomTest}
                        onChange={() => setEnableRandomTest(!enableRandomTest)}
                        className="w-5 h-5"
                      />
                      <span className="text-gray-800 font-medium">Add More Random Test</span>
                    </label>
                  </div>

                  {/* Random Test Inputs (conditionally shown) */}
                  {enableRandomTest && (
                    <>
                      <FormInput
                        label="Number of Test Cases"
                        type="number"
                        name="numTest"
                        value={form.numTest}
                        onChange={handleFormChange}
                        placeholder="e.g., 10"
                        min="1"
                      />

                      <FormSelect
                        label="Generate Input Code Language"
                        name="solutionLanguage"
                        value={form.solutionLanguage}
                        onChange={handleFormChange}
                        options={[
                          { value: "cpp", label: "C++" },
                          { value: "python", label: "Python" },
                          { value: "java", label: "Java" }
                        ]}
                      />

                      <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Generate Input Code</label>
                        <div className="relative">
                          <div className="absolute top-0 left-0 right-0 bg-gray-100 text-black font-semibold px-4 py-2 border-b border-gray-300 rounded-t-lg flex items-center">
                            <span className="mr-2 font-medium text-sm">
                              {form.solutionLanguage === "cpp" ? "C++" :
                              form.solutionLanguage === "python" ? "Python" : "Java"}
                            </span>
                          </div>
                          <textarea
                            name="generateInputCode"
                            value={form.generateInputCode}
                            onChange={handleFormChange}
                            placeholder={`Enter your code to generate test inputs...`}
                            rows={8}
                            className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 font-mono pt-12"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Solution Details Section */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Solution Details</h3>

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

                    <div className="mb-4 text-black">
                      <label className="block text-gray-700 font-semibold mb-2">Solution Explanation</label>
                      <textarea
                        name="solutionExplanation"
                        value={form.solutionExplanation}
                        onChange={handleFormChange}
                        placeholder="Explain your solution approach, complexity analysis, etc."
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Solution Code</label>
                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 bg-gray-100 text-black font-semibold px-4 py-2 border-b border-gray-300 rounded-t-lg flex items-center">
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
                          className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 font-mono pt-12"
                        />
                      </div>
                    </div>
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
            <h1 className="text-3xl font-bold text-gray-800">Edit Problem</h1>
          </div>
          <p className="text-gray-600 mb-6">Create a new programming problem with details, constraints, and test cases</p>

          <div className="border-b border-gray-200 mb-4">
            <div className="flex flex-wrap gap-1">
              <TabButton id="details" label="Details" active={activeTab === "details"} onClick={setActiveTab} />
              <TabButton id="description" label="Description" active={activeTab === "description"} onClick={setActiveTab} />
              <TabButton id="constraints" label="Constraints" active={activeTab === "constraints"} onClick={setActiveTab} />
              <TabButton id="samples" label="Samples" active={activeTab === "samples"} onClick={setActiveTab} />
              <TabButton id="testcases" label="Testcases" active={activeTab === "testcases"} onClick={setActiveTab} />
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
                  handleSubmit();
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

export default EditProblem;