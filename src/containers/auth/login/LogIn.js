// src/containers/auth/login/LogIn.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseContext } from "../../../context/Firebase";
import "./LogIn.css";
import { RiMovie2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      if (user) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <Link>
        <div className="logo text-center mb-4">
          <RiMovie2Line />
          Cineboxd
        </div>
      </Link>
      <div className="login">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label>Email</label>
            <input type="text" placeholder="Your Email Here" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="password">
            <label>Password</label>
            <input type="password" placeholder="Your Password Here" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className="no-account">
          <span>Don't have an account?</span>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
