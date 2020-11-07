import React, { useState, useEffect } from "react";
import "./../../css/NewNote.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

const NewNote = () => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    title: "",
    body: "",
    author: "",
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
      setState({ author: decode.id });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  function onSubmit(e) {
    e.preventDefault();
    const newNote = {
      title: state.title,
      body: state.body,
      author: state.author,
    };
    axios
      .post("http://localhost:5000/notes/createNote", newNote)
      .then(function (res) {
        console.log(res.data);
        console.log("note created");
        setStyleHeight({ width: "0vw" });
        setState({ title: "", body: "", author: "" });
      })
      .catch(function (error) {
        console.log(error.data);
        console.log("not working");
      });
  }

  return (
    <div>
      <div className="overlay" style={styleHeight}>
        <button className="closebtn" onClick={closeNav}>
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
            onClick={onSubmit}
          />
        </div>
      </div>
      <button onClick={openNav}>Create a New Note</button>
    </div>
  );
};
export default NewNote;
