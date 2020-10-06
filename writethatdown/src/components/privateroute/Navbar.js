import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [displayUsername, setDisplayUsername] = useState("");
  const history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    console.log("clicked");
    localStorage.removeItem("user");
    localStorage.clear()
    history.push("/");
  };
  useEffect(() => {
      const token = localStorage.getItem("user");
      const decode = jwt_decode(token);
      console.log(decode.id);
      setDisplayUsername(decode.id);
  }, []);
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/Home" className="navbar-brand">
        Home
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-brand">
            {displayUsername}
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
