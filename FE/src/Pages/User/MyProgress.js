import React from "react";

const MyProgress = () => {
  const data = {
    completedProblems: 42,
    totalProblems: 100,
    completedModuleContents: 18,
    totalModuleContents: 24,
    completedModules: 6,
    totalModules: 8,
    completedSections: 2,
    totalSections: 4,
    currentRanking: 123,
  };

  const acRate = Math.round((data.completedProblems / data.totalProblems) * 100);
  const submissionData = generateFakeSubmissionData();

  const ProgressBar = ({ value, total }) => {
    const percent = Math.round((value / total) * 100);
    return (
      <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    );
  };

  const daysOfWeek = ["Mon", "Wed", "Fri"];
  const monthsOfYear = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  const SubmissionHeatmap = ({ data }) => {
    const year = new Date().getFullYear();

    return (
      <div className="mt-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-700">Activity visible to others:</p>
          <div className="flex gap-2">
            <select className="border px-2 py-1 rounded text-sm">
              <option value="All">All</option>
              <option value="Public">Public only</option>
            </select>
            <select className="border px-2 py-1 rounded text-sm">
              <option>{year}</option>
              <option>{year - 1}</option>
            </select>
          </div>
        </div>

        {/* Heatmap */}
        <div className="flex gap-2 items-start">
          <div className="flex flex-col justify-between h-[90px] mt-5 text-xs text-gray-600">
            {daysOfWeek.map((day, i) => (
              <span key={i} className="h-[13px]">{day}</span>
            ))}
          </div>

          <div className="overflow-auto">
            <div className="grid grid-cols-12 text-xs text-gray-600 mb-1 ml-[14px]">
              {monthsOfYear.map((month, i) => (
                <div key={i} className="col-span-1 text-center">{month}</div>
              ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-[2px]">
              {data.map((d, idx) => (
                <div
                  key={idx}
                  title={`${d.date}: ${d.count} submissions`}
                  className={`w-3 h-3 rounded-sm ${d.count >= 3
                    ? "bg-green-600"
                    : d.count === 2
                      ? "bg-green-400"
                      : d.count === 1
                        ? "bg-green-200"
                        : "bg-gray-200"
                    }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  function generateFakeSubmissionData() {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    let data = [];

    for (let i = 0; i < 365; i++) {
      const date = new Date(today - i * oneDay);
      const key = date.toISOString().split("T")[0];
      const count = Math.floor(Math.random() * 4);
      data.push({ date: key, count });
    }

    return data.reverse();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-black">
      <h2 className="text-2xl font-bold mb-4">📊 My Learning Progress</h2>

      <div>
        <p className="font-semibold mb-1">🎯 Problems Solved: {data.completedProblems} / {data.totalProblems}</p>
        <ProgressBar value={data.completedProblems} total={data.totalProblems} />
      </div>

      <div>
        <p className="font-semibold mb-1">🧠 AC Rate: {acRate}%</p>
        <ProgressBar value={acRate} total={100} />
      </div>

      <div>
        <p className="font-semibold mb-1">📘 Module Contents Completed: {data.completedModuleContents} / {data.totalModuleContents}</p>
        <ProgressBar value={data.completedModuleContents} total={data.totalModuleContents} />
      </div>

      <div>
        <p className="font-semibold mb-1">🗂 Modules Completed: {data.completedModules} / {data.totalModules}</p>
        <ProgressBar value={data.completedModules} total={data.totalModules} />
      </div>

      <div>
        <p className="font-semibold mb-1">🏆 Sections Completed: {data.completedSections} / {data.totalSections}</p>
        <ProgressBar value={data.completedSections} total={data.totalSections} />
      </div>

      <div className="mt-6">
        <p className="font-semibold text-lg">🏅 Current Ranking:</p>
        <p className="text-2xl font-bold text-blue-700"># {data.currentRanking}</p>
      </div>

      <SubmissionHeatmap data={submissionData} />
    </div>
  );
};

export default MyProgress;
