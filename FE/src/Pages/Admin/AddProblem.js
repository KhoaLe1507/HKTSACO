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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Problem submitted (demo)");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4">Add New Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded border bg-gray-50" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded border bg-gray-50" required />
        <div className="flex gap-2">
          <input name="timelimit" value={form.timelimit} onChange={handleChange} placeholder="Time limit" className="p-2 rounded border bg-gray-50 w-1/2" />
          <input name="memory" value={form.memory} onChange={handleChange} placeholder="Memory" className="p-2 rounded border bg-gray-50 w-1/2" />
        </div>
        <div className="flex gap-2">
          <select name="section" value={form.section} onChange={handleChange} className="p-2 rounded border bg-gray-50 w-1/2">
            <option value="Math">Math</option>
            <option value="Algorithm">Algorithm</option>
            <option value="Graph">Graph</option>
          </select>
          <select name="level" value={form.level} onChange={handleChange} className="p-2 rounded border bg-gray-50 w-1/2">
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <input name="note" value={form.note} onChange={handleChange} placeholder="Note (limit, explanation)" className="w-full p-2 rounded border bg-gray-50" />
        <input name="input" value={form.input} onChange={handleChange} placeholder="Format input" className="w-full p-2 rounded border bg-gray-50" />
        <input name="output" value={form.output} onChange={handleChange} placeholder="Format output" className="w-full p-2 rounded border bg-gray-50" />
        <textarea name="sample" value={form.sample} onChange={handleChange} placeholder="Sample testcase" className="w-full p-2 rounded border bg-gray-50" />
        <textarea name="solution" value={form.solution} onChange={handleChange} placeholder="Solution (author code)" className="w-full p-2 rounded border bg-gray-50" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit Problem</button>
      </form>
    </div>
  );
};

export default AddProblem; 