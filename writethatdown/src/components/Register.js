import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState({
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
  });
  const[counter,setCounter]=useState(0);

  function usernameChange(e) {
    const name=e.target.name;
    const value = e.target.value;
    setUsername(value);
    validateField(name,value);
  }

  function emailChange(e) {
    const name=e.target.name;
    const value = e.target.value;
    setEmail(value);
    validateField(name,value);
  }

  function passwordChange(e) {
    const name=e.target.name;
    const value = e.target.value;
    setPassword(value);
    validateField(name,value);
  }

  function confirmPasswordChange(e) {
    const name=e.target.name;
    const value = e.target.value;
    setConfirmPassword(value);
    validateField(name,value);
  }

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
        confirmPasswordValid = (value===password) ? true : false;
        break;
      default:
        break;
    }
    setFormValid(
      {
        usernameValid: usernameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid,
      }
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    setCounter(counter+1);
    if (formValid.usernameValid && formValid.emailValid && formValid.passwordValid && formValid.confirmPasswordValid) {
      const newUser = {
        username: username,
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:5000/users/register", newUser)
        .then(function (res) {
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(username);
      console.log(email);
      console.log(password);
      console.log(confirmPassword);
      console.log("form not valid");
    }
  }

  const error = {
    color: "red",
    border: "1px solid #eb516d"
  };
  const correct={
    color: "#495057",
    border: "1px solid #ced4da"
    };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>

          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            style={formValid.usernameValid || counter<1 ? correct : error}
            onChange={(e) => usernameChange(e)}
          />
          <br/>
          <label>email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            style={formValid.emailValid || counter<1 ? correct : error}
            onChange={(e) => emailChange(e)}
          />
          <br/>
          <label>password: </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            style={formValid.passwordValid || counter<1 ? correct : error}
            onChange={(e) => passwordChange(e)}
          />
          <br/>
          <label>confirm password: </label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={confirmPassword}
            style={formValid.confirmPasswordValid || counter<1 ? correct : error}
            onChange={(e) => confirmPasswordChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
export default Register;
