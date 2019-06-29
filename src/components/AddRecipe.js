import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import AlertMessagesList from "./AlertMessagesList";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol size="8" className="m-auto">
            <MDBCard className="mt-2">
              <MDBCardBody>
                <MDBCardTitle className="text-center">
                  Add a recipe to your Cook Book!
                </MDBCardTitle>
                <MDBCardText>
                  You can add a recipe in one of two ways. Simply copy the URL
                  from a recipe site you have visited in the box below or select
                  Manual to input a recipe on your own.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
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
