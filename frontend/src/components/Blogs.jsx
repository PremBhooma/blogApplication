import React, { useEffect, useState } from "react";
import "./Blogs.css";
import { Link as RouterLink } from "react-router-dom";

const Blogs = () => {
  const [item, setItem] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:8021/blogs`);
      const data = await res.json();
      console.log(data.blogs);
      setItem(data.blogs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="box">
      {item.map((elem) => {
        const base64String = arrayBufferToBase64(elem.img.data.data);
        return (
          <div key={elem._id}>
            <RouterLink to={`/blog/${elem._id}`}>
              <img
                src={`data:image/png;base64,${base64String}`}
                alt={elem.title}
              />
              <h4>{elem.title}</h4>
            </RouterLink>
            <div>
              <p>
                <span>
                  <i class="fa-solid fa-user"></i>
                </span>{" "}
                {elem.author_name}
              </p>
              <p>
                <span>
                  <i class="fa-solid fa-calendar-days"></i>
                </span>{" "}
                {elem.postDate} {elem.postTime}
              </p>
            </div>
          </div>
        );
      })}
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

export default Blogs;
