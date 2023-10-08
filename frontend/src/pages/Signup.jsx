import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      password,
    };

    if (!name || !email || !password) {
      return alert("Please provide all required fields.");
    }

    if (password.length < 4 || password.length > 10) {
      return alert("Password must be between 4 and 10 characters.");
    }

    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordPattern.test(password)) {
      return alert(
        "Password must contain at least one alphabet character, one numeric character, and one special symbol."
      );
    }

    // Validation for Check the email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      return alert("Invalid email format.");
    }

    fetch("https://blogapi-8ua6.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate(`/login`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signupform">
      <div>
        <h3>Signup Form</h3>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

export default Signup;
