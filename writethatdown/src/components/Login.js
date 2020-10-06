import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login=()=> {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errorStyle = useRef(null);
  const [errorType,setErrorType]=useState("");
  function usernameChange(e) {
    const value = e.target.value;
    setUsername(value);
  }

  function passwordChange(e) {
    const value = e.target.value;
    setPassword(value);
  }
  function onSubmit(e) {
    e.preventDefault();
    const newLogin = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:5000/users/Login", newLogin)
      .then(function (res) {
        console.log(res.data);
        if(res.data.auth===true){
          localStorage.setItem("user", JSON.stringify(res.data));
        if (
          localStorage.getItem("user") !== null ||
          localStorage.getItem("user") !== undefined
        ) {
          console.log("works");
          history.push("/Home");
        } else {
          console.log("shit aint working bruv");
        }
        }
        else{
          errorStyle.current.className="alert alert-danger";
          errorStyle.current.role="alert";
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
        
      }
      else {
        console.log("already logged in");
        history.push("/Home");
      }
    } catch(error) {
      console.log(error.message);
    }
     
  });
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <br />
          <label>username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => usernameChange(e)}
          />
          <br />
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
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
        <div ref={errorStyle}>{errorType}</div>
      </form>
    </div>
  );
}
export default Login;
