// src/Pages/Submit.js
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Section from "../Components/Section";
import { useNavigate } from "react-router-dom";

const Submit = () => {
    const navigate = useNavigate();
    const stored = localStorage.getItem("selectedProblem");
    const problem = stored ? JSON.parse(stored) : null;

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [expandedTestcase, setExpandedTestcase] = useState(null);

    if (!problem) {
        return <div className="text-white p-4">No problem selected.</div>;
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setResult(null);
        // Mock testcases
        const mockTestcases = [
            {
                status: "Accepted",
                time: 123,
                memory: 256,
                input: problem.samples?.[0]?.input || "1 2",
                actual_output: problem.samples?.[0]?.output || "3",
                expected_output: problem.samples?.[0]?.output || "3"
            },
            {
                status: "Wrong Answer",
                time: 150,
                memory: 260,
                input: "2 2",
                actual_output: "5",
                expected_output: "4"
            },
            {
                status: "Time Limit Exceeded",
                time: 2000,
                memory: 300,
                input: "1000000 1000000",
                actual_output: "",
                expected_output: "2000000"
            }
        ];
        // Đếm số lần nộp
        let submitCount = parseInt(localStorage.getItem("submitCount") || "0");
        submitCount++;
        localStorage.setItem("submitCount", submitCount.toString());
        // Lưu submission
        localStorage.setItem("lastSubmission", JSON.stringify({
            problemTitle: problem.title,
            language,
            code,
            status: mockTestcases.some(tc => tc.status !== "Accepted") ? mockTestcases.find(tc => tc.status !== "Accepted").status : "Accepted",
            testcases: mockTestcases
        }));
        setIsSubmitting(false);
        navigate("/submission");
    };

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const getColorClass = (status) => {
        switch (status) {
            case "Accepted": return "bg-green-900 text-green-200";
            case "Wrong Answer": return "bg-red-900 text-red-200";
            case "Time Limit Exceeded": return "bg-[#43464a] text-[#7b818a]";
            case "Out of Memory": return "bg-purple-900 text-purple-200";
            default: return "bg-gray-800 text-white";
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">{problem.title}</h1>
                <div className="mb-8 p-6 bg-[#181f2a] rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
                    <div className="mb-2 whitespace-pre-line">{problem.description}</div>
                    <div className="mb-2"><span className="font-semibold">Input:</span> {problem.input}</div>
                    <div className="mb-2"><span className="font-semibold">Output:</span> {problem.output}</div>
                    <div className="mb-2">
                        <span className="font-semibold">Sample Testcase:</span>
                        {problem.samples && problem.samples.map((s, idx) => (
                            <div key={idx} className="bg-[#232b3b] rounded p-3 mt-2">
                                <div><span className="font-medium">Input:</span><pre className="bg-[#181f2a] p-2 rounded mt-1">{s.input}</pre></div>
                                <div><span className="font-medium">Output:</span><pre className="bg-[#181f2a] p-2 rounded mt-1">{s.output}</pre></div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Language</label>
                    <select
                        className="w-full p-2 rounded bg-[#1a2330] border border-gray-700"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Source Code</label>
                    <div className="h-[500px] border border-gray-700 rounded overflow-hidden">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: "on",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                {result && (
                    <div className="mt-6 p-4 bg-[#1a2330] rounded">
                        <h2 className="text-xl font-bold mb-4">Submission Result</h2>
                        <div className="space-y-4">
                            <div>
                                <span className="font-medium">Status: </span>
                                <span className={result.status.description === "Accepted" ? "text-green-500" : "text-red-500"}>
                                    {result.status.description}
                                </span>
                            </div>
                            {result.testcases && result.testcases.map((tc, index) => (
                                <div key={index} className="border border-gray-700 rounded p-3">
                                    <div className="flex justify-between items-center">
                                        <span>Test Case {index + 1}</span>
                                        <span className={tc.status === "Accepted" ? "text-green-500" : "text-red-500"}>
                                            {tc.status}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-400">
                                        <div>Time: {tc.time}ms</div>
                                        <div>Memory: {tc.memory}KB</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Submit;
