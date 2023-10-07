import React, { useState } from "react";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testImage, setTestImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("testImage", testImage);

    try {
      const response = await fetch(`http://localhost:8021/blogs/create`, {
        method: "POST",
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data.blogs);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setTestImage(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={onInputChange}
          />
        </div>
        <button>Create Blog</button>
      </form>
    </div>
  );
};

export default BlogCreate;
