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
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Module Contents in Module {moduleId}</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-all"
          onClick={() => navigate('/admin/module-content/add')}
        >
          ➕ Add Module Content
        </button>
      </div>

      {/* Danh sách module content */}
      <div className="space-y-4">
        {contents.map((content) => (
          <div
            key={content.id}
            className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 rounded-xl shadow flex justify-between items-center"
          >
            {/* Tiêu đề module content */}
            <div>
              <h3 className="text-lg font-bold text-navy">{content.title}</h3>
            </div>

            {/* Nút thao tác */}
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/module-content/${content.id}/edit`)}
                className="bg-white border px-3 py-1 rounded shadow text-sm flex items-center gap-1"
              >
                <span role="img" aria-label="edit">📝</span> Edit
              </button>
              <button
                onClick={() => navigate(`/learn/${content.level}/module/${content.key}`)}
                className="bg-white border px-3 py-1 rounded shadow text-sm text-blue-600 flex items-center gap-1"
              >
                <span role="img" aria-label="detail">🔍</span> Detail
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this module content?")) {
                    alert(`Deleted content ${content.id}`);
                  }
                }}
                className="bg-white border px-3 py-1 rounded shadow text-sm text-red-600 flex items-center gap-1"
              >
                <span role="img" aria-label="delete">🗑️</span> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListModuleContent;
