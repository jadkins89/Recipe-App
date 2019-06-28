import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { ProtectedRoute, Login, Home, Register, TopNav } from './components/';
import { alertActions } from './actions';

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
              <ProtectedRoute exact path="/" component={Home} />
            </Switch>
          </div>
    );
  }
}

export default connect(null)(App);
