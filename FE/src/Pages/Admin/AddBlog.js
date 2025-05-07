import React, { useState } from 'react';

const AddBlog = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    tag: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Blog submitted (demo)');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded border bg-gray-50" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="w-full p-2 rounded border bg-gray-50" rows={6} required />
        <input name="tag" value={form.tag} onChange={handleChange} placeholder="Tag" className="w-full p-2 rounded border bg-gray-50" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog; 