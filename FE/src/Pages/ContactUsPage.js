import React from "react";

const ContactUsPage = () => {
  const members = [
    {
      name: "Phetchamphone Hatsady",
      phone: "0876 545 419",
      email: "102230390@sv1.dut.udn.vn",
      linkedin: "https://linkedin.com/in/member1",
      facebook: "https://www.facebook.com/hatsadi.phetchamphone",
      role: "Project Manager",
      avatar: "👨‍💻",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Lê Quang Anh Khoa",
      phone: "0945 545 689",
      email: "102230126@sv1.dut.udn.vn",
      linkedin: "https://linkedin.com/in/member2",
      facebook: "https://www.facebook.com/khoa.le.819690",
      role: "Lead Developer",
      avatar: "👩‍🎨",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Phạm Thanh Tùng",
      phone: "0934 807 226",
      email: "102230140@sv1.dut.udn.vn",
      linkedin: "https://linkedin.com/in/member3",
      facebook: "https://www.facebook.com/thanh.tung.833875/",
      role: "UI/UX Designer",
      avatar: "👨‍💼",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const socialIcons = {
    email: "📧",
    phone: "📱",
    linkedin: "💼",
    facebook: "📘"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            👥 Meet Our Team
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Get in touch with our talented team members. We're here to help you succeed and answer any questions you might have.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${member.color} rounded-full transform translate-x-16 -translate-y-16`}></div>
                </div>

                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-slate-600 text-sm font-medium">{member.role}</p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:shadow-md transition-all duration-300 group/item">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-md group-hover/item:shadow-lg transition-shadow duration-300">
                      📱
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">PHONE</p>
                      <a 
                        href={`tel:${member.phone}`} 
                        className="text-slate-800 font-medium hover:text-blue-600 transition-colors duration-200"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:shadow-md transition-all duration-300 group/item">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white shadow-md group-hover/item:shadow-lg transition-shadow duration-300">
                      📧
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 font-medium">EMAIL</p>
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-slate-800 font-medium hover:text-purple-600 transition-colors duration-200 truncate block"
                        title={member.email}
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:shadow-md transition-all duration-300 transform hover:scale-105 group/social"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-sm shadow-md group-hover/social:shadow-lg transition-shadow duration-300">
                        💼
                      </div>
                      <span className="text-slate-800 font-medium text-sm">LinkedIn</span>
                    </a>

                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:shadow-md transition-all duration-300 transform hover:scale-105 group/social"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm shadow-md group-hover/social:shadow-lg transition-shadow duration-300">
                        📘
                      </div>
                      <span className="text-slate-800 font-medium text-sm">Facebook</span>
                    </a>
                  </div>
                </div>             
              </div>
            </div>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-slate-100 p-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">🤝 Let's Collaborate</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you have questions, need support, or want to discuss potential partnerships, 
              our team is ready to help. Choose any member above to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4 shadow-lg">
                🚀
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Quick Response</h3>
              <p className="text-slate-600 text-sm">Average response time within 2-4 hours</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4 shadow-lg">
                💡
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Expert Guidance</h3>
              <p className="text-slate-600 text-sm">Professional advice from experienced team</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4 shadow-lg">
                🎯
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Tailored Solutions</h3>
              <p className="text-slate-600 text-sm">Customized approaches for your needs</p>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="text-3xl font-bold text-indigo-600 mb-2">{members.length}+</div>
            <div className="text-slate-600 text-sm">Team Members</div>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-slate-600 text-sm">Availability</div>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
            <div className="text-slate-600 text-sm">Commitment</div>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="text-3xl font-bold text-pink-600 mb-2">∞</div>
            <div className="text-slate-600 text-sm">Possibilities</div>
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

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;