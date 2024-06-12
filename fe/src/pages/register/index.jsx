import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Password not match");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(`${process.env.REACT_APP_BE}api/auth/register`, user);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="loginContainer">
        <img className="loginLogo" src="/echat-logo.png" alt="logo" />
        <form className="loginForm">
          <input
            type="text"
            placeholder="Username"
            required
            className="loginInput"
            ref={username}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="loginInput"
            ref={password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            required
            className="loginInput"
            ref={confirmPassword}
          />
          <button type="submit" className="loginButton" onClick={handleClick}>
            Sign Up
          </button>
          <span className=" loginSpan">
            Already have an account?&nbsp;
            <Link to="/login" className="loginRegisterLink">
              Log in
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
