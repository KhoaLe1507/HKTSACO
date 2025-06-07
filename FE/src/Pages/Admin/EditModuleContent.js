import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditModuleContent = () => {
  const { moduleId, modulecontentId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    frequent: 'Very Frequent',
    description: '',
    authorId: '',
    position: 'At the end',
    referenceId: 0,
    htmlFile: null
  });

  const [moduleContents, setModuleContents] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentUser, setCurrentUser] = useState({ userId: 0, role: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser({ userId: parseInt(payload["nameid"]), role: parseInt(payload["role"]) });

      const res = await fetch(`https://localhost:7157/api/roadmap/GetModuleContentDetail/${modulecontentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      setForm(prev => ({
        ...prev,
        title: data.title,
        frequent: data.frequent,
        description: data.description,
        authorId: data.authorId,
        position: 'At the end',
        referenceId: 0
      }));

      const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllModuleContentsByModuleIdDetails/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data2 = await res2.json();
      setModuleContents(data2.filter(c => c.id !== parseInt(modulecontentId)));

      if (parseInt(payload["role"]) === 2) {
        const res3 = await fetch("https://localhost:7157/api/roadmap/GetAllProfessors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data3 = await res3.json();
        setAuthors(data3);
      }
    };

    fetchData();
  }, [moduleId, modulecontentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "referenceId" ? parseInt(value) : value
    }));
  };

  const handleFile = (e) => {
    setForm(prev => ({ ...prev, htmlFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const formData = new FormData();

    formData.append("Title", form.title);
    formData.append("Frequent", form.frequent);
    formData.append("Description", form.description);
    formData.append("ModuleId", moduleId);
    formData.append("Position", form.position);
    formData.append("ReferenceId", form.position === "At the end" ? -1 : form.referenceId);

    if (currentUser.role === 2)
      formData.append("AuthorId", form.authorId);

    if (form.htmlFile)
      formData.append("file", form.htmlFile);

    const res = await fetch(`https://localhost:7157/api/roadmap/EditModuleContent/${modulecontentId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    if (res.ok) {
      alert("✅ Module content updated!");
      if(role == "2" ) navigate(`/admin/module/${moduleId}/contents`);
      else if ( role == "1") navigate(`/admin/my-module-content`);
    } else {
      const msg = await res.text();
      alert("❌ Failed to update: " + msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Edit Module Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50" required />

        <label className="block font-semibold">Frequent</label>
        <select name="frequent" value={form.frequent} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
          <option value="Very Frequent">Very Frequent</option>
          <option value="Frequent">Frequent</option>
          <option value="Rare">Rare</option>
        </select>

        <label className="block font-semibold">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50" />

        <label className="block font-semibold">Upload New HTML File</label>
        <input type="file" accept=".html" onChange={handleFile} className="w-full p-2 rounded border border-gray-300 bg-gray-50" />

        {currentUser.role === 2 && (
          <>
            <label className="block font-semibold">Author</label>
            <select name="authorId" value={form.authorId} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
              <option value="">Select Author</option>
              {authors.map((a) => (
                <option key={a.userId} value={a.userId}>{a.fullName}</option>
              ))}
            </select>
          </>
        )}

        <label className="block font-semibold">Position</label>
        <select name="position" value={form.position} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
          <option value="At the end">At the end</option>
          <option value="Behind">Behind of</option>
          <option value="Front">Front of</option>
        </select>

        {(form.position === "Front" || form.position === "Behind") && (
          <div>
            <label className="block font-semibold">Reference Module Content</label>
            <select name="referenceId" value={form.referenceId} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 bg-gray-50">
              <option value="">Select Content</option>
              {moduleContents.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        )}

        <div className="text-right">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">
            Confirm Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModuleContent;
