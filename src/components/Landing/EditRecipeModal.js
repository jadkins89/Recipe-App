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

const EditRecipeModal = props => {
  const {
    fetchRecipes,
    editModal,
    toggle,
    recipeId,
    getRecipe,
    updateRecipe,
    id,
    modifiedLocally
  } = props;

  useEffect(() => {
    if (recipeId) {
      getRecipe(recipeId);
    }
  }, [getRecipe, recipeId]);

  const onClick = () => {
    // Only call if modified in modal
    if (modifiedLocally) {
      updateRecipe(recipeId).then(res => {
        fetchRecipes(id);
        toggle();
      });
    } else {
      toggle();
    }
  };

  if (editModal) {
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
          <MDBBtn color="primary" onClick={onClick}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  const { id } = state.authentication.user;
  const { editModal, recipeId } = state.modifyRecipe;
  const { modifiedLocally } = state.recipe;
  return {
    id,
    editModal,
    recipeId,
    modifiedLocally
  };
};

const mapDispatchToProps = {
  fetchRecipes: user_id => recipeActions.getAllByUserId(user_id),
  getRecipe: id => recipeActions.get(id),
  toggle: () => ({ type: modifyRecipeConstants.EDIT_RECIPE_TOGGLE }),
  updateRecipe: id => recipeActions.update(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipeModal);
