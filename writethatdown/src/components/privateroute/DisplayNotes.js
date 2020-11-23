import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/notes/getNotes").then(
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
export default DisplayNotes;
