import React, { useState } from 'react';

const EditModule = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('end');
  const [selectedModule, setSelectedModule] = useState('');

  const mockModules = [
    { id: 1, title: 'Introduction to Graphs' },
    { id: 2, title: 'Sorting Techniques' },
    { id: 3, title: 'Greedy Algorithms' },
  ];

  const handleSave = () => {
    alert("Module saved (UI only).");
    // Hoặc console.log({ name, position, selectedModule });
  };

  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold text-navy mb-6">Edit Module</h2>

      {/* Name input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter module name"
        />
      </div>

      {/* Position dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Position</label>
        <select
          value={position}
          onChange={e => setPosition(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="end">At the end</option>
          <option value="behind">Behind of</option>
          <option value="front">Front of</option>
        </select>
      </div>

      {/* Conditional dropdown if behind/front */}
      {(position === 'behind' || position === 'front') && (
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Module</label>
          <select
            value={selectedModule}
            onChange={e => setSelectedModule(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Module</option>
            {mockModules.map(module => (
              <option key={module.id} value={module.id}>{module.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Save button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all font-semibold"
        >
           Save
        </button>
      </div>
    </div>
  );
};

export default EditModule;
