import React from "react";
import NewNote from "./NewNote";
import DisplayNotes from "./DisplayNotes";

const HomeBody = () => {
  return (
    <div className="HomeBody">
      <div className="CreateNote">
        <NewNote />
      </div>
      <DisplayNotes />
    </div>
  );
};
export default HomeBody;
