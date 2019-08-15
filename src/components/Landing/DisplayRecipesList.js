import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import { modifyRecipeConstants } from "actionConstants";
import { Loading } from "components";
import DisplayRecipe from "./DisplayRecipe";

const DisplayRecipesList = props => {
  const { fetchRecipes, recipes, user, editRecipe, deleteRecipe } = props;

  useEffect(() => {
    fetchRecipes(user.id);
  }, [fetchRecipes, user.id]);
  return (
    <>
      <h5>Recipes</h5>
      {recipes ? (
        recipes
          .map((recipe, index) => {
            return (
              <DisplayRecipe
                name={recipe.name}
                id={recipe.recipe_id}
                editRecipe={editRecipe}
                deleteRecipe={deleteRecipe}
                key={"recipe_" + user.id + "-" + index}
              />
            );
          })
          .sort((a, b) => (a.props.name < b.props.name ? -1 : 1))
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

const mapDispatchToProps = {
  fetchRecipes: id => recipeActions.getAllByUserId(id),
  editRecipe: id => ({ type: modifyRecipeConstants.EDIT_RECIPE_REQUEST, id }),
  deleteRecipe: id => ({
    type: modifyRecipeConstants.DELETE_RECIPE_REQUEST,
    id
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayRecipesList);
