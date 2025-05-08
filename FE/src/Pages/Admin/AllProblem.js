import React, { useState, useEffect } from 'react';
import ProblemsPage from '../ProblemsPage'; // Đường dẫn chính xác

const AllProblem = () => {
  const [problems, setProblems] = useState([]);
  const [role, setRole] = useState('Admin'); // Giả lập vai trò Admin

  useEffect(() => {
    // Dữ liệu mock, sau này sẽ thay bằng dữ liệu API
    const mockProblems = [
      {
        id: 1,
        title: 'Sum of Two Numbers',
        description: 'Given two integers a and b, return their sum.',
        level: 'Easy',
        author: 'Khoa Le',
      },
      {
        id: 2,
        title: 'Binary Search',
        description: 'Implement binary search on a sorted array.',
        level: 'Normal',
        author: 'admin',
      },
      {
        id: 3,
        title: 'Knapsack DP',
        description: 'Solve the knapsack problem.',
        level: 'Hard',
        author: 'admin2',
      },
    ];
    setProblems(mockProblems);
  }, []);

  return <ProblemsPage problems={problems} role={role} />;
};

export default AllProblem;
