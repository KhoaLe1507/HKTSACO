import React, { useState, useEffect } from 'react';




const AddSection = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    position: 'At the end',
    referenceId: 0
  });

  const [allSections, setAllSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("https://localhost:7157/api/roadmap/ListAllSectionsDetails", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setAllSections(data);
      } catch (err) {
        console.error("❌ Failed to load sections:", err);
      }
    };

    fetchSections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        name: form.name,
        description: form.description,
        position: form.position,
        referenceId: parseInt(form.referenceId) || 0
      };

      const res = await fetch("https://localhost:7157/api/roadmap/AddSection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Section added successfully!");
      } else {
        const msg = await res.text();
        alert("❌ Failed to add section: " + msg);
      }
    } catch (err) {
      console.error("Add section error:", err);
      alert("❌ Error adding section.");
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Add Learning Path</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          required
        />

        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 rounded border border-gray-300 bg-gray-50"
        />

        <div>
          <label className="block mb-1 font-semibold">Position</label>
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
            <label className="block mb-1 font-semibold">Learning Path:</label>
            <select
              name="referenceId"
              value={form.referenceId}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-gray-50"
            >
              <option value="">Select Section</option>
              {allSections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Section
        </button>
      </form>
    </div>
  );

};

export default AddSection; 