import React, { useState } from "react";
import blogs from "../Data/BlogsData";

const BlogsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortBy, setSortBy] = useState("Top Views");

  const filteredBlogs = blogs
    .filter((b) =>
      b.content.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((b) => !filterDate || b.date >= filterDate)
    .filter((b) => !filterRole || b.role === filterRole)
    .sort((a, b) => {
      if (sortBy === "Latest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "Top Views") return b.views - a.views;
      return 0;
    });

  return (
    <div className="text-white px-4 py-6 max-w-2xl mx-auto">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full text-black text-lg px-4 py-3 mb-4 rounded"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="text-black px-4 py-2 rounded w-full sm:w-auto"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          <option value="">All Roles</option>
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Admin">Admin</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-black px-4 py-2 rounded w-full sm:w-auto"
        >
          <option value="Top Views">Top Views</option>
          <option value="Latest">Latest</option>
        </select>
      </div>

      {/* Blog list */}
      <div className="space-y-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[#1e293b] p-4 rounded shadow-md hover:shadow-lg transition"
          >
            {/* Header: Avatar + Author */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {blog.author[0]}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{blog.author}</div>
                <div className="text-sm text-gray-400">
                  {blog.role} • {blog.date}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="mb-3">{blog.content}</p>

            {/* Image */}
            <img
              src={blog.image}
              alt="Blog visual"
              className="rounded w-full object-cover mb-3"
            />

            {/* View Count */}
            <div className="text-sm text-gray-400">
              👁 {blog.views ? blog.views.toLocaleString() : "0"} views
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
