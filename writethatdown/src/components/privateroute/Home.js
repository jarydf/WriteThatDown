import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import NewNote from "./NewNote";
import DisplayMyNotes from "./DisplayMyNotes";

function Home() {
  const history = useHistory();

  useEffect(() => {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === undefined
    ) {
      console.log("you aren't logged in");
      history.push("/");
    } else {
      console.log("you are still logged in");
    }
  });

  return (
    <div className="Home">
      <Navbar />
      <div className="CreateNote">
        <NewNote />
      </div>
      <div>
        <DisplayMyNotes />
      </div>
    </div>
  );
}
export default Home;
