import React, { useState } from "react";
import "../../assets/css/login.css";
import _ from "lodash";

function Login({ setUser }) {
  const [username, setUsername] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    localStorage.setItem("user", username);
    setUser(username);
    localStorage.setItem(
      "avatar",
      `https://picsum.photos/id/${_.random(1, 1000)}/200`
    );
  };
  return (
    <div className="login-container">
      <div className="login-title">
        <h1>ChatterBox</h1>
      </div>
      <div className="login-form">
        <input
          type="text"
          placeholder="Enter a username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
