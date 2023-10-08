import React, { useEffect, useState } from "react";
import "./Blogs.css";
import { Link as RouterLink } from "react-router-dom";
import Banner from "./Banner";

const Blogs = () => {
  const [item, setItem] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`https://blogapi-8ua6.onrender.com/blogs`);
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
    <>
      <Banner />

      <div className="container">
        <div className="row">
          {item.map((elem) => {
            const base64String = arrayBufferToBase64(elem.img.data.data);
            return (
              <div className="col-md-4 mt-4">
                <div key={elem._id}>
                  <div className="txtAnch">
                    <RouterLink to={`/blog/${elem._id}`}>
                      <div>
                        <img
                          class="img-thumbnail"
                          src={`data:image/png;base64,${base64String}`}
                          alt={elem.title}
                        />
                      </div>

                      <h4 className="mt-3">{elem.title}</h4>
                    </RouterLink>
                  </div>

                  <div className="Author">
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
              </div>
            );
          })}
        </div>
      </div>
    </>
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
