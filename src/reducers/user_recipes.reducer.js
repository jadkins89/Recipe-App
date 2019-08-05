import { userRecipesConstants } from "../constants";

const initialState = {};

export default function recipe(state = initialState, action = {}) {
  switch (action.type) {
    case userRecipesConstants.GET_RECIPES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case userRecipesConstants.GET_RECIPES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        recipes: action.recipes
      });
    case userRecipesConstants.GET_RECIPES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
