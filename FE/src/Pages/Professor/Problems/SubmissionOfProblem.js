import React from "react";

const mockSubmissions = [
  {
    id: 1,
    user: "student1",
    code: "print(a+b)",
    result: "ACCEPTED",
    testcases: [true, true, true],
  },
  {
    id: 2,
    user: "student2",
    code: "print(a-b)",
    result: "WRONG ANSWER",
    testcases: [true, false, false],
  },
];

const SubmissionOfProblem = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Submission của bài tập</h2>
      <div className="space-y-6">
        {mockSubmissions.map((sub) => (
          <div key={sub.id} className="bg-[#1a2a47] p-4 rounded shadow">
            <div className="mb-2 font-semibold">User: {sub.user}</div>
            <div className="mb-2"><b>Kết quả:</b> <span className={sub.result === "ACCEPTED" ? "text-green-400" : "text-red-400"}>{sub.result}</span></div>
            <div className="mb-2"><b>Code:</b>
              <pre className="bg-[#22345c] p-2 rounded mt-1 overflow-x-auto">{sub.code}</pre>
            </div>
            <div className="mb-2"><b>Testcase:</b>
              <ul className="flex gap-2 mt-1">
                {sub.testcases.map((pass, idx) => (
                  <li key={idx} className={pass ? "text-green-400" : "text-red-400"}>
                    {pass ? `Passed #${idx+1}` : `Failed #${idx+1}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionOfProblem;
