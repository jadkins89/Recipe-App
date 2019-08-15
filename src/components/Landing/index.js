import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import styled from "styled-components";
import { AlertMessagesList, SideNav } from "components";
import DisplayRecipesList from "./DisplayRecipesList";
import EditRecipeModal from "./EditRecipeModal";
import DeleteRecipeModal from "./DeleteRecipeModal";

const StyledCol = styled(MDBCol)`
  display: block;
`;

const Landing = props => {
  return (
    <MDBContainer className="mx-auto" style={{height: `100%`}}>
      <MDBRow className="my-3">
        <SideNav />
        <StyledCol className="card py-3">
            <AlertMessagesList />
            <DisplayRecipesList />
        </StyledCol>
      </MDBRow>
      <EditRecipeModal />
      <DeleteRecipeModal />
    </MDBContainer>
  );
};

export default Landing;
