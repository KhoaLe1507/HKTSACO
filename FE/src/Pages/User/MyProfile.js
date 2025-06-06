import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const renderRole = (r) => {
  switch (r) {
    case 0: return "Student";
    case 1: return "Professor";
    case 2: return "Admin";
    default: return "Unknown";
  }
};

const MyProfile = () => {
  const navigate = useNavigate();
  const { role: roleViewer } = useContext(AuthContext);
  const { id: routeId } = useParams();

  const viewerId = localStorage.getItem("userId"); // người xem
  const profileId = routeId || viewerId; // người được xem

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`https://localhost:7157/api/auth/profile/${profileId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        console.log("Fetched user profile:", data);
        console.log("Fetched id URL:", profileId);
        setUserData(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (!userData) return <div className="text-center text-gray-500 mt-10">Loading profile...</div>;

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
    createdAt,
    school,
    problemSolved,
    problemCreated,
    role: roleTarget
  } = userData;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded mt-8">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <img src={`https://localhost:7157${avatarUrl}`} alt="Avatar" className="w-32 h-32 rounded-full object-cover border border-gray-300" />

        {/* Thông tin bên cạnh */}
        <div className="flex-1 space-y-2 text-black">
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p><span className="font-semibold">Username:</span> {userName}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p>
            <span className="font-semibold">Bio:</span>{' '}
            <span className="whitespace-pre-line">{bio}</span>
          </p>
          <p><span className="font-semibold">Birth Date:</span> {birthDate}</p>
          <p><span className="font-semibold">Gender:</span> {gender || "Chưa cập nhật"}</p>
          <p><span className="font-semibold">Phone:</span> {phoneNumber}</p>

          {/* Trường chỉ hiển thị nếu target là Student hoặc Professor */}
          {(roleTarget === 0 || roleTarget === 1) && (
            <p><span className="font-semibold">School:</span> {school}</p>
          )}

          {/* Chỉ Admin (viewer) được thấy role, isActive và createdAt */}
          {roleViewer === "2" && (
            <>
              <p><span className="font-semibold">Is Active:</span> {isActive ? "Yes" : "No"}</p>
              <p><span className="font-semibold">Role:</span> {renderRole(roleTarget)}</p>
              <p><span className="font-semibold">Created At:</span> {new Date(createdAt).toLocaleDateString()}</p>
            </>
          )}

          {/* ProblemSolved: nếu target là Student */}
          {roleTarget === 0 && (
            <p><span className="font-semibold">Problems Solved:</span> {problemSolved}</p>
          )}

          {/* ProblemCreated: nếu target là Professor */}
          {roleTarget === 1 && (
            <p><span className="font-semibold">Problems Created:</span> {problemCreated}</p>
          )}

          {/* Nút chỉnh sửa: chỉ hiện nếu người xem chính là chủ profile */}
          {(viewerId === profileId || roleViewer === "2" ) && (
            <button
              onClick={() => navigate(`/profile/${profileId}/edit`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
