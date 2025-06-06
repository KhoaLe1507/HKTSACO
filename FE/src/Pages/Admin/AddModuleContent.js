import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddModuleContent = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    frequent: 'Very Frequent',
    description: '',
    htmlFile: null,
    authorId: '',
    position: 'At the end',
    referenceId: 0,
  });

  const [authors, setAuthors] = useState([]);
  const [moduleContents, setModuleContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Get all professors
        const res1 = await fetch("https://localhost:7157/api/roadmap/GetAllProfessors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data1 = await res1.json();
        setAuthors(data1);

        // Get contents in the same module (for Front/Behind)
        const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllModuleContentsByModuleIdDetails/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data2 = await res2.json();
        setModuleContents(data2);
      } catch (err) {
        console.error("❌ Error loading data:", err);
      }
    };

    fetchData();
  }, [moduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "referenceId" ? parseInt(value) : value
    }));
  };

  const handleFile = (e) => {
    setForm(prev => ({
      ...prev,
      htmlFile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.htmlFile) {
      alert("❗ Please upload a .html file.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("Title", form.title);
      formData.append("Frequent", form.frequent);
      formData.append("Description", form.description);
      formData.append("file", form.htmlFile);
      formData.append("AuthorId", form.authorId);
      formData.append("ModuleId", moduleId);
      formData.append("Position", form.position);
      formData.append("ReferenceId", form.position === "At the end" ? -1 : form.referenceId);

      const res = await fetch("https://localhost:7157/api/roadmap/AddModuleContent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        alert("✅ Module content added successfully!");
        navigate(`/admin/module/${moduleId}/contents`);
      } else {
        const msg = await res.text();
        alert("❌ Failed to add: " + msg);
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("❌ Unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Add Module Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">Title</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded border border-gray-300 bg-gray-50" required />

        <label className="block font-semibold">Frequent</label>
        <select name="frequent" value={form.frequent} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
          <option value="Very Frequent">Very Frequent</option>
          <option value="Frequent">Frequent</option>
          <option value="Rare">Rare</option>
        </select>

        <label className="block font-semibold">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded border border-gray-300 bg-gray-50" />

        <label className="block font-semibold">Upload HTML File</label>
        <input type="file" accept=".html" onChange={handleFile} className="w-full p-2 rounded border border-gray-300 bg-gray-50" required />

        <label className="block font-semibold">Author</label>
        <select name="authorId" value={form.authorId} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50" required>
          <option value="">Select Author</option>
          {authors.map(a => <option key={a.userId} value={a.userId}>{a.fullName}</option>)}
        </select>

        <label className="block font-semibold">Position</label>
        <select name="position" value={form.position} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
          <option value="At the end">At the end</option>
          <option value="Behind">Behind of</option>
          <option value="Front">Front of</option>
        </select>

        {(form.position === 'Front' || form.position === 'Behind') && (
          <div>
            <label className="block font-semibold">Reference Module Content</label>
            <select name="referenceId" value={form.referenceId} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
              <option value="">Select Content</option>
              {moduleContents.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
        )}

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Module Content</button>
      </form>
    </div>
  );
};

export default AddModuleContent;
