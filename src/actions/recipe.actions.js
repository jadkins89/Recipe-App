import { recipeConstants, userRecipesConstants } from "actionConstants";
import { recipeServices } from "services";
import { alertActions } from "actions";

export const recipeActions = {
  add,
  createOrUpdate,
  deleteUsersRecipes,
  clear,
  find,
  get,
  getAllByUserId,
  getFavorites,
  setFavorite,
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
          text: "Recipe successfully added"
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
  function success() {
    return { type: recipeConstants.ADD_RECIPE_SUCCESS };
  }
  function failure(error) {
    return { type: recipeConstants.ADD_RECIPE_FAILURE, error };
  }
}

function createOrUpdate(recipeId) {
  return (dispatch, getState) => {
    dispatch(request());
    let state = getState();
    const { recipe, authentication } = state;
    return recipeServices
      .update(recipe, recipeId, authentication.user.id)
      .then(response => {
        let message = {
          type: "success",
          text: "Recipe successfully edited"
        };
        dispatch(success());
        dispatch(alertActions.addAlert(message));
      })
      .catch(error => {
        dispatch(failure(error));
        console.log(error);
      });
  };
  function request() {
    return { type: recipeConstants.EDIT_RECIPE_REQUEST };
  }
  function success() {
    return { type: recipeConstants.EDIT_RECIPE_SUCCESS };
  }
  function failure(error) {
    return { type: recipeConstants.EDIT_RECIPE_FAILURE, error };
  }
}

function deleteUsersRecipes(recipeId, userId) {
  return dispatch => {
    dispatch(request());
    return recipeServices
      .deleteUsersRecipes(recipeId, userId)
      .then(response => {
        let message = {
          type: "success",
          text: "Recipe successfully deleted"
        };
        dispatch(success());
        dispatch(alertActions.addAlert(message));
      })
      .catch(error => {
        dispatch(failure(error));
        console.log(error);
      });
  };
  function request() {
    return { type: recipeConstants.DELETE_RECIPE_REQUEST };
  }
  function success() {
    return { type: recipeConstants.DELETE_RECIPE_SUCCESS };
  }
  function failure(error) {
    return { type: recipeConstants.DELETE_RECIPE_FAILURE, error };
  }
}

function clear() {
  return dispatch => {
    dispatch(handleRequest());
  };
  function handleRequest() {
    return { type: recipeConstants.CLEAR_RECIPE };
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
        dispatch(failure(parsedError));
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

function get(recipeId) {
  return async (dispatch, getState) => {
    dispatch(request());
    try {
      let recipe = await recipeServices.findById(recipeId);
      let state = getState();
      const { user } = state.authentication;
      let favorite = await recipeServices.isFavorite(user.id, recipeId);
      recipe.favorite = favorite;
      return dispatch(success(recipe));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request() {
    return { type: recipeConstants.GET_RECIPE_REQUEST };
  }
  function success(recipe) {
    return { type: recipeConstants.GET_RECIPE_SUCCESS, recipe };
  }
  function failure(error) {
    return { type: recipeConstants.GET_RECIPE_FAILURE, error };
  }
}

function getAllByUserId(id) {
  return dispatch => {
    dispatch(request);
    recipeServices
      .findByUserId(id)
      .then(recipes => {
        dispatch(success(recipes));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: userRecipesConstants.GET_RECIPES_REQUEST };
  }
  function success(recipes) {
    return { type: userRecipesConstants.GET_RECIPES_SUCCESS, recipes };
  }
  function failure(error) {
    return { type: userRecipesConstants.GET_RECIPES_FAILURE, error };
  }
}

function getFavorites(userId) {
  return dispatch => {
    dispatch(request);
    recipeServices
      .findFavorites(userId)
      .then(recipes => {
        dispatch(success(recipes));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: userRecipesConstants.GET_RECIPES_REQUEST };
  }
  function success(recipes) {
    return { type: userRecipesConstants.GET_RECIPES_SUCCESS, recipes };
  }
  function failure(error) {
    return { type: userRecipesConstants.GET_RECIPES_FAILURE, error };
  }
}

function setFavorite(userId, recipeId, value) {
  return dispatch => {
    dispatch(request);
    recipeServices
      .setFavorite(userId, recipeId, value)
      .then(response => {
        dispatch(success(recipeId, value));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: userRecipesConstants.SET_FAVORITE_REQUEST };
  }
  function success(recipeId, value) {
    return {
      type: userRecipesConstants.SET_FAVORITE_SUCCESS,
      recipeId,
      value
    };
  }
  function failure(error) {
    return { type: userRecipesConstants.SET_FAVORITE_FAILURE, error };
  }
}

function handleChange(name, value) {
  return dispatch => {
    dispatch(changed());
    if (name === "name") {
      dispatch(changeValue(name, value));
    } else if (!name.includes("ingredient") && !name.includes("instruction")) {
      dispatch(changeTime(name, value));
    } else {
      const { category, index } = parseName(name);
      dispatch(changeList(category, value, index));
    }
  };

  function changed() {
    return { type: recipeConstants.MODIFY_RECIPE_REQUEST };
  }
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
