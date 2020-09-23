import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route exact path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/Login" component={Login} />
      </div>
    </Router>
  );
}

export default App;