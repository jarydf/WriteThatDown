import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import NewNote from "./NewNote";
import DisplayNotes from "./DisplayNotes";

function PublicNotes() {
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
    <div className="PublicNotes">
      <Navbar />
      <div className="CreateNote">
        <NewNote />
      </div>
      <div className="DisplayNotes">
        <DisplayNotes />
      </div>
    </div>
  );
}
export default PublicNotes;
