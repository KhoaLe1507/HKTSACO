import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaCode, FaChalkboardTeacher } from "react-icons/fa";
import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, ResponsiveContainer, Legend, LabelList
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../../Components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"];



export default function AdminHomePage() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const startStr = startDate.toISOString();
        const endStr = endDate.toISOString();
        const res = await fetch(`https://localhost:7157/api/statistics/admin-dashboard?startDate=${startStr}&endDate=${endStr}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch admin dashboard stats:", err);
      }
    };
    fetchStats();
  }, [startDate, endDate]);

  if (!data) return <p className="p-4 text-black">Loading...</p>;

  return (
    <div className="p-6 space-y-6 text-black">
      {/* Date filter */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="bg-blue-100">
            <CardContent className="flex items-center gap-4">
              <FaUsers className="text-3xl text-blue-800" />
              <div>
                <h3 className="text-blue-800 font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">{data.user?.total ?? 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-100">
            <CardContent className="flex items-center gap-4">
              <FaBook className="text-3xl text-green-800" />
              <div>
                <h3 className="text-green-800 font-semibold">Total Blogs</h3>
                <p className="text-2xl font-bold">{data.blog?.total ?? 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100">
            <CardContent className="flex items-center gap-4">
              <FaCode className="text-3xl text-purple-800" />
              <div>
                <h3 className="text-purple-800 font-semibold">Total Problems</h3>
                <p className="text-2xl font-bold">{data.problem?.total ?? 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100">
            <CardContent className="flex items-center gap-4">
              <FaChalkboardTeacher className="text-3xl text-yellow-800" />
              <div>
                <h3 className="text-yellow-800 font-semibold">Total Lessons</h3>
                <p className="text-2xl font-bold">{data.learning?.totalModuleContents ?? 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* I. User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">User Role Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.user?.byRole ?? []} dataKey="count" nameKey="role" cx="50%" cy="50%" outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}>
                  {(data.user?.byRole ?? []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">New Users Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.user?.usersOverTime ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#000" />
                <YAxis allowDecimals={false} stroke="#000" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top Students by Problem Solved</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={data.user?.topStudents ?? []}>
                <XAxis type="number" stroke="#000" />
                <YAxis dataKey="fullName" type="category" stroke="#000" />
                <Tooltip />
                <Bar dataKey="problemSolved" fill="#82ca9d">
                  <LabelList dataKey="problemSolved" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top Professors by Problem Created</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={data.user?.topProfessors ?? []}>
                <XAxis type="number" stroke="#000" />
                <YAxis dataKey="fullName" type="category" stroke="#000" />
                <Tooltip />
                <Bar dataKey="problemCreated" fill="#ffc658">
                  <LabelList dataKey="problemCreated" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* II. Blog Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Blog Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.blog?.blogByStatus ?? []} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}>
                  {(data.blog?.blogByStatus ?? []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top Blog Authors</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.blog?.topBloggers ?? []}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis allowDecimals={false} stroke="#000" />
                <Tooltip />
                <Bar dataKey="count" fill="#8dd1e1">
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">Top Blogs by Comment Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.blog?.commentByBlog ?? []}>
              <XAxis dataKey="blogTitle" stroke="#000" />
              <YAxis allowDecimals={false} stroke="#000" />
              <Tooltip />
              <Bar dataKey="count" fill="#ff8042">
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* III. Problem Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Problem Difficulty Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.problem?.problemByDifficulty ?? []} dataKey="count" nameKey="difficulty" cx="50%" cy="50%" outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}>
                  {(data.problem?.problemByDifficulty ?? []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Top Problems by Submission Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.problem?.topProblems ?? []}>
                <XAxis dataKey="problemName" stroke="#000" />
                <YAxis allowDecimals={false} stroke="#000" />
                <Tooltip />
                <Bar dataKey="count" fill="#a4de6c">
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Submission Result Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.problem?.judgeDistribution ?? []} dataKey="count" nameKey="result" cx="50%" cy="50%" outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}>
                  {(data.problem?.judgeDistribution ?? []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Submissions Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.problem?.submissionOverTime ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#000" />
                <YAxis allowDecimals={false} stroke="#000" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#d88484" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* IV. Learning Path Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Lessons by Section</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.learning?.lessonBySection ?? []}>
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
            <h3 className="font-semibold mb-2">Lessons by Frequent Level</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.learning?.lessonByFrequent ?? []} dataKey="count" nameKey="frequent" cx="50%" cy="50%" outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}>
                  {(data.learning?.lessonByFrequent ?? []).map((_, index) => (
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

      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">Top Authors by Lesson Created</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.learning?.topAuthors ?? []}>
              <XAxis dataKey="author" stroke="#000" />
              <YAxis allowDecimals={false} stroke="#000" />
              <Tooltip />
              <Bar dataKey="count" fill="#d0ed57">
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
