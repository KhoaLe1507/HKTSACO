import React, { useState } from 'react';

const mockBlogs = [
  { id: 1, title: 'Tư duy Greedy', author: 'Khoa Le', isMine: true },
  { id: 2, title: 'Sắp xếp & thời gian', author: 'admin', isMine: false },
  { id: 3, title: 'Dynamic Programming', author: 'Khoano1', isMine: true },
];

const AllBlog = () => {
  const [showMine, setShowMine] = useState(false);
  const blogs = showMine ? mockBlogs.filter(b => b.isMine) : mockBlogs;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Blogs</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-all">Add Blog</button>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input type="checkbox" id="myblog" checked={showMine} onChange={() => setShowMine(v => !v)} />
        <label htmlFor="myblog" className="font-semibold">My Blog</label>
      </div>
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="p-4 rounded shadow border flex justify-between items-center bg-gray-50">
            <div>
              <div className="font-bold text-lg">{blog.title}</div>
              <div className="text-sm text-gray-600">By: {blog.author}</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 transition-all">Details</button>
              <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlog; 