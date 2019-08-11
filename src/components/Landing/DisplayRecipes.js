import React from "react";
import {
  MDBContainer,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import styled from "styled-components";
import { Loading } from "components";

const StyledDropdownMenu = styled(MDBDropdownMenu)`
  min-width: 0;
  padding: 0;
  font-size: 12px;
`;

// Make indidivual recipe component

const DisplayRecipes = props => {
  const { recipes, id, editClick } = props;
  return (
    <>
      <h5>Recipes</h5>
      {recipes ? (
        recipes.map((recipe, index) => {
          return (
            <MDBContainer className="d-flex" key={"recipe_" + id + "_" + index}>
              <MDBNavLink className="px-0" to={"recipes/" + recipe.id}>
                {recipe.name}
              </MDBNavLink>
              <MDBDropdown className="my-auto">
                <MDBDropdownToggle
                  className="btn btn-link m-0 p-0 ml-1 pb-1 px-2"
                  tag="button"
                >
                  <i className="fas fa-ellipsis-v fa-sm"></i>
                </MDBDropdownToggle>
                <StyledDropdownMenu>
                  <MDBDropdownItem onClick={() => editClick(recipe.id)}>
                    edit
                  </MDBDropdownItem>
                  <MDBDropdownItem tag="li">delete</MDBDropdownItem>
                </StyledDropdownMenu>
              </MDBDropdown>
            </MDBContainer>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DisplayRecipes;
