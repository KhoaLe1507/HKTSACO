import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const mockSections = [
  { id: 1, name: 'Bronze' },
  { id: 2, name: 'Silver' },
  { id: 3, name: 'Gold' },
  { id: 4, name: 'Platinum' },
];

const EditSection = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    position: '',
    referenceId: 0
  });
  const [allSections, setAllSections] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const res1 = await fetch(`https://localhost:7157/api/roadmap/GetSectionDetail/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data1 = await res1.json();

        const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllSectionsDetails`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data2 = await res2.json();

        setForm({
          name: data1.name,
          description: data1.description,
          position: "At the end", // default
          referenceId: 0
        });

        // Remove chính nó khỏi dropdown
        setAllSections(data2.filter(s => s.id !== parseInt(id)));
      } catch (err) {
        console.error("❌ Error loading section:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        name: form.name,
        description: form.description,
        position: form.position,
        referenceId: form.position === "At the end" ? -1 : parseInt(form.referenceId)
      };

      const res = await fetch(`https://localhost:7157/api/roadmap/EditSection/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Section updated!");
        navigate('/admin/learning-path/add-edit');
      } else {
        const msg = await res.text();
        alert("❌ Update failed: " + msg);
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("❌ Error submitting.");
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Edit Section</h2>
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
            <label className="block mb-1 font-semibold">Section:</label>
            <select
              name="referenceId"
              value={form.referenceId}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-gray-50"
            >
              <option value="">Select Section</option>
              {allSections.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );

};

export default EditSection; 