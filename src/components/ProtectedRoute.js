import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  render() {
    const { isAuthenticated, isFetching } = this.props;
    if (isFetching) {
      return <div />;
    } else {
      if (isAuthenticated) {
        return <Route {...this.props} />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, isFetching } = state.authentication;
  return { isAuthenticated, isFetching };
}

export default connect(mapStateToProps)(ProtectedRoute);
