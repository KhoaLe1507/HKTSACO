import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../../../Components/ui/card";
import { FaBookOpen, FaCode, FaPenNib } from "react-icons/fa";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"];
const MEDAL_ICONS = ["🥇", "🥈", "🥉"];

export default function ProfessorHomePage() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date());

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const startStr = startDate.toISOString();
      const endStr = endDate.toISOString();
      const res = await fetch(`https://localhost:7157/api/statistics/professor-dashboard?startDate=${startStr}&endDate=${endStr}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch professor stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [startDate, endDate]);

  if (!data) return <p className="p-4 text-black">Loading...</p>;

  return (
    <div className="p-6 space-y-6 text-black">
      <div className="flex gap-4">
        <div>
          <label className="font-medium">Start Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border rounded p-2 text-black" />
        </div>
        <div>
          <label className="font-medium">End Date</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="border rounded p-2 text-black" />
        </div>
      </div>

      {/* Statistic summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded-xl p-4 flex items-center gap-4 shadow">
          <FaBookOpen className="text-3xl text-blue-800" />
          <div>
            <p className="text-gray-700 font-semibold">ModuleContents</p>
            <h2 className="text-xl font-bold">{data.moduleContent?.total ?? 0}</h2>
          </div>
        </div>
        <div className="bg-green-100 rounded-xl p-4 flex items-center gap-4 shadow">
          <FaCode className="text-3xl text-green-800" />
          <div>
            <p className="text-gray-700 font-semibold">Problems</p>
            <h2 className="text-xl font-bold">{data.problem?.total ?? 0}</h2>
          </div>
        </div>
        <div className="bg-yellow-100 rounded-xl p-4 flex items-center gap-4 shadow">
          <FaPenNib className="text-3xl text-yellow-800" />
          <div>
            <p className="text-gray-700 font-semibold">Blogs</p>
            <h2 className="text-xl font-bold">{data.blog?.total ?? 0}</h2>
          </div>
        </div>
      </div>

      {/* First row of charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">ModuleContent by Section</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.moduleContent?.bySection ?? []}>
                <XAxis dataKey="section" stroke="#000" />
                <YAxis allowDecimals={false} stroke="#000" />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8">
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">ModuleContent by Frequent</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.moduleContent?.byFrequent ?? []}
                  dataKey="count"
                  nameKey="frequent"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {(data.moduleContent?.byFrequent ?? []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second row of charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Problems by Difficulty</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.problem?.byDifficulty ?? []}>
                <XAxis dataKey="difficulty" stroke="#000" />
                <YAxis allowDecimals={false} stroke="#000" />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d">
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Blog Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.blog?.byStatus ?? []}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {(data.blog?.byStatus ?? []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables for top items */}
      <div className="grid grid-cols-1 gap-6">
        {/* Top Problems */}
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top 3 Problems by Submission</h3>
            <table className="w-full text-left text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Problem Name</th>
                  <th className="p-2">ModuleContent</th>
                  <th className="p-2">Section</th>
                  <th className="p-2">Difficulty</th>
                  <th className="p-2">Submissions</th>
                </tr>
              </thead>
              <tbody>
                {(data.problem?.topProblemsBySubmission ?? []).map((item, index) => (
                  <tr key={item.problemId} className="border-t">
                    <td className="p-2">{MEDAL_ICONS[index] ?? index + 1}</td>
                    <td className="p-2">{item.problemName}</td>
                    <td className="p-2">{item.moduleContentTitle}</td>
                    <td className="p-2">{item.sectionName}</td>
                    <td className="p-2">{item.difficulty}</td>
                    <td className="p-2">{item.submissionCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top ModuleContents */}
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top 3 Recent ModuleContents</h3>
            <table className="w-full text-left text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Module</th>
                  <th className="p-2">Section</th>
                  <th className="p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {(data.moduleContent?.recentModuleContents ?? []).map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-2">{MEDAL_ICONS[index] ?? index + 1}</td>
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">{item.moduleName}</td>
                    <td className="p-2">{item.sectionName}</td>
                    <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top Blogs */}
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top 3 Blogs by Comments</h3>
            <table className="w-full text-left text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Visibility</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {(data.blog?.topBlogsByComment ?? []).map((item, index) => (
                  <tr key={item.blogPostId} className="border-t">
                    <td className="p-2">{MEDAL_ICONS[index] ?? index + 1}</td>
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">{item.visibility}</td>
                    <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">{item.commentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
