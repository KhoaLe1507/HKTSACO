import React, { useState } from 'react';

const mockSections = [
  { id: 1, name: 'Bronze' },
  { id: 2, name: 'Silver' },
  { id: 3, name: 'Gold' },
  { id: 4, name: 'Platinum' },
];

const AddSection = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    position: 'end',
    relativeSection: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Add Section</h2>
      <form className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 rounded border bg-gray-50" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded border bg-gray-50" />
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
            <label className="block mb-1 font-semibold">Section:</label>
            <select name="relativeSection" value={form.relativeSection} onChange={handleChange} className="w-full p-2 rounded border bg-gray-50">
              <option value="">Select Section</option>
              {mockSections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Section</button>
      </form>
    </div>
  );
};

export default AddSection; 