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
import { RecipeInput } from "components";

const DeleteRecipeModal = props => {
  const { fetchRecipes, deleteModal, toggle, recipeId, id } = props;

  const onClick = () => {
    console.log("delete test");
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
  fetchRecipes: user_id => recipeActions.getAllByUserId(user_id),
  toggle: () => ({ type: modifyRecipeConstants.DELETE_RECIPE_TOGGLE })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteRecipeModal);
