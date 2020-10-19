import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./../css/Login.css";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const errorStyle = useRef(null);
  const [errorType, setErrorType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  function onSubmit(e) {
    e.preventDefault();
    const newLogin = {
      username: state.username,
      password: state.password,
    };
    axios
      .post("http://localhost:5000/users/Login", newLogin)
      .then(function (res) {
        console.log(res.data);
        if (res.data.auth === true) {
          localStorage.setItem("user", JSON.stringify(res.data));
          if (
            localStorage.getItem("user") !== null ||
            localStorage.getItem("user") !== undefined
          ) {
            console.log("works");
            history.push("/Home");
          } else {
            console.log("shit ain't working bruv");
          }
        } else {
          errorStyle.current.className = "alert alert-danger";
          errorStyle.current.role = "alert";
          setErrorType(res.data.message);
          console.log(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }
  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      if (token === null) {
        console.log("not logged in");
      } else {
        console.log("already logged in");
        history.push("/Home");
      }
    } catch (error) {
      console.log(error.message);
    }
  });
  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png"
              id="icon"
              alt="User Icon"
            />
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="username"
              className="fadeIn second"
              name="username"
              placeholder="login"
              value={state.username}
              onChange={handleChange}
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
            />
            <input
              type="submit"
              className="fadeIn fourth"
              value="Login"
              onClick={onSubmit}
            />
          </form>
          <div id="formFooter">
            <Link to="/Register" className="navbar-brand">
              Don't have an account? Register Here
            </Link>
            <div ref={errorStyle}>{errorType}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
