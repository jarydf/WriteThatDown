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
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>{note.author.username}</p>
          </li>
        ))}
      </ul>
    );
  }
};
export default DisplayNotes;
