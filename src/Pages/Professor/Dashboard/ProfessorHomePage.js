import React from "react";

const ProfessorHomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold mb-4">Chào mừng đến với Professor Dashboard!</h1>
      <p className="mb-6 text-lg">Bạn có thể quản lý bài tập, blog, module học tập và xem thống kê tại đây.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Xem, thêm, chỉnh sửa, xóa bài tập (Problem)</li>
        <li>Quản lý Blog cá nhân và Blog chung</li>
        <li>Quản lý Module, Section, Topic cho lộ trình học</li>
        <li>Xem thống kê và chi tiết các bài tập của bạn</li>
      </ul>
      <div className="mt-8 text-gray-400">Sử dụng thanh Sidebar bên trái để điều hướng các chức năng.</div>
    </div>
  );
};

export default ProfessorHomePage;
