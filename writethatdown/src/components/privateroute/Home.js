import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import NewNote from "./NewNote";
import DisplayMyNotes from "./DisplayMyNotes";
import "./../../styles/fixed-button.scss";
import { Route } from "react-router-dom";
import DisplayNotes from "./DisplayNotes";
import Profile from "./Profile";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === undefined
    ) {
      console.log("you aren't logged in");
      history.push("/");
    }
  });

  return (
    <div className="Home">
      <Navbar />
      <div className="CreateNote">
        <NewNote />
      </div>

      <Route
        component={DisplayMyNotes}
        path={["/Home", "/Home/DisplayMyNotes"]}
        exact
        className="DisplayMyNotes"
      />

      <Route
        component={DisplayNotes}
        path="/Home/DisplayNotes"
        className="DisplayNotes"
        exact
      />
      <Route
        component={Profile}
        path="/Home/Profile"
        className="profile"
        exact
      />
    </div>
  );
};
export default Home;
