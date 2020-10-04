import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Navbar from "./Navbar"

function Home() {
  const history = useHistory();
  
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      console.log("shit aint working bruv");
      history.push("/");
    }
    else{console.log("works");
    
  }
  });
  
  return (
    <div>
      <Navbar/>
      <p>home</p>
    </div>
  );
}
export default Home;
