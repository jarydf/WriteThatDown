import React, { useState } from "react";
import "./../../css/NewNote.css";

const NewNote = () => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    title: "",
    body: "",
  });
  const openNav = () => {
    setStyleHeight({ width: "100vw" });
    console.log("expand height");
  };

  const closeNav = () => {
    setStyleHeight({ width: "0vw" });
    console.log("shorten height");
  };

  return (
    <div>
      <div className="overlay" style={styleHeight}>
        <button className="closebtn" onClick={closeNav}>
          ×
        </button>
        <div className="overlay-content">
          <form>
            <h1>Create a New Note</h1>
            <input type="text" className="fadeIn second" placeholder="title" />
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
            ></textarea>
          </form>
          <input type="submit" className="fadeIn fourth" value="Create" />
        </div>
      </div>
      <button onClick={openNav}>Create a New Note</button>
    </div>
  );
};
export default NewNote;
