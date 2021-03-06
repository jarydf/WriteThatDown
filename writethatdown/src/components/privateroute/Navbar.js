import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NewNoteNav from "./NewNoteNav";

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
      <Link to="/Home/DisplayMyNotes" className="navbar-brand">
        Home
      </Link>
      <Link to="/Home/DisplayNotes" className="navbar-brand">
        Public Notes
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-brand">
            <Link to="/Home/Profile" className="navbar-brand">
              {displayUsername}
            </Link>
          </li>
          <li className="navbar-item" style={{ paddingRight: "1em" }}>
            <div className="CreateNote-nav">
              <NewNoteNav />
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
