import React, { Component } from "react";
import { connect } from "react-redux";
import { recipeActions } from "../actions";
import RecipeComponent from "./Recipe.component";

class Recipe extends Component {
  componentDidMount() {
    const { dispatch, history } = this.props;
    let id = this.props.match.params.recipe_id;
    let name = this.props.match.params.recipe_name;
    dispatch(recipeActions.get(id, name, history));
  }

  render() {
    const { recipe } = this.props;
    return <RecipeComponent recipe={recipe} />;
  }
}

function mapStateToProps(state) {
  const { recipe } = state;
  return {
    recipe
  };
}

export default connect(mapStateToProps)(Recipe);
