import React from "react";
import { useNavigate } from "react-router-dom";

const mockSubmissions = [
  {
    id: 1001,
    submittedAt: "2025-05-13 10:00",
    username: "student01",
    problemName: "Sum of Two Numbers",
    timeExec: "120ms",
    memory: "15MB",
    language: "C++",
    result: "Accepted"
  },
  {
    id: 1002,
    submittedAt: "2025-05-12 15:45",
    username: "student02",
    problemName: "Binary Search",
    timeExec: "200ms",
    memory: "22MB",
    language: "Python",
    result: "Wrong Answer"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "text-green-600";
    case "Wrong Answer": return "text-red-600";
    case "Time Limit Exceeded": return "text-orange-500";
    case "Memory Limit Exceeded": return "text-purple-600";
    default: return "text-gray-600";
  }
};

const AllSubmission = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-black">📑 All Submissions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-3 py-2 border">Submission ID</th>
              <th className="px-3 py-2 border">Submitted At</th>
              <th className="px-3 py-2 border">Username</th>
              <th className="px-3 py-2 border">Problem Name</th>
              <th className="px-3 py-2 border">Time Exec</th>
              <th className="px-3 py-2 border">Memory</th>
              <th className="px-3 py-2 border">Language</th>
              <th className="px-3 py-2 border">Result</th>
              <th className="px-3 py-2 border">Details</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {mockSubmissions.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="px-3 py-2 border">{s.id}</td>
                <td className="px-3 py-2 border">{s.submittedAt}</td>
                <td className="px-3 py-2 border">{s.username}</td>
                <td className="px-3 py-2 border">{s.problemName}</td>
                <td className="px-3 py-2 border">{s.timeExec}</td>
                <td className="px-3 py-2 border">{s.memory}</td>
                <td className="px-3 py-2 border">{s.language}</td>
                <td className={`px-3 py-2 border font-bold ${getStatusColor(s.result)}`}>
                  {s.result}
                </td>
                <td className="px-3 py-2 border">
                  <button
                    onClick={() => navigate(`/submission/${s.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSubmission;