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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Module added: ${form.name}`);
    setForm({ name: '', position: 'end', relativeModule: '' });
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
            className="w-full p-2 rounded border bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Position</label>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-gray-50"
          >
            <option value="end">At the end</option>
            <option value="behind">Behind of</option>
            <option value="front">Front of</option>
          </select>
        </div>

        {(form.position === 'behind' || form.position === 'front') && (
          <div>
            <label className="block font-semibold mb-1">Reference Module</label>
            <select
              name="relativeModule"
              value={form.relativeModule}
              onChange={handleChange}
              className="w-full p-2 rounded border bg-gray-50"
              required
            >
              <option value="">Choose module</option>
              {mockModules.map((m) => (
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
