import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function usernameChange(e) {
    setUsername(e.target.value);
    console.log(e.target.value);
  }

  function emailChange(e) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }

  function passwordChange(e) {
    setPassword(e.target.value);
    console.log(e.target.value);
  }

  function confirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
    console.log(confirmPassword);
  }

  function onSubmit() {
    console.log(confirmPassword);
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    console.log(newUser);

    axios
      .post("http://localhost:5000/users/add", newUser)
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setUsername('');
    //   setEmail('');
    //   setPassword('');
    //   setConfirmPassword('');
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>

          <input
            type="text"
            name="username"
            onChange={(e) => usernameChange(e)}
          />

          <input type="text" name="email" onChange={(e) => emailChange(e)} />

          <input
            type="password"
            name="password"
            onChange={(e) => passwordChange(e)}
          />

          <input
            type="password"
            name="confirmPassword"
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

// import React, { Component } from 'react';
// import axios from 'axios';

// export default class CreateUser extends Component {
//     constructor(props) {
//         super(props);
//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.state = {
//           username: ''
//         };
//       }
//       onChangeUsername(e) {
//         this.setState({
//           username: e.target.value
//         });
//       }
//       onSubmit(e) {
//         e.preventDefault();
//         const newUser = {
//           username: this.state.username,
//         };
//         console.log(newUser);
//         axios.post('http://localhost:5000/users/add', newUser)
//          .then(res => console.log(res.data));

//         this.setState({
//           username: ''
//         })
//       }
//   render() {
//     return (
//         <div>
//         <h3>Create New User</h3>
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <label>Username: </label>
//             <input  type="text"
//                 required
//                 className="form-control"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 />
//           </div>
//           <div className="form-group">
//             <input type="submit" value="Create User" className="btn btn-primary" />
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
