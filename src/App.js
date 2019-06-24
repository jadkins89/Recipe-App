import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { history } from './helpers';
import { Login, Home, Register } from './components/';
import { alertActions } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    
    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clearAlert());
    });
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   const { addAlert } = state;
//   return {
//     addAlert
//   };
// }

const connectedApp = connect(null)(App);
export { connectedApp as App };
