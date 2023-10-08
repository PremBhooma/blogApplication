import React, { useState } from "react";
import "./BlogCreate.css";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testImage, setTestImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("testImage", testImage);

    try {
      const response = await fetch(`http://localhost:8021/blogs/create`, {
        method: "POST",
        headers: {
          // "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        console.log("Blog created successfully");
        // Optionally, you can reset the form fields here
        setTitle("");
        setDescription("");
        setTestImage(null);
      } else {
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="formHandle">
      <form onSubmit={handleSubmit}>
        <h3>Create Blog</h3>
        <input
          placeholder="Enter Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={(e) => setTestImage(e.target.files[0])} />
        <button>Create Blog</button>
      </form>
    </div>
  );
};

export default BlogCreate;
