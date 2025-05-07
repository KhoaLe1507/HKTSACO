import React, { useState } from "react";

const AddProblem = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    timelimit: "1s",
    memory: "256MB",
    section: "Math",
    level: "Bronze",
    note: "",
    input: "",
    output: "",
    sample: "",
    solution: "",
  });
  const [testcases, setTestcases] = useState([]);
  const [showAddTestcase, setShowAddTestcase] = useState(false);
  const [tcInput, setTcInput] = useState({ input: "", output: "", expected: "" });
  const [showSolution, setShowSolution] = useState(false);
  const [numTest, setNumTest] = useState(1);
  const [solutionCode, setSolutionCode] = useState("");
  const [buildResult, setBuildResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Problem submitted (demo)");
  };

  const handleAddTestcase = () => {
    setTestcases([...testcases, { ...tcInput }]);
    setTcInput({ input: "", output: "", expected: "" });
    setShowAddTestcase(false);
  };

  const handleBuildTestcase = () => {
    setBuildResult(`Generated ${numTest} testcases from solution code! (demo)`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#1a2a47] p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded bg-[#22345c]" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded bg-[#22345c]" required />
        <div className="flex gap-2">
          <input name="timelimit" value={form.timelimit} onChange={handleChange} placeholder="Time limit" className="p-2 rounded bg-[#22345c] w-1/2" />
          <input name="memory" value={form.memory} onChange={handleChange} placeholder="Memory" className="p-2 rounded bg-[#22345c] w-1/2" />
        </div>
        <div className="flex gap-2">
          <select name="section" value={form.section} onChange={handleChange} className="p-2 rounded bg-[#22345c] w-1/2">
            <option value="Math">Math</option>
            <option value="Algorithm">Algorithm</option>
            <option value="Graph">Graph</option>
          </select>
          <select name="level" value={form.level} onChange={handleChange} className="p-2 rounded bg-[#22345c] w-1/2">
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <input name="note" value={form.note} onChange={handleChange} placeholder="Note (limit, explanation)" className="w-full p-2 rounded bg-[#22345c]" />
        <input name="input" value={form.input} onChange={handleChange} placeholder="Format input" className="w-full p-2 rounded bg-[#22345c]" />
        <input name="output" value={form.output} onChange={handleChange} placeholder="Format output" className="w-full p-2 rounded bg-[#22345c]" />
        <textarea name="sample" value={form.sample} onChange={handleChange} placeholder="Sample testcase" className="w-full p-2 rounded bg-[#22345c]" />
        <textarea name="solution" value={form.solution} onChange={handleChange} placeholder="Solution (author code)" className="w-full p-2 rounded bg-[#22345c]" />
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Submit Problem</button>
      </form>

      {/* Add Testcase Sample */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Testcase Samples</h3>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded font-bold mb-2"
          onClick={() => setShowAddTestcase(true)}
        >
          + Add Testcase Sample
        </button>
        {showAddTestcase && (
          <div className="bg-[#22345c] p-4 rounded mb-2">
            <input
              className="w-full mb-2 p-2 rounded bg-[#1a2a47]"
              placeholder="Input"
              value={tcInput.input}
              onChange={e => setTcInput({ ...tcInput, input: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 rounded bg-[#1a2a47]"
              placeholder="Output"
              value={tcInput.output}
              onChange={e => setTcInput({ ...tcInput, output: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 rounded bg-[#1a2a47]"
              placeholder="Expected Output"
              value={tcInput.expected}
              onChange={e => setTcInput({ ...tcInput, expected: e.target.value })}
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded font-bold" onClick={handleAddTestcase}>Save</button>
          </div>
        )}
        <ul className="space-y-2">
          {testcases.map((tc, idx) => (
            <li key={idx} className="bg-[#22345c] p-2 rounded">
              <b>Input:</b> {tc.input} <b>Output:</b> {tc.output} <b>Expected:</b> {tc.expected}
            </li>
          ))}
        </ul>
      </div>

      {/* Generate Testcase & Add Solution */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Generate Testcase</h3>
        <button
          className="bg-yellow-500 text-black px-3 py-1 rounded font-bold mb-2"
          onClick={() => setShowSolution(true)}
        >
          + Add Solution
        </button>
        {showSolution && (
          <div className="bg-[#22345c] p-4 rounded mb-2">
            <input
              type="number"
              min={1}
              className="w-full mb-2 p-2 rounded bg-[#1a2a47]"
              placeholder="Number of testcases"
              value={numTest}
              onChange={e => setNumTest(e.target.value)}
            />
            <textarea
              className="w-full mb-2 p-2 rounded bg-[#1a2a47] font-mono"
              placeholder="Paste solution code here..."
              value={solutionCode}
              onChange={e => setSolutionCode(e.target.value)}
              rows={6}
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded font-bold" onClick={handleBuildTestcase} type="button">Build testcase</button>
            {buildResult && <div className="mt-2 text-green-400">{buildResult}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProblem;
