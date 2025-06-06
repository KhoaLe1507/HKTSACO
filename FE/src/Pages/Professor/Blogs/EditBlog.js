import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("Private");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

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
        console.error("Lỗi khi lấy blog:", err);
        alert("Không thể tải dữ liệu blog.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.error("Upload ảnh thất bại", err);
        alert("Tải ảnh lên thất bại.");
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

      alert("Cập nhật blog thành công!");
      navigate("/blogs"); // Điều hướng sau khi cập nhật
    } catch (err) {
      console.error("Cập nhật blog thất bại:", err);
      alert("Không thể cập nhật blog.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow text-black mt-8">
      <h2 className="text-2xl font-bold mb-6">Chỉnh sửa Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="block mb-1 font-semibold">Ảnh minh họa (tuỳ chọn)</label>
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
          {!imagePreview && currentImageUrl && (
            <img
              src={currentImageUrl}
              alt="Current"
              className="mt-3 w-full rounded border border-gray-300"
            />
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
          >
            Lưu Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
