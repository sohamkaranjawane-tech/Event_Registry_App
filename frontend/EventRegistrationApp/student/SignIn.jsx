import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate, useLocation } from "react-router-dom";
import google from "../src/assets/google.png";
import apple from "../src/assets/apple.png";
import github from "../src/assets/github.png";
import sign from "../src/assets/sign.png";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "student";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getApi(e) {
    e.preventDefault();
    if (role === "admin" ) {
      if(!email.endsWith("@bvj.com")){
        alert("Enter Admins Email Properly ")
        return;
      }
      
    }
    if(role === "student"){
      if(!email.endsWith("@gmail.com")){
        alert("Enter Students Email Properly ")
        return;
      }
    }
    try {
      const response = await fetch("https://feisty-upliftment-production-6040.up.railway.app/eventRoute/getEvent/authRoute/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
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
      alert("Registered Successfully");
      navigate("/login",{
        state:{
          role: role || "student" 
        }
      });
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="signin-text">
          <img src={sign} alt="icon" id="signin-logo" />
          <p className="signin-title">Create Account</p>
          <p className="signin-subtitle">Join CampusConnect</p>
        </div>

        <form onSubmit={getApi} className="signin-form">
          <div className="signin-input-group">
            <label htmlFor="signin-username">Username</label>
            <input
              id="signin-username"
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signin-input-group">
            <label htmlFor="signin-email">Email Id</label>
            <input
              id="signin-email"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signin-input-group">
            <label htmlFor="signin-pass">Password</label>
            <input
              id="signin-pass"
              type="password"
              placeholder="Create a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signin-terms">
            <input type="checkbox" id="signin-terms-check" required />
            <label htmlFor="signin-terms-check">
              I agree to the <a href="#">Terms and Conditions</a>
            </label>
          </div>

          <div className="signin-button">
            <button type="submit">Sign In</button>
          </div>
        </form>

        <div className="signin-already">
          Already have an Account?{" "}
          <a
            id="signin-anchor"
            onClick={() =>
              navigate("/login", {
                state: { role: role || "student" },
              })
            }
          >
            Login
          </a>
        </div>

        <div className="signin-options">
          <div className="signin-divider">
            <span>Or Continue With</span>
          </div>

          <div className="signin-social-icons">
            <div className="signin-social-btn">
              <img src={google} alt="google" id="signin-google"/>
            </div>
            <div className="signin-social-btn">
              <img src={apple} alt="apple" />
            </div>
            <div className="signin-social-btn">
              <img src={github} alt="github" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;