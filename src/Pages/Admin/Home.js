import React from "react";

const mockStats = {
  problems: 120,
  easy: 40,
  medium: 50,
  hard: 30,
  lessons: 60,
  sections: 4,
  modulesPerSection: [5, 6, 7, 8],
  moduleContentsPerModule: [3, 4, 5, 6, 7, 8],
  blogs: 35,
  blogBy: { teacher: 15, student: 12, admin: 8 },
  users: 200,
  userBy: { student: 150, professor: 30, admin: 20 },
  submits: 5000,
  submitStatus: { AC: 3200, TLE: 800, WA: 700, RE: 300 },
  topProblems: [
    { title: "Sum of Two Numbers", ac: 500 },
    { title: "Binary Search", ac: 450 },
    { title: "DFS", ac: 400 },
    { title: "Knapsack DP", ac: 350 },
    { title: "Prefix Sums", ac: 300 },
  ],
  topStudents: [
    { name: "Alice", ac: 120 },
    { name: "Bob", ac: 110 },
    { name: "Charlie", ac: 105 },
    { name: "David", ac: 100 },
    { name: "Eva", ac: 98 },
  ],
  topProfessors: [
    { name: "Prof. An", created: 40 },
    { name: "Prof. Binh", created: 35 },
    { name: "Prof. Cuong", created: 30 },
    { name: "Prof. Dung", created: 28 },
    { name: "Prof. Em", created: 25 },
  ],
};

const AdminHome = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard Overview</h2>
      {/* Tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Problems</h3>
          <div>Total: <b>{mockStats.problems}</b></div>
          <div>Easy: <b>{mockStats.easy}</b> | Medium: <b>{mockStats.medium}</b> | Hard: <b>{mockStats.hard}</b></div>
        </div>
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Lessons (Module Content)</h3>
          <div>Total: <b>{mockStats.lessons}</b></div>
          <div>Sections: <b>{mockStats.sections}</b></div>
          <div>Modules per Section: {mockStats.modulesPerSection.join(", ")}</div>
          <div>ModuleContents per Module: {mockStats.moduleContentsPerModule.join(", ")}</div>
        </div>
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Blogs</h3>
          <div>Total: <b>{mockStats.blogs}</b></div>
          <div>Teacher: <b>{mockStats.blogBy.teacher}</b> | Student: <b>{mockStats.blogBy.student}</b> | Admin: <b>{mockStats.blogBy.admin}</b></div>
        </div>
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Users</h3>
          <div>Total: <b>{mockStats.users}</b></div>
          <div>Student: <b>{mockStats.userBy.student}</b> | Professor: <b>{mockStats.userBy.professor}</b> | Admin: <b>{mockStats.userBy.admin}</b></div>
        </div>
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Submissions</h3>
          <div>Total: <b>{mockStats.submits}</b></div>
          <div>AC: <b>{mockStats.submitStatus.AC}</b> | TLE: <b>{mockStats.submitStatus.TLE}</b> | WA: <b>{mockStats.submitStatus.WA}</b> | RE: <b>{mockStats.submitStatus.RE}</b></div>
        </div>
      </div>
      {/* Top 5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Top 5 Problems (AC)</h3>
          <ol className="list-decimal ml-6">
            {mockStats.topProblems.map((p, idx) => (
              <li key={idx}>{p.title} <span className="text-green-400 font-bold">({p.ac} AC)</span></li>
            ))}
          </ol>
        </div>
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Top 5 Students (AC)</h3>
          <ol className="list-decimal ml-6">
            {mockStats.topStudents.map((s, idx) => (
              <li key={idx}>{s.name} <span className="text-blue-400 font-bold">({s.ac} AC)</span></li>
            ))}
          </ol>
        </div>
        <div className="bg-[#1a2a47] p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Top 5 Professors (Problems Created)</h3>
          <ol className="list-decimal ml-6">
            {mockStats.topProfessors.map((p, idx) => (
              <li key={idx}>{p.name} <span className="text-yellow-400 font-bold">({p.created} Problems)</span></li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminHome; 