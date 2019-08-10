import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import RecipeComponent from "./Recipe.component";
import { Loading } from "components";

const Recipe = props => {
  const { getRecipe, history, recipe, user, isFetching, setFavorite } = props;
  let recipe_id = props.match.params.recipe_id;
  let name = props.match.params.recipe_name;

  useEffect(() => {
    if (history.action !== "REPLACE") {
      getRecipe(recipe_id, name, history);
    }
  }, [name, history, getRecipe, recipe_id]);

  // Loading screen for user / recipe loading and url modification
  if (isFetching || recipe.isFetching || history.action === "PUSH") {
    return <Loading />;
  } else {
    return (
      <RecipeComponent
        recipe={recipe}
        setFavorite={setFavorite}
        recipe_id={recipe_id}
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
  getRecipe: (id, name, history) => recipeActions.get(id, name, history),
  setFavorite: (user_id, recipe_id, value) =>
    recipeActions.setFavorite(user_id, recipe_id, value)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
