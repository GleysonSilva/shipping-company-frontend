import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";

import "./App.css";
import logo from "./assets/logo.png";
import { isAthenticated } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAthenticated() ? (
        <Component {...props} />
      ) : (
        <header className="img-style">
          <img style={{ width: "40%" }} src={logo} alt="AirBnb" />
          {/* <div className="content"> */}
          <Redirect to={{ pathname: "/", state: { form: props.location } }} />
          {/* </div> */}
        </header>
      )
    }
  />
);
export default function Routes(params) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/new" component={New} />
      </Switch>
    </BrowserRouter>
  );
}
