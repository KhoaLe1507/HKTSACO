import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const initialModules = [
  { id: 1, name: 'Introduction', sectionId: 1 },
  { id: 2, name: 'Basic Math', sectionId: 1 },
  { id: 3, name: 'Sorting', sectionId: 1 },
  { id: 4, name: 'Graph Theory', sectionId: 2 },
];

const ListModule = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const [modules, setModules] = useState(
    initialModules.filter((m) => m.sectionId === Number(sectionId))
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      setModules((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Modules in Section {sectionId}</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-all"
          onClick={() => navigate('/admin/module/add')}
        >
          ➕ Add Module
        </button>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center justify-between">
            {/* Module name */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 rounded-xl shadow-md w-full">
              <h3 className="text-lg font-bold text-navy">{module.name}</h3>
            </div>

            {/* Action buttons */}
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => navigate(`/admin/module/${module.id}/edit`)}
                className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-gray-100 text-sm font-medium shadow"
              >
                📝 Edit
              </button>
              <button
                onClick={() => navigate(`/admin/module/${module.id}/contents`)}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 text-sm font-medium shadow"
              >
                🔍 Detail
              </button>
              <button
                onClick={() => handleDelete(module.id)}
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

export default ListModule;
