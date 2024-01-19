import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/pages/Login";
import Home from "./dashboard/pages/Home";
import PrivateRoute from "./auth/helpers/PrivateRoute";
import Signup from "./auth/pages/Signup"; // Import the Signup component

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}  />
        <Route path="/signup" component={Signup}  />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export  default  Routes;