import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardText
} from "mdbreact";

import UrlSubmitBox from "./UrlSubmitBox";
import { RecipeInput } from "components";

const AddRecipeComponent = props => {
  const { handleSubmit } = props;
  return (
    <MDBContainer className="p-0">
      <UrlSubmitBox />
      <MDBContainer>
        <MDBRow>
          <MDBCol size="8" className="m-auto">
            <MDBCard className="mt-3">
              <MDBCardBody>
                <form onSubmit={handleSubmit} noValidate>
                  <RecipeInput />
                  <MDBCol className="text-center mt-2 p-0">
                    <MDBCardText>
                      Modify to your hearts delight. Drag and drop items from
                      the left to change order. Submit once ready.
                    </MDBCardText>
                    <div className="float-right">
                      <MDBBtn type="submit" style={{ borderRadius: `28px` }}>
                        Submit
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default AddRecipeComponent;
