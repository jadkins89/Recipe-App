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
    case recipeConstants.MODIFY_RECIPE_NAME:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.name]: action.value
        }
      };
    case recipeConstants.MODIFY_RECIPE_LIST:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.name]: state.recipe[action.name].map((item, index) =>
            index === action.index ? action.value : item
          )
        }
      };
    case recipeConstants.MODIFY_RECIPE_ORDER:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.name]: action.value
        }
      };
    case recipeConstants.ADD_RECIPE_LIST_ITEM:
      let newListAdd = state.recipe[action.name].concat([""]);
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.name]: newListAdd
        }
      };
    case recipeConstants.DELETE_RECIPE_LIST_ITEM:
      let newListDelete = [...state.recipe[action.name]];
      newListDelete.splice(action.index, 1);
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.name]: newListDelete
        }
      };
    default:
      return state;
  }
}
