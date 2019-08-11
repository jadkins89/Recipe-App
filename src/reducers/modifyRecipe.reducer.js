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
    default:
      return state;
  }
}
