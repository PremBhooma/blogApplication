import React, { useEffect, useState } from "react";
import "./Blogs.css";

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
      {item?.map((elem) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(elem.img.data.data))
        );
        return (
          <div key={elem._id}>
            <img src={`data:image/png;base64,${base64String}`} />
            <h1>{elem.title}</h1>
            <div>
              <p>{elem.author_name}</p>
              <p>
                {elem.postDate} {elem.postTime}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
