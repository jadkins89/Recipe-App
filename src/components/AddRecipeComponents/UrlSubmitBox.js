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
import { recipeActions } from "../../actions";

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
    const { dispatch } = this.props;
    dispatch(recipeActions.find(url));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { url } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol size="8" className="m-auto">
            <MDBCard className="mt-2">
              <MDBCardBody>
                <AlertMessagesList />
                <MDBCardTitle className="text-center">
                  Add a recipe to your Cook Book!
                </MDBCardTitle>
                <MDBCardText>
                  If you would like to upload a recipe from a supported site,
                  then simply copy the URL from the recipe site and hit Submit
                  to populate the form below. Otherwise, you can skip ahead and
                  enter in a recipe manually.
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
