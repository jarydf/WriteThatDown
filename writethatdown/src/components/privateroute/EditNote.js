import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const EditNote = ({ dataFromParent }) => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    title: "",
    body: "",
    username: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const openNav = () => {
    setStyleHeight({ width: "100vw" });
    console.log("expand height");
  };

  const closeNav = () => {
    setStyleHeight({ width: "0vw" });
    console.log("shorten height");
  };

  const editNote = (e) => {
    e.preventDefault();
    openNav();
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };
      const { id } = e.target;
      console.log(id + " " + user.userId);
    } catch {}
  };

  return (
    <div>
      <button id={dataFromParent} onClick={editNote} className="btn pull-right">
        edit
      </button>
      <div className="overlay" style={styleHeight}>
        <button
          id="overlayCloseBtn"
          type="button"
          className="closebtn"
          onClick={closeNav}
        >
          ×
        </button>
        <div className="overlay-content">
          <form>
            <h1>Create a New Note</h1>
            <input
              type="text"
              className="fadeIn second"
              placeholder="title"
              value={state.title || ""}
              onChange={handleChange}
              name="title"
            />
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              value={state.body}
              onChange={handleChange}
              name="body"
            ></textarea>
          </form>
          <input
            type="submit"
            className="fadeIn fourth"
            value="Create"
            onClick={editNote}
          />
        </div>
      </div>
    </div>
  );
};
export default EditNote;
