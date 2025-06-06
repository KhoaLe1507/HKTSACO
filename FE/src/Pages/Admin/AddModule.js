import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockModules = [
  { id: 1, name: 'Introduction' },
  { id: 2, name: 'Basic Math' },
  { id: 3, name: 'Sorting' },
  { id: 4, name: 'Graph Theory' },
];

const AddModule = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    position: 'At the end',
    referenceId: 0
  });

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`https://localhost:7157/api/roadmap/ListAllModulesBySectionIdDetails/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setAllModules(data);
      } catch (err) {
        console.error("❌ Failed to load modules:", err);
      }
    };

    fetchModules();
  }, [sectionId]);


  const [allModules, setAllModules] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "referenceId" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        name: form.name,
        sectionId: parseInt(sectionId),
        position: form.position,
        referenceId: form.position === "At the end" ? -1 : parseInt(form.referenceId)
      };

      const res = await fetch("https://localhost:7157/api/roadmap/AddModule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Module added successfully!");
        navigate(`/admin/section/${sectionId}/modules`);
      } else {
        const msg = await res.text();
        alert("❌ Failed to add module: " + msg);
      }
    } catch (err) {
      console.error("❌ Add module error:", err);
      alert("❌ Unexpected error.");
    }
  };


  return (
    <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Add New Module</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Module Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter module name"
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Position</label>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          >
            <option value="At the end">At the end</option>
            <option value="Behind">Behind of</option>
            <option value="Front">Front of</option>
          </select>
        </div>

        {(form.position === 'Behind' || form.position === 'Front') && (
          <div>
            <label className="block font-semibold mb-1">Reference Module</label>
            <select
              name="referenceId"
              value={form.referenceId}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-gray-50"
              required
            >
              <option value="">Choose module</option>
              {allModules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );

};

export default AddModule;
