import React, { useState } from "react";
import LogoImg from "../Images/Logo-img.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong");
      }

      toast.success("Login successful!");
      localStorage.setItem("accesstoken", data.accesstoken); 
      setTimeout(() => {
        navigate("/Blog");
      }, 2000); 
    } catch (err) {    
      toast.error(err.message);
    }
  };

  return (
    <div className="Profile-login">
      <div className="Login-container">
        <div className="p-3 img_logo text-center">
          <img src={LogoImg} alt="Logo-img" />
        </div>

        <div className="welcome-back p-2 mt-2">Welcome Back !!!</div>
        <form className="form_container" onSubmit={handleLogin}>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form_control mt-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="Login text-center mt-4">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
