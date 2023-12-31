import React, { useEffect, useState } from "react";
import "./Comments.css";
import { Navigate, useNavigate } from "react-router-dom";

const Comments = ({ _id, author_name, author_email }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  console.log(_id);
  const handleCommentSubmit = async () => {
    if (localStorage.getItem("token")) {
      const payload = {
        text,
        blog_id: _id,
        author_email,
        author_name,
      };

      try {
        const res = await fetch(
          `https://blogapi-8ua6.onrender.com/blogs/${_id}/create`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const commentItem = await res.json();
        console.log(commentItem);
        getComment();
        console.log("Comment Successful");
      } catch (err) {
        console.log(err);
        console.log("Comment Falied to Post");
      }
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  const getComment = async () => {
    try {
      const res = await fetch(
        `https://blogapi-8ua6.onrender.com/blogs/${_id}/getcomment`
      );
      const item = await res.json();
      console.log(item.comment);
      setData(item.comment);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComment();
  }, [_id]);

  return (
    <>
      <div className="comment-section">
        <textarea
          rows="4"
          cols="50"
          placeholder="Write your comment here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
      <div className="get-comment mt-4">
        <h3>Comments Section</h3>
        {data?.map((elem) => (
          <div key={elem._id}>
            <p>
              <span>
                <i class="fa-solid fa-user"></i>
              </span>{" "}
              Commented at {elem.postDate} {elem.postTime}
            </p>
            <div className="commBox">
              <p>
                <span>
                  <i class="fa-solid fa-comment-dots"></i>
                </span>{" "}
                {elem.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
