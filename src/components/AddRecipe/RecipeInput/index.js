import React from "react";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import RecipeInputComponent from "./RecipeInput.component";

const RecipeInput = props => {
  const { name, handleChange, addListItem } = props;
  return (
    <RecipeInputComponent
      name={name}
      handleChange={handleChange}
      addListItem={addListItem}
    />
  );
};

const mapStateToProps = state => {
  const { name } = state.recipe;
  return { name };
};

const mapDispatchToProps = {
  handleChange: event =>
    recipeActions.handleChange(event.target.name, event.target.value),
  addListItem: event => recipeActions.addListItem(event.target.name)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeInput);
