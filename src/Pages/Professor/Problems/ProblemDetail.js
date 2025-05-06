import React from "react";
import { useParams, Link } from "react-router-dom";

const mockProblem = {
  id: 1,
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

const ProblemDetail = () => {
  const { id } = useParams();
  // Thực tế sẽ fetch theo id, ở đây dùng mock
  const problem = mockProblem;

  return (
    <div className="max-w-2xl mx-auto bg-[#1a2a47] p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{problem.title}</h2>
      <div className="mb-2 text-gray-400">Level: {problem.level} | Section: {problem.section}</div>
      <div className="mb-2"><b>Đề bài:</b> {problem.description}</div>
      <div className="mb-2"><b>Giới hạn thời gian:</b> {problem.timelimit} | <b>Bộ nhớ:</b> {problem.memory}</div>
      <div className="mb-2"><b>Note:</b> {problem.note}</div>
      <div className="mb-2"><b>Input:</b> {problem.input}</div>
      <div className="mb-2"><b>Output:</b> {problem.output}</div>
      <div className="mb-2"><b>Testcase mẫu:</b><pre className="bg-[#22345c] p-2 rounded mt-1">{problem.sample}</pre></div>
      <div className="mb-2"><b>Solution (code tác giả):</b><pre className="bg-[#22345c] p-2 rounded mt-1">{problem.solution}</pre></div>
      <div className="flex gap-4 mt-4">
        <Link to={`/professor/problems/${problem.id}/submissions`} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Xem Submission</Link>
        <Link to={`/professor/problems/${problem.id}/edit`} className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600">Edit</Link>
      </div>
    </div>
  );
};

export default ProblemDetail;
