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

      <div className="space-y-4">
        {contents.map((content) => (
          <div
            key={content.id}
            onClick={() => navigate(`/module-content/${content.id}`)} // đến trang chi tiết
            className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 rounded-xl shadow hover:scale-[1.02] transition-transform cursor-pointer relative"
          >
            <div className="absolute top-2 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/admin/module-content/${content.id}/edit`);
                }}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 font-medium text-sm shadow"
              >
                ✏️ Edit
              </button>
            </div>
            <h3 className="text-lg font-bold text-navy">{content.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListModuleContent;
