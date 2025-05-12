import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialSections = [
  { name: 'Bronze', color: 'from-yellow-400 to-yellow-500', id: 1 },
  { name: 'Silver', color: 'from-gray-300 to-gray-400', id: 2 },
  { name: 'Gold', color: 'from-yellow-500 to-amber-600', id: 3 },
  { name: 'Platinum', color: 'from-blue-300 to-blue-500', id: 4 },
];

const AddAndEditLearningPath = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState(initialSections);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setSections(prev => prev.filter(sec => sec.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">List Sections</h2>
        <button
          onClick={() => navigate('/admin/section/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all font-semibold"
        >
          ➕ Add Section
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center justify-between">
            {/* Màu section */}
            <div
              className={`bg-gradient-to-r ${section.color} px-6 py-4 rounded-xl shadow-md w-full`}
            >
              <h3 className="text-xl font-bold text-white drop-shadow">{section.name}</h3>
            </div>

            {/* Nút điều khiển */}
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => navigate(`/admin/section/${section.id}/edit`)}
                className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-gray-100 text-sm font-medium shadow"
              >
                📝 Edit
              </button>
              <button
                onClick={() => navigate(`/admin/section/${section.id}/modules`)}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 text-sm font-medium shadow"
              >
                🔍 Detail
              </button>
              <button
                onClick={() => handleDelete(section.id)}
                className="bg-white text-red-600 px-3 py-1 rounded hover:bg-red-100 text-sm font-medium shadow"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAndEditLearningPath;
