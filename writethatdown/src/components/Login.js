import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailChange(e) {
    const value = e.target.value;
    setEmail(value);
  }

  function passwordChange(e) {
    const value = e.target.value;
    setPassword(value);
  }
    function onSubmit(e) {
        e.preventDefault();
          const newLogin = {
            email: email,
            password: password,
          };
          axios
            .post("http://localhost:5000/users/Login", newLogin)
            .then(function (res) {
              console.log(res.data);
              console.log("user logged in");
            })
            .catch(function (error) {
              console.log(error);
            });
      }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <br/>
          <label>email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => emailChange(e)}
          />
          <br/>
          <label>password: </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => passwordChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
export default Login;
