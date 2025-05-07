import React from 'react';

const AllLearningPath = ({ section }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-xl font-bold mb-4">Learning Path: {section ? section.charAt(0).toUpperCase() + section.slice(1) : ''}</h2>
      <div>Hiển thị danh sách module của section này ở đây (sẽ bổ sung sau).</div>
    </div>
  );
};

export default AllLearningPath; 