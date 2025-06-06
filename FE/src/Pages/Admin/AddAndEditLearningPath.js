import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const AddAndEditLearningPath = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("https://localhost:7157/api/roadmap/ListAllSectionsDetails", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch sections");
        const data = await res.json();
        setSections(data);
        const colorMap = {
          Bronze: 'from-yellow-500 to-amber-600',
          Silver: 'from-gray-300 to-gray-400',
          Gold: 'from-yellow-400 to-yellow-500',
          Platinum: 'from-blue-300 to-blue-500',
        };

        const enhanced = data.map(s => ({
          ...s,
          color: colorMap[s.name] || 'from-gray-200 to-gray-300' // fallback nếu không khớp
        }));
        setSections(enhanced);
      } catch (error) {
        console.error("❌ Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://localhost:7157/api/roadmap/DeleteSection/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSections(prev => prev.filter(sec => sec.id !== id));
        alert("✅ Section deleted successfully!");
      } else {
        const errorText = await res.text();
        alert("❌ Failed to delete section: " + errorText);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Error deleting section.");
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
