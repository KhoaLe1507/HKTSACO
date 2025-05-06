import React, { useState } from "react";

const mockProblem = {
  title: "Sum of Two Numbers",
  description: "Cho hai số nguyên a, b. Hãy tính tổng của chúng.",
  timelimit: "1s",
  memory: "256MB",
  section: "Math",
  level: "Bronze",
  note: "Giới hạn: |a|, |b| ≤ 10^5",
  input: "Hai số nguyên a, b trên một dòng",
  output: "Tổng của a và b",
  sample: "Input: 1 2\nOutput: 3",
  solution: "return a + b; // Python",
};

const EditProblem = () => {
  const [form, setForm] = useState(mockProblem);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đã lưu thay đổi (demo)");
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#1a2a47] p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa bài tập</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Tiêu đề" className="w-full p-2 rounded bg-[#22345c]" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Đề bài" className="w-full p-2 rounded bg-[#22345c]" required />
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
        <input name="note" value={form.note} onChange={handleChange} placeholder="Note (giới hạn, giải thích)" className="w-full p-2 rounded bg-[#22345c]" />
        <input name="input" value={form.input} onChange={handleChange} placeholder="Format input" className="w-full p-2 rounded bg-[#22345c]" />
        <input name="output" value={form.output} onChange={handleChange} placeholder="Format output" className="w-full p-2 rounded bg-[#22345c]" />
        <textarea name="sample" value={form.sample} onChange={handleChange} placeholder="Testcase mẫu" className="w-full p-2 rounded bg-[#22345c]" />
        <textarea name="solution" value={form.solution} onChange={handleChange} placeholder="Solution (code tác giả)" className="w-full p-2 rounded bg-[#22345c]" />
        <button type="submit" className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600">Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default EditProblem;
