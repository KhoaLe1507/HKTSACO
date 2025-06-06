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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData || !formData.userName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            ✏️ Edit Profile
          </h1>
          <p className="text-slate-600">Update your profile information</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-slate-100 p-8 animate-fade-in-up hover:shadow-2xl transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <img 
                  src={`https://localhost:7157${formData.avatarUrl}`} 
                  alt="Avatar" 
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              <div className="bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-2xl p-6 border border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  📷 Change Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData(prev => ({ ...prev, avatarFile: e.target.files[0] }))}
                  className="w-full text-sm px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {(viewerRole === "2" || viewerId === profileId) && (
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-indigo-100 pb-3">
                    👨‍💼 Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName || ""} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300" 
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                      <input 
                        type="text" 
                        name="userName" 
                        value={formData.userName || ""} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300" 
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email || ""} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300" 
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber || ""} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300" 
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Birth Date</label>
                      <input 
                        type="date" 
                        name="birthDate" 
                        value={formData.birthDate || ""} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300" 
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                      <select 
                        name="gender" 
                        value={formData.gender || ""} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                      >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                    <textarea 
                      name="bio" 
                      value={formData.bio || ""} 
                      onChange={handleChange} 
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300 resize-none" 
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                {/* School Information - for Student or Professor */}
                {(targetRole === 0 || targetRole === 1) && (
                  <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-blue-100 pb-3">
                      🏫 School Information
                    </h3>
                    
                    <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/60 rounded-2xl p-6 border border-blue-100">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">School</label>
                        <input 
                          type="text" 
                          name="school" 
                          value={formData.school || ""} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300" 
                          placeholder="Enter your school name..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Only - Account Status */}
                {viewerRole === "2" && (
                  <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-purple-100 pb-3">
                      🔐 Admin Controls
                    </h3>
                    
                    <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/60 rounded-2xl p-6 border border-purple-100">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Account Status</label>
                        <select
                          name="isActive"
                          value={formData.isActive === true ? "true" : "false"}
                          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === "true" }))}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-slate-300"
                        >
                          <option value="true">✅ Active</option>
                          <option value="false">❌ Banned</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span className="text-lg">💾</span>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
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

export default EditProfile;