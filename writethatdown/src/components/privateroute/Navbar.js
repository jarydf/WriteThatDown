import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NewNote from "./NewNote";
import "./../../css/Navbar.css";

const Navbar = () => {
  const [displayUsername, setDisplayUsername] = useState("");
  const history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    console.log("clicked");
    localStorage.removeItem("user");
    localStorage.clear();
    history.push("/");
  };
  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      setDisplayUsername(decode.username);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/Home" className="navbar-brand">
        Home
      </Link>
      <Link to="/PublicNotes" className="navbar-brand">
        PublicNotes
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-brand">{displayUsername}</li>
          <li className="navbar-item">
            <div className="CreateNote-nav">
              <NewNote />
            </div>
          </li>
          <li className="navbar-item">
            <button className="btn btn-primary" onClick={logout}>
              logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
