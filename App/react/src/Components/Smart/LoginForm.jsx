import React, { useState } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      console.log(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } else {
      console.error("There was a problem logging in:", data.message);
    }
  };

  return (
    <div className="wrap">
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
