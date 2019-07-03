import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import {
  ProtectedRoute,
  Login,
  Home,
  Register,
  TopNav,
  AddRecipe
} from "./components/";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={TopNav} />
        </Switch>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/addrecipe" component={AddRecipe} />
        </Switch>
      </div>
    );
  }
}

export default connect(null)(App);
