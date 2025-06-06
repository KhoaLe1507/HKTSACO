import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockContents = [
  { id: 1, title: 'What is a Graph?', moduleId: 4 },
  { id: 2, title: 'DFS & BFS', moduleId: 4 },
  { id: 3, title: 'Sorting Numbers', moduleId: 3 },
];

const ListModuleContent = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const [contents, setContents] = useState([]);
  const [moduleName, setModuleName] = useState('');
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Lấy thông tin Module (bao gồm cả SectionId)
        const res1 = await fetch(`https://localhost:7157/api/roadmap/GetModuleDetail/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data1 = await res1.json();
        setModuleName(data1.name);

        // 👉 Gọi thêm để lấy Section Name từ SectionId
        const resSec = await fetch(`https://localhost:7157/api/roadmap/GetSectionDetail/${data1.sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataSec = await resSec.json();
        setSectionName(dataSec.name); // cần khai báo useState sectionName

        // Lấy danh sách ModuleContent
        const res2 = await fetch(`https://localhost:7157/api/roadmap/ListAllModuleContentsByModuleIdDetails/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data2 = await res2.json();
        setContents(data2);
      } catch (err) {
        console.error("❌ Failed to load module or contents:", err);
      }
    };

    fetchData();
  }, [moduleId]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module content?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://localhost:7157/api/roadmap/DeleteModuleContent/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setContents(prev => prev.filter(c => c.id !== id));
        alert("✅ Deleted successfully.");
      } else {
        const msg = await res.text();
        alert("❌ Failed to delete: " + msg);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Error deleting content.");
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Module Contents in {moduleName}</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-all"
          onClick={() => navigate(`/admin/module-content/${moduleId}/add`)}
        >
          ➕ Add Module Content
        </button>
      </div>

      <div className="space-y-4">
        {contents.map((content) => (
          <div
            key={content.id}
            className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-navy">{content.title}</h3>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/module/${moduleId}/module-content/${content.id}/edit`)}
                className="bg-white border px-3 py-1 rounded shadow text-sm flex items-center gap-1"
              >
                📝 Edit
              </button>
              <button
                onClick={() => navigate(`/admin/section/${sectionName.toLowerCase()}/module-content/${content.id}/detail`)}
                className="bg-white border px-3 py-1 rounded shadow text-sm text-blue-600 flex items-center gap-1"
              > 
                🔍 Detail
              </button>
              <button
                onClick={() => handleDelete(content.id)}
                className="bg-white border px-3 py-1 rounded shadow text-sm text-red-600 flex items-center gap-1"
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

export default ListModuleContent;
