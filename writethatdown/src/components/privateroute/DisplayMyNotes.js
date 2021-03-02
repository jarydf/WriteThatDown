import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const DisplayMyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const deleteNote = (e) => {
    e.preventDefault();
    try {
      const { id } = e.target;
      console.log(id);
      axios
        .delete("http://localhost:5000/notes/deleteNote", {
          params: { id: id },
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };
      axios.post("http://localhost:5000/notes/getMyNotes", user).then(
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
      console.log(error.message);
    }
  }, []);

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
          <div className="row" key={i}>
            {rows.map((note) => (
              <div className="col-lg-4" key={note._id}>
                <div className="card" width="18rem">
                  <div className="card-body">
                    <button id={note._id} onClick={deleteNote}>
                      x
                    </button>
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
