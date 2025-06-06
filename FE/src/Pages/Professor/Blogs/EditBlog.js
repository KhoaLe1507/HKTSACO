import React, { useEffect, useState } from "react";

const EditBlog = () => {
  // Mock params for demo
  const id = "123";
  
  // Mock navigation function
  const navigate = (path) => {
    window.location.href = path;
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("Private");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`https://localhost:7157/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setVisibility(data.visibility);
        setCurrentImageUrl(data.imageUrl || "");
      } catch (err) {
        console.error("Error fetching blog:", err);
        // alert("Unable to load blog data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");

    let uploadedImageUrl = currentImageUrl;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const res = await fetch("https://localhost:7157/api/upload/image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        uploadedImageUrl = data.url;
      } catch (err) {
        console.error("Image upload failed", err);
        alert("Image upload failed.");
        setIsSubmitting(false);
        return;
      }
    }

    const blogPayload = {
      title,
      content,
      visibility,
      imageUrl: uploadedImageUrl,
    };

    try {
      await fetch(`https://localhost:7157/api/blog/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogPayload),
      });

      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error("Blog update failed:", err);
      alert("Unable to update blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 hover:from-purple-600 hover:via-pink-500 hover:to-rose-500 transition-all duration-500">
            ✏️ Edit Blog
          </h1>
          <p className="text-slate-600">Update your thoughts and ideas</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-slate-100 p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="space-y-6">
            
            {/* Visibility Select */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <label className="block mb-3 font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-lg">🔒</span>
                Visibility
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="Private">🔒 Private</option>
                  <option value="Public">🌍 Public</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <label className="block mb-3 font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-lg">📝</span>
                Title
              </label>
              <input
                type="text"
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 shadow-sm hover:shadow-md"
                placeholder="Enter your blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content Textarea */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <label className="block mb-3 font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-lg">📄</span>
                Content
              </label>
              <textarea
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 shadow-sm hover:shadow-md resize-none"
                rows={8}
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="text-right text-sm text-slate-500 mt-2">
                {content.length} characters
              </div>
            </div>

            {/* Image Upload */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <label className="block mb-3 font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-lg">🖼️</span>
                Update Image (Optional)
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="w-full p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-all duration-300 bg-gradient-to-br from-slate-50 to-indigo-50/30 hover:from-indigo-50 hover:to-purple-50 flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600"
                >
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-lg font-medium">Click to upload new image</div>
                  <div className="text-sm text-slate-500">PNG, JPG, GIF up to 10MB</div>
                </label>
              </div>

              {/* Image Preview - New Image */}
              {imagePreview && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm font-medium text-slate-700 mb-2">New Image Preview:</p>
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="New Preview"
                      className="w-full rounded-xl border-2 border-slate-200 shadow-lg object-cover max-h-96 transition-all duration-300 group-hover:shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                          document.getElementById('image-upload').value = '';
                        }}
                        className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Image - Only show if no new preview */}
              {!imagePreview && currentImageUrl && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm font-medium text-slate-700 mb-2">Current Image:</p>
                  <div className="relative group">
                    <img
                      src={currentImageUrl}
                      alt="Current"
                      className="w-full rounded-xl border-2 border-slate-200 shadow-lg object-cover max-h-96 transition-all duration-300 group-hover:shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 bg-slate-800 text-white px-3 py-1 rounded-full text-sm">
                        Current Image
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="text-xl">💾</span>
                    Save Changes
                  </>
                )}
              </button>

              {/* <button
                type="button"
                onClick={() => navigate('/blogs')}
                className="px-6 py-4 rounded-xl font-medium text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center gap-2"
              >
                <span>✕</span>
                Cancel
              </button> */}
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-slate-500 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <p>💡 Tip: Your changes will be saved automatically when you click "Save Changes"</p>
            </div>

          </div>
        </div>

        {/* Back to Blogs Link */}
        {/* <div className="text-center mt-8 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <button
            onClick={() => navigate('/blogs')}
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 flex items-center gap-2 mx-auto hover:bg-indigo-50 px-4 py-2 rounded-lg"
          >
            <span>←</span>
            Back to Blogs
          </button>
        </div> */}
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

        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default EditBlog;