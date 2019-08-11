import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "App.css";
import {
  ProtectedRoute,
  Login,
  Landing,
  Register,
  TopNav,
  AddRecipe,
  Profile,
  Recipe
} from "components";
import { alertActions } from "actions";

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch, history } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clearAlert());
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={TopNav} />
        </Switch>
        <Switch>
          <ProtectedRoute exact path="/" component={Landing} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/addrecipe" component={AddRecipe} />
          <ProtectedRoute
            path="/recipes/:recipe_id/:recipe_name?"
            component={Recipe}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(null)(App);
