import { recipeConstants } from "../constants";
import { recipeServices } from "../services";
import { alertActions } from "../actions";

export const recipeActions = {
  add
};

function add(recipe) {
  return dispatch => {
    dispatch(request());
    recipeServices
      .add(recipe)
      .then(response => {
        console.log(response);
        let message = {
          type: "success",
          text: "Recipe Successfully added"
        };
        dispatch(alertActions.addAlert(message));
        // move to different page
        // alert user that recipes was stored successfully
      })
      .catch(error => {
        console.log(error);
      });
  };
  function request() {
    return { type: recipeConstants.ADD_RECIPE_REQUEST };
  }
  function success(recipe) {
    return { type: recipeConstants.ADD_RECIPE_SUCCESS, recipe };
  }
  function failure(error) {
    return { type: recipeConstants.ADD_RECIPE_FAILURE, error };
  }
}

function find(url) {
  return dispatch => {
    recipeServices.find(url).then(response => {
      console.log(response);
    });
  };
}
