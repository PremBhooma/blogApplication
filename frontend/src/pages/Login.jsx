import React, { useContext, useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Routes/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(AuthContext);
  // console.log(setToken);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      email,
      password,
    };

    fetch("http://localhost:8021/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        setToken(res.token);
      })
      .catch((err) => console.log(err));

    navigate(`/`);
  };

  return (
    <div className="signupform">
      <div>
        <h3>Login Form</h3>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
