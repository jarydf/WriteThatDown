import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };
      axios.get("http://localhost:5000/notes/getNotes", user).then(
        (response) => {
          setIsLoaded(true);
          setNotes(response.data);
          console.log(response.data);
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
    return (
      <div className="notes">
        {notes.map((note) => (
          <div className="row">
            <div className="col-sm-6">
              <div className="card" width="18rem">
                <div className="card-body" key={note._id}>
                  <h5 className="card-title">{note.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {note.author.username}
                  </h6>
                  <p className="card-text">{note.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
export default DisplayNotes;
