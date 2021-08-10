import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./../../css/NewNoteNavBar.css";

const NewNoteNav = () => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    title: "",
    body: "",
    username: "",
  });
  const openNav = () => {
    setStyleHeight({ width: "100vw" });
    console.log("expand height");
  };

  const closeNav = () => {
    setStyleHeight({ width: "0vw" });
    console.log("shorten height");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      setState({ username: decode.username });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setStyleHeight({ width: "0vw" });
      setState({ title: "", body: "", username: state.username });
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const newNote = {
        title: state.title,
        body: state.body,
        username: state.username,
        userId: decode.id,
      };

      axios
        .post(`${process.env.REACT_APP_MONGOURL}/notes/createNote`, newNote)
        .then((res) => {
          console.log("note created");
          console.log(res);
        })
        .catch((err) => {
          console.log("not working");
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
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
              id="title"
            />
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              value={state.body}
              onChange={handleChange}
              name="body"
              id="body"
            ></textarea>
          </form>
          <input
            type="submit"
            className="fadeIn fourth"
            value="Create"
            onClick={onSubmit}
          />
        </div>
      </div>
      <button type="button" className="btn btn-light" onClick={openNav}>
        Create A New Note
      </button>
    </div>
  );
};
export default NewNoteNav;
