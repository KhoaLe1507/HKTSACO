import React, { useState } from "react";

const mockStats = {
  problems: 12,
  moduleContents: 4,
  blogs: 6,
  acRate: 72,
  avgProgress: 65,
  likes: 320,
  comments: 85,
  problemStatus: [
    { name: "A", completed: 8, inProgress: 2, notStarted: 2 },
    { name: "B", completed: 7, inProgress: 3, notStarted: 2 },
    { name: "C", completed: 6, inProgress: 4, notStarted: 2 },
    { name: "D", completed: 9, inProgress: 1, notStarted: 2 },
  ],
  moduleContentStatus: [
    { title: "DFS", completed: 70, inProgress: 20, notStarted: 10 },
    { title: "Binary Search", completed: 45, inProgress: 30, notStarted: 25 },
  ],
  problemDetail: [
    { title: "Problem A", completed: 50, inProgress: 15, notStarted: 5 },
    { title: "Problem B", completed: 30, inProgress: 20, notStarted: 10 },
  ],
  blogStats: [
    { title: "Tư duy Greedy", likes: 120, comments: 33 },
    { title: "Sắp xếp & thời gian", likes: 88, comments: 14 },
  ],
};

const ProfessorHomePage = () => {
  const [start, setStart] = useState("2025-04-01");
  const [end, setEnd] = useState("2025-04-30");

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Bộ lọc thời gian */}
      <div className="flex items-center gap-4 mb-6 bg-gray p-4 rounded shadow">
        <span className="font-semibold text-blue-500">Bộ lọc thời gian</span>
        <span>Ngày bắt đầu:</span>
        <input type="date" value={start} onChange={e => setStart(e.target.value)} className="bg-gray text-black p-1 rounded" />
        <span>Ngày kết thúc:</span>
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="bg-gray text-black p-1 rounded" />
        <button className="ml-4 px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded font-bold">Lọc dữ liệu</button>
      </div>
      {/* Tổng quan */}
      <div className="bg-gray text-black p-4 rounded shadow mb-6">
        <div className="flex flex-wrap gap-8 items-center mb-4">
          <div className="space-y-1">
            <div>📝 <b>Tổng số Problem tạo:</b> {mockStats.problems}</div>
            <div>📦 <b>Tổng số ModuleContent tạo:</b> {mockStats.moduleContents}</div>
            <div>📰 <b>Tổng số bài Blog:</b> {mockStats.blogs}</div>
          </div>
          <div className="space-y-1">
            <div>✅ <b>Tỉ lệ AC trung bình:</b> <span className="text-yellow-500">{mockStats.acRate}%</span></div>
            <div>📈 <b>Trung bình học xong:</b> <span className="text-yellow-500">{mockStats.avgProgress}%</span></div>
            <div>👍 <b>Tổng Like:</b> {mockStats.likes}, 💬 <b>Comment:</b> {mockStats.comments}</div>
          </div>
        </div>
        {/* Bar chart Problem Status */}
        <div className="mb-4">
          <div className="font-bold mb-1">Bar Chart: Problem Status</div>
          <div className="flex gap-2 items-end">
            <div className="text-xs">Completed</div>
            {mockStats.problemStatus.map((p, idx) => (
              <div key={idx} className="flex flex-col items-center mx-2">
                <div className="bg-green-500 w-6" style={{height: p.completed*3}}></div>
                <div className="bg-yellow-500 w-6" style={{height: p.inProgress*3}}></div>
                <div className="bg-red-500 w-6" style={{height: p.notStarted*3}}></div>
                <div className="text-xs mt-1">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Donut chart ModuleContent Progress (giả lập) */}
        <div className="mb-4">
          <div className="font-bold mb-1">Donut Chart: ModuleContent Progress</div>
          <div className="text-pink-500">Graph - DFS: 70% Complete, 20% IP, 10% NS</div>
        </div>
      </div>
      {/* Chi tiết ModuleContent */}
      <div className="bg-gray text-black p-4 rounded shadow mb-6">
        <div className="font-bold text-blue-500 mb-2">Chi tiết ModuleContent</div>
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-gray-500">
              <th>Title</th>
              <th>Completed</th>
              <th>In Progress</th>
              <th>Not Started</th>
            </tr>
          </thead>
          <tbody>
            {mockStats.moduleContentStatus.map((m, idx) => (
              <tr key={idx} className="border-b border-gray-500">
                <td>{m.title}</td>
                <td>{m.completed}</td>
                <td>{m.inProgress}</td>
                <td>{m.notStarted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Chi tiết Problem */}
      <div className="bg-gray text-black p-4 rounded shadow mb-6">
        <div className="font-bold text-pink-500 mb-2">Chi tiết Problem</div>
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-gray-500">
              <th>Problem</th>
              <th>Completed</th>
              <th>In Progress</th>
              <th>Not Started</th>
            </tr>
          </thead>
          <tbody>
            {mockStats.problemDetail.map((p, idx) => (
              <tr key={idx} className="border-b border-gray-500">
                <td>{p.title}</td>
                <td>{p.completed}</td>
                <td>{p.inProgress}</td>
                <td>{p.notStarted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Thống kê Blog */}
      <div className="bg-gray text-black p-4 rounded shadow mb-6">
        <div className="font-bold text-yellow-500 mb-2">Thống kê Blog</div>
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-gray-500">
              <th>Blog Title</th>
              <th>Likes</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {mockStats.blogStats.map((b, idx) => (
              <tr key={idx} className="border-b border-gray-500">
                <td>{b.title}</td>
                <td className="text-yellow-500 font-bold">{b.likes}</td>
                <td className="text-pink-500 font-bold">{b.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorHomePage;
