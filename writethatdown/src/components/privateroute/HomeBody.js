import React from "react";
import "./../../css/HomeBody.css";
import NewNote from "./NewNote";
import DisplayNotes from "./DisplayNotes"

const HomeBody = () => {

  return (
    <div className="HomeBody">
      <div className="container">
        <NewNote />
      </div>
      <DisplayNotes/>
    </div>
  );
};
export default HomeBody;
