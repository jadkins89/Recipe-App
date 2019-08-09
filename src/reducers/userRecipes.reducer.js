import { userRecipesConstants } from "actionConstants";

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
    case userRecipesConstants.SET_FAVORITE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case userRecipesConstants.SET_FAVORITE_SUCCESS:
      return Object.assign({}, state, {
        recipes: state.recipes.map(recipe => {
          if (recipe.id === action.recipe_id) {
            recipe.favorite = action.value;
            return recipe;
          } else {
            return recipe;
          }
        })
      });
    case userRecipesConstants.SET_FAVORITE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
