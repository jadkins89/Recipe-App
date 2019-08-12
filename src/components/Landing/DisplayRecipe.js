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
  const { name, id, editRecipe } = props;
  const clickHandlers = {};
  const key = "recipe_" + id;

  const getClickHandler = key => {
    if (!Object.prototype.hasOwnProperty.call(clickHandlers, key)) {
      clickHandlers[key] = () => editRecipe(id);
    }
    return clickHandlers[key];
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
          <MDBDropdownItem onClick={getClickHandler(key)}>edit</MDBDropdownItem>
          <MDBDropdownItem tag="li">delete</MDBDropdownItem>
        </StyledDropdownMenu>
      </MDBDropdown>
    </MDBContainer>
  );
};

export default DisplayRecipe;
