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
      const userId = decode.id;
      axios.get("http://localhost:5000/notes/getNotes", userId).then(
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
    return (
      <ul>
        {notes.map((item) => (
          <li key={item.author}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    );
  }
};
export default DisplayNotes;
