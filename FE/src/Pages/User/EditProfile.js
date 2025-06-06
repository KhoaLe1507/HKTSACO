import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const viewerId = localStorage.getItem("userId");
  const profileId = routeId || viewerId;
  const { role: viewerRole } = useContext(AuthContext);

  const [formData, setFormData] = useState({ avatarFile: null });
  const [targetRole, setTargetRole] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`https://localhost:7157/api/auth/profile/${profileId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setFormData({ ...data, avatarFile: null });
        setTargetRole(data.role);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [profileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const formToSend = new FormData();
    formToSend.append("FullName", formData.fullName);
    formToSend.append("Email", formData.email);
    formToSend.append("Bio", formData.bio || "");
    formToSend.append("BirthDate", formData.birthDate);
    formToSend.append("Gender", formData.gender);
    formToSend.append("PhoneNumber", formData.phoneNumber);
    formToSend.append("School", formData.school || "");
    formToSend.append("IsActive", formData.isActive);

    if (formData.avatarFile) {
      formToSend.append("AvatarFile", formData.avatarFile);
    }

    try {
      const res = await fetch(`https://localhost:7157/api/auth/edit-profile/${profileId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formToSend
      });

      if (res.ok) {
        alert("Profile updated successfully!");
        navigate(`/profile/${profileId}`);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred.");
    }
  };


  if (!formData || !formData.userName) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded mt-8">
      <form onSubmit={handleSubmit} className="flex gap-6 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img src={`https://localhost:7157${formData.avatarUrl}`} alt="Avatar" className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData(prev => ({ ...prev, avatarFile: e.target.files[0] }))}
            className="w-full text-sm px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        {/* Form thông tin cá nhân */}
        <div className="flex-1 grid grid-cols-2 gap-4 text-black">
          {(viewerRole === "2" || viewerId === profileId) && (
            <>
              <div>
                <label className="font-semibold">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold">Username</label>
                <input type="text" name="userName" value={formData.userName || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold">Email</label>
                <input type="email" name="email" value={formData.email || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="col-span-2">
                <label className="font-semibold">Bio</label>
                <textarea name="bio" value={formData.bio || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows="3" />
              </div>
              <div>
                <label className="font-semibold">Birth Date</label>
                <input type="date" name="birthDate" value={formData.birthDate || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold">Gender</label>
                <select name="gender" value={formData.gender || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                  <option value="">-- Chọn giới tính --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {(targetRole === 0 || targetRole === 1) && (
                <div className="col-span-2">
                  <label className="font-semibold">School</label>
                  <input type="text" name="school" value={formData.school || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                </div>
              )}
              {viewerRole === "2" && (
                <div className="col-span-2">
                  <label className="font-semibold">Is Active</label>
                  <select
                    name="isActive"
                    value={formData.isActive === true ? "true" : "false"}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === "true" }))}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="true">Active</option>
                    <option value="false">Banned</option>
                  </select>
                </div>
              )}
              <div className="col-span-2 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;