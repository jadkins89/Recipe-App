import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import { modifyRecipeConstants } from "actionConstants";
import { Loading } from "components";
import DisplayRecipe from "./DisplayRecipe";

// Make indidivual recipe component

const DisplayRecipesList = props => {
  const { fetchRecipes, recipes, user, editRecipe } = props;

  useEffect(() => {
    fetchRecipes(user.id);
  }, [fetchRecipes, user.id]);
  return (
    <>
      <h5>Recipes</h5>
      {recipes ? (
        recipes.map((recipe, index) => {
          return (
            <DisplayRecipe
              name={recipe.name}
              id={recipe.id}
              editRecipe={editRecipe}
              key={"recipe_" + user.id + "-" + index}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </>
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
    editRecipe: id =>
      dispatch({ type: modifyRecipeConstants.EDIT_RECIPE_REQUEST, id })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayRecipesList);
