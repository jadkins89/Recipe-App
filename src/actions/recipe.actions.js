import { recipeConstants } from "../constants";
import { recipeServices } from "../services";
import { alertActions } from "../actions";

export const recipeActions = {
  add,
  find,
  get,
  handleChange,
  handleDrop,
  addListItem,
  deleteListItem
};

function add(history) {
  return (dispatch, getState) => {
    dispatch(request());
    let state = getState();
    const { recipe, authentication } = state;
    recipeServices.add(recipe, authentication.user.id).then(
      response => {
        let message = {
          type: "success",
          text: "Recipe Successfully added"
        };
        dispatch(success());
        history.push("/");
        dispatch(alertActions.addAlert(message));
      },
      error => {
        dispatch(failure(error));
        console.log(error);
      }
    );
  };
  function request() {
    return { type: recipeConstants.ADD_RECIPE_REQUEST };
  }
  function success(recipe) {
    return { type: recipeConstants.ADD_RECIPE_SUCCESS };
  }
  function failure(error) {
    return { type: recipeConstants.ADD_RECIPE_FAILURE, error };
  }
}

function find(url) {
  return dispatch => {
    dispatch(request());
    return recipeServices
      .scrape(url)
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

function get(id) {
  return dispatch => {
    return recipeServices.findById(id);
  };
}

function handleChange(name, value) {
  return dispatch => {
    if (name === "name") {
      dispatch(changeValue(name, value));
    } else if (!name.includes("ingredient") && !name.includes("instruction")) {
      dispatch(changeTime(name, value));
    } else {
      const { category, index } = parseName(name);
      dispatch(changeList(category, value, index));
    }
  };

  function changeValue(name, value) {
    return { type: recipeConstants.MODIFY_RECIPE_NAME, name, value };
  }
  function changeTime(name, value) {
    return { type: recipeConstants.MODIFY_RECIPE_TIME, name, value };
  }
  function changeList(name, value, index) {
    return { type: recipeConstants.MODIFY_RECIPE_LIST, name, value, index };
  }
}

function handleDrop(name, value) {
  return { type: recipeConstants.MODIFY_RECIPE_ORDER, name, value };
}

function addListItem(name) {
  return dispatch => {
    dispatch({ type: recipeConstants.ADD_RECIPE_LIST_ITEM, name });
  };
}

function deleteListItem(name) {
  const { category, index } = parseName(name);
  return dispatch => {
    dispatch({
      type: recipeConstants.DELETE_RECIPE_LIST_ITEM,
      name: category,
      index
    });
  };
}

// Utility function
function parseName(name) {
  let parsedName = name.split("-");
  return {
    category: parsedName[0],
    index: parseInt(parsedName[1])
  };
}
