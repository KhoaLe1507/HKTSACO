import React from 'react';
import { useNavigate } from 'react-router-dom';

const sections = [
  { name: 'Bronze', color: 'bg-yellow-400', id: 1 },
  { name: 'Silver', color: 'bg-gray-300', id: 2 },
  { name: 'Gold', color: 'bg-yellow-600', id: 3 },
  { name: 'Platinum', color: 'bg-blue-300', id: 4 },
];

const AddAndEditLearningPath = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">List Sections</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-all"
          onClick={() => navigate('/admin/section/add')}
        >
          Add Section
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.name}
            className={`flex items-center justify-between p-4 rounded shadow border ${section.color} cursor-pointer`}
            onClick={() => navigate(`/admin/section/${section.id}/modules`)}
          >
            <span className="font-bold text-lg">{section.name}</span>
            <button
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all"
              onClick={e => { e.stopPropagation(); navigate(`/admin/section/${section.id}/edit`); }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAndEditLearningPath; 