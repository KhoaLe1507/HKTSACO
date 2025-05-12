import React from "react";
import { useNavigate } from "react-router-dom";

// Hàm tô màu theo status (có sẵn trong Submission.js)
const getStatusColor = (status) => {
    switch (status) {
        case "Accepted": return "text-green-600";
        case "Wrong Answer": return "text-red-600";
        case "Time Limit Exceeded": return "text-orange-500";
        case "Memory Limit Exceeded": return "text-purple-600";
        default: return "text-gray-600";
    }
};

const MySubmission = () => {
    const navigate = useNavigate();

    // Dữ liệu mẫu
    const submissions = [
        {
            id: 1001,
            time: "2025-05-11 14:00",
            problemName: "Bài toán tìm đường",
            timeExec: "123ms",
            memory: "15MB",
            language: "C++",
            result: "Accepted"
        },
        {
            id: 1002,
            time: "2025-05-11 13:40",
            problemName: "Dãy con tăng dài nhất",
            timeExec: "235ms",
            memory: "25MB",
            language: "Python",
            result: "Time Limit Exceeded"
        },
        {
            id: 1003,
            time: "2025-05-10 10:20",
            problemName: "Sắp xếp theo độ ưu tiên",
            timeExec: "150ms",
            memory: "18MB",
            language: "Java",
            result: "Wrong Answer"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold mb-6 text-black">📄 Submission History</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th className="px-3 py-2 border">Submission ID</th>
                            <th className="px-3 py-2 border">Submit Time</th>
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
                                <td className="px-3 py-2 border">{s.time}</td>
                                <td className="px-3 py-2 border">{s.problemName}</td>
                                <td className="px-3 py-2 border">{s.timeExec}</td>
                                <td className="px-3 py-2 border">{s.memory}</td>
                                <td className="px-3 py-2 border">{s.language}</td>
                                <td className={`px-3 py-2 border font-bold ${getStatusColor(s.result)}`}>
                                    {s.result}
                                </td>
                                <td className="px-3 py-2 border">
                                    <button
                                        onClick={() => {
                                            localStorage.setItem("lastSubmission", JSON.stringify(s)); // ✅ lưu trước khi chuyển
                                            navigate(`/submission/${s.id}`);
                                        }}
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

export default MySubmission;
