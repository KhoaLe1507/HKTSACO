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
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn">
      {/* Bộ lọc thời gian */}
      <div className="flex flex-wrap gap-4 items-center border rounded-lg p-4 mb-6 bg-white">
        <span className="font-semibold">Bộ lọc thời gian</span>
        <label className="ml-2">Ngày bắt đầu: <input type="date" className="border rounded px-2 py-1 ml-1" defaultValue="2025-04-01" /></label>
        <label className="ml-2">Ngày kết thúc: <input type="date" className="border rounded px-2 py-1 ml-1" defaultValue="2025-04-30" /></label>
        <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded font-bold">Lọc dữ liệu</button>
      </div>

      {/* Tổng quan (Biểu đồ) */}
      <div className="border rounded-lg p-4 mb-6 bg-white">
        <div className="flex flex-wrap gap-8 items-center mb-4">
          <div className="flex-1 min-w-[220px]">
            <div className="mb-2 font-bold text-blue-600 flex items-center gap-2">Tổng Quan (Biểu đồ)</div>
            <ul className="text-sm space-y-1">
              <li>📝 Tổng số Problem tạo: <b>{mockStats.problems}</b></li>
              <li>📦 Tổng số ModuleContent tạo: <b>{mockStats.lessons}</b></li>
              <li>📰 Tổng số bài Blog: <b>{mockStats.blogs}</b></li>
            </ul>
          </div>
          <div className="flex-1 min-w-[220px]">
            <ul className="text-sm space-y-1">
              <li>✅ Tỉ lệ AC trung bình: <b className="text-green-600">72%</b></li>
              <li>📈 Trung bình học xong: <b className="text-yellow-600">65%</b></li>
              <li>👍 Tổng Like: <b>320</b>, 💬 Comment: <b>85</b></li>
            </ul>
          </div>
        </div>
        {/* Bar Chart Problem Status */}
        <div className="mb-4">
          <div className="font-bold text-red-500 mb-1">Bar Chart: Problem Status</div>
          <div className="flex items-center gap-4 mb-1">
            <span className="inline-block w-4 h-4 bg-green-500 mr-1 rounded"></span> Completed
            <span className="inline-block w-4 h-4 bg-yellow-400 mr-1 rounded"></span> In Progress
            <span className="inline-block w-4 h-4 bg-gray-400 mr-1 rounded"></span> Not Started
          </div>
          <div className="flex gap-2 mt-2">
            {["A", "B", "C", "D"].map((label, idx) => (
              <div key={label} className="flex flex-col items-center">
                <span className="font-bold text-black mb-1">{label}</span>
                <div className="w-8 h-16 bg-gray-200 border rounded flex items-end">
                  <div className="w-full bg-green-500" style={{ height: `${30 + idx * 10}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Donut Chart ModuleContent Progress */}
        <div className="mb-2">
          <div className="font-bold text-pink-500 mb-1">Donut Chart: ModuleContent Progress</div>
          <div className="text-sm text-gray-700">Graph - DFS: <span className="text-green-600 font-bold">70% Complete</span>, <span className="text-yellow-600 font-bold">20% IP</span>, <span className="text-gray-600 font-bold">10% NS</span></div>
        </div>
      </div>

      {/* Chi tiết ModuleContent */}
      <div className="border rounded-lg p-4 mb-6 bg-white">
        <div className="font-bold text-blue-600 mb-2 flex items-center gap-2">🔷 Chi tiết ModuleContent</div>
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th className="py-2">Completed</th>
              <th className="py-2">In Progress</th>
              <th className="py-2">Not Started</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>DFS</td>
              <td className="text-yellow-600 font-bold">70</td>
              <td className="text-yellow-600 font-bold">20</td>
              <td className="text-yellow-600 font-bold">10</td>
            </tr>
            <tr>
              <td>Binary Search</td>
              <td className="text-yellow-600 font-bold">45</td>
              <td className="text-yellow-600 font-bold">30</td>
              <td className="text-yellow-600 font-bold">25</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chi tiết Problem */}
      <div className="border rounded-lg p-4 mb-6 bg-white">
        <div className="font-bold text-pink-500 mb-2 flex items-center gap-2">💗 Chi tiết Problem</div>
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Problem</th>
              <th className="py-2">Completed</th>
              <th className="py-2">In Progress</th>
              <th className="py-2">Not Started</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>Problem A</td>
              <td className="text-yellow-600 font-bold">50</td>
              <td className="text-yellow-600 font-bold">15</td>
              <td className="text-yellow-600 font-bold">5</td>
            </tr>
            <tr>
              <td>Problem B</td>
              <td className="text-yellow-600 font-bold">30</td>
              <td className="text-yellow-600 font-bold">20</td>
              <td className="text-yellow-600 font-bold">10</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Thống kê Blog */}
      <div className="border rounded-lg p-4 mb-6 bg-white">
        <div className="font-bold text-orange-500 mb-2 flex items-center gap-2">📊 Thống kê Blog</div>
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Blog Title</th>
              <th className="py-2">Likes</th>
              <th className="py-2">Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>"Tư duy Greedy"</td>
              <td className="text-yellow-600 font-bold">120</td>
              <td className="text-yellow-600 font-bold">33</td>
            </tr>
            <tr>
              <td>"Sắp xếp & thời gian"</td>
              <td className="text-yellow-600 font-bold">88</td>
              <td className="text-yellow-600 font-bold">14</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome; 