import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("Private");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = "";

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
      const token = localStorage.getItem("accessToken"); // hoặc sessionStorage tùy cách bạn lưu

      await fetch("https://localhost:7157/api/blog/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogPayload),
      });


      alert("Blog added successfully!");
      setTitle("");
      setContent("");
      setVisibility("Private");
      setImageFile(null);
      setImagePreview(null);
      setImageUrl("");
    } catch (err) {
      console.error("Blog submit failed", err);
      alert("Blog submission failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Visibility</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Attach Image (only one)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-full rounded border border-gray-300"
            />
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
