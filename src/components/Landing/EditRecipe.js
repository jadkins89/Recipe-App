import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { connect } from "react-redux";
import { recipeActions } from "actions";
import { modifyRecipeConstants } from "actionConstants";
import { RecipeInput } from "components";

const EditRecipe = props => {
  const { editModal, toggle, recipeId, getRecipe, recipe } = props;

  useEffect(() => {
    getRecipe(recipeId);
  }, [getRecipe, recipeId]);

  if (recipe) {
    return (
      <MDBModal size="lg" isOpen={editModal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Edit Recipe</MDBModalHeader>
        <MDBModalBody>
          <RecipeInput />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  const { editModal, recipeId } = state.modifyRecipe;
  const { recipe } = state;
  return {
    editModal,
    recipeId,
    recipe
  };
};

const mapDispatchToProps = {
  getRecipe: id => recipeActions.get(id),
  toggle: () => ({ type: modifyRecipeConstants.EDIT_RECIPE_TOGGLE })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe);
