import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Blogs.css";

const Singleblog = () => {
  const { _id } = useParams();

  const [item, setItem] = useState({});

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:8021/blogs/${_id}`);
      const data = await res.json();
      console.log(data.blogs);
      setItem(data.blogs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [_id]);

  const base64String = arrayBufferToBase64(item.img?.data?.data || []);

  return (
    <div className="singleBlog">
      <img src={`data:image/png;base64,${base64String}`} alt={item.title} />
      <div className="mt-2">
        <p>
          <span>
            <i class="fa-solid fa-user"></i>
          </span>{" "}
          {item.author_name}
        </p>
        <p>
          <span>
            <i class="fa-solid fa-calendar-days"></i>
          </span>{" "}
          {item.postDate} {item.postTime}
        </p>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
};

// Function to convert an ArrayBuffer to a base64 string
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default Singleblog;
