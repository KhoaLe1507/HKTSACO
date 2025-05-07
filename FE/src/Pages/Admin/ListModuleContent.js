import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockContents = [
  { id: 1, title: 'What is a Graph?', moduleId: 4 },
  { id: 2, title: 'DFS & BFS', moduleId: 4 },
  { id: 3, title: 'Sorting Numbers', moduleId: 3 },
];

const ListModuleContent = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const contents = mockContents.filter(c => c.moduleId === Number(moduleId));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Module Contents in Module {moduleId}</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-all"
          onClick={() => navigate('/admin/module-content/add')}
        >
          Add Module Content
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contents.map((content) => (
          <div
            key={content.id}
            className="flex items-center justify-between p-4 rounded shadow border bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/module-content/${content.id}`)}
          >
            <span className="font-bold text-lg">{content.title}</span>
            <button
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all"
              onClick={e => { e.stopPropagation(); navigate(`/admin/module-content/${content.id}/edit`); }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListModuleContent; 