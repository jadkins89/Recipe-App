import { modifyRecipeConstants } from "actionConstants";

const initialState = {
  editModal: false,
  deleteModal: false,
  recipeId: null
};

export default function modifyRecipe(state = initialState, action = {}) {
  switch (action.type) {
    case modifyRecipeConstants.EDIT_RECIPE_REQUEST:
      return Object.assign({}, state, {
        editModal: true,
        recipeId: action.id
      });
    case modifyRecipeConstants.EDIT_RECIPE_TOGGLE:
      return Object.assign({}, state, {
        editModal: !state.editModal
      });
    case modifyRecipeConstants.EDIT_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        ...initialState
      });
    case modifyRecipeConstants.EDIT_RECIPE_FAILURE:
      return Object.assign({}, state, {
        isModal: false,
        error: action.error
      });
    default:
      return state;
  }
}
