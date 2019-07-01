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
import AlertMessagesList from "../AlertMessagesList";
// Add alert message when url fails

class UrlSubmitBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const { url } = this.state;
    const { dispatch, history } = this.props;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { handleManual, handleSubmit, handleChange } = this;
    const { url } = this.state;
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
                  <MDBInput
                    hint="Recipe URL"
                    icon="copy"
                    type="url"
                    value={url}
                    onChange={handleChange}
                    name="url"
                    outline
                    required
                  />
                  <div className="float-right">
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

export default connect(null)(UrlSubmitBox);
