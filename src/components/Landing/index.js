import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { AlertMessagesList, SideNav } from "components";
import DisplayRecipesList from "./DisplayRecipesList";
import EditRecipe from "./EditRecipe";

const Landing = props => {
  return (
    <MDBContainer className="d-flex">
      <MDBRow className="mt-3">
        <SideNav />
        <MDBCol>
          <AlertMessagesList />
          <DisplayRecipesList />
        </MDBCol>
      </MDBRow>
      <EditRecipe />
    </MDBContainer>
  );
};

Landing.whyDidYouRender = true;

export default Landing;
