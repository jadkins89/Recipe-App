import React from "react";
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

const DeleteRecipeModal = props => {
  const {
    fetchRecipes,
    deleteRecipe,
    toggle,
    deleteModal,
    recipeId,
    id
  } = props;

  const onClick = async () => {
    await deleteRecipe(recipeId, id);
    fetchRecipes(id);
    toggle();
  };

  if (deleteModal) {
    return (
      <MDBModal size="lg" isOpen={deleteModal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Delete Recipe</MDBModalHeader>
        <MDBModalFooter>
          <MDBModalBody>
            Are you sure you want to delete this recipe?
          </MDBModalBody>
          <MDBBtn color="secondary" onClick={toggle}>
            No
          </MDBBtn>
          <MDBBtn color="primary" onClick={onClick}>
            Yes
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
  const { deleteModal, recipeId } = state.modifyRecipe;
  return {
    id,
    deleteModal,
    recipeId
  };
};

const mapDispatchToProps = {
  fetchRecipes: userId => recipeActions.getAllByUserId(userId),
  toggle: () => ({ type: modifyRecipeConstants.DELETE_RECIPE_TOGGLE }),
  deleteRecipe: (recipeId, userId) =>
    recipeActions.deleteUsersRecipes(recipeId, userId)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteRecipeModal);
