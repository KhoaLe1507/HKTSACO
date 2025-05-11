import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu, bạn sẽ thay bằng dữ liệu thật từ API
  const [formData, setFormData] = useState({
    avatarUrl: "/Image/avatar-default.png",
    fullName: "Nguyễn Văn A",
    userName: "nguyenvana",
    email: "a@example.com",
    bio: "Giảng viên Toán tại ĐH Bách Khoa.",
    birthDate: "1990-05-15",
    gender: "Nam",
    phoneNumber: "0987654321",
    school: "Đại học Bách Khoa"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Gửi formData lên API để cập nhật thông tin
    console.log("Updated Data:", formData);
    navigate("/profile"); // Quay về trang MyProfile sau khi cập nhật
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded mt-8">
      <form onSubmit={handleSubmit} className="flex gap-6 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img src={formData.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4" />
          <input
            type="text"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            className="w-32 text-sm px-2 py-1 border border-gray-300 rounded"
            placeholder="Avatar URL"
          />
        </div>

        {/* Form thông tin cá nhân */}
        <div className="flex-1 grid grid-cols-2 gap-4 text-black">
          <div>
            <label className="font-semibold">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold">Username</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold">Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" rows="3" />
          </div>
          <div>
            <label className="font-semibold">Birth Date</label>
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}
              className="w-full px-3 py-2 border rounded">
              <option value="">-- Chọn giới tính --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="font-semibold">School</label>
            <input type="text" name="school" value={formData.school} onChange={handleChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="col-span-2 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
