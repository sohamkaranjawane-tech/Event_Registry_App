import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import login from "../src/assets/login.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getApi(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/authRoute/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      alert("Login Successful");
      if(data.user.role === 'admin'){
        navigate('/overview');
      }
      else{
      navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-text">
          <img src={login} alt="icon" id="login-logo" />
          <p className="login-title">Login</p>
          <p className="login-subtitle">Welcome back!</p>
        </div>

        <form onSubmit={getApi} className="login-form">
          <div className="login-input-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="login-pass">Password</label>
            <input
              id="login-pass"
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="login-button">
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="login-already">
          Don't have an Account?{" "}
          <a
            id="login-anchor"
            onClick={() =>
              navigate("/signup", {
                state: { role: role || "student" },
              })
            }
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;