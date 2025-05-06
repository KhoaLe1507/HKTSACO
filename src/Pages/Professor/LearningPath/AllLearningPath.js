import React from "react";

const mockLearningPaths = [
  { id: 1, name: "General", topics: ["Introduction", "Basic Syntax"] },
  { id: 2, name: "Bronze", topics: ["Math", "Brute Force"] },
  { id: 3, name: "Silver", topics: ["Binary Search", "Sorting"] },
];

const AllLearningPath = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tất cả Learning Path</h2>
      <div className="space-y-4">
        {mockLearningPaths.map((section) => (
          <div key={section.id} className="bg-[#1a2a47] p-4 rounded shadow">
            <div className="font-semibold text-lg mb-2">{section.name}</div>
            <ul className="list-disc ml-6">
              {section.topics.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLearningPath;
