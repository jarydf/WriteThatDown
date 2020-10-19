import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./../css/Login.css";

function Register() {
  const [formValid, setFormValid] = useState({
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
  });
  const [counter, setCounter] = useState(0);
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  function validateField(fieldName, value) {
    let usernameValid = formValid.usernameValid;
    let emailValid = formValid.emailValid;
    let passwordValid = formValid.passwordValid;
    let confirmPasswordValid = formValid.confirmPasswordValid;

    switch (fieldName) {
      case "username":
        usernameValid = value.length >= 6;
        break;
      case "email":
        var re = /\S+@\S+\.\S+/;
        emailValid = re.test(value);
        break;
      case "password":
        passwordValid = value.length >= 6;
        break;
      case "confirmPassword":
        confirmPasswordValid = value === state.password;
        break;
      default:
        break;
    }
    setFormValid({
      usernameValid: usernameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      confirmPasswordValid: confirmPasswordValid,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setCounter(counter + 1);
    if (
      formValid.usernameValid &&
      formValid.emailValid &&
      formValid.passwordValid &&
      formValid.confirmPasswordValid
    ) {
      const newUser = {
        username: state.username,
        email: state.email,
        password: state.password,
      };
      axios
        .post("http://localhost:5000/users/Register", newUser)
        .then(function (res) {
          console.log(res);
          console.log(res.data);
          history.push("/");
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    } else {
      console.log("form not valid");
    }
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

  const error = {
    color: "#df4759",
    border: "1px solid #df4759",
  };
  const correct = {
    color: "#495057",
    border: "1px solid #ced4da",
  };

  return (
    <div>
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
                style={formValid.usernameValid || counter < 1 ? correct : error}
                onChange={handleChange}
              />
              <input
                type="text"
                id="email"
                className="fadeIn second"
                name="email"
                placeholder="email"
                value={state.email}
                style={formValid.emailValid || counter < 1 ? correct : error}
                onChange={handleChange}
              />
              <input
                type="text"
                id="password"
                className="fadeIn second"
                name="password"
                placeholder="password"
                value={state.password}
                style={formValid.passwordValid || counter < 1 ? correct : error}
                onChange={handleChange}
              />
              <input
                type="text"
                id="confirmPassword"
                className="fadeIn second"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={state.confirmPassword}
                style={
                  formValid.confirmPasswordValid || counter < 1
                    ? correct
                    : error
                }
                onChange={handleChange}
              />
              <input
                type="submit"
                className="fadeIn third"
                value="Login"
                onClick={onSubmit}
              />
            </form>
            <div id="formFooter">
              <Link to="/" className="navbar-brand">
                Back to Login
              </Link>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
