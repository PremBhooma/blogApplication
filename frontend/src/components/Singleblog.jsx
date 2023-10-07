import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Singleblog = () => {
  const { _id } = useParams();

  const [item, setItem] = useState([]);

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
  }, []);

  const base64String = arrayBufferToBase64(item.img.data.data);

  return (
    <div>
      <img src={`data:image/png;base64,${base64String}`} alt={item.title} />
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
