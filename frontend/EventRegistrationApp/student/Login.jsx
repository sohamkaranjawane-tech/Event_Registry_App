import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import login from "../src/assets/login.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role] = useState(location.state?.role || "student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  async function getApi(e) {
    e.preventDefault();

    if (role === "admin" ) {
      if(!email.endsWith("@bvj.com")){
        alert("Enter Admins Email Properly ")
        return;
      }
      
    }
    if(role === "admin" && !id.trim()){
      alert("Please enter Teacher ID");
      return;
    }
    if(role === "admin" && id !== "12345678"){
      alert("Invalid Admin Id");
      return;
    }
    if(role === "student"){
      if(!email.endsWith("@gmail.com")){
        alert("Enter Students Email Properly ")
        return;
      }
    }
    try {
      const response = await fetch("https://feisty-upliftment-production-6040.up.railway.app/authRoute/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");

      if (data.user.role === "admin") {
        navigate("/overview");
      } else {
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
          <p className="login-title">
            {role === "admin" ? "Admin Login" : "Student Login"}
          </p>
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

          {role === "admin" && (
            <div className="login-input-group">
              <label htmlFor="login-id">Admin's ID</label>
              <input
                id="login-id"
                type="number"
                placeholder="Enter your Admin's ID..."
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
          )}

          <div className="login-forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="login-button">
            <button type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="login-already">
          Don't have an Account?{" "}
          <a
            id="login-anchor"
            onClick={() =>
              navigate("/signup", {
                state: { role },
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