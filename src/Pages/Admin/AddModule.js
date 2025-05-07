import React, { useState } from 'react';

const mockModules = [
  { id: 1, name: 'Introduction' },
  { id: 2, name: 'Basic Math' },
  { id: 3, name: 'Sorting' },
  { id: 4, name: 'Graph Theory' },
];

const AddModule = () => {
  const [form, setForm] = useState({
    name: '',
    position: 'end',
    relativeModule: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-black animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Add Module</h2>
      <form className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 rounded border bg-gray-50" required />
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
            <label className="block mb-1 font-semibold">Module:</label>
            <select name="relativeModule" value={form.relativeModule} onChange={handleChange} className="w-full p-2 rounded border bg-gray-50">
              <option value="">Select Module</option>
              {mockModules.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Module</button>
      </form>
    </div>
  );
};

export default AddModule; 