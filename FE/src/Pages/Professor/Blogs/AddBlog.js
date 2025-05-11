import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("Private");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: gửi dữ liệu form lên server
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Visibility:", visibility);
    console.log("Image File:", imageFile);

    alert(`Đã thêm blog: ${title}`);
    setTitle("");
    setContent("");
    setVisibility("Private");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Thêm Blog mới</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Tiêu đề</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Chế độ hiển thị</label>
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
          <label className="block mb-1 font-semibold">Nội dung</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Đính kèm hình ảnh (1 ảnh duy nhất)</label>
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
            Thêm Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
