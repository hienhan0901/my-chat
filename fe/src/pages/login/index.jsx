import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/action-creators/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage(props) {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);

  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const data = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      login(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    state.isAuthenticated && navigate("/");
  }, [state.isAuthenticated, navigate]);

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
          <button type="submit" className="loginButton" onClick={handleClick}>
            Log In
          </button>
          <span className=" loginSpan">
            Don't have an account yet?&nbsp;
            <Link to="/register" className="loginRegisterLink">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
