import React from "react";
import {
  MDBCol,
  MDBNavLink,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu
} from "mdbreact";
import styled from "styled-components";

const StyledDropdownMenu = styled(MDBDropdownMenu)`
  min-width: 0;
  padding: 0;
  font-size: 12px;
`;

const DefaultRecipeImage = styled.div`
  width: 100%;
  height: 100%;
  background: #D3D3D3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 36px;
  color: white;
`;

const DisplayRecipe = props => {
  const { name, id, editRecipe, deleteRecipe } = props;
  const editClickHandlers = {};
  const deleteClickHandlers = {};
  const key = "recipe_" + id;

  const getEditClickHandler = key => {
    if (!Object.prototype.hasOwnProperty.call(editClickHandlers, key)) {
      editClickHandlers[key] = () => editRecipe(id);
    }
    return editClickHandlers[key];
  };

  const getDeleteClickHandler = key => {
    if (!Object.prototype.hasOwnProperty.call(deleteClickHandlers, key)) {
      deleteClickHandlers[key] = () => deleteRecipe(id);
    }
    return deleteClickHandlers[key];
  };

  const getInitials = name => {
    let initials = name.split(" ").map(word => word[0].toUpperCase());
    return initials.slice(0,3);
  }

  // Break up drop down into seperate component
  return (
    <MDBCol
      className="d-inline-flex p-1"
      xs="6"
      sm="4"
      lg="3"
      style={{ height: `160px` }}
    >
      <MDBCard className="flex-fill">
        <MDBCardTitle
          className="px-2 pt-2 m-0"
          style={{ fontSize: `12px`, fontWeight: `bold`, minHeight: `48px`, maxHeight: `48px` }}
        >
          <MDBNavLink className="px-0" to={"recipes/" + id}>
            {name}
          </MDBNavLink>
        </MDBCardTitle>
        <DefaultRecipeImage>
          {getInitials(name)}
        </DefaultRecipeImage>
        <MDBDropdown className="ml-auto mt-auto">
          <MDBDropdownToggle
            className="btn btn-link m-0 p-0 ml-1 pb-1 px-2"
            tag="button"
          >
            <i className="fas fa-ellipsis-v fa-sm"></i>
          </MDBDropdownToggle>
          <StyledDropdownMenu>
            <MDBDropdownItem
              className="px-2"
              onClick={getEditClickHandler(key)}
            >
              edit
            </MDBDropdownItem>
            <MDBDropdownItem
              className="px-2"
              onClick={getDeleteClickHandler(key)}
            >
              delete
            </MDBDropdownItem>
          </StyledDropdownMenu>
        </MDBDropdown>
      </MDBCard>
    </MDBCol>
  );
};

export default DisplayRecipe;
