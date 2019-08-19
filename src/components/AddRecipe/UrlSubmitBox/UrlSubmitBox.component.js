import React from "react";
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
import { AlertMessagesList, Loading } from "components";

const UrlSubmitBoxComponent = props => {
  const { handleSubmit, handleChange, url, isFetching } = props;
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
                If you would like to upload a recipe from a supported site, then
                simply copy the URL from the recipe site and hit Submit to
                populate the form below. Otherwise, you can skip ahead and enter
                in a recipe manually.
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
                {isFetching ? (
                  <div className="float-left pt-3">
                    <Loading />
                  </div>
                ) : null}
                <MDBBtn
                  className="float-right"
                  type="submit"
                  style={{ borderRadius: `28px` }}
                >
                  Submit
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UrlSubmitBoxComponent;
