import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import EditNote from "./EditNote";

const DisplayMyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const deleteNote = (e) => {
    e.preventDefault();
    try {
      const { id } = e.target;
      axios
        .delete(`${process.env.REACT_APP_MONGOURL}/notes/deleteNote`, {
          params: { id: id },
        })
        .then(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };
      axios
        .post(`${process.env.REACT_APP_MONGOURL}/notes/getMyNotes`, user)
        .then(
          (response) => {
            setIsLoaded(true);
            setNotes(response.data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } catch (error) {
      setIsLoaded(true);
      console.log(error.message);
    }
  }, [notes]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const group = (notes, n) =>
      notes.reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []);
    return (
      <div className="notes">
        {group(notes, 3).map((rows, i) => (
          <div className="row " key={i}>
            {rows.map((note) => (
              <div className="col-lg-4 p-3 border bg-light" key={note._id}>
                <div className="card" width="18rem">
                  <div className=".d-inline-flex">
                    <button
                      className="btn btn-danger float-left"
                      id={note._id}
                      onClick={deleteNote}
                    >
                      x
                    </button>
                    <EditNote dataFromParent={note} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {note.author.username}
                    </h6>
                    <p className="card-text">{note.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};
export default DisplayMyNotes;
