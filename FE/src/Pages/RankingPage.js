import React, { useState, useEffect } from "react";
import Section from "../Components/Section";
import { useNavigate } from "react-router-dom";

const RankingPage = () => {
  const [activeTab, setActiveTab] = useState("Student");
  const [searchUser, setSearchUser] = useState("");
  const [searchSchool, setSearchSchool] = useState("");
  const [rankingData, setRankingData] = useState([]);
  const navigate = useNavigate();

  const currentUserId = parseInt(localStorage.getItem("userId"));
  const currentUserRole = parseInt(localStorage.getItem("role"));

  useEffect(() => {
    const fetchRanking = async () => {
      const token = localStorage.getItem("accessToken");
      const apiUrl =
        activeTab === "Student"
          ? "https://localhost:7157/api/auth/ranking/students"
          : "https://localhost:7157/api/auth/ranking/professors";

      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRankingData(data);
    };

    fetchRanking();
  }, [activeTab]);

  const filteredData = rankingData
    .filter(
      (r) =>
        r.userName.toLowerCase().includes(searchUser.toLowerCase()) ||
        r.fullName.toLowerCase().includes(searchUser.toLowerCase())
    )
    .filter((r) =>
      (r.school || "").toLowerCase().includes(searchSchool.toLowerCase())
    );

  return (
    <Section title="Ranking" className="bg-white text-black px-4 py-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {["Student", "Professor"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-semibold border ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Username or Full Name"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64"
        />
        <input
          type="text"
          placeholder="Search School"
          value={searchSchool}
          onChange={(e) => setSearchSchool(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64"
        />
        {[0, 1].includes(currentUserRole) && (
          <button
            onClick={() => {
              const el = document.getElementById("my-rank");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            View My Rank
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Rank</th>
              <th className="px-3 py-2 text-left">Username</th>
              <th className="px-3 py-2 text-left">Full Name</th>
              <th className="px-3 py-2 text-left">School</th>
              <th className="px-3 py-2 text-left">
                {activeTab === "Student" ? "Problem Solved" : "Problem Created"}
              </th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => {
              const isCurrentUser = user.userId === currentUserId;
              const rankIcon =
                index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : index + 1;

              return (
                <tr
                  key={user.userId}
                  id={isCurrentUser ? "my-rank" : undefined}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    isCurrentUser ? "bg-yellow-100 font-semibold" : ""
                  }`}
                >
                  <td className="px-3 py-2">{rankIcon}</td>
                  <td className="px-3 py-2">{user.userName}</td>
                  <td className="px-3 py-2">{user.fullName}</td>
                  <td className="px-3 py-2">{user.school || "N/A"}</td>
                  <td className="px-3 py-2">
                    {activeTab === "Student"
                      ? user.problemSolved
                      : user.problemCreated}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/profile/${user.userId}`)}
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default RankingPage;
