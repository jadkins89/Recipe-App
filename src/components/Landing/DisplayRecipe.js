import React from "react";
import {
  MDBContainer,
  MDBNavLink,
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

  return (
    <MDBContainer className="d-flex">
      <MDBNavLink className="px-0" to={"recipes/" + id}>
        {name}
      </MDBNavLink>
      <MDBDropdown className="my-auto">
        <MDBDropdownToggle
          className="btn btn-link m-0 p-0 ml-1 pb-1 px-2"
          tag="button"
        >
          <i className="fas fa-ellipsis-v fa-sm"></i>
        </MDBDropdownToggle>
        <StyledDropdownMenu>
          <MDBDropdownItem onClick={getEditClickHandler(key)}>
            edit
          </MDBDropdownItem>
          <MDBDropdownItem onClick={getDeleteClickHandler(key)}>
            delete
          </MDBDropdownItem>
        </StyledDropdownMenu>
      </MDBDropdown>
    </MDBContainer>
  );
};

export default DisplayRecipe;
