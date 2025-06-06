import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditModule = () => {
  const { sectionId, moduleId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    position: 'At the end',
    referenceId: 0,
  });

  const [allModules, setAllModules] = useState([]);

  const mockModules = [
    { id: 1, title: 'Introduction to Graphs' },
    { id: 2, title: 'Sorting Techniques' },
    { id: 3, title: 'Greedy Algorithms' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "referenceId" ? parseInt(value) : value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // 1. Lấy thông tin module hiện tại
        const detailRes = await fetch(`https://localhost:7157/api/roadmap/GetModuleDetail/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const detailData = await detailRes.json();

        setForm(prev => ({
          ...prev,
          name: detailData.name
        }));

        // 2. Lấy danh sách module trong section (trừ chính nó)
        const listRes = await fetch(`https://localhost:7157/api/roadmap/ListAllModulesBySectionIdDetails/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const listData = await listRes.json();

        setAllModules(listData.filter(m => m.id !== parseInt(moduleId)));

      } catch (err) {
        console.error("❌ Failed to load module or modules list:", err);
      }
    };

    fetchData();
  }, [sectionId, moduleId]);


  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const payload = {
        name: form.name,
        sectionId: parseInt(sectionId),
        position: form.position,
        referenceId: form.position === "At the end" ? -1 : form.referenceId
      };

      const res = await fetch(`https://localhost:7157/api/roadmap/EditModule/${moduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Module updated!");
        navigate(`/admin/section/${sectionId}/modules`);
      } else {
        const msg = await res.text();
        alert("❌ Update failed: " + msg);
      }

    } catch (err) {
      console.error("❌ Error submitting:", err);
      alert("❌ Unexpected error occurred.");
    }
  };


  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold text-navy mb-6">Edit Module</h2>

      {/* Name input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter module name"
          required
        />
      </div>

      {/* Position dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Position</label>
        <select
          name="position"
          value={form.position}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="At the end">At the end</option>
          <option value="Behind">Behind of</option>
          <option value="Front">Front of</option>
        </select>
      </div>

      {/* Conditional dropdown if Behind/Front */}
      {(form.position === 'Behind' || form.position === 'Front') && (
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Reference Module</label>
          <select
            name="referenceId"
            value={form.referenceId}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Module</option>
            {allModules
              .filter(m => m.id !== parseInt(moduleId)) // loại bỏ chính module đang edit
              .map(module => (
                <option key={module.id} value={module.id}>{module.name}</option>
              ))}
          </select>
        </div>
      )}

      {/* Save button */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );

};

export default EditModule;
