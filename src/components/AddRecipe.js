import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBBtn
} from "mdbreact";
import AlertMessagesList from "./AlertMessagesList";
// Add alert message when url fails

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleManual = this.handleManual.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleManual = event => {
    this.props.history.push("/");
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { handleManual, handleSubmit } = this;
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
                <form className="grey-text" onSubmit={handleSubmit}>
                  <MDBInput hint="Recipe URL" type="url" icon="copy" outline />
                  <div className="d-flex justify-content-between">
                    <MDBBtn color="warning" onClick={handleManual}>
                      Manual
                    </MDBBtn>
                    <MDBBtn type="submit" style={{ borderRadius: `28px` }}>
                      Submit
                    </MDBBtn>
                  </div>
                </form>
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
