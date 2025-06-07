import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../../../Components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"];

export default function ProfessorHomePage() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1)); // Jan 1st
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
      console.log("✅ API response:", json);
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

      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div>
            <h3 className="font-bold text-lg">Total ModuleContents</h3>
            <p>{data.moduleContent?.total ?? 0}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Total Problems</h3>
            <p>{data.problem?.total ?? 0}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Total Blogs</h3>
            <p>{data.blog?.total ?? 0}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">ModuleContent by Section</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.moduleContent?.bySection ?? []}>
              <XAxis dataKey="section" stroke="#000" />
              <YAxis allowDecimals={false} stroke="#000" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">ModuleContent by Frequent</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.moduleContent?.byFrequent ?? []} dataKey="count" nameKey="frequent" cx="50%" cy="50%" outerRadius={100} label>
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

      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">Problems by Difficulty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.problem?.byDifficulty ?? []}>
              <XAxis dataKey="difficulty" stroke="#000" />
              <YAxis allowDecimals={false} stroke="#000" />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">Blog Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.blog?.byStatus ?? []} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} label>
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
  );
}
