import React, { useState } from "react";
import Section from "../Components/Section";
import rankingData from "../Data/RankingData";

const RankingPage = () => {
  const [activeTab, setActiveTab] = useState("Student");
  const [searchUser, setSearchUser] = useState("");
  const [searchSchool, setSearchSchool] = useState("");

  const filteredData = rankingData
    .filter((r) => r.role === activeTab)
    .filter(
      (r) =>
        r.username.toLowerCase().includes(searchUser.toLowerCase()) ||
        r.fullName.toLowerCase().includes(searchUser.toLowerCase())
    )
    .filter((r) =>
      r.school.toLowerCase().includes(searchSchool.toLowerCase())
    )
    .sort((a, b) => {
      if (activeTab === "Student")
        return b.problemSolved - a.problemSolved;
      return b.problemCreated - a.problemCreated;
    });

  return (
    <Section title="Ranking" className="bg-[#0f1f3b] text-white px-4 py-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {["Student", "Professor"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-white text-black" : "bg-gray-700"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Username or Full Name"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="text-black px-3 py-1.5 text-sm rounded w-full sm:w-64"
        />
        <input
          type="text"
          placeholder="Search School"
          value={searchSchool}
          onChange={(e) => setSearchSchool(e.target.value)}
          className="text-black px-3 py-1.5 text-sm rounded w-full sm:w-64"
        />
        <button
          onClick={() => {
            const element = document.getElementById("my-rank");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          View My Rank
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">Username</th>
              <th className="px-3 py-2">Full Name</th>
              <th className="px-3 py-2">School</th>
              <th className="px-3 py-2">
                {activeTab === "Student" ? "Problem Solved" : "Problem Created"}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => {
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
                  key={user.username}
                  id={user.username === "my_account" ? "my-rank" : undefined}
                  className="border-b border-gray-600 hover:bg-gray-700"
                >
                  <td className="px-3 py-2">{rankIcon}</td>
                  <td className="px-3 py-2">{user.username}</td>
                  <td className="px-3 py-2">{user.fullName}</td>
                  <td className="px-3 py-2">{user.school}</td>
                  <td className="px-3 py-2">
                    {activeTab === "Student"
                      ? user.problemSolved
                      : user.problemCreated}
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
