import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

// 🔧 Giả lập dữ liệu user, bạn nên thay bằng fetch từ API trong thực tế
const mockUserData = {
  avatarUrl: "/Image/avatar-default.png",
  fullName: "Nguyễn Văn A",
  userName: "nguyenvana",
  email: "a@example.com",
  bio: "Giảng viên Toán tại Đại học Bách Khoa.",
  birthDate: "1990-05-15",
  gender: "Nam",
  phoneNumber: "0987654321",
  isActive: true,
  school: "Đại học Bách Khoa",
  problemSolved: 42,
  problemCreated: 10
};

const MyProfile = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    avatarUrl,
    fullName,
    userName,
    email,
    bio,
    birthDate,
    gender,
    phoneNumber,
    isActive,
    school,
    problemSolved,
    problemCreated
  } = mockUserData;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded mt-8">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <img src={avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full object-cover border border-gray-300" />

        {/* Thông tin bên cạnh */}
        <div className="flex-1 space-y-2 text-black">
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p><span className="font-semibold">Username:</span> {userName}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Bio:</span> {bio}</p>
          <p><span className="font-semibold">Birth Date:</span> {birthDate}</p>
          <p><span className="font-semibold">Gender:</span> {gender || "Chưa cập nhật"}</p>
          <p><span className="font-semibold">Phone:</span> {phoneNumber}</p>
          <p><span className="font-semibold">School:</span> {school}</p>

          {/* Chỉ hiện với Admin */}
          {role === "Admin" && (
            <p><span className="font-semibold">Is Active:</span> {isActive ? "Yes" : "No"}</p>
          )}

          {/* Chỉ hiện với Student hoặc Professor */}
          {(role === "Student" || role === "Professor") && (
            <div>
              {role === "Student" && (
                <p><span className="font-semibold">Problems Solved:</span> {problemSolved}</p>
              )}
              {role === "Professor" && (
                <p><span className="font-semibold">Problems Created:</span> {problemCreated}</p>
              )}
            </div>
          )}

          {/* Nút chỉnh sửa */}
          <button
            onClick={() => navigate("/profile/edit")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
