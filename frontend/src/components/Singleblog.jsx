import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Blogs.css";
import Comments from "./Comments";

const Singleblog = () => {
  const { _id } = useParams();

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://blogapi-8ua6.onrender.com/blogs/${_id}`);
      const data = await res.json();
      console.log(data.blogs);
      setItem(data.blogs);
      setLoading(false);
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
      {item.author_email === localStorage.getItem("user") && (
        <div className="btnHid mb-3">
          <button
            onClick={() =>
              alert("Sorry for Inconvenience. The Page is Under Construction")
            }
          >
            Edit
          </button>
        </div>
      )}
      {loading ? (
        <div className="skeletonLoad">
          <div className="loader"></div>
        </div>
      ) : (
        <>
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
        </>
      )}
      <Comments
        _id={item._id}
        author_name={item.author_name}
        author_email={item.author_email}
      />
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
