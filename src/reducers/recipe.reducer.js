import { recipeConstants } from "../constants";

const initialState = {
  recipe: {
    name: "",
    ingredients: [""],
    instructions: [""],
    time: {
      prep: "",
      cook: "",
      active: "",
      inactive: "",
      total: "",
      ready: ""
    }
  }
};

export default function recipe(state = initialState, action = {}) {
  switch (action.type) {
    case recipeConstants.ADD_RECIPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAdded: false
      });
    case recipeConstants.ADD_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAdded: true,
        recipe: action.recipe
      });
    case recipeConstants.ADD_RECIPE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAdded: false,
        error: action.error
      });
    case recipeConstants.FIND_RECIPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case recipeConstants.FIND_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        recipe: action.recipe
      });
    case recipeConstants.FIND_RECIPE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
