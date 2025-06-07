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

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-slate-600 text-lg">Please login to view other profile</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            👤 Profile
          </h1>
          <p className="text-slate-600">View and manage profile information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-slate-100 p-8 animate-fade-in-up hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <img 
                  src={`https://localhost:7157${avatarUrl}`} 
                  alt="Avatar" 
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Information Section */}
            <div className="flex-1 space-y-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {/* Name and Role */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-800 hover:text-indigo-600 transition-colors duration-200">
                  {fullName}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 text-lg">@{userName}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    roleTarget === 0 ? 'bg-blue-100 text-blue-700' :
                    roleTarget === 1 ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {renderRole(roleTarget)}
                  </span>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700 border-b-2 border-indigo-100 pb-2">
                    📧 Contact Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="group hover:bg-slate-50 p-3 rounded-xl transition-colors duration-200">
                      <p className="text-sm text-slate-500 font-medium">Email</p>
                      <p className="text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">{email}</p>
                    </div>
                    
                    <div className="group hover:bg-slate-50 p-3 rounded-xl transition-colors duration-200">
                      <p className="text-sm text-slate-500 font-medium">Phone</p>
                      <p className="text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">{phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700 border-b-2 border-purple-100 pb-2">
                    👨‍💼 Personal Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="group hover:bg-slate-50 p-3 rounded-xl transition-colors duration-200">
                      <p className="text-sm text-slate-500 font-medium">Birth Date</p>
                      <p className="text-slate-800 group-hover:text-purple-600 transition-colors duration-200">{birthDate}</p>
                    </div>
                    
                    <div className="group hover:bg-slate-50 p-3 rounded-xl transition-colors duration-200">
                      <p className="text-sm text-slate-500 font-medium">Gender</p>
                      <p className="text-slate-800 group-hover:text-purple-600 transition-colors duration-200">{gender || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {bio && (
                <div className="bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    📝 Biography
                  </h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">{bio}</p>
                </div>
              )}

              {/* School Section - for Student or Professor */}
              {(roleTarget === 0 || roleTarget === 1) && school && (
                <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/60 rounded-2xl p-6 border border-blue-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    🏫 School
                  </h3>
                  <p className="text-slate-700 font-medium">{school}</p>
                </div>
              )}

              {/* Statistics Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Problems Solved - for Student */}
                {roleTarget === 0 && (
                  <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/60 rounded-2xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl">
                        ✅
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Problems Solved</p>
                        <p className="text-2xl font-bold text-emerald-600">{problemSolved}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Problems Created - for Professor */}
                {roleTarget === 1 && (
                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 rounded-2xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                        📝
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Problems Created</p>
                        <p className="text-2xl font-bold text-blue-600">{problemCreated}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Only Information */}
              {roleViewer === "2" && (
                <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/60 rounded-2xl p-6 border border-purple-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    🔐 Admin Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Account Status</p>
                      <p className={`font-semibold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Role</p>
                      <p className="text-slate-800 font-semibold">{renderRole(roleTarget)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-slate-500 font-medium">Created At</p>
                      <p className="text-slate-800 font-semibold">{new Date(createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Button */}
              {(viewerId === profileId || roleViewer === "2" ) && (
                <div className="flex justify-center pt-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <button
                    onClick={() => navigate(`/profile/${profileId}/edit`)}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500"
                  >
                    <span className="text-lg">✏️</span>
                    Edit Profile
                  </button>
                </div>
              )}
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyProfile;