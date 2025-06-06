import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const levelToSectionId = {
  bronze: 7,
  silver: 3,
  gold: 2,
  platinum: 8
};



const ModuleContentDetail = () => {
  const { level, moduleId } = useParams();  // đã có
  console.log("✅ Params:", { level, moduleId });
  console.log("✅ sectionId:", levelToSectionId[level?.toLowerCase()]);
  // 🔽 THÊM state mới:
  const [title, setTitle] = useState("Loading...");
  const [content, setContent] = useState("");
  const [sidebarData, setSidebarData] = useState([]);

useEffect(() => {
  const sectionId = levelToSectionId[level?.toLowerCase()];
  if (!sectionId || !moduleId) return;  

  const fetchContentAndSidebar = async () => {
    try {
      const res = await axios.get(`https://localhost:7157/api/roadmap/GetDetailModuleContent/${moduleId}`);
      const { title, htmlContentPath } = res.data;
      setTitle(title);

      const htmlRes = await axios.get(`https://localhost:7157${htmlContentPath}`);
      setContent(htmlRes.data);

      const sidebarRes = await axios.get(`https://localhost:7157/api/roadmap/ListAllModuleContentAndModuleBySectionId/${sectionId}`);
      setSidebarData(sidebarRes.data.modules);
    } catch (err) {
      console.error("❌ Lỗi khi tải nội dung hoặc sidebar:", err);
      setTitle("Module Not Found");
      setContent("<p>Không thể tải nội dung.</p>");
    }
  };

  fetchContentAndSidebar();
}, [moduleId, level]);



return (
  <div className="text-black flex">
    {/* SIDEBAR BÊN TRÁI */}
    <div className="w-[300px] bg-white p-4 border-r border-gray-600 min-h-screen">
      <h2 className="text-xl font-bold mb-4 capitalize">
        Learning Path ({level})
      </h2>
      {sidebarData.map((mod, i) => (
        <div key={i} className="mb-4">
          <h4 className="text-md font-semibold mb-1">{mod.moduleName}</h4>
          <ul className="ml-2 space-y-1">
            {mod.contents.map((mc) => (
              <li key={mc.id}>
                <a
                  href={`/learn/${level}/module/${mc.id}`}
                  className={`${
                    parseInt(moduleId) === mc.id
                      ? "text-yellow-400 font-bold"
                      : "text-blue-400"
                  } hover:underline`}
                >
                  {mc.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* PHẦN NỘI DUNG CHÍNH */}
    <div className="p-10 w-full prose max-w-full">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>
);

};

export default ModuleContentDetail;
