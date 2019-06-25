import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { Login, Home, Register, TopNav } from './components/';
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
            <Route exact path="/" component={Home} />
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

export default withRouter(connect(null)(App));
