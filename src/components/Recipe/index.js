import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import RecipeComponent from "./Recipe.component";
import { Loading } from "components";

const Recipe = props => {
  const { getRecipe, history, recipe, user, isFetching, setFavorite } = props;
  let recipeId = props.match.params.recipe_id;
  let name = props.match.params.recipe_name;

  useEffect(() => {
    (async () => {
      if (history.action !== "REPLACE") {
        try {
          let response = await getRecipe(recipeId);
          let url_name = response.recipe.name
            .replace(/[.,/#!$%^&*;:{}=\-_'`~()\s]/g, "")
            .toLowerCase();
          if (!name) {
            history.replace(`/recipes/${recipeId}/${url_name}`);
          } else if (name !== url_name) {
            history.replace(`/recipes/${recipeId}/${url_name}`);
            // Should handle 404
          }
        } catch {
          history.push("/");
        }
      }
    })();
  }, [name, history, getRecipe, recipeId]);

  // Loading screen for user / recipe loading and url modification
  if (isFetching || recipe.isFetching || history.action === "PUSH") {
    return <Loading />;
  } else {
    return (
      <RecipeComponent
        recipe={recipe}
        setFavorite={setFavorite}
        recipe_id={recipeId}
        user_id={user.id}
      />
    );
  }
};

function mapStateToProps(state) {
  const { isFetching, user } = state.authentication;
  const { recipe } = state;
  return {
    recipe,
    isFetching,
    user
  };
}

const mapDispatchToProps = {
  getRecipe: id => recipeActions.get(id),
  setFavorite: (userId, recipeId, value) =>
    recipeActions.setFavorite(userId, recipeId, value)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
