import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBNavLink } from "mdbreact";
import { recipeActions } from "actions";
import { AlertMessagesList, SideNav } from "components";

const LandingPage = props => {
  const { user, fetchRecipes, recipes } = props;
  // Currently calls every re-render, could adjust to just call on mount
  useEffect(() => {
    fetchRecipes(user.id);
  }, [fetchRecipes, user.id]);
  return (
    <MDBContainer className="d-flex">
      <MDBRow className="mt-3">
        <SideNav />
        <MDBCol>
          <AlertMessagesList />
          <h5>Recipes</h5>
          {recipes
            ? recipes.map((recipe, index) => {
                return (
                  <MDBNavLink
                    key={"recipe_" + user.id + "_" + index}
                    to={"recipes/" + recipe.id}
                  >
                    {recipe.name}
                  </MDBNavLink>
                );
              })
            : null}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { recipes } = state.user_recipes;
  return {
    user,
    recipes
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchRecipes: id => dispatch(recipeActions.getAllByUserId(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
