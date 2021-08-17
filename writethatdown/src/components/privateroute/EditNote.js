import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditNote = ({ dataFromParent }) => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    title: dataFromParent.title,
    body: dataFromParent.body,
    username: dataFromParent.username,
    noteId: dataFromParent._id,
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
    try {
      closeNav();
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };

      const editedNote = {
        title: state.title,
        body: state.body,
        username: state.username,
        noteId: state.noteId,
        userId: user.userId,
      };
      console.log(state.noteId);

      axios
        .post(`${process.env.REACT_APP_MONGOURL}/notes/editNote`, editedNote)

        .then((res) => {
          console.log("note updated");
          console.log(res);
        })
        .catch((err) => {
          console.log("not working");
          console.log(err.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="editNote">
      <button onClick={openNav} className="btn btn-primary float-right">
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
              id="title"
            />
            <CKEditor
              name="body"
              className="form-control text-editor"
              editor={ClassicEditor}
              data={state.body}
              onChange={(e, editor) => {
                setState((prevState) => ({
                  ...prevState,
                  body: editor.getData(),
                }));
              }}
            />
          </form>
          <input
            type="submit"
            className="fadeIn fourth"
            value="Edit"
            onClick={editNote}
          />
        </div>
      </div>
    </div>
  );
};
export default EditNote;
