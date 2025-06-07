import React, { useState } from "react";

const MyProgress = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activityFilter, setActivityFilter] = useState("All");

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
    streakDays: 7,
    totalSubmissions: 156
  };

  const acRate = Math.round((data.completedProblems / data.totalProblems) * 100);
  const submissionData = generateFakeSubmissionData();

  const ProgressBar = ({ value, total, gradient = "from-blue-500 to-cyan-500" }) => {
    const percent = Math.round((value / total) * 100);
    
    return (
      <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className={`bg-gradient-to-r ${gradient} h-full transition-all duration-700 ease-out relative overflow-hidden`}
          style={{ width: `${percent}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-slate-700">
            {percent}%
          </span>
        </div>
      </div>
    );
  };

  const getProgressColor = (percent) => {
    if (percent >= 80) return "from-emerald-500 to-teal-500";
    if (percent >= 60) return "from-blue-500 to-cyan-500";
    if (percent >= 40) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  const getRankingColor = (ranking) => {
    if (ranking <= 50) return "text-emerald-600 from-emerald-500 to-teal-500";
    if (ranking <= 100) return "text-blue-600 from-blue-500 to-cyan-500";
    if (ranking <= 200) return "text-amber-600 from-amber-500 to-orange-500";
    return "text-slate-600 from-slate-500 to-slate-600";
  };

  const daysOfWeek = ["Mon", "Wed", "Fri"];
  const monthsOfYear = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  const SubmissionHeatmap = ({ data }) => {
    const getActivityColor = (count) => {
      if (count >= 5) return "bg-emerald-600 shadow-lg";
      if (count >= 3) return "bg-emerald-500 shadow-md";
      if (count >= 2) return "bg-emerald-400 shadow-sm";
      if (count >= 1) return "bg-emerald-200";
      return "bg-slate-200";
    };

    const getActivityLevel = (count) => {
      if (count >= 5) return "Very High";
      if (count >= 3) return "High";
      if (count >= 2) return "Medium";
      if (count >= 1) return "Low";
      return "None";
    };

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            🔥 Submission Activity
          </h3>
          <div className="flex gap-3">
            <select 
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm"
            >
              <option value="All">All Activity</option>
              <option value="Public">Public Only</option>
            </select>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm"
            >
              <option value={selectedYear}>{selectedYear}</option>
              <option value={selectedYear - 1}>{selectedYear - 1}</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex flex-col justify-between h-[110px] mt-6 text-xs text-slate-600">
            {daysOfWeek.map((day, i) => (
              <span key={i} className="h-[15px] font-medium">{day}</span>
            ))}
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-12 text-xs text-slate-600 mb-2 ml-[16px] gap-4">
              {monthsOfYear.map((month, i) => (
                <div key={i} className="text-center font-medium">{month}</div>
              ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-1">
              {data.map((d, idx) => (
                <div
                  key={idx}
                  title={`${d.date}: ${d.count} submissions (${getActivityLevel(d.count)})`}
                  className={`w-4 h-4 rounded transition-all duration-300 hover:scale-125 cursor-pointer ${getActivityColor(d.count)}`}
                ></div>
              ))}
            </div>

            {/* Activity Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-600">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded bg-slate-200"></div>
                <div className="w-3 h-3 rounded bg-emerald-200"></div>
                <div className="w-3 h-3 rounded bg-emerald-400"></div>
                <div className="w-3 h-3 rounded bg-emerald-500"></div>
                <div className="w-3 h-3 rounded bg-emerald-600"></div>
              </div>
              <span>More</span>
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
      const count = Math.floor(Math.random() * 6);
      data.push({ date: key, count });
    }

    return data.reverse();
  }

  const progressItems = [
    {
      label: "Problems Solved",
      icon: "🎯",
      value: data.completedProblems,
      total: data.totalProblems,
      description: "Coding challenges completed"
    },
    {
      label: "Module Contents",
      icon: "📘", 
      value: data.completedModuleContents,
      total: data.totalModuleContents,
      description: "Learning materials studied"
    },
    {
      label: "Modules Completed",
      icon: "🗂️",
      value: data.completedModules,
      total: data.totalModules,
      description: "Course modules finished"
    },
    {
      label: "Sections Completed", 
      icon: "🏆",
      value: data.completedSections,
      total: data.totalSections,
      description: "Learning sections mastered"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            📊 My Learning Journey
          </h1>
          <p className="text-slate-600">Track your progress and celebrate your achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <p className="text-blue-100 text-sm">Success Rate</p>
                <p className="text-2xl font-bold">{acRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🔥
              </div>
              <div>
                <p className="text-emerald-100 text-sm">Current Streak</p>
                <p className="text-2xl font-bold">{data.streakDays} days</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                📝
              </div>
              <div>
                <p className="text-purple-100 text-sm">Total Submissions</p>
                <p className="text-2xl font-bold">{data.totalSubmissions}</p>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${getRankingColor(data.currentRanking).split(' ').slice(1).join(' ')} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up`} style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🏅
              </div>
              <div>
                <p className="text-white/80 text-sm">Global Ranking</p>
                <p className="text-2xl font-bold">#{data.currentRanking}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {progressItems.map((item, index) => {
            const percent = Math.round((item.value / item.total) * 100);
            return (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{animationDelay: `${0.5 + index * 0.1}s`}}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{item.label}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-800">
                      {item.value} / {item.total}
                    </div>
                    <div className="text-sm text-slate-600">
                      {percent}% Complete
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <ProgressBar 
                    value={item.value} 
                    total={item.total} 
                    gradient={getProgressColor(percent)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Submission Heatmap */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <SubmissionHeatmap data={submissionData} />
        </div>

        {/* Achievements Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            🏆 Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">🥇</div>
              <h4 className="font-semibold text-amber-800">First Solution</h4>
              <p className="text-amber-700 text-sm">Solved your first coding problem</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">🔥</div>
              <h4 className="font-semibold text-emerald-800">Week Streak</h4>
              <p className="text-emerald-700 text-sm">Maintained 7-day coding streak</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-semibold text-purple-800">Learning Path</h4>
              <p className="text-purple-700 text-sm">Completed first learning section</p>
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Keep Going!</h4>
                <p className="text-blue-700 text-sm">
                  You're making great progress! Consistency is key to mastering programming. Keep coding daily to maintain your streak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default MyProgress;