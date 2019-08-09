import React, { Component } from "react";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import RecipeComponent from "./Recipe.component";
import { Loading } from "components";

class Recipe extends Component {
  componentDidMount() {
    const { getRecipe, history } = this.props;
    let id = this.props.match.params.recipe_id;
    let name = this.props.match.params.recipe_name;
    getRecipe(id, name, history);
  }

  render() {
    let recipe_id = this.props.match.params.recipe_id;
    const { recipe, user, isFetching, setFavorite, history } = this.props;

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
  }
}

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
