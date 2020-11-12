import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/privateroute/Home";
import PublicNotes from "./components/privateroute/PublicNotes";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={Register} path="/Register" exact />
        <Route component={Home} path="/Home" />
        <Route component={PublicNotes} path="/PublicNotes" exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
