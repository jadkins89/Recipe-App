import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";

import AddRecipeComponent from "./AddRecipe.component";
import { recipeActions } from "actions";

const AddRecipe = props => {
  useLayoutEffect(() => {
    const { recipe, clearRecipe } = props;
    if (recipe.name) {
      clearRecipe();
    }
  });

  const { handleChange, handleSubmit, addListItem } = props;
  const { name } = props.recipe;
  return (
    <AddRecipeComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      addListItem={addListItem}
      name={name}
    />
  );
};

function mapStateToProps(state) {
  const { recipe } = state;
  return {
    recipe
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: event =>
      dispatch(
        recipeActions.handleChange(event.target.name, event.target.value)
      ),
    addListItem: event =>
      dispatch(recipeActions.addListItem(event.target.name)),
    handleSubmit: event => {
      event.preventDefault();
      dispatch(recipeActions.add(ownProps.history));
    },
    clearRecipe: () => {
      dispatch(recipeActions.clear());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipe);
