import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { recipeActions } from "actions";
import { modifyRecipeConstants } from "actionConstants";
import { AlertMessagesList, SideNav } from "components";
import DisplayRecipes from "./DisplayRecipes";
import EditRecipe from "./EditRecipe";

const Landing = props => {
  const { user, fetchRecipes, recipes, requestEditRecipe } = props;
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
          <DisplayRecipes
            recipes={recipes}
            id={user.id}
            editClick={requestEditRecipe}
          />
        </MDBCol>
      </MDBRow>
      <EditRecipe />
    </MDBContainer>
  );
};

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { recipes } = state.userRecipes;
  return {
    user,
    recipes
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchRecipes: id => dispatch(recipeActions.getAllByUserId(id)),
    requestEditRecipe: id =>
      dispatch({ type: modifyRecipeConstants.EDIT_RECIPE_REQUEST, id })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
