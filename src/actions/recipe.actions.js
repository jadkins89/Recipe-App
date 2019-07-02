import { recipeConstants } from "../constants";
import { recipeServices } from "../services";
import { alertActions } from "../actions";

export const recipeActions = {
  add,
  find
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
        dispatch(failure(error));
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
    dispatch(request());
    return recipeServices
      .find(url)
      .then(recipe => {
        if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
          var error = "The recipe failed to be secured";
          let message = {
            type: "error",
            text: error
          };
          dispatch(failure(error));
          dispatch(alertActions.addAlert(message));
        }
        dispatch(success(recipe));
      })
      .catch(error => {
        let parsedError = JSON.parse(error);
        let message = {
          type: "error",
          text: parsedError.message
        };
        dispatch(alertActions.addAlert(message));
      });
  };
  function request() {
    return { type: recipeConstants.FIND_RECIPE_REQUEST };
  }
  function success(recipe) {
    return { type: recipeConstants.FIND_RECIPE_SUCCESS, recipe };
  }
  function failure(error) {
    return { type: recipeConstants.FIND_RECIPE_FAILURE, error };
  }
}
