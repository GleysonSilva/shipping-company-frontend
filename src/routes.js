import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import New from "./pages/New";

export default function Routes(params) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/new" component={New} />
      </Switch>
    </BrowserRouter>
  );
}
