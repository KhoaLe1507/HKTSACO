import React, { useState } from 'react';

const mockAuthors = [
  { id: 1, name: 'Prof. An' },
  { id: 2, name: 'Prof. Binh' },
  { id: 3, name: 'Prof. Cuong' },
];
const mockContents = [
  {
    id: 1,
    title: 'What is a Graph?',
    moduleId: 4,
    level: 'bronze',
    key: 'graph-intro',
  },
  {
    id: 2,
    title: 'DFS & BFS',
    moduleId: 4,
    level: 'bronze',
    key: 'dfs-bfs',
  }
];


const AddModuleContent = () => {
  const [form, setForm] = useState({
    title: '',
    frequent: 'Very Frequent',
    description: '',
    htmlContentPath: '',
    authorId: '',
    position: 'end',
    relativeContent: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Add Module Content</h2>
      <form className="space-y-4">
      <label className="block mb-1 font-semibold">Title</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded border bg-gray-50" required />
        <div>
          <label className="block mb-1 font-semibold">Frequent</label>
          <select name="frequent" value={form.frequent} onChange={handleChange} className="w-full p-2 rounded border bg-gray-50">
            <option value="Very Frequent">Very Frequent</option>
            <option value="Frequent">Frequent</option>
            <option value="Rare">Rare</option>
          </select>
        </div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded border bg-gray-50" />
        <label className="block mb-1 font-semibold">HtmlContentPath</label>
        <input name="htmlContentPath" value={form.htmlContentPath} onChange={handleChange} placeholder="HtmlContentPath" className="w-full p-2 rounded border bg-gray-50" />
        <div>
          <label className="block mb-1 font-semibold">Author</label>
          <select name="authorId" value={form.authorId} onChange={handleChange} className="w-full p-2 rounded border bg-gray-50">
            <option value="">Select Author</option>
            {mockAuthors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Position</label>
          <select name="position" value={form.position} onChange={handleChange} className="w-full p-2 rounded border bg-gray-50">
            <option value="end">At the end</option>
            <option value="behind">Behind of</option>
            <option value="front">Front of</option>
          </select>
        </div>
        {(form.position === 'behind' || form.position === 'front') && (
          <div>
            <label className="block mb-1 font-semibold">ModuleContent:</label>
            <select name="relativeContent" value={form.relativeContent} onChange={handleChange} className="w-full p-2 rounded border bg-gray-50">
              <option value="">Select ModuleContent</option>
              {mockContents.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Module Content</button>
      </form>
    </div>
  );
};

export default AddModuleContent; 