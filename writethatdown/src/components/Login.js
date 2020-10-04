import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[isLoggedIn,setIsLoggedIn] = useState(false);

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
              localStorage.setItem("user", JSON.stringify(res.data));
              if (localStorage.getItem("user") === null) {
                console.log("shit aint working bruv");
                setIsLoggedIn(false);
              }
              else{console.log("works");
              setIsLoggedIn(true);
            }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
      useEffect(() => {
        if (isLoggedIn===true){
          history.push("/Home");
        }
      });
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <br/>
          <label>username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => usernameChange(e)}
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
