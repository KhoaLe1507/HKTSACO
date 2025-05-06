import React, { useState } from "react";

// Mock user
const USERNAME = "student01";

// Hàm lấy màu theo status
const getStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "text-green-500";
    case "Wrong Answer": return "text-red-500";
    case "Time Limit Exceeded": return "text-orange-400";
    case "Memory Limit Exceeded": return "text-purple-400";
    default: return "text-gray-300";
  }
};

const getBgStatusColor = (status) => {
  switch (status) {
    case "Accepted": return "bg-green-900";
    case "Wrong Answer": return "bg-red-900";
    case "Time Limit Exceeded": return "bg-orange-900";
    case "Memory Limit Exceeded": return "bg-purple-900";
    default: return "bg-gray-800";
  }
};

const Submission = () => {
  // Dropdown testcase (phải đặt trước mọi return)
  const [openIdx, setOpenIdx] = useState(null);
  // Lấy dữ liệu submission từ localStorage (hoặc truyền qua router state tuỳ ý bạn)
  const submission = JSON.parse(localStorage.getItem("lastSubmission"));
  if (!submission) return <div className="text-white p-8">No submission found.</div>;

  // Tìm thời gian lớn nhất
  const maxTime = Math.max(...submission.testcases.map(tc => tc.time));
  // Đếm số lần nộp (mock: tăng dần mỗi lần nộp)
  const submitCount = parseInt(localStorage.getItem("submitCount") || "1");

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{submission.problemTitle}</h1>
        <h2 className="text-xl mb-2 font-semibold">Submission #{submitCount} of {USERNAME}</h2>
        <div className="mb-2">Language: <span className="font-medium">{submission.language}</span></div>
        <div className="mb-2">Time: <span className="font-medium">{maxTime} ms</span></div>
        <div className="mb-2">Result: <span className={`font-bold ${getStatusColor(submission.status)}`}>{submission.status}</span></div>
        <div className="mb-4">
          <div className="font-semibold mb-1">Source Code:</div>
          <pre className="bg-[#181f2a] p-3 rounded overflow-x-auto text-sm border border-gray-700">{submission.code}</pre>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Testcases</div>
          <table className="w-full text-sm border border-gray-700 rounded overflow-hidden">
            <thead className="bg-[#232b3b]">
              <tr>
                <th className="p-2">Testcase</th>
                <th className="p-2">Result</th>
                <th className="p-2">Executed Time</th>
                <th className="p-2">Memory</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {submission.testcases.map((tc, idx) => (
                <React.Fragment key={idx}>
                  <tr className={`${getBgStatusColor(tc.status)} border-b border-gray-700`}>
                    <td className="p-2 text-center">{idx + 1}</td>
                    <td className={`p-2 text-center font-bold ${getStatusColor(tc.status)}`}>{tc.status}</td>
                    <td className="p-2 text-center">{tc.time} ms</td>
                    <td className="p-2 text-center">{tc.memory} KB</td>
                    <td className="p-2 text-center">
                      <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="underline">Details</button>
                    </td>
                  </tr>
                  {openIdx === idx && (
                    <tr>
                      <td colSpan={5} className="bg-[#232b3b] p-4 animate-fade-in">
                        <div className="mb-2"><span className="font-semibold">Input:</span> <pre className="bg-[#181f2a] p-2 rounded mt-1">{tc.input}</pre></div>
                        <div className="mb-2"><span className="font-semibold">User Output:</span> <pre className="bg-[#181f2a] p-2 rounded mt-1">{tc.actual_output}</pre></div>
                        <div><span className="font-semibold">Expected Output:</span> <pre className="bg-[#181f2a] p-2 rounded mt-1">{tc.expected_output}</pre></div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Submission; 