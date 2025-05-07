import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockModules = [
  { id: 1, name: 'Introduction', sectionId: 1 },
  { id: 2, name: 'Basic Math', sectionId: 1 },
  { id: 3, name: 'Sorting', sectionId: 1 },
  { id: 4, name: 'Graph Theory', sectionId: 2 },
];

const ListModule = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const modules = mockModules.filter(m => m.sectionId === Number(sectionId));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Modules in Section {sectionId}</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-all"
          onClick={() => navigate('/admin/module/add')}
        >
          Add Module
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between p-4 rounded shadow border bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/admin/module/${module.id}/contents`)}
          >
            <span className="font-bold text-lg">{module.name}</span>
            <button
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all"
              onClick={e => { e.stopPropagation(); navigate(`/admin/module/${module.id}/edit`); }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListModule; 