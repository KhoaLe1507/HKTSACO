import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const LearningPathPage = () => {
  const { sectionId, level = "bronze" } = useParams(); // giữ level để sử dụng trong Link
  const [counts, setCounts] = useState({ modulesTotal: 0, problemsTotal: 0 });
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [mappedSections, setMappedSections] = useState([]);

  // Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      document.querySelectorAll(".reveal").forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Stats count animation
  useEffect(() => {
    const stats = {
      bronze: { modules: 12, problems: 99 },
      silver: { modules: 15, problems: 120 },
      gold: { modules: 18, problems: 150 },
      platinum: { modules: 20, problems: 180 }
    };

    const currentStats = stats[level] || stats.bronze;
    const interval = setInterval(() => {
      setCounts((prev) => ({
        modulesTotal: prev.modulesTotal < currentStats.modules ? prev.modulesTotal + 1 : currentStats.modules,
        problemsTotal: prev.problemsTotal < currentStats.problems ? prev.problemsTotal + 4 : currentStats.problems
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [level]);

  // Fetch section data
  useEffect(() => {
    console.log("sectionId:", sectionId);
    if (!sectionId) return;

    axios
      .get(`https://localhost:7157/api/roadmap/ListAllModuleContentAndModuleBySectionId/${sectionId}`)
      .then((res) => {
        const data = res.data;
        setSectionName(data.sectionName);
        setSectionDescription(data.sectionDescription);

        const formatted = data.modules.map((mod) => ({
          category: mod.moduleName,
          modules: mod.contents.map((c) => [c.title, c.description])
        }));
        setMappedSections(formatted);
      })
      .catch((err) => console.error("Failed to fetch module content:", err));
  }, [sectionId]);

  const levelColors = {
    BRONZE: { from: "from-amber-700", to: "to-yellow-600" },
    SILVER: { from: "from-gray-400", to: "to-gray-600" },
    GOLD: { from: "from-yellow-400", to: "to-yellow-600" },
    PLATINUM: { from: "from-blue-400", to: "to-blue-600" }
  };
  
  const currentColors = levelColors[sectionName?.toUpperCase()] || levelColors.BRONZE;
  

  return (
    <div className="text-black min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <div className={`relative h-64 bg-gradient-to-r ${currentColors.from} ${currentColors.to} text-white text-center flex flex-col justify-center items-center overflow-hidden animate-fadeIn`}>
        <div className="absolute inset-0 z-0 transition-transform duration-1000 ease-out transform scale-100">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        </div>

        <h1 className="text-6xl font-extrabold mb-4 relative z-10 text-white drop-shadow-lg animate-slideDown capitalize">
          {sectionName}
        </h1>

        <div className="h-1 w-32 bg-white mb-6 relative z-10 animate-expandWidth"></div>

        <p className="text-lg max-w-3xl mx-auto relative z-10 text-white bg-black/30 px-6 py-3 rounded-lg animate-fadeIn">
          {sectionDescription}
        </p>
      </div>

      {/* Stats */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 reveal">Your Learning Progress</h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16">
          {[
            { title: "Modules Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: counts.modulesTotal, total: counts.modulesTotal },
            { title: "Problems Progress", completed: 0, inProgress: 0, skipped: 0, notStarted: counts.problemsTotal, total: counts.problemsTotal }
          ].map(({ title, completed, inProgress, skipped, notStarted, total }, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-xl w-full md:w-[480px] border border-gray-200 hover:shadow-2xl transition-shadow duration-300 reveal" style={{ animationDelay: `${idx * 200}ms` }}>
              <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6">
                <h3 className="text-2xl font-bold">{title}</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-8">
                  {[
                    { label: "COMPLETED", value: completed, color: "bg-green-500", labelColor: "text-green-600" },
                    { label: "IN PROGRESS", value: inProgress, color: "bg-yellow-400", labelColor: "text-yellow-600" },
                    { label: "SKIPPED", value: skipped, color: "bg-blue-400", labelColor: "text-blue-600" },
                    { label: "NOT STARTED", value: notStarted, color: "bg-gray-200", labelColor: "text-gray-600" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center transform hover:scale-110 transition-transform duration-200" style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: `${0.3 + i * 0.1}s` }}>
                      <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md`}>
                        {item.value}
                      </div>
                      <p className={`mt-2 text-xs font-semibold ${item.labelColor}`}>{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600 animate-expandWidth" style={{ width: `${(completed / total) * 100}%`, animationDelay: '0.8s' }} />
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">0%</p>
                  <p className="text-sm font-medium text-gray-700">{total} total</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto pb-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800 reveal">Course Content</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded"></div>
          {mappedSections.map((section, i) => (
            <div key={i} className="mb-16 reveal" style={{ animationDelay: `${i * 200}ms` }}>
              <div className="flex mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ml-16">
                  <h3 className="text-xl font-bold text-white">{section.category}</h3>
                </div>
              </div>
              <div className="space-y-4 ml-16">
                {section.modules.map(([title, desc], j) => {
                  const id = title.toLowerCase().replaceAll(" ", "-").replace(/[()]/g, "");
                  return (
                    <div key={j} className="relative reveal" style={{ animationDelay: `${0.2 + j * 0.1}s` }}>
                      <div className="absolute left-0 top-1/2 w-5 h-5 rounded-full bg-white border-4 border-blue-500 shadow-lg transform -translate-x-[40px] -translate-y-1/2 z-10"></div>
                      <Link to={`/learn/${level}/module/${id}`} className="block bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 border-l-4 border-indigo-500">
                        <h4 className="text-xl font-bold text-indigo-700 mb-2">{title}</h4>
                        <p className="text-gray-600 text-sm">{desc}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-400">Module {i + 1}.{j + 1}</span>
                          <span className="text-indigo-600 font-medium text-sm">Start Learning →</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage;
