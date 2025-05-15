import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams(); // problemId from route
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(`https://localhost:7157/api/problem/getallsubmission/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        const mapped = data.map((s) => ({
          id: s.submissionId,
          submittedAt: s.submitAtTime,
          username: s.userName,
          problemName: s.problemName,
          timeExec: `${s.timeExecuted} ms`,
          memory: `${s.memory} KB`,
          language: s.language,
          result: s.result
        }));

        setSubmissions(mapped);
      } catch (err) {
        console.error("Lỗi khi tải danh sách submission:", err);
      }
    };

    fetchSubmissions();
  }, [id]);

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
            {submissions.map((s) => (
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
            {submissions.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSubmission;
