
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";



const EditMyModuleContent = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");

  const [myContents, setMyContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("https://localhost:7157/api/roadmap/ListMyModuleContents", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setMyContents(data);
      } catch (err) {
        console.error("Failed to fetch module contents:", err);
      }
    };

    fetchData();
  }, []);


  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6 text-black">📝 My Module Contents</h1>

    {/* Bộ lọc */}
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="🔍 Search by Section / Module / Content"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded w-full text-black"
      />
      <input
        type="date"
        value={createdAfter}
        onChange={(e) => setCreatedAfter(e.target.value)}
        className="border p-2 rounded w-full text-black"
      />
    </div>

    {/* Bảng dữ liệu */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-black border rounded shadow">
        <thead className="bg-black text-white">
          <tr>
            <th className="text-left px-4 py-2 border">Section</th>
            <th className="text-left px-4 py-2 border">Module</th>
            <th className="text-left px-4 py-2 border">Module Content</th>
            <th className="text-left px-4 py-2 border">Created At</th>
            <th className="text-left px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myContents
            .filter((item) => {
              const combined = `${item.sectionName} ${item.moduleName} ${item.content}`.toLowerCase();
              const matchText = combined.includes(searchText.toLowerCase());

              const matchDate = createdAfter
                ? new Date(item.createdAt) >= new Date(createdAfter)
                : true;

              return matchText && matchDate;
            })
            .map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 text-black">
                <td className="border px-4 py-2 text-black">{item.sectionName}</td>
                <td className="border px-4 py-2 text-black">{item.moduleName}</td>
                <td className="border px-4 py-2 text-black">{item.content}</td>
                <td className="border px-4 py-2 text-black">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() =>
                      navigate(
                        `/professor/section/${item.sectionName.toLowerCase()}/module-content/${item.id}/detail`
                      )
                    }
                  >
                    Details
                  </button>
                  <button
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() =>
                      navigate(
                        `/professor/module/${item.moduleId}/module-content/${item.id}/edit`
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>


  );
};

export default EditMyModuleContent;
