import React, { useEffect } from "react";
import { connect } from "react-redux";

import AddRecipeComponent from "./AddRecipe.component";
import { recipeActions } from "actions";

const AddRecipe = props => {
  const { handleSubmit, clearRecipe } = props;

  useEffect(() => {
    clearRecipe();
  }, [clearRecipe]);

  return <AddRecipeComponent handleSubmit={handleSubmit} />;
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
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
  null,
  mapDispatchToProps
)(AddRecipe);
