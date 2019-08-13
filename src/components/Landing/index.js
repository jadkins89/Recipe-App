import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { AlertMessagesList, SideNav } from "components";
import DisplayRecipesList from "./DisplayRecipesList";
import EditRecipeModal from "./EditRecipeModal";
import DeleteRecipeModal from "./DeleteRecipeModal";

const Landing = props => {
  return (
    <MDBContainer className="d-flex">
      <MDBRow className="mt-3">
        <SideNav />
        <MDBCol className="flex-wrap">
          <AlertMessagesList />
          <DisplayRecipesList />
        </MDBCol>
      </MDBRow>
      <EditRecipeModal />
      <DeleteRecipeModal />
    </MDBContainer>
  );
};

export default Landing;
