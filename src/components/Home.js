import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import AlertMessagesList from "./AlertMessagesList";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <MDBContainer>
        <AlertMessagesList />
        <h1>Welcome {user.first_name}</h1>
      </MDBContainer>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  };
}

export default connect(mapStateToProps)(Home);
